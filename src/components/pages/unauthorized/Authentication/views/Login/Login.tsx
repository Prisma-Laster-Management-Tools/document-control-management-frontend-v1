import React from 'react'
import API_instance from '../../../../../../core/axios/instance'
import Navbar from '../../../../../common/navbar'
import { API_Login } from '../../apis/authentication'
import { ColPic1, ColPic2, InputValue, LoginBtn, LoginContainer, LoginPic, LoginPicContainer, LoginText, MainContainer, RowStyle, TextP } from './login.styles'

import { Typography, message , Row, Col} from 'antd';
import LoadingIndicator from '../../../../../common/loading-indicator'
import { sleep } from '../../../../../../utilities/fake-loader/fakeLoader'
import { Authentication } from '../../../../../../core/authentication/Authentication'
import { useRecoilState } from 'recoil'
import { authenticationState } from '../../../../../../store/recoil/authentication/authentication.atom'
import { LoadingScreen } from '../../../../../../core/loading-screen/LoadingScreen'
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
    const [authState,setAuthState] = useRecoilState(authenticationState)

    //
    // ─── DIDMOUNT ───────────────────────────────────────────────────────────────────
    //
    React.useEffect(() => {
        if(!props.location.state) return
        const passed_email = props.location.state.email
        if(passed_email){
            // if just redirected from registration page -> automatic fill the email
            setCredentialInput(prevState => ({...prevState,email:passed_email }))
        }
    },[])
    // ────────────────────────────────────────────────────────────────────────────────


    //
    // ─── REDIRECTION IF ALREADY AUTHENTICATED ───────────────────────────────────────
    //
    React.useEffect(() => {
        (async() => {
            LoadingScreen.show_loading_screen("กำลังตรวจสอบ session")
            await sleep(1000)
            if(authState.isAuthenticated){
                props.history.push('/dashboard')
                
            }
            LoadingScreen.hide_loading_screen()
        })()
    },[authState])
    // ────────────────────────────────────────────────────────────────────────────────


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
            Authentication.store_token_in_localstorage(accessToken)
            if(Authentication.decode_token_and_store_in_recoil(accessToken)){
                message.success("ลงชื่อเข้าใช้สำเร็จ",1.5)
                await sleep(1500)
                props.history.push('/dashboard')
            }else{
                message.error("เกิดข้อผิดพลาดบางอย่างเกินขึ้น",1.5)
            }
        }
    }
    return (
        <>
            <MainContainer>
                <Navbar />
                <RowStyle>
                    <ColPic1 xs={24} sm={24} md={12}>
                        <LoginPicContainer>
                            <LoginPic/>
                        </LoginPicContainer>
                    </ColPic1>

                    <Col xs={24} sm={24} md={12}
                    style={{
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center"
                    }}
                    >
                    
                    <LoginContainer>
                        <LoginText>ลงชื่อเข้าใช้</LoginText>
                        <TextP fontSize={20}>อีเมล์</TextP>
                        <InputValue value={credentialInput.email} onChange={(event) => {
                            setCredentialInput(prevState => ({...prevState,email:event.target.value}))
                        }}/>
                        {UI_RenderErrorText('email')}
                        <TextP fontSize={20}>รหัสผ่าน</TextP>
                        <InputValue onChange={(event) => {
                            setCredentialInput(prevState => ({...prevState,password:event.target.value}))
                        }}/>
                        {UI_RenderErrorText('password')}
                        <TextP fontSize={14}>ไอดี คือที่อยู่อีเมลที่คุณใช้ยืนยันตัวตนกับบริษัทแล้วเพื่อใช้ เข้าสู่ระบบ</TextP>
                        <LoginBtn onClick={() => {
                            onLoggingIn()
                        }}>{rendered_confirm_text}</LoginBtn>
                    </LoginContainer>
                    
                    </Col>

                    <ColPic2 xs={24} sm={24} md={12}>
                        <LoginPicContainer>
                            <LoginPic/>
                        </LoginPicContainer>
                    </ColPic2>

                </RowStyle>

                
            </MainContainer>
        </>
    )
}