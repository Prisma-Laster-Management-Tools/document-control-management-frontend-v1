import React from 'react'
import Navbar from '../../../common/navbar'
import { Divider, Dropdown, Menu} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { DropTextSelect, GeneratedLinkText, GenLinkBTN, GenLinkContainer, RCFnameText, RCInnerTextContainer, RCInputContainer, RCInputText2, RCText, RCTextHeader, RecruitmentContainer } from './Recruitment.styles'

export default function Recruitment() {
    const menu = (
        <Menu>
          <Menu.Item key="1" icon={<InboxOutlined />}>
            RM000024124 - QC
          </Menu.Item>
          <Menu.Item key="2" icon={<InboxOutlined />}>
            PTCS00021453 - คนคุมเครื่อง 1
          </Menu.Item>
          <Menu.Item key="3" icon={<InboxOutlined />}>
            GT00024955 - คนส่งของ
          </Menu.Item>
        </Menu>
      );
    return (
        <>
            <Navbar/>
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
                        <RCInputText2></RCInputText2>
                    </RCInputContainer>
                    <RCInputContainer>
                        <RCInnerTextContainer>
                            <RCText>นามสกุล</RCText>
                            <RCFnameText>(นามสกุลจริงของพนักงาน)</RCFnameText>
                            <Divider type="vertical" style={{height:"2rem"}}/>
                        </RCInnerTextContainer>
                        <RCInputText2></RCInputText2>
                    </RCInputContainer>
                    <Dropdown.Button overlay={menu} style={{margin:"1rem 0rem 1rem 0rem"}}>
                        <DropTextSelect >เลือกตำแหน่งงาน</DropTextSelect>
                    </Dropdown.Button>
                    <Divider style={{margin:"2rem 0rem 2rem 0rem"}}/>
                    <GenLinkBTN>สร้างลิงก์</GenLinkBTN>
                    <GeneratedLinkText value="https://github.com/Prisma-Laster-Management-Tools/qc-platform-frontend-v1"></GeneratedLinkText>
                </GenLinkContainer>
            </RecruitmentContainer>
        </>
    )
}
