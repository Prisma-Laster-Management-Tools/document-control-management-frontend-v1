import React from 'react'
import Navbar from '../../../../../common/navbar'
import { Divider, Avatar} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { DotConTainer, MainNotificationContainer, NotiDateText, NotiDetailText, NotificationDiv, NotiInsideTextContainer, NotiListContainer, NotiNewDot, TextHeader } from './Notification.styles'

export default function Notification() {
    return (
        <>
           <Navbar/> 
           <MainNotificationContainer>
               <NotificationDiv>
                   <TextHeader>การแจ้งเตือน</TextHeader>
                   <Divider style={{margin: "0.5rem 0rem 1rem 0rem"}}/>

                   <NotiListContainer>
                        <Avatar size={54} icon={<UserOutlined />}/>
                        <NotiInsideTextContainer>
                            <NotiDetailText color={"#454545"}>Thiti Mahawannakit ได้ทำการตรวจสอบสินค้า RM-00023 หลังจากส่งเรื่องให้ฝ่ายที่รับผิดชอ และที่ได้เข้าคิวเรียบร้อยแล้ว</NotiDetailText>
                            <NotiDateText color={"#DDA520"}>5 ชั่วโมงที่แล้ว</NotiDateText>
                        </NotiInsideTextContainer>
                    <DotConTainer><NotiNewDot/></DotConTainer>
                   </NotiListContainer>

                   <NotiListContainer>
                        <Avatar size={54} icon={<UserOutlined />}/>
                        <NotiInsideTextContainer>
                            <NotiDetailText color={"#a9a9a9"}>Thiti Mahawannakit ได้รับรายการตรวจสอบสินค้า RM-00023 เรียบร้อยแล้ว</NotiDetailText>
                            <NotiDateText color={"#a9a9a9"}>หนึ่งวันที่แล้ว</NotiDateText>
                        </NotiInsideTextContainer>
                    {/* <DotConTainer><NotiNewDot/></DotConTainer> */}
                   </NotiListContainer>

               </NotificationDiv>
           </MainNotificationContainer>
        </>
    )
}
