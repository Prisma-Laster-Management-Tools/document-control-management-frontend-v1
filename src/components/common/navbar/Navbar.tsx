import React from 'react'
import { Drawer, Divider} from 'antd';
import { AppstoreOutlined, SettingOutlined, MedicineBoxOutlined} from '@ant-design/icons';
import { NavTop, LoginBtn, RegisterBtn, RegisZone, LogoPrima, IconMenuOutline, NameTop, IconContainer, DrawerContainer, ListItemContainer, DrawerListText, DrawerOutside } from './navbar.styles'
interface IProps{
    is_not_in_adapter?: boolean,
}

const Navbar:React.FC<IProps> = ({is_not_in_adapter=false}) => {
    const [visible, setVisible] = React.useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    return (
        <NavTop is_not_in_adapter={is_not_in_adapter} >
            <LogoPrima/>
            <RegisZone>
                <LoginBtn> เข้าสู่ระบบ </LoginBtn>
                {/* <NameTop>ธิติ มหาวรรณกิจ</NameTop>
                <IconContainer><IconMenuOutline/></IconContainer> */}
            </RegisZone>
            {/* <Drawer
                //title="ยินตีต้อนรับ, ธิติ มหาวรรณกิจ"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                width={500}
            >   
                <DrawerOutside>
                    <div>
                    <DrawerContainer>

                        <Divider />
                        <ListItemContainer><AppstoreOutlined /><DrawerListText>Dashboard</DrawerListText></ListItemContainer>
                        <ListItemContainer><AppstoreOutlined /><DrawerListText>Dashboard</DrawerListText></ListItemContainer>
                        <ListItemContainer><AppstoreOutlined /><DrawerListText>Dashboard</DrawerListText></ListItemContainer>
                        <ListItemContainer><AppstoreOutlined /><DrawerListText>Dashboard</DrawerListText></ListItemContainer>
                        
                        
                    </DrawerContainer>
                    </div>

                    <div>
                        <Divider />
                        <ListItemContainer><MedicineBoxOutlined /><DrawerListText>Help Center</DrawerListText></ListItemContainer>
                        <ListItemContainer><SettingOutlined /><DrawerListText>Settings</DrawerListText></ListItemContainer>
                    </div>
                </DrawerOutside>
            </Drawer> */}
        </NavTop>

        
    )
}

export default Navbar;
