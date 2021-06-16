import React, { useState } from 'react'
import { Modal, Button,Form, Input, PageHeader, DatePicker, Select } from 'antd';
import { ICreateMaintenanceCycleDTO } from '../../../../shared/interfaces/maintenance.interfaces';
import { API_CreateMaintenanceCycle } from '../../../../apis/maintenance.api';
import { ERROR_TOAST_OPTION } from '../../../../../../../../shared/options/toast.option';
import { toast } from 'react-toastify';
import { API_CreateCalibrationCycle } from '../../../../apis/calibration.api';
import { ICreateCalibrationCycleDTO } from '../../../../shared/interfaces/calibration.interfaces';
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
}


const CalibrationCreationModal:React.FC<IProps> = ({visible,back,on_crud}) => {
    const [form] = useForm()
    async function onAddMaintenanceCycle(){
        const formData = form.getFieldsValue()
        const postData:ICreateCalibrationCycleDTO = {
            machine_name:formData.machine_name,
            serial_number:formData.serial_number,
            instruction: formData.instruction,
            // station: formData.station,
            // who: formData.who,
            cycle_start_at: (formData.cycle_start_at as unknown as Date).toISOString(),
            cycle_info: `every_${formData.cycle_day}_${formData.cycle_type}`
        }
        console.log(postData)
        
        const mapped_response = await API_CreateCalibrationCycle(postData)
        if(mapped_response.success){
            toast.success('รอบการตรวจวัดประสิทธิภาพได้ถูกเพิ่มเรียบร้อยแล้ว',ERROR_TOAST_OPTION);
            on_crud() // trigger data re-fetching on the super component
            form.resetFields() // reset all field current value
        }else{
            // failed to create the cycle
            toast.error('เกิดข้อผิดพลาดในการเพิ่มรอบการตรวจวัดประสิทธิภาพ',ERROR_TOAST_OPTION);
        }
    }
    return (
        <Modal style={{ fontFamily:'Kanit' }} closable={false} footer={null} centered onCancel={back} visible={visible} width={600}>
            <div style={{ marginBottom:25,marginLeft:-20 }} className="site-page-header-ghost-wrapper">
                <PageHeader
                ghost={false}
                onBack={back}
                title="สร้าง"
                subTitle="รอบการตรวจวัดประสิทธิภาพ"
                >
                </PageHeader>
            </div>
                <Form style={{ display:'flex',justifyContent:'center',flexDirection:'row',alignContent:'center'}} form={form} onFinish={onAddMaintenanceCycle} {...formItemLayout}>
                    <div style={{ width:'80%' }}>
                        <Form.Item
                                // style={{ width:"50%" }}
                                name="machine_name"
                                label="ชื่อเครื่องมือวัด"
                                rules={[
                                {
                                    required: true,
                                    message: 'กรุณาระบุชื่อเครื่องมือวัด',
                                },
                                ]}
                            >
                            <Input />
                        </Form.Item>
                        <Form.Item
                                // style={{ width:"50%" }}
                                name="serial_number"
                                label="ซีเรียลนัมเบอร์"
                                rules={[
                                {
                                    required: true,
                                    message: 'กรุณาระบุซีเรียลนัมเบอร์',
                                },
                                ]}
                            >
                            <Input />
                        </Form.Item>
                        <Form.Item
                                // style={{ width:"50%" }}
                                name="instruction"
                                label="รายละเอียด"
                                rules={[
                                {
                                    required: true,
                                    message: 'กรุณาระบุซีเรียลนัมเบอร์',
                                },
                                ]}
                            >
                            <Input />
                        </Form.Item>
                        {/* <Form.Item
                                // style={{ width:"50%" }}
                                name="station"
                                label="สถานี"
                                rules={[
                                {
                                    required: false
                                },
                                ]}
                            >
                            <Input />
                        </Form.Item>
                        <Form.Item
                                // style={{ width:"50%" }}
                                name="who"
                                label="ผู้รับผิดชอบ"
                                rules={[
                                {
                                    required: false
                                },
                                ]}
                            >
                            <Input />
                        </Form.Item> */}
                        <Form.Item name="cycle_start_at" label="เลือกวันเริ่มต้น" rules={[{ required: true, message: 'กรุณาระบุวันที่จะเริ่มต้นรอบการบำรุง' }]} >
                            <DatePicker style={{width:'100%'}}/>
                        </Form.Item>
                        <Form.Item label="รอบการบำรุง">
                            <Input.Group compact>
                                <Form.Item
                                    name="cycle_day"
                                    noStyle
                                    rules={[{ required: true, message: 'กรุณาระบุจำนวน ว/ด/ป' }]}
                                >
                                    <Input style={{ width: '37%' }} placeholder="จำนวน ว/ด/ป" />
                                </Form.Item>
                                <Form.Item
                                    name="cycle_type"
                                    noStyle
                                    rules={[{ required: true, message: 'กรุณาระบุประเภทของรอบการบำรุง' }]}
                                >
                                    <Select placeholder="เลือกประเภท">
                                        <Option value="d">วัน</Option>
                                        <Option value="m">เดือน</Option>
                                        <Option value="y">ปี</Option>
                                    </Select>
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>
                        <Form.Item wrapperCol={{ sm:{span:15,offset:7} }}>
                            <Button type="primary" htmlType="submit" block>
                                สร้างรายละเอียดสินค้า
                            </Button>
                        </Form.Item>
                    </div>        
                </Form>
        </Modal>
    )
}

export default CalibrationCreationModal