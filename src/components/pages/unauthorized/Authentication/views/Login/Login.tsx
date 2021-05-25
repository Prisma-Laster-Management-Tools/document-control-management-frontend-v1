import React from 'react'
import API_instance from '../../../../../../core/axios/instance'
import Navbar from '../../../../../common/navbar'
import { API_Login } from '../../apis/authentication'
import { BgContainer, InputValue, LoginBtn, LoginContainer, LoginText, TextP } from './login.styles'

import { Typography, message } from 'antd';
import LoadingIndicator from '../../../../../common/loading-indicator'
import { sleep } from '../../../../../../utilities/fake-loader/fakeLoader'
const { Text, Link } = Typography;

interface ICredentialInput{
    email: string
    password:string
}


// TODO Refactor the onChange function later to be more dynamic
export default function Login(props:any) {
    const [credentialInput,setCredentialInput] = React.useState<ICredentialInput>({email:'',password:''})
    const [errors,setErrors] = React.useState<any>({})
    const [isLoading,setIsLoading] = React.useState<boolean>(false)

    function clear_errors(){
        setErrors({})
    }


    // FOR VISUALIZATION UI
    function UI_RenderErrorText(pointer: keyof ICredentialInput){
        if(pointer in errors){
            // if the error exist
            return <Text type="danger">{errors[pointer]}</Text>
        }else{
            return null
        }
    }

    //PREFAB
    const rendered_confirm_text = isLoading ? <LoadingIndicator size="large"/> : "ลงชื่อเข้าใช้"

    // ────────────────────────────────────────────────────────────────────────────────


    async function onLoggingIn(){
        console.log("Logging in")
        setIsLoading(true)
        await sleep(1150)
        const response = await API_Login(credentialInput.email,credentialInput.password)
        setIsLoading(false)
        if(response.success === false){
           // error happenning
           if(response.error_type === 'validation'){
               // validation error goes here
               console.log('validation error')
               console.log(response.data.errors)
               setErrors(response.data.errors)
           }else if(response.error_type === 'authorization'){
            clear_errors()
            message.error("อีเมล์ หรือ รหัสผ่าน ไม่ถูกต้อง",2.5)
           }
        }else{
            clear_errors()
            const {accessToken} = response.data
            console.log(accessToken)
            // TODO store token in the the local storage and also store in the authentication recoil

            message.success("ลงชื่อเข้าใช้สำเร็จ",1.5)
            await sleep(1500)
            props.history.push('/dashboard')
        }
    }
    return (
        <>
            <Navbar/>
            <BgContainer/>
            <LoginContainer>
                <LoginText>ลงชื่อเข้าใช้</LoginText>
                <TextP fontSize={24}>อีเมล์</TextP>
                <InputValue value={credentialInput.email} onChange={(event) => {
                    setCredentialInput(prevState => ({...prevState,email:event.target.value}))
                }}/>
                {UI_RenderErrorText('email')}
                <TextP fontSize={24}>รหัสผ่าน</TextP>
                <InputValue onChange={(event) => {
                    setCredentialInput(prevState => ({...prevState,password:event.target.value}))
                }}/>
                {UI_RenderErrorText('password')}
                <TextP fontSize={18}>ไอดี คือที่อยู่อีเมลที่คุณใช้ยืนยันตัวตนกับบริษัทแล้วเพื่อใช้ เข้าสู่ระบบ</TextP>
                <LoginBtn onClick={() => {
                    onLoggingIn()
                }}>{rendered_confirm_text}</LoginBtn>
            </LoginContainer>
        </>
    )
}