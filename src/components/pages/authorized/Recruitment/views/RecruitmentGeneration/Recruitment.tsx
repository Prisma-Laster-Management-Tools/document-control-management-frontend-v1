import React from 'react'
import Navbar from '../../../../../common/navbar'
import { Divider, Dropdown, Menu, Form, Input, message} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { AntdInputStyled, DropTextSelect, GeneratedLinkText, GenLinkBTN, GenLinkContainer, RCFnameText, RCInnerTextContainer, RCInputContainer, RCInputText2, RCText, RCTextHeader, RecruitmentContainer } from './Recruitment.styles'
import { toast, ToastOptions } from 'react-toastify';
import { CopyOutlined } from '@ant-design/icons';

import copy from 'clipboard-copy'
import { API_CreateRegistrationAccessLinkForEmployee } from '../../apis/recruitment.api';
import { ICreateRegistrationAccessLinkResponse } from '../../shared/interfaces/recruitment.interface';

const toast_option = {                
position: "bottom-center",
autoClose: 2500,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
}

const LINK_PREFIX = 'http://localhost:3001/registration/'

export default function Recruitment() {
    const [form] = Form.useForm();
    const [currentRole,setCurrentRole] = React.useState({role_raw:'',display_name:'เลือกตำแหน่งงาน'})
    const [generatedLink,setGeneratedLink] = React.useState<string|null>(null)

    function clearAllFilledData(){
        form.resetFields() // reset the filed
        setCurrentRole({role_raw:'',display_name:'เลือกตำแหน่งงาน'})
    }

    async function onRecruitmentCreation(){
        if(!currentRole.role_raw)return toast.error('กรูณาระบุตำแหน่งงาน',toast_option as unknown as ToastOptions);
        form.validateFields().then(async (value) => {
            console.log(value)
            const {firstname,lastname} = value
            const mapped_response = await API_CreateRegistrationAccessLinkForEmployee({firstname,lastname,role:currentRole.role_raw})
            if(mapped_response.success){
                console.log(mapped_response)
                const {access_token} = mapped_response.data as ICreateRegistrationAccessLinkResponse
                setGeneratedLink(LINK_PREFIX+access_token)

                clearAllFilledData()
            }else{
                // error -> show notify
            }
        })
    }
    //Prefab
    const role_menu = React.useMemo(() => 
    <Menu>
          <Menu.Item onClick={() => setCurrentRole({role_raw:'super',display_name:"ตำแหน่ง - แอดมินของระบบ"})} key="super" icon={<InboxOutlined />}>
            code:super - แอดมินของระบบ
          </Menu.Item>
        </Menu>
    ,[])
    const rendered_generated_link = generatedLink ? <>
        
        <GeneratedLinkText onClick={() => {
            // Copy text
            copy(generatedLink)
            message.info("ลิ่งสำหรับเข้าสมัครสู่เว็บไซต์ ได้ถูกก๊อปปี้ไปที่คลิปบอร์ดแล้ว")
            // ─────────────────────────────────────────────────────────────────

        }}>
            {generatedLink}
    </GeneratedLinkText> </>: null
    return (
        <>
            <Navbar/>
            <Form form={form}>
                <RecruitmentContainer>
                    <GenLinkContainer>
                        <RCTextHeader>สร้างลิงก์ลำหรับพนักงานเข้าใช้งานระบบ</RCTextHeader>
                        <Divider style={{margin:"2rem 0rem 2rem 0rem"}}/>
                        <RCInputContainer>
                            <RCInnerTextContainer>
                                <RCText>ชื่อจริง</RCText>
                                <RCFnameText>(ชื่อจริงของพนักงาน)</RCFnameText>
                                <Divider type="vertical" style={{height:"2rem"}}/>
                            </RCInnerTextContainer>
                            {/* <RCInputText2></RCInputText2> */}
                            <Form.Item
                                name="firstname"
                                rules={[
                                {
                                    required: true,
                                    message: 'กรุณากรอกชื่อจริงของพนักงาน',
                                },
                                {
                                    min:3,
                                    message: "ชื่อจริงควรมีความยาวตั้งแต่ 3 ตัวอักษรขึ้นไป"
                                }
                                // ({ getFieldValue }) => ({
                                //     validator(_, value) {
                                //         if(value.length > 3){
                                //             // check length can be done easiy other way
                                //         }
                                //       return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                //     },
                                //   })
                                ]}
                                hasFeedback

                            >
                                <AntdInputStyled />
                            </Form.Item>
                        </RCInputContainer>
                        <RCInputContainer>
                            <RCInnerTextContainer>
                                <RCText>นามสกุล</RCText>
                                <RCFnameText>(นามสกุลจริงของพนักงาน)</RCFnameText>
                                <Divider type="vertical" style={{height:"2rem"}}/>
                            </RCInnerTextContainer>
                            {/* <RCInputText2></RCInputText2> */}
                            <Form.Item
                                name="lastname"
                                rules={[
                                {
                                    required: true,
                                    message: 'กรุณากรอกนามสกุลของพนักงาน',
                                },
                                {
                                    min:3,
                                    message: "นามสกุลควรมีความยาวตั้งแต่ 3 ตัวอักษรขึ้นไป"
                                }
                                ]}
                                hasFeedback

                            >
                                <AntdInputStyled />
                            </Form.Item>
                        </RCInputContainer>
                        <Dropdown.Button overlay={role_menu} style={{margin:"1rem 0rem 1rem 0rem"}}>
                            <DropTextSelect>{currentRole.display_name}</DropTextSelect>
                        </Dropdown.Button>
                        <Divider style={{margin:"2rem 0rem 2rem 0rem"}}/>
                        <GenLinkBTN onClick={onRecruitmentCreation}>สร้างลิงก์</GenLinkBTN>
                        {rendered_generated_link}
                    </GenLinkContainer>
                </RecruitmentContainer>
            </Form>
        </>
    )
}
