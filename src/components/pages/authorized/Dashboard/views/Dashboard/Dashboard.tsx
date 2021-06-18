import React, { useEffect, useMemo } from 'react'
import { message, Divider, Select } from 'antd';
import { HomeOutlined, SnippetsOutlined, MessageOutlined, TeamOutlined, SettingOutlined} from '@ant-design/icons';
import Navbar from '../../../../../common/navbar'
import { MidMainContainer, BgContainer, DashboardMainContainer, DateP, DetailP, DivBox, MenuDivButton, MenuDivInner, MenuLeft, MidBody, NotificationContainer, NotificationListContainer, Notih1, TitleP, MenuButtonText, MidTopContainer, GoTaskBtn, TopPicBox, NameText, SelectDropDown} from './dashboard.styles'
import NotificationFragment from './sub-components/NotificationFragment/NotificationFragment';
import { RouteComponentProps } from 'react-router-dom';
import useDashboard from './useDashboard';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
interface IProps extends  RouteComponentProps<any>{

}

export type TRoles = "hr" | "super" | "qc" | "purchasement" | "maintenance"

const DashBoard:React.FC<IProps> = (props) => {
    const $hook_dashboard = useDashboard()
    const [, updateState] = React.useState<any>();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    function onRoleSelect(role:TRoles){
        $hook_dashboard.set.setFocusRole(role)
    }
    const { Option } = Select;

    const rendered_chart_element = useMemo(() => {
        if(!$hook_dashboard.get.chartElement) return <></>
        return $hook_dashboard.get.chartElement
        
    },[$hook_dashboard.get.chartElement])

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
                        <Select onChange={onRoleSelect} value={ $hook_dashboard.get.focusedRole} style={{ width: 120 }} allowClear>
                            <Option value="hr">ฝ่ายบุคคล</Option>
                            <Option value="purchasement">ฝ่ายจัดซื้อ</Option>
                            <Option value="qc">ฝ่ายตรวจคุณภาพ</Option>
                            <Option value="maintenance">ฝ่ายซ่อมบำรุง</Option>
                            <Option value="Manager">ฝ่ายบริหาร</Option>
                        </Select>
                    </MidTopContainer>
                    <MidMainContainer>

                        <ResponsiveContainer width="100%" height="100%">
                            {rendered_chart_element}
                        </ResponsiveContainer>

                    </MidMainContainer>
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