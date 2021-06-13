import { PageHeader,Table,Button, Tooltip, Space, Popover, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { API_CreatePartDetail, API_GetAllPartDetail } from '../../apis/purchasement.api'
import { ICreatePartDetailDTO, IPurchasementPartDetail } from '../../shared/interfaces/purchasement.interfaces'
import { MainContainer } from './partDetail.styles'

import { PartitionOutlined,ExportOutlined,EditFilled,DeleteFilled,PlusOutlined,PlusCircleTwoTone} from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form'
import { ERROR_TOAST_OPTION } from '../../../../../../shared/options/toast.option'
import { toast } from 'react-toastify'

const {Column} = Table

interface IProps{

}
type TAction = "view" | "add"


const formItemLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 9 },
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 15 },
    },
  };
const PartDetail:React.FC<IProps> = () => {
    const [partDetails,setPartDetails] = useState<Array<IPurchasementPartDetail> | null>(null)
    const [action,setAction] = useState<TAction>("view")
    const [form] = useForm()
    const [popOverVisible,setPopoverVisible] = useState(false)
    async function getAllPartDetail(){
        const mapped_response = await API_GetAllPartDetail()
        if(mapped_response.success){
            setPartDetails(mapped_response.data)
        }else{
            //failed to fetch
        }
    }
    useEffect(() => {
        getAllPartDetail()
    },[])

    //
    // ─── POPOVER CONTENT ────────────────────────────────────────────────────────────
    //

    async function onCreatePartDetail(){
        const postData: ICreatePartDetailDTO = form.getFieldsValue()
        const mapped_response = await API_CreatePartDetail(postData)
        if(mapped_response.data){
            toast.success('ข้อมูลของส่วนประกอบได้ถูกสร้างเรียบร้อยแล้ว',ERROR_TOAST_OPTION);
            setPartDetails(prevState => ([...prevState!,mapped_response.data as IPurchasementPartDetail]))
            form.resetFields()
            setPopoverVisible(false)
        }else{
            // Failed to create the part detail
        }
    }

    const rendered_popover_content = <div style={{ fontFamily:'Kanit',width:'400px', }}>
        <div style={{ background:'white' }}>
            <h3 style={{ marginBottom:40 }}>สร้างส่วนประกอบ</h3>
            <Form onFinish={onCreatePartDetail} form={form} {...formItemLayout}>
                <Form.Item
                        // style={{ width:"50%" }}
                        name="part_number"
                        label="รหัสวัสดุ"
                        rules={[
                        {
                            required: true,
                            message: 'กรุณาระบุรหัสวัสดุ (Ex. RM00X)',
                        },
                        ]}
                    >
                    <Input />
                </Form.Item>
                <Form.Item
                        // style={{ width:"50%" }}
                        name="part_name"
                        label="ชื่อวัสดุ"
                        rules={[
                        {
                            required: true,
                            message: 'กรุณาระบุชื่อวุสดุ',
                        },
                        ]}
                    >
                    <Input />
                </Form.Item>

                <Form.Item
                        // style={{ width:"50%" }}
                        name="part_description"
                        label="รายละเอียด"
                        rules={[
                        {
                            required: false,
                            message: '',
                        },
                        ]}
                    >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ sm:{span:15,offset:9} }}>
                        <Button type="primary" htmlType="submit" block>
                            ยืนยัน
                        </Button>
                        {/* <Button onClick={onCancel} danger block>
                            ยกเลิก
                        </Button> */}
                </Form.Item>

            </Form>
        </div>
    </div>
    // ────────────────────────────────────────────────────────────────────────────────


    let rendered_content = null
    switch (action) {
        case "view":
            rendered_content = <>
                    <div style={{ display:'flex',justifyContent:'flex-end',marginBottom:20,paddingRight:10 }}>

                        <Popover
                            content={rendered_popover_content}
                            // title="สร้างส่วนประกอบ"
                            trigger="click"
                            placement="left"
                            visible={popOverVisible}
                            onVisibleChange={(visible) => setPopoverVisible(visible)}
                        >
                            <Button type="primary" shape="circle" icon={<PlusOutlined />} size="middle" />
                        </Popover>
                    </div>
                    <Table onRow={(r) => ({onClick: () => console.log("lol")})} dataSource={partDetails || []} rowKey="id" size="middle" pagination={{ pageSize:8 }} bordered loading={partDetails===null}>
                    <Column title="รหัสวัสดุ" dataIndex="part_number" key="part_number" />
                    <Column title="ชื่อวัสดุ" dataIndex="part_name" key="part_name" />
                    <Column title="รายละเอียด" render={(text,record: IPurchasementPartDetail) => {
                        if(!record.part_description) return <div>ไม่ระบุ</div>
                        else return <div>{record.part_description}</div>
                    }} />
                    <Column align="center" title="ตัวจัดการ" render={(text,record: IPurchasementPartDetail) => {
                        return <>
                                <Space>
                                <Tooltip placement="bottom" title="แก้ไข">
                                    <Button ghost type="primary" shape="circle" icon={<EditFilled />} size="middle" />
                                </Tooltip>
                                <Tooltip placement="bottom" title="ลบ">
                                    <Button onClick={() => null} ghost danger shape="circle" icon={<DeleteFilled />} size="middle" />
                                </Tooltip>
                        </Space>
                        </>
                    }} />

                </Table>
            </>
            break;
        case "add":
            rendered_content = null
            break
    
        default:
            break;
    }
    return (
        <MainContainer>
            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                ghost={false}
                backIcon={null}
                title="ข้อมูลส่วนประกอบ/วัสดุ"
                >
                </PageHeader>
            </div>
            {rendered_content}
            
        </MainContainer>
    )
}

export default PartDetail
