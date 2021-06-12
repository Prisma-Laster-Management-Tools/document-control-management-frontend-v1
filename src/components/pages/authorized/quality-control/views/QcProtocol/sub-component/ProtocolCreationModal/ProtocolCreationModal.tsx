import React, { useEffect, useState } from 'react'
import { Modal, Button,Table,Form,Input, PageHeader, Upload ,Image, Space, Tooltip} from 'antd'
import { ICreateProtocalDTO, IQualityControlProtocol } from '../../../../shared/interfaces/qc.interface'
import { API_CreateProtocolForProductCode, API_GetProtocolListFromProductCode } from '../../../../apis/qc.api'
import { PlusOutlined,UploadOutlined,EditTwoTone,DeleteOutlined} from '@ant-design/icons';
import { MainContainer } from './protocolCreation.styles';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import {SERVER_ADDRESS} from '../../../../../../../../config/STATIC.json'
const {Column} = Table
const {useForm} = Form
interface IProps{
    visible:boolean
    product_code: string | null
    back: () => void
    on_crud:() => void
}
type TAction = "view" | "add"

const formItemLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 16 },
    },
  };

const ProtocolCreationModal:React.FC<IProps> = ({visible,product_code,back,on_crud}) => {
    //const [visible, setVisible] = useState(false);
    const [action,setAction] = useState<TAction>("view")
    const [protocolData,setProtocolData] = useState<Array<IQualityControlProtocol> | null>(null)

    async function fetchProtocolList(product_code:string){
        const mapped_response = await API_GetProtocolListFromProductCode(product_code)
        if(mapped_response.success){
            console.log(mapped_response)
            setProtocolData(mapped_response.data)
        }else{

        }
    }

    useEffect(() => {
        if(product_code){
            fetchProtocolList(product_code)
            setAction("view")
        }else{
            //if prod code === null
        }
    },[product_code])

    //
    // ─── VIS HELPER ─────────────────────────────────────────────────────────────────
    //
    // ────────────────────────────────────────────────────────────────────────────────


    let rendered_content = null
    switch (action) {
        case "view":
            rendered_content = <>
            <PageHeader
className="site-page-header"
onBack={() => back()}
title="ข้อกำหนด"
subTitle="ข้อกำหนดของมาตรฐานของสินค้า"
/>
            <div style={{ padding:20 }}>
                        <div style={{ display:'flex',justifyContent:'flex-end',marginBottom:20 }}>
                            <Button icon={<PlusOutlined />} onClick={() => setAction("add")}>เพิ่มข้อกำหนด</Button>
                        </div>
                        <Table onRow={(r) => ({onClick: () => console.log("lol")})} dataSource={protocolData || []} rowKey="id" size="middle" pagination={{ pageSize:8 }} bordered loading={protocolData===null}>
                            <Column title="ลำดับที่" dataIndex="process_order" key="process_order" />
                            <Column title="ขั้นตอน" dataIndex="process_description" key="process_description" />
                            <Column align="center" width="10%" title="รูปภาพ" render={(text,record: IQualityControlProtocol) => {
                                if(!record.attachment_path) return <Button type="text" disabled>ไม่มีรูปภาพ</Button>
                                return     <Image
                                            width={100}
                                            height={50}
                                             src={SERVER_ADDRESS+record.attachment_path}
                                                />
                            }}/>
                            <Column align="center" width="10%" title="การจัดการ" render={(text,record: IQualityControlProtocol) => {
                                return <Space>
                                        <Tooltip placement="bottom" title="แก้ไข">
                                         <Button onClick={() => null} ghost type="primary" shape="circle" icon={<EditTwoTone/>} size="middle" />
                                        </Tooltip>
                                        <Tooltip placement="bottom" title="ลบข้อกำหนด">
                                         <Button  danger onClick={() => null} ghost type="primary" shape="circle" icon={<DeleteOutlined/>} size="middle" />
                                        </Tooltip>


                                     </Space>
                            }}/>
                        </Table>
                    </div>
            </>
            break;
        case "add":
            rendered_content = <CreationForm on_crud={() => {
                //trigger re-fetching protocol also in-order if any record has just created
                if(!product_code) return
                on_crud()
                fetchProtocolList(product_code)
                setAction("view") // set the action back
            }} product_code={product_code!} back={setAction.bind(null,'view')}/>
            break;
        default:

            break;
    }

    return (
      <>
        <Modal
        style={{ fontFamily:'Kanit' }}
        footer={null}
        //   title={`ข้อกำหนดของ ${product_code}`}
          centered
          visible={visible}
          width={1000}
          onCancel={back}
          closable={false}
        >
            {rendered_content}
        </Modal>
      </>
    );
}

