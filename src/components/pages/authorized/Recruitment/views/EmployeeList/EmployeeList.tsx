import { Button, message, PageHeader,Space,Table, Tooltip } from 'antd'
import { DeleteOutlined} from'@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { API_GetAllUserData } from '../../apis/recruitment.api'
import { IUserData } from '../../shared/interfaces/recruitment.interface'
import { MainContainer } from './employeeList.styles'
import Moment from 'react-moment'
import { ConfirmationModalRequired } from '../../../../../../utilities/react-confirm-pro';
const {Column} = Table

const EmployeeList = () => {
    const [userList,setUserList] = useState<Array<IUserData>|null>(null)
    async function getAllUserData(){
        const mapped_response = await API_GetAllUserData()
        if(!mapped_response.success) return message.error("เกิดข้อผิดพลาดในการโหลดข้อมูล กรุณาลองใหม่อีกครั้ง")
        setUserList(mapped_response.data)
    }
    async function onRemoveEmployeeOutFromTheSystem(id:number){
        console.log("[TODO]: Remove the user with id of " + id )
    }
    useEffect(() => {
        // ON component mount
        getAllUserData()
    },[])
    return (
        <MainContainer>
            <div style={{ marginLeft: -20,marginBottom:25 }} className="site-page-header-ghost-wrapper">
                <PageHeader
                ghost={false}
                title="การจัดสรรคบุคคล"
                subTitle="พนักงานภายในทั้งหมด"
                >
                </PageHeader>
            </div>
            <Table dataSource={userList || []} bordered loading={userList===null} size="middle" pagination={{ pageSize:8 }} >
                <Column align="center" width="10%" title="อีเมล์" dataIndex="email" key="email"/>
                <Column align="center" width="10%" title="ชื่อจริง" dataIndex="firstname" key="firstname"/>
                <Column align="center" width="10%" title="นามสกุล" dataIndex="lastname" key="lastname"/>
                <Column align="center" width="5%" title="ตำแหน่งที่รับผิดชอบ" dataIndex="position" key="position"/>
                <Column align="center" width="5%" title="วันที่สมัครสมาชิก" render={(text,record:IUserData) => {
                    return <Moment format="DD MMM YYYY" locale="th">{record.createdAt}</Moment>
                }}/>
                 <Column align="center" width="8%" title="การจัดการ" render={(text,record:IUserData) => {
                    return  <Space>
                            <Tooltip placement="bottom" title="ลบพนักงานออกจากระบบ">
                                <Button onClick={ConfirmationModalRequired.bind(null,{title:"โปรดยืนยัน",message:`คุณแน่ใจหรือไม่ว่าคุณต้องการที่จะลบคุณ ${record.firstname} ${record.lastname} ออกจากระบบ`},() => onRemoveEmployeeOutFromTheSystem(record.id))} ghost danger shape="circle" icon={<DeleteOutlined />} size="middle" />
                            </Tooltip>
                    </Space>
                }} />
            </Table>
            
        </MainContainer>
    )
}

export default EmployeeList