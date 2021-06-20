import React, { useEffect, useState } from 'react'
import { MainContainer } from './calibration.styles'
import { Modal, Button,Form, Input, PageHeader, DatePicker, Select, Table, Space, Tooltip, Badge } from 'antd';
import { toast } from 'react-toastify';
import { ICalibrationCycleData, ICalibrationEvidenceData } from '../../shared/interfaces/calibration.interfaces';
import { API_GetAllCalibrationCycleData, API_RemoveCalibrationCycleData } from '../../apis/calibration.api';
import Moment from 'react-moment';
import { translateCycleInfoDataToReadableFormat } from '../Maintenance/Maintenance';
import { PartitionOutlined,DeleteOutlined,EditOutlined,PlusOutlined,FormOutlined } from '@ant-design/icons';
import { ConfirmationModalRequired } from '../../../../../../utilities/react-confirm-pro';
import { ERROR_TOAST_OPTION } from '../../../../../../shared/options/toast.option';
import CalibrationCreationModal from './sub-component/CalibrationCreationModal';
import CalibrateHistory from './sub-component/CalibrateHistory';
import CalibrationEvidenceCreationModal from './sub-component/CalibrationEvidenceCreationModal/CalibrationEvidenceCreationModal';
import { calculateDayPassed,convert_cycle_type_to_day, isAlreadyPassedPeriodOfDay } from '../../../../../../utilities/time/common';
const { Option } = Select;
const {useForm} = Form
const {Column} = Table
interface IProps{

}
const Calibration:React.FC<IProps> = () => {

    const [calibrationCycleList,setCalibrationCycleList] = useState<Array<ICalibrationCycleData>|null>(null)
    const [onCreatingCycle,setOnCreatingCycle] = useState<boolean>(false)
    const [onCreatingEvidence,setOnCreatingEvidence] = useState<boolean>(false)
    const [focusedSerialNumber,setFocusedSerialNumber] = useState<string | null>(null) 
    const [focusedMachineNameNSerial,setFocusedMachineNameNSerial] = useState<{machine_name:string,serial_number:string,instruction:string} | null>(null)
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

    function onNavigateToCreationModal(record:ICalibrationCycleData){
        setOnCreatingEvidence(true)
        setFocusedMachineNameNSerial({machine_name:record.machine_name,serial_number:record.serial_number,instruction:record.instruction})
    }
    function onStopUsingCreationModal(){
        setOnCreatingEvidence(false)
        setFocusedMachineNameNSerial(null)
        getAllCalibrationCycleList() // force re-fetching
    }
    function checkIfItAlreadyHitPeriod(record:ICalibrationCycleData) : boolean{
        const { cycle_info, machine_name, id, serial_number, instruction, cycle_start_at } = record;
        const today = new Date(Date.now());
        const day_passed = calculateDayPassed(new Date(cycle_start_at), today);
        const suffix_cycle_type = cycle_info[cycle_info.length - 1] as "d" | "m" | "y";
        const added_amount_for_completion: number = convert_cycle_type_to_day(suffix_cycle_type as 'd' | 'm' | 'y')!;
        let every_as_cycle_Regex = new RegExp('(every_)(\\d+)_([dmy])'); // atlease 1 length of digit [note to myself]
        let once_of_as_cycle_Regex = new RegExp('(once_of_)(\\d+)_([dmy])');
        if (every_as_cycle_Regex.test(cycle_info)) {
            const [full_str, _, num_as_string, __] = every_as_cycle_Regex.exec(cycle_info) as Array<string>;
            const multiply_amount = parseInt(num_as_string);
            const comparison_target_day = added_amount_for_completion * multiply_amount;
            const hit_period = isAlreadyPassedPeriodOfDay(day_passed, comparison_target_day);
            if(serial_number === 'DECIBELL4872'){
                console.log(multiply_amount)
                console.log(comparison_target_day)
                console.log(day_passed)
            }
            return hit_period
            
        } else if (once_of_as_cycle_Regex.test(cycle_info)) {
            // disable once of -> for now
        }
        return false
    }
    

    return (
        <MainContainer>
            <CalibrateHistory clear_focus={setFocusedSerialNumber.bind(null,null)} focused_serial_number={focusedSerialNumber}/>
            <CalibrationCreationModal on_crud={onCycleJustGotCreated} visible={onCreatingCycle} back={setOnCreatingCycle.bind(null,false)}/>
            <CalibrationEvidenceCreationModal m_n_s={focusedMachineNameNSerial}  on_crud={onStopUsingCreationModal} visible={onCreatingEvidence} back={setOnCreatingEvidence.bind(null,false)}/>
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
                <Column align="center" width="15%" title="ชื่อเครื่องมือ" dataIndex="machine_name" key="machine_name" />
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
                    let render_content = null
                    const latest_evidence = record.calibration_evidence[0] // already sorted from the backend side
                    if(!record.calibration_evidence.length) render_content = <Badge status="default" text="ยังไม่เคยวัดประสิทธิภาพ" />
                    else if(latest_evidence?.is_pass) render_content = <Badge status="success" text="วัดประสิทธิภาพผ่านแล้ว" />
                    else if(!latest_evidence?.is_pass) render_content = <Badge status="error" text="วัดประสิทธิภาพไม่ผ่าน" />
                
                    if(checkIfItAlreadyHitPeriod(record)){
                        render_content = <>
                            {render_content}
                            <Badge status="processing" text="ถึงรอบการตรวจวัดแล้ว" />
                        </>
                    }
                    return render_content
                }}/>
                <Column align="center" width="15%" title="สถานะ" render={(text,record:ICalibrationCycleData) => {
                    return <Button onClick={setFocusedSerialNumber.bind(null,record.serial_number)} disabled={!record.calibration_evidence.length}>ดูประวัติการตรวจวัด</Button>
                }}/>
                <Column align="center" width="15%" title="การจัดการ" render={(text,record:ICalibrationCycleData) => {
                    //TODO calculate the date cycle_start_at + cycle_info [check if this is the hit of period make disabled={true} else false]
                    return <div style={{ display:'flex',flexDirection:'row' }}>
                        <div style={{ width:'50%',height:'100%',alignItems:'center' }}>
                            <Tooltip placement="bottom" title="วัดประสิทธิภาพ">
                                <Button onClick={onNavigateToCreationModal.bind(null,record)} style={{ borderColor:'green' }} ghost type="primary" shape="circle" icon={<FormOutlined style={{ color:'green' }} />} size="middle" />
                            </Tooltip>
                        </div>
                        <div style={{ width:'50%',height:'100%',alignItems:'center'  }}>
                            <Space>
                                <Tooltip placement="bottom" title="แก้ไข">
                                    <Button ghost type="primary" shape="circle" icon={<EditOutlined />} size="middle" />
                                </Tooltip>
                                <Tooltip placement="bottom" title="ลบ">
                                    <Button onClick={ConfirmationModalRequired.bind(null,{title:"โปรดยืนยัน",message:`คุณแน่ใจหรือไม่ว่าคุณต้องการที่จะลบรอบการตรวจเช็คประสิทธิภาพ ไอดี:${record.id}`},removeCalibrationCycle.bind(null,record.id))}  ghost danger shape="circle" icon={<DeleteOutlined />} size="middle" />
                                </Tooltip>
                            </Space>
                        </div>
                    </div>
            }}/>
            </Table>
        </MainContainer>
    )
}

export default Calibration