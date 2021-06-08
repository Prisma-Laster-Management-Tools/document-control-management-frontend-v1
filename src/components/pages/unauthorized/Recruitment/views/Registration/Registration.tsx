import React, { useMemo, useState } from 'react'
import { Form, Input, Divider } from 'antd';
import { LogoPrima, RegisBGMain, RegisBoxContainer, RegisCommitBtn, RegisTextHeader } from './Registration.styles'
import { useParams } from 'react-router-dom';
import { API_GetRecruitmentDataFromToken, API_RegistrationWithToken } from '../../apis/recruitment.api';
import { IGetRecruitmentDataFromTokenResponse, IRegistrationWithTokenDTO } from '../../shared/interfaces/recruitment.interface';
import { LoadingScreen } from '../../../../../../core/loading-screen/LoadingScreen';
import { sleep } from '../../../../../../utilities/fake-loader/fakeLoader';

interface ILockedCredential{
    firstname:string
    lastname:string
    role:string
    loaded:boolean
}

export default function Registration(props:any) {
    const Router_params = useParams<{access_token:string}>()
    const [lockedCredential,setLockCredential] = useState<ILockedCredential>({firstname:'',lastname:'',role:'',loaded:false})
    const [form] = Form.useForm()
    const [isLoading,setIsLoading] = useState(false) // for confirm button

    React.useEffect(() => {
        (async() => {
            //Getting recruitment data
            await sleep(500) // wait for the LoadingScreen component is fully-set -> [safe from newly enter website]
            LoadingScreen.show_loading_screen("กำลังตรวจสอบลื้งค์ของคุณ")
            await sleep(1000)
            const mapped_response = await API_GetRecruitmentDataFromToken(Router_params.access_token)
            if(mapped_response.success){
                const {firstname,lastname,role} = mapped_response.data as IGetRecruitmentDataFromTokenResponse
                console.log(firstname)
                setLockCredential({firstname,lastname,role,loaded:true})
                LoadingScreen.hide_loading_screen()
            }else{
                if(mapped_response.error_type === 'not-found'){
                    // token invalid
                    // TODO redirect to other page
                    LoadingScreen.show_loading_screen("การเข้าถึงไม่ถูกต้อง กำลังนำพาคุณออก")
                    await sleep(2000)
                    props.history.push('/')

                }
                //other -- error
                LoadingScreen.hide_loading_screen()
            }
        })()  
    },[setLockCredential])

    function onCommitRegistration(){
        form.validateFields().then(async value => {
            const {email,password} = value
            const post_data: IRegistrationWithTokenDTO = {access_token:Router_params.access_token,email,password}
            setIsLoading(true)
            const mapped_response = await API_RegistrationWithToken(post_data)
            if(mapped_response.success){
                // Registration success -> redirect to login page -> with email params
                props.history.push({pathname: '/login',state:{email}})
            }else{
                // registration failed
                console.log(mapped_response)
            }
            setIsLoading(false)
        })
    }

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    /*const validateMessages = {
        required: 'กรุณากรอกข้อมูล ${label} ให้ครบถ้วน',
        types: {
          email: 'กรอกข้อมูล ${label} ไม่ถูกต้อง',
          number: '${label} is not a valid number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
    };*/

    return (
        <>
            <RegisBGMain>
                <RegisBoxContainer>
                    <LogoPrima/>
                    <RegisTextHeader>กรอกข้อมูลสำหรับใช้เข้าสู่ระบบ</RegisTextHeader>
                    <Divider style={{margin:"3rem 0rem 3rem 0rem"}}/>
                    <Form form={form} {...layout} name="nest-messages" style={{width:"25rem"}}>
                        <Form.Item label="ชื่อจริง" rules={[{ }]}>
                            <Input value={lockedCredential.firstname} disabled={lockedCredential.loaded}/>
                        </Form.Item>
                        <Form.Item label="นามสกุล" rules={[{ }]}>
                            <Input value={lockedCredential.lastname} disabled={lockedCredential.loaded}/>
                        </Form.Item>
                        <Form.Item label="ตำแหน่งงาน" rules={[{ }]}>
                            <Input value={lockedCredential.role} disabled={lockedCredential.loaded}/>
                        </Form.Item>

                        <Form.Item name="email" label="อีเมล" rules={[{required: true,message:'กรุณากรอกอีเมลให้ครบถ้วน'},{type:'email',message:'รูปแบบของอีเมล์ไม่ถูกต้อง'}]} hasFeedback>
                            <Input />
                        </Form.Item>
                        <Form.Item hasFeedback name="password" label="รหัสผ่าน" rules={[{required: true,message:'กรุณากรอกรหัสผ่าน' }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item hasFeedback name="confirm-password" dependencies={["password"]} label="ยืนยันรหัสผ่าน" rules={[{required: true,message:'กรุณากรอกรหัสผ่าน' },({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                          }
                                          return Promise.reject(new Error('รหัสผ่านไม่ตรงกัน!'));
                                    },
                                  })]}>
                            <Input.Password />
                        </Form.Item>
                    </Form>
                    <RegisCommitBtn loading={isLoading} onClick={onCommitRegistration}>ยืนยัน</RegisCommitBtn>
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