interface ICreationFormProps{
    back: () => void
    product_code:string
    on_crud: () => void
}

const CreationForm:React.FC<ICreationFormProps> = ({back,product_code,on_crud}) => {
    const [form] = useForm()
    let image_path:null|string = null // dont need to be hook -> no rerender needed
    function onImageUploaded(event: UploadChangeParam<UploadFile<any>>){
        const {status,response} = event.file
        if(status === 'uploading') return // ignore
        else if(status === 'removed'){
            image_path = null
            return
        }
        console.log(response)
        if(response.success){
            image_path = response.stored_path
        }

    }
    async function onCreateProtocol(){
        if(!product_code) return // incase of ^^
        const postData:ICreateProtocalDTO = {...form.getFieldsValue(),required_attachment:false,attachment_path:image_path,product_code}
        postData.process_order = parseInt(postData.process_order as unknown as string)
        console.log(postData)
        const mapped_response = await API_CreateProtocolForProductCode(postData)
        if(mapped_response.success){
            console.log('creating protocol success')
            on_crud()
        }else{
            console.log('failed to create the protocol')
        }
    }
    return <MainContainer>
            <PageHeader
                className="site-page-header"
                onBack={() => back()}
                title="สร้างข้อกำหนด"
                subTitle="สร้างข้อกำหนดของมาตรฐานของสิ่งของ"
            />
            <div style={{ width:"50%",alignSelf:'center' }}>
                <Form form={form} onFinish={onCreateProtocol} {...formItemLayout}>
                    <Form.Item
                            // style={{ width:"50%" }}
                            name="process_order"
                            label="ลำดับความสำคัญ"
                            rules={[
                            {
                                required: true,
                                message: 'กรุณาระบุลำดับความสำคัญ',
                            },
                            ]}
                        >
                        <Input type="number"/>
                    </Form.Item>
                    <Form.Item
                            // style={{ width:"50%" }}
                            name="process_description"
                            label="รายละเอียดขั้นตอน"
                            rules={[
                            {
                                required: true,
                                message: 'กรุณาระบุรายละเอียดขั้นตอน',
                            },
                            ]}
                        >
                        <Input />
                    </Form.Item>
                    <Form.Item
                            // style={{ width:"50%" }}
                            label="แนบรูปภาพ"
                            rules={[
                            {
                                required: false,
                                message: 'กรุณาระบุรายละเอียดสินค้า',
                            },
                            ]}
                        >
                        <Upload
                            action="http://localhost:3000/api/upload/image-single"
                            listType="picture"
                            maxCount={1}
                            onChange={onImageUploaded}
                            
                        >
                            <Button icon={<UploadOutlined />}>เลือกรูปภาพ</Button>
                        </Upload>
                    </Form.Item>
                
                    <Form.Item wrapperCol={{ sm:{span:16,offset:8} }}>
                        <Button type="primary" htmlType="submit" block>
                            สร้างข้อกำหนด
                        </Button>
                        <Button onClick={back} danger block>
                            ยกเลิก
                        </Button>
                    </Form.Item>
                </Form>
            </div>
    </MainContainer>
}

export default ProtocolCreationModal