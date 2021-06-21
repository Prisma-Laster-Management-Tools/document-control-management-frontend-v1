import React, { useEffect } from 'react'
import  {connect} from "socket.io-client";
import { toast, ToastOptions,Flip } from 'react-toastify';
import { RouteProps, RouterProps } from 'react-router';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { INotificationData } from '../../interfaces/notification.interfaces';
/*interface IProps extends RouteComponentProps<any> {

}*/

const NOTIFITOAST_OPTIONS:ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    transition: Flip
}



const NotificationPortal:React.FC = () => {
    const history = useHistory()
    function connectToSocketServer(){
        const socket = connect("http://localhost:80/notification");
        settingUpEvents(socket)
    }
    function settingUpEvents(socket:SocketIOClient.Socket){
        socket.on("connect", () => {
            console.log('connected')
        })
        socket.on("notification",(data:INotificationData) => {
            const {attached_params} = data
            if(attached_params){
                if(attached_params.startsWith("calibration")){ // calibration:9:เครื่องวัดความถี่:HZ00134:ตรวจเช็คความคงที่ของคลื่น
                    createCalibrateNotify(data)
                }else if(attached_params.startsWith("maintenance")){ //maintenance:7:เครื่องทอผ้า:TORPLA33647:เช็คสายตึงเหล็ก:null:null
                    createMaintenanceNotify(data)
                }
            }
            else{
                toast.dark(`⚠️ ${data.message}`, {
                    onOpen: () => null,
                    onClose: () => null,
                    ...NOTIFITOAST_OPTIONS
                });
            }
        })
    }

    //
    // ─── CALIBRATION RESPONSIBILITY ─────────────────────────────────────────────────
    //
    function createCalibrateNotify(data:INotificationData){
        const {message,attached_params,related_positions} = data
        if(!message || !attached_params) return 
        const [_,id,machine_name,serial_number,instruction] = attached_params.split(':')
        toast.dark(`⚠️ ${message}`, {
            onOpen: () => null,
            onClose: () => null,
            onClick: () => console.log(id),
            ...NOTIFITOAST_OPTIONS
        });
    }
    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── CALIBRATION RESPONSIBILITY ─────────────────────────────────────────────────
    //
    function createMaintenanceNotify(data:INotificationData){
        const {message,attached_params,related_positions} = data
        if(!message || !attached_params) return 
        const [_,id,machine_name,serial_number,instruction,who,station] = attached_params.split(':')
        toast.dark(`🔔 ${message}`, {
            onOpen: () => null,
            onClose: () => null,
            onClick: () => console.log(id),
            ...NOTIFITOAST_OPTIONS
        });
    }
    // ────────────────────────────────────────────────────────────────────────────────



    useEffect(() => {
        connectToSocketServer()
    },[])
    return null
}

export default NotificationPortal