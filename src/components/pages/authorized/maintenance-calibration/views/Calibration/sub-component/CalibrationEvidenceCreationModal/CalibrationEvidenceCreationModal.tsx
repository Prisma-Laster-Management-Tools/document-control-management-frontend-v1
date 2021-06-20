import React, { useState } from 'react'
import { Modal, Button,Form, Input, PageHeader, DatePicker, Select, Upload, Tag } from 'antd';
import {InboxOutlined} from '@ant-design/icons'
import { API_CreateCalibrationEvidence } from '../../../../apis/calibration.api';
import { ERROR_TOAST_OPTION } from '../../../../../../../../shared/options/toast.option';
import { toast } from 'react-toastify';
const { Option } = Select;
const {useForm} = Form
const formItemLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 15 },
    },
  };

interface IProps{
    visible:boolean
    back: () => any
    on_crud: () => any
    m_n_s: {machine_name:string,serial_number:string,instruction:string} | null
}

const CalibrationEvidenceCreationModal:React.FC<IProps> = ({visible,back,m_n_s,on_crud}) => {
    const [form] = useForm()
    const [fileList,setFileList] = useState<Array<any>>([])
    async function onCreatingEvidence(){
        const {is_pass,description} = form.getFieldsValue()
        //console.log(fieldsData) 
        const formData = new FormData()
        formData.append("machine_name",m_n_s!.machine_name)
        formData.append("serial_number",m_n_s!.serial_number)
        formData.append("is_pass", is_pass)
        formData.append("description", description || "ไม่ระบุ")
        fileList.forEach(data => {
            formData.append("files",data)
        })

        const mapped_response = await API_CreateCalibrationEvidence(formData)
        if(mapped_response.success){
            console.log(mapped_response)
            toast.success('เพิ่มผลลัพท์การตรวจวัดประสิทธิภาพเรียบร้อยแล้ว',ERROR_TOAST_OPTION);
            form.resetFields()
            on_crud() //
        }else{
            console.log(mapped_response)
            toast.error('เกิดข้อผิดพลาดเพิ่มผลลัพท์การตรวจวัดประสิทธิภาพ',ERROR_TOAST_OPTION);
        }
    }

    const normFile = (e: any) => {
        //console.log('Upload event:', e);
        console.log(e.fileList)
        if(e.fileList.length){
            // contains atlest 1 picture
            console.log('picture atleast')
            setFileList(e.fileList.map((data:any) => data.originFileObj))
        }else{
            //form.setFieldsValue({dragger:''})
            console.log('no picture at all')
            setFileList([])
        }
      };

      const uploadImage = async (options:any) => {
        const { onSuccess, onError, file, onProgress } = options;
        onSuccess("Ok");
      };

    return (
        <Modal style={{ fontFamily:'Kanit' }} closable={false} footer={null} centered onCancel={back} visible={visible} width={600}>
            <div style={{ marginBottom:25,marginLeft:-20 }} className="site-page-header-ghost-wrapper">
                <PageHeader
                ghost={false}
                onBack={back}
                title="สร้าง"
                subTitle={`หลักฐานการวัดประสิทธิภาพของ ${m_n_s?.machine_name}`}
                >
                    {m_n_s?.instruction ?                        <div style={{ marginLeft:100,width: '70%',lineHeight:2 }}>
                            <Tag  color="lime">รายละเอียด</Tag><span>: {m_n_s?.instruction}</span>
                       </div> : null}
                </PageHeader>
            </div>
            <Form style={{ display:'flex',justifyContent:'center',flexDirection:'row',alignContent:'center'}} form={form} onFinish={onCreatingEvidence} {...formItemLayout}>
                <div style={{ width:'80%' }}>
                    <Form.Item
                                        
                        name="is_pass"
                        label="ผลลัพท์"
                        rules={[
                        {
                            required: true,
                            message: 'กรุณาระบุผลลัพท์ของการวัดประสิทธิภาพ',
                        },
                        ]}
                    >
                        <Select
                            style={{ width: 80, margin: '0 8px' }}
                        >
                            <Option value="true">ผ่าน</Option>
                            <Option value="false">ไม่ผ่าน</Option>
                        </Select>
                    </Form.Item>
                    {/** https://stackoverflow.com/questions/58128062/using-customrequest-in-ant-design-file-upload */}
                    <Form.Item label="แนบหลักฐาน">
                        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle rules={[
                        {
                            required: !fileList.length ? true : false,
                            message: "กรุณาแนบหลักฐาน"
                        },
                        ]}>
                            <Upload.Dragger multiple listType="picture" maxCount={100} customRequest={uploadImage} onChange={({file,fileList }) => {
                                 /*if (file.status !== 'uploading') {
                                    console.log(file, fileList);
                                  }*/
                            }}  name="files">
                                <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">คลิกหรือลากไฟล์ เพื่อแนบภาพหลักฐาน</p>
                                <p className="ant-upload-hint">รองรับหลายรูปภาพ</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                                        
                        name="description"
                        label="รายละเอียด"
                        rules={[
                        {
                            required: false,
                        },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ sm:{span:15,offset:7} }}>
                        <Button type="primary" htmlType="submit" block>
                            สร้างรายละเอียดผลลัพท์การวัดประสิทธิภาพ
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    )
}

export default CalibrationEvidenceCreationModal