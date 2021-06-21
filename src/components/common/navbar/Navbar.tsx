import React, { useEffect, useMemo } from 'react'
import { Drawer, Divider} from 'antd';
import { AppstoreOutlined, SettingOutlined, MedicineBoxOutlined} from '@ant-design/icons';
import { NavTop, LoginBtn, RegisterBtn, RegisZone, LogoPrima, IconMenuOutline, NameTop, IconContainer, DrawerContainer, ListItemContainer, DrawerListText, DrawerOutside, LogoutOutline } from './navbar.styles'
import { authenticationState } from '../../../store/recoil/authentication/authentication.atom';
import { useRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import { Authentication } from '../../../core/authentication/Authentication';
interface IProps{
    is_not_in_adapter?: boolean,
    hide_name?:boolean
}

const Navbar:React.FC<IProps> = ({is_not_in_adapter=false,hide_name=false}) => {
    const [authState,setAuthState] = useRecoilState(authenticationState)
    const history = useHistory()
    useEffect(() => {
        
    },[])

    const rendered_right_panel = useMemo(() => {
        if(!authState.isAuthenticated) return  <LoginBtn onClick={() => history.push('/login')}> เข้าสู่ระบบ </LoginBtn>
        return <>
            {hide_name ? null : <NameTop>{authState.userData?.firstname} {authState.userData?.lastname}</NameTop>}
            <IconContainer onClick={() => history.push('/dashboard')}><IconMenuOutline/></IconContainer>
            <IconContainer onClick={() => Authentication.logOutUser()}><LogoutOutline/></IconContainer>
        </>
    },[authState])

    return (
        <NavTop is_not_in_adapter={is_not_in_adapter} >
            <LogoPrima/>
            <RegisZone>
                {rendered_right_panel}
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
