import React from 'react'
import { Form, Input, Divider } from 'antd';
import { LogoPrima, RegisBGMain, RegisBoxContainer, RegisCommitBtn, RegisTextHeader } from './Registration.styles'

export default function Registration() {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const validateMessages = {
        required: 'กรุณากรอกข้อมูล ${label} ให้ครบถ้วน',
        types: {
          email: 'กรอกข้อมูล ${label} ไม่ถูกต้อง',
          number: '${label} is not a valid number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
    };

    return (
        <>
            <RegisBGMain>
                <RegisBoxContainer>
                    <LogoPrima/>
                    <RegisTextHeader>กรอกข้อมูลสำหรับใช้เข้าสู่ระบบ</RegisTextHeader>
                    <Divider style={{margin:"3rem 0rem 3rem 0rem"}}/>
                    <Form {...layout} name="nest-messages" validateMessages={validateMessages} style={{width:"25rem"}}>
                        <Form.Item name={['user', 'firstname']} label="ชื่อจริง" rules={[{ }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'lastname']} label="นามสกุล" rules={[{ }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'position']} label="ตำแหน่งงาน" rules={[{ }]}>
                            <Input />
                        </Form.Item>
                
                        <Form.Item name={['user', 'email']} label="อีเมล" rules={[{ type: 'email', required: true, }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'password']} label="รหัสผ่าน" rules={[{required: true, }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item name={['user', 'confirmpassword']} label="ยืนยันรหัสผ่าน" rules={[{required: true, }]}>
                            <Input.Password />
                        </Form.Item>

                        {/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                        </Form.Item> */}

                        

                        </Form>
                        <RegisCommitBtn>ยืนยัน</RegisCommitBtn>
                    </RegisBoxContainer>
                {/* <div>กรอกข้อมูลสำหรับใช้เข้าสู่ระบบ</div>
                <div>f name</div>
                <div>l name</div>
                <div>position</div>

                <div>e-mail</div>
                <div>password</div>
                <div>re-password</div>

                <div>Button</div> */}
            </RegisBGMain>
        </>
    )
}
