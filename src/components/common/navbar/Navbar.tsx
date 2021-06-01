import React from 'react'
import { Drawer, Divider} from 'antd';
import { AppstoreOutlined, SettingOutlined, MedicineBoxOutlined} from '@ant-design/icons';
import { NavTop, LoginBtn, RegisterBtn, RegisZone, LogoPrima, IconMenuOutline, NameTop, IconContainer, DrawerContainer, ListItemContainer, DrawerListText } from './navbar.styles'


export default function Navbar() {
    const [visible, setVisible] = React.useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    return (
        <NavTop>
            <LogoPrima/>
            <RegisZone>
                {/* <LoginBtn> เข้าสู่ระบบ </LoginBtn> */}
                <NameTop>ธิติ มหาวรรณกิจ</NameTop>
                <IconContainer onClick={showDrawer} ><IconMenuOutline/></IconContainer>
            </RegisZone>
            <Drawer
                //title="ยินตีต้อนรับ, ธิติ มหาวรรณกิจ"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                width={500}
            >
                <DrawerContainer>

                    <Divider />
                    <ListItemContainer><AppstoreOutlined /><DrawerListText>Dashboard</DrawerListText></ListItemContainer>
                    <ListItemContainer><AppstoreOutlined /><DrawerListText>Dashboard</DrawerListText></ListItemContainer>
                    <ListItemContainer><AppstoreOutlined /><DrawerListText>Dashboard</DrawerListText></ListItemContainer>
                    <ListItemContainer><AppstoreOutlined /><DrawerListText>Dashboard</DrawerListText></ListItemContainer>
                    
                </DrawerContainer>
                <Divider />
                <ListItemContainer><MedicineBoxOutlined /><DrawerListText>Help Center</DrawerListText></ListItemContainer>
                    <ListItemContainer><SettingOutlined /><DrawerListText>Settings</DrawerListText></ListItemContainer>
            </Drawer>
        </NavTop>

        
    )
}
