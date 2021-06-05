import React from 'react'
import { Menu, message, Button, Divider} from 'antd';
import { DownOutlined, UserOutlined , HomeOutlined, SnippetsOutlined, MessageOutlined, TeamOutlined, SettingOutlined} from '@ant-design/icons';
import Navbar from '../../../../common/navbar'
import { MidMainContainer, BgContainer, DashboardMainContainer, DateP, DetailP, DivBox, MenuDivButton, MenuDivInner, MenuLeft, MidBody, NotificationContainer, NotificationListContainer, Notih1, TitleP, MenuButtonText, MidTopContainer, GoTaskBtn, TopPicBox, NameText, SelectDropDown} from './dashboard.styles'

export default function Landing() {

    function handleMenuClick() {
        message.info('Click on menu item.');
        console.log('click');
    }
    const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            1st menu item
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            2nd menu item
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            3rd menu item
          </Menu.Item>
        </Menu>
      );

    return (
        <>
        
            <Navbar/>
            {/* <BgContainer/> */}
            <DashboardMainContainer>
                
                <MenuLeft>
                    <MenuDivInner>
                        <MenuDivButton><HomeOutlined style={{fontSize:"24px", color:"#555555"}}/><MenuButtonText>หน้าแรก</MenuButtonText></MenuDivButton>
                        <MenuDivButton><SnippetsOutlined style={{fontSize:"24px", color:"#555555"}}/><MenuButtonText>งานของคุณ</MenuButtonText></MenuDivButton>
                        <MenuDivButton><MessageOutlined style={{fontSize:"24px", color:"#555555"}}/><MenuButtonText>หัวข้อกระทู้</MenuButtonText></MenuDivButton>
                        <MenuDivButton><TeamOutlined style={{fontSize:"24px", color:"#555555"}}/><MenuButtonText>สมาชิก</MenuButtonText></MenuDivButton>
                        <MenuDivButton><SettingOutlined style={{fontSize:"24px", color:"#555555"}}/><MenuButtonText>ตั้งค่า</MenuButtonText></MenuDivButton>
                    </MenuDivInner>
                </MenuLeft>
                
                {/* /////////  Pink BG ZONE //////////// */}
                <MidBody>
                    <MidTopContainer>
                        <TopPicBox></TopPicBox>
                        <NameText>Thiti Mahawannakit</NameText>
                        <SelectDropDown overlay={menu}>
                            <Button>
                                เลือกอะไรสักอย่าง <DownOutlined />
                            </Button>
                        </SelectDropDown>
                    </MidTopContainer>
                    <MidMainContainer>Hello</MidMainContainer>
                    <GoTaskBtn>
                        ไปที่หน้างาน
                    </GoTaskBtn>
                </MidBody>
                {/* ///////////////////////////////////////// */}

                <NotificationContainer>
                    <Notih1>การแจ้งเตือน</Notih1>
                    <NotificationListContainer>
                        <DivBox>
                            <DateP>April 18, 2021</DateP>
                            <TitleP>Your bank is almost full</TitleP>
                            <DetailP>Check out our social channels or Discord to find out what's coming in April!</DetailP>
                            <Divider />
                        </DivBox>
                        <DivBox>
                            <DateP>April 18, 2021</DateP>
                            <TitleP>Your bank is almost full</TitleP>
                            <DetailP>Check out our social channels or Discord to find out what's coming in April!</DetailP>
                            <Divider />
                        </DivBox>
                        <DivBox>
                            <DateP>April 18, 2021</DateP>
                            <TitleP>Your bank is almost full</TitleP>
                            <DetailP>Check out our social channels or Discord to find out what's coming in April!</DetailP>
                            <Divider />
                        </DivBox><DivBox>
                            <DateP>April 18, 2021</DateP>
                            <TitleP>Your bank is almost full</TitleP>
                            <DetailP>Check out our social channels or Discord to find out what's coming in April!</DetailP>
                            <Divider />
                        </DivBox><DivBox>
                            <DateP>April 18, 2021</DateP>
                            <TitleP>Your bank is almost full</TitleP>
                            <DetailP>Check out our social channels or Discord to find out what's coming in April!</DetailP>
                            <Divider />
                        </DivBox><DivBox>
                            <DateP>April 18, 2021</DateP>
                            <TitleP>Your bank is almost full</TitleP>
                            <DetailP>Check out our social channels or Discord to find out what's coming in April!</DetailP>
                            <Divider />
                        </DivBox><DivBox>
                            <DateP>April 18, 2021</DateP>
                            <TitleP>Your bank is almost full</TitleP>
                            <DetailP>Check out our social channels or Discord to find out what's coming in April!</DetailP>
                            <Divider />
                        </DivBox>
                    </NotificationListContainer>
                </NotificationContainer>
            </DashboardMainContainer>
        </>
    )
}