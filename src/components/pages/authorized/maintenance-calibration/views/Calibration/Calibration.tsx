import React, { useEffect, useState } from 'react'
import { MainContainer } from './calibration.styles'
import { Modal, Button,Form, Input, PageHeader, DatePicker, Select, Table, Space, Tooltip, Badge } from 'antd';
import { toast } from 'react-toastify';
import { ICalibrationCycleData, ICalibrationEvidenceData } from '../../shared/interfaces/calibration.interfaces';
import { API_GetAllCalibrationCycleData, API_RemoveCalibrationCycleData } from '../../apis/calibration.api';
import Moment from 'react-moment';
import { translateCycleInfoDataToReadableFormat } from '../Maintenance/Maintenance';
import { PartitionOutlined,DeleteOutlined,EditOutlined,PlusOutlined } from '@ant-design/icons';
import { ConfirmationModalRequired } from '../../../../../../utilities/react-confirm-pro';
import { ERROR_TOAST_OPTION } from '../../../../../../shared/options/toast.option';
import CalibrationCreationModal from './sub-component/CalibrationCreationModal';
import CalibrateHistory from './sub-component/CalibrateHistory';
const { Option } = Select;
const {useForm} = Form
const {Column} = Table
interface IProps{

}
const Calibration:React.FC<IProps> = () => {

    const [calibrationCycleList,setCalibrationCycleList] = useState<Array<ICalibrationCycleData>|null>(null)
    const [onCreatingCycle,setOnCreatingCycle] = useState<boolean>(false)
    const [focusedSerialNumber,setFocusedSerialNumber] = useState<string | null>(null)
    async function getAllCalibrationCycleList(){
        const mapped_response = await API_GetAllCalibrationCycleData()
        if(mapped_response.success){
            console.log(mapped_response.data)
            setCalibrationCycleList(mapped_response.data)
        }else{
            // failed to get the calib-cycle-list
        }
    }

    async function removeCalibrationCycle(id:number){
        const mapped_response = await API_RemoveCalibrationCycleData(id)
        if(mapped_response.success){
          // remove successfully
          toast.success('รอบการตรวจวัดประสิทธิภาพได้ถูกลบออกเป็นที่เรียบร้อยแล้ว',ERROR_TOAST_OPTION);
          setCalibrationCycleList(prevState => (prevState!.filter((data) => data.id!==id))) // filtered the removed cycle out
        }else{
          // failed to remove the maintenance cycle
          toast.error('เกิดข้อผิดพลาดในการลบรอบการตรวจวัดประสิทธิภาพ กรุณาลองใหม่อีกครั้ง',ERROR_TOAST_OPTION);
        }
    }

    useEffect(() => {
        getAllCalibrationCycleList()
    },[])

    function onCycleJustGotCreated(){
        setOnCreatingCycle(false) // hide modal
        getAllCalibrationCycleList() // force re-fetching instead of pushing the new one [//TODO if u want to just push without fetch feel free to do it]
    }
    

    return (
        <MainContainer>
            <CalibrateHistory clear_focus={setFocusedSerialNumber.bind(null,null)} focused_serial_number={focusedSerialNumber}/>
            <CalibrationCreationModal on_crud={onCycleJustGotCreated} visible={onCreatingCycle} back={setOnCreatingCycle.bind(null,false)}/>
            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                ghost={false}
                title="การตรวจวัดประสิทธิภาพ"
                subTitle="ตารางรอบของการตรวจวัด"
                >
                </PageHeader>
            </div>
            <div style={{ display:'flex',justifyContent:'flex-end',marginBottom:20,paddingRight:20 }}>
            <Tooltip placement="bottom" title="เพิ่มรอบการตรวจวัดประสิทธิภาพ">
                <Button onClick={setOnCreatingCycle.bind(null,true)} type="primary" shape="circle" icon={<PlusOutlined />} size="large" />
                </Tooltip>
            </div>
            <Table style={{ padding:20 }} onRow={(r) => ({onClick: () => console.log("lol")})} dataSource={calibrationCycleList || []} rowKey="id" size="middle" pagination={{ pageSize:8 }} bordered loading={calibrationCycleList===null}>
                <Column title="ชื่อเครื่องมือ" dataIndex="machine_name" key="machine_name" />
                <Column align="center" width="10%" title="หมายเลขซีเรียลนัมเบอร์" dataIndex="serial_number" key="serial_number" />
                {/* <Column align="center" width="10%" title="สถานี" dataIndex="station" key="station" />
                <Column align="center" width="10%" title="ผู้รับผิดชอบ" dataIndex="who" key="who"  /> */}
                <Column align="center" width="10%" title="วันเริ่มรอบ" render={(text,record:ICalibrationCycleData) => {
                    return <Moment format="D MMM YYYY" withTitle locale="th">{record.cycle_start_at}</Moment>
                }}  />
                <Column align="center" width="10%" title="รอบ" render={(text,record:ICalibrationCycleData) => {
                    return <span>{translateCycleInfoDataToReadableFormat(record.cycle_info)}</span>
                }}/>
                <Column align="center" width="15%" title="สถานะ" render={(text,record:ICalibrationCycleData) => {
                    if(!record.calibration_evidence.length) return <Badge status="default" text="ยังไม่เคยวัดประสิทธิภาพ" />
                    const latest_evidence = record.calibration_evidence[0] // already sorted from the backend side
                    if(latest_evidence.is_pass) return <Badge status="success" text="วัดประสิทธิภาพผ่านแล้ว" />
                    return <Badge status="error" text="วัดประสิทธิภาพไม่ผ่าน" />
                }}/>
                <Column align="center" width="15%" title="สถานะ" render={(text,record:ICalibrationCycleData) => {
                    return <Button onClick={setFocusedSerialNumber.bind(null,record.serial_number)} disabled={!record.calibration_evidence.length}>ดูประวัติการตรวจวัด</Button>
                }}/>
                <Column align="center" width="15%" title="การจัดการ" render={(text,record:ICalibrationCycleData) => {
               return <Space>
                        <Tooltip placement="bottom" title="แก้ไข">
                            <Button ghost type="primary" shape="circle" icon={<EditOutlined />} size="middle" />
                        </Tooltip>
                        <Tooltip placement="bottom" title="ลบ">
                             <Button onClick={ConfirmationModalRequired.bind(null,{title:"โปรดยืนยัน",message:`คุณแน่ใจหรือไม่ว่าคุณต้องการที่จะลบรอบการตรวจเช็คประสิทธิภาพ ไอดี:${record.id}`},removeCalibrationCycle.bind(null,record.id))}  ghost danger shape="circle" icon={<DeleteOutlined />} size="middle" />
                        </Tooltip>
                    </Space>
            }}/>
            </Table>
        </MainContainer>
    )
}

export default Calibration