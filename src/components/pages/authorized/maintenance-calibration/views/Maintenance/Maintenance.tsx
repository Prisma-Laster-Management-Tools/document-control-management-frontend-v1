import { Button, PageHeader,Space,Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { API_GetAllMaintenanceCycleData, API_RemoveMaintenanceCycleData } from '../../apis/maintenance.api'
import { IMaintenenaceCycleData } from '../../shared/interfaces/maintenance.interfaces'
import { MainContainer } from './maintenance.styles'
import { PartitionOutlined,DeleteOutlined,EditOutlined,PlusOutlined } from '@ant-design/icons';
import { ConfirmationModalRequired } from '../../../../../../utilities/react-confirm-pro'
import { ERROR_TOAST_OPTION } from '../../../../../../shared/options/toast.option'
import { toast } from 'react-toastify'
import MaintenanceCreationModal from './sub-component/MaintenanceCreationModal'
const {Column} = Table

interface IProps{

}

export function translateCycleInfoDataToReadableFormat(cycle_text:string){ // currently support only th locale -> [if you wanna add more do it by urself]
  function translateDMYAbbreviationInToReadableText(type: 'd' | 'm' | 'y'){
    if(type === "d") return 'วัน'
    else if(type === "m") return 'เดือน'
    else if(type === "y") return 'ปี'
    // should'nt be reaching to this line of code
  }

  let prefix:string; // [ทุกๆ 3 ปี,ทุกๆ 3 เดือน,ทุกๆ 3 วัน] , [อีก 2 ปี,อีก 2 เดือน]
  let every_as_cycle_Regex = new RegExp('(every_)(\\d+)_([dmy])'); 
  let once_of_as_cycle_Regex = new RegExp('(once_of_)(\\d+)_([dmy])');
  if(every_as_cycle_Regex.test(cycle_text)){
    prefix = "ทุกๆ "
    const [full_str, _, num_as_string, __] = every_as_cycle_Regex.exec(cycle_text) as Array<string>;
    return prefix + num_as_string + ` ${translateDMYAbbreviationInToReadableText(cycle_text[cycle_text.length-1] as 'd' | 'm' | 'y')}` 
  }else if(once_of_as_cycle_Regex.test(cycle_text)){
    // No need to check for the another regex -> [we already did in the backend sided so there will be no arbitary data here it should be -> once_of_1_m] => {but i did do it because of the type ensuring]}
    prefix = "ถัดไป "
    const [full_str, _, num_as_string, __] = once_of_as_cycle_Regex.exec(cycle_text) as Array<string>;
    return prefix + num_as_string + ` ${translateDMYAbbreviationInToReadableText(cycle_text[cycle_text.length-1] as 'd' | 'm' | 'y')}` 
  }
}

const Maintenance:React.FC<IProps> =() => {
  const [maintenanceCycleList,setMaintenanceCycleList] = useState<Array<IMaintenenaceCycleData>|null>(null) // null by default
  const [onCreatingCycle,setOnCreatingCycle] = useState<boolean>(false)
  async function getAllMaintenanceCycleData(){
    const mapped_response = await API_GetAllMaintenanceCycleData()
    if(mapped_response.success){
      setMaintenanceCycleList(mapped_response.data)
    }else{
      // failed to fetch
    }
  }

  async function removeMaintenanceCycle(id:number){
    const mapped_response = await API_RemoveMaintenanceCycleData(id)
    if(mapped_response.success){
      // remove successfully
      toast.success('รอบการบำรุงรักษาได้ถูกลบออกเป็นที่เรียบร้อยแล้ว',ERROR_TOAST_OPTION);
      setMaintenanceCycleList(prevState => (prevState!.filter((data) => data.id!==id))) // filtered the removed cycle out
    }else{
      // failed to remove the maintenance cycle
      toast.error('เกิดข้อผิดพลาดในการลบรอบการบำรุงรักษา กรุณาลองใหม่อีกครั้ง',ERROR_TOAST_OPTION);
    }
  }
  
  useEffect(()=> {
    // On component mount
    getAllMaintenanceCycleData()
  },[])

  //
  // ─── VIS HELPER ─────────────────────────────────────────────────────────────────
  //

  // ────────────────────────────────────────────────────────────────────────────────

  function onCycleJustGotCreated(){
    setOnCreatingCycle(false) // hide modal
    getAllMaintenanceCycleData() // force re-fetching instead of pushing the new one [//TODO if u want to just push without fetch feel free to do it]
  }

  //TODO SHOW THE REMAINING DAY UNTIL IT GETS NOTIFIED [convert cycle into number of days and + the start cycle]{X} -> then get Date.now(){Y} and calulate day passed from {Y} TO {X}

  return (
    <MainContainer>
        <MaintenanceCreationModal on_crud={onCycleJustGotCreated} visible={onCreatingCycle} back={setOnCreatingCycle.bind(null,false)}/>
          <div className="site-page-header-ghost-wrapper">
            <PageHeader
            ghost={false}
            title="การบำรุงรักษา"
            subTitle="ตารางรอบ"
            >
            </PageHeader>
        </div>
        <div style={{ display:'flex',justifyContent:'flex-end',marginBottom:20,paddingRight:20 }}>
           <Tooltip placement="bottom" title="เพิ่มรอบการบำรุงรักษา">
              <Button onClick={setOnCreatingCycle.bind(null,true)} type="primary" shape="circle" icon={<PlusOutlined />} size="large" />
            </Tooltip>
        </div>
        <Table style={{ padding:20 }} onRow={(r) => ({onClick: () => console.log("lol")})} dataSource={maintenanceCycleList || []} rowKey="id" size="middle" pagination={{ pageSize:8 }} bordered loading={maintenanceCycleList===null}>
           <Column align="center"  width="20%" title="ชื่อเครื่องจักร" dataIndex="machine_name" key="machine_name" />
           <Column align="center" width="10%" title="หมายเลขซีเรียลนัมเบอร์" dataIndex="serial_number" key="serial_number" />
           <Column align="center" width="10%" title="สถานี" render={(text,record:IMaintenenaceCycleData) => {
             return <span>{record.station || "ไม่ระบุ"}</span>
           }} />
           <Column align="center" width="10%" title="ผู้รับผิดชอบ" dataIndex="who" key="who" render={(text,record:IMaintenenaceCycleData) => {
              return <span>{record.who || "ไม่ระบุ"}</span>
           }} />
           <Column align="center" width="10%" title="วันเริ่มรอบ" render={(text,record:IMaintenenaceCycleData) => {
             return <Moment format="D MMM YYYY" withTitle locale="th">{record.cycle_start_at}</Moment>
           }}  />
            <Column align="center" width="10%" title="รอบ" render={(text,record:IMaintenenaceCycleData) => {
                return <span>{translateCycleInfoDataToReadableFormat(record.cycle_info)}</span>
            }}/>
            <Column align="center" width="15%" title="การจัดการ" render={(text,record:IMaintenenaceCycleData) => {
               return <Space>
                        <Tooltip placement="bottom" title="แก้ไข">
                            <Button ghost type="primary" shape="circle" icon={<EditOutlined />} size="middle" />
                        </Tooltip>
                        <Tooltip placement="bottom" title="ลบ">
                             <Button onClick={ConfirmationModalRequired.bind(null,{title:"โปรดยืนยัน",message:`คุณแน่ใจหรือไม่ว่าคุณต้องการที่จะลบรอบการบำรุงรักษา ไอดี:${record.id}`},removeMaintenanceCycle.bind(null,record.id))}  ghost danger shape="circle" icon={<DeleteOutlined />} size="middle" />
                        </Tooltip>
                    </Space>
            }}/>
          </Table>
    </MainContainer>
  )
}


export default Maintenance