import { Divider,Spin,Button } from 'antd'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { RouteComponentProps } from 'react-router-dom'
import { sleep } from '../../../../../../../../utilities/fake-loader/fakeLoader'
import { API_GetAllNotification } from '../../../../../Notification/apis/notification.api'
import { INotificationData } from '../../../../../Notification/interfaces/notification.interfaces'
import {DateP,DivBox,DetailP,NotificationContainer,NotificationListContainer,Notih1,TitleP} from './notificationFragment.styles'

interface IProps extends RouteComponentProps<any>{

}

export function getProperTitleFromAttachmentData(attachment_data:INotificationData['attached_params']){
    if(!attachment_data) return "ไม่มีหัวข้อ"
    if(attachment_data.startsWith("calibration")) return "การตรวจวัดประสิทธิภาพ"
    else if(attachment_data.startsWith("maintenance")) return "การบำรุงรักษา"
    else return "ไม่มีหัวข้อ"
}

const NotificationFragment:React.FC<IProps> = ({history}) => {
    const [notificationList,setNotificationList] = useState<Array<INotificationData>|null>(null)
    const [isViewingMore,setIsViewingMore] = useState<boolean>(false)
    async function getAllNotification(){
        // already filtered from the first phase by backend side
        const mapped_response = await API_GetAllNotification()
        if(mapped_response.success){
            console.log(mapped_response.data.data)
            setNotificationList(mapped_response.data.data.slice(0,8)) // pick the first 0-7 [8 notification]
        }else{
            // fetching failed
            // do nothing let the spinning continue rolling xD
        }
    }
    
    useEffect(() => {
        getAllNotification()
    },[])

    async function onViewMoreNotification(){
        setIsViewingMore(true)
        await sleep(800) // beautify fake loader
        history.push('/notifications')
    }


    //
    // ─── VIS HELPER ─────────────────────────────────────────────────────────────────
    //

    // ────────────────────────────────────────────────────────────────────────────────


    const rendered_notification_list = !notificationList ? <Spin size="large"/> :   
                notificationList.map((notification) => {
                    return <DivBox key={notification.id}>
                    <DateP><Moment format="MMMM DD, YYYY" locale="th">{notification.createdAt}</Moment></DateP>
                    <TitleP>{getProperTitleFromAttachmentData(notification.attached_params)}</TitleP>
                    <DetailP>{notification.message}</DetailP>
                    <Divider />
                </DivBox>
                })


    return  <>
        <NotificationContainer>
            <Notih1>การแจ้งเตือน</Notih1>
            <NotificationListContainer>
                {rendered_notification_list}

                <Button onClick={onViewMoreNotification} loading={isViewingMore} type="dashed" size="large" block>ดูเพิ่มเติม</Button>

            </NotificationListContainer> 
        </NotificationContainer>
    </>
}

export default NotificationFragment