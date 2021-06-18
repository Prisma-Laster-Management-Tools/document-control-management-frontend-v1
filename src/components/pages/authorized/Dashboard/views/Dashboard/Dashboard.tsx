import React from 'react'
import { message, Divider, Select } from 'antd';
import { HomeOutlined, SnippetsOutlined, MessageOutlined, TeamOutlined, SettingOutlined} from '@ant-design/icons';
import Navbar from '../../../../../common/navbar'
import { MidMainContainer, BgContainer, DashboardMainContainer, DateP, DetailP, DivBox, MenuDivButton, MenuDivInner, MenuLeft, MidBody, NotificationContainer, NotificationListContainer, Notih1, TitleP, MenuButtonText, MidTopContainer, GoTaskBtn, TopPicBox, NameText, SelectDropDown} from './dashboard.styles'
import NotificationFragment from './sub-components/NotificationFragment/NotificationFragment';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends  RouteComponentProps<any>{

}

const DashBoard:React.FC<IProps> = (props) => {

    function handleMenuClick() {
        message.info('Click on menu item.');
        console.log('click');
    }
    const { Option } = Select;

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
                        <Select defaultValue="" style={{ width: 120 }} allowClear>
                            <Option value="HR">HR</Option>
                            <Option value="QC">QC</Option>
                            <Option value="Man-Machine" disabled>
                                Man-Machine
                            </Option>
                            <Option value="Manager">Manager</Option>
                        </Select>
                    </MidTopContainer>
                    <MidMainContainer>Hello</MidMainContainer>
                    <GoTaskBtn>
                        ไปที่หน้างาน
                    </GoTaskBtn>
                </MidBody>
                {/* ///////////////////////////////////////// */}
                <NotificationFragment {...props}/>
            </DashboardMainContainer>
        </>
    )
}

export default DashBoard