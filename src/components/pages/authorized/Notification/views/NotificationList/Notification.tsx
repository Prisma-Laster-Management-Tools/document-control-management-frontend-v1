import React, { useEffect, useMemo, useRef, useState } from 'react'
import Navbar from '../../../../../common/navbar'
import { Divider, Avatar,Spin, Button} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { DotConTainer, MainNotificationContainer, NotiDateText, NotiDetailText, NotificationDiv, NotiHearderType, NotiInsideTextContainer, NotiListContainer, NotiNewDot, TextHeader } from './Notification.styles'
import { API_GetAllNotification } from '../../apis/notification.api';
import Moment from 'react-moment';
import { INotificationData } from '../../interfaces/notification.interfaces';
import { sleep } from '../../../../../../utilities/fake-loader/fakeLoader';
export default function Notification() {
    const [notificationList,setNotificationList] = useState<Array<INotificationData>|null>(null)
    const [cachedNotificationListInThePast,setCachedNotificationListInThePast] = useState<Array<INotificationData> | null>(null)
    const [isLoadingMore,setIsLoadingMore] = useState<boolean>(false)
    const $lastPointer = useRef(0)
    async function getAllNotification(){
        // filtered by default from the backend side
        const mapped_response = await API_GetAllNotification()
        if(mapped_response.success){
            setCachedNotificationListInThePast(mapped_response.data.data.slice(8))
            setNotificationList(mapped_response.data.data.slice(0,8))
            
        }else{

        }
    }
    useEffect(() => {
        getAllNotification()
    },[])

    async function onTriggerLoadMore(){
        //TODO use the real pagination <later> {now we fake first}
        //if(notificationList!.length > cachedNotificationListInThePast.current!.length)return
        if(!cachedNotificationListInThePast!.length) return // no more to fetch
        setIsLoadingMore(true)
        await sleep(1200)
        const cached_noti = cachedNotificationListInThePast!
        setNotificationList(prevState => ([...prevState!,...cached_noti.slice(0,8)]))
        setCachedNotificationListInThePast(cached_noti.slice(8)) // cut the first 0 - 7 out
        setIsLoadingMore(false)
    }

    const rendered_notifications = useMemo(() => {
        if(!notificationList) return <Spin/>
        return notificationList.map((notification) => {
            return <NotiListContainer key={notification.id}>
                        <Avatar size={54} icon={<UserOutlined />}/>
                        <NotiInsideTextContainer>
                            <NotiHearderType>การตรวจสอบคุณภาพ</NotiHearderType>
                            <NotiDetailText color={"#454545"}>{notification.message}</NotiDetailText>
                            <NotiDateText color={"#DDA520"}><Moment fromNow locale="th">{notification.createdAt}</Moment></NotiDateText>
                        </NotiInsideTextContainer>
                    {/* <DotConTainer><NotiNewDot/></DotConTainer> */}
                    </NotiListContainer>
        })
    },[notificationList])

    const rendered_loadmore_btn = useMemo(() => {
        if(cachedNotificationListInThePast === null || !cachedNotificationListInThePast.length) return null
        return  <div style={{ width:'100%',display:'flex',justifyContent:'center' }}>
                    <Button onClick={onTriggerLoadMore} type="text" block loading={isLoadingMore}>โหลดเพิ่มเติม</Button>
                </div>
    },[cachedNotificationListInThePast,isLoadingMore])

    return (
        <>
           <Navbar/> 
           <MainNotificationContainer>
               <NotificationDiv>
                   <TextHeader>การแจ้งเตือน</TextHeader>
                   <Divider style={{margin: "0.5rem 0rem 1rem 0rem"}}/>

                    <div style={{ overflowY:'auto',width:'100%',height:'90%' }}>
                        {rendered_notifications}
                        {rendered_loadmore_btn}
                    </div>

               </NotificationDiv>
           </MainNotificationContainer>
        </>
    )
}
