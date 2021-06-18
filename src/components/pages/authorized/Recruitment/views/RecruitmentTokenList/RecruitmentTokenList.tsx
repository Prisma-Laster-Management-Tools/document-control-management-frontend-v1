import { Button, PageHeader,Table,message,Badge, Tag, Space, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { API_GetAllRecruitmentGeneratedToken, API_RemoveRecruitmentGeneratedToken } from '../../apis/recruitment.api'
import { ICreateRegistrationAccessLinkResponse } from '../../shared/interfaces/recruitment.interface'
import {MainContainer} from './recruitmentTokenList.styles'
import Moment from 'react-moment'
import copy from 'clipboard-copy'
import {CLIENT_ADDRESS} from '../../../../../../config/STATIC.json'
import { MainOperatorContainer } from '../../../Product/views/ProductDetail/productDetail.styles'
import Recruitment from '../RecruitmentGeneration'
import { DeleteOutlined } from '@ant-design/icons';
import { ConfirmationModalRequired } from '../../../../../../utilities/react-confirm-pro'
import { toast } from 'react-toastify'
import { ERROR_TOAST_OPTION } from '../../../../../../shared/options/toast.option'
const {Column} = Table
interface IProps{

}
type TAction = "view" | "add"
//TODO change the role into the readable format
const RecruitmentTokenList:React.FC<IProps> = () => {
    const [recruitmentGeneratedData,setRecruitmentGeneratedData] = useState<Array<ICreateRegistrationAccessLinkResponse> | null>(null)
    const [action,setAction] = useState<TAction>('view')
    async function getAllGeneratedTokenList(){
        const mapped_response = await API_GetAllRecruitmentGeneratedToken()
        if(mapped_response.success){
            setRecruitmentGeneratedData(mapped_response.data)
        }else{
            // failed to fetch the data
        }
    }
    async function onRemoveToken(id:number){
       const mapped_response = await API_RemoveRecruitmentGeneratedToken(id)
       if(mapped_response.success){
            toast.success('ลบลื้งค์การเข้าใช้งานเรียบร้อยแล้ว',ERROR_TOAST_OPTION)
            setRecruitmentGeneratedData(prevState => (prevState!.filter(data => data.id !== id))) // filter the removed element out
       }else{
           // failed to remove the generated token
           toast.error('เกิดข้อผิดพลาดในการลบลื้งค์การเข้าใช้งาน',ERROR_TOAST_OPTION)
       }
        
    }
    useEffect(() => {
        getAllGeneratedTokenList()
    },[])


    //
    // ─── CB ─────────────────────────────────────────────────────────────────────────
    //
    function onChildComponentDoingAnyCRUDOperation(){
        getAllGeneratedTokenList() // forces re-fetching
    }
    // ────────────────────────────────────────────────────────────────────────────────


    let rendered_content = null
    switch (action) {
        case 'view':
            rendered_content =
                                <>
                                    <div style={{ marginLeft: -20,marginBottom:25 }} className="site-page-header-ghost-wrapper">
                                        <PageHeader
                                        ghost={false}
                                        title="การจัดสรรคบุคคล"
                                        subTitle="ลิ้งค์ทั้งหมดที่สร้างขึ้น"
                                        >
                                        </PageHeader>
                                    </div>
                                    <MainOperatorContainer>
                                        <Button onClick={setAction.bind(null,'add')}>สร้างลิ้งค์สำหรับการเข้าใช้งาน</Button>
                                    </MainOperatorContainer>
                                    <Table dataSource={recruitmentGeneratedData || []} loading={recruitmentGeneratedData === null} rowKey="id" size="middle" bordered pagination={{ pageSize: 8 }}>
                                        <Column align="center" width="5%" title="ลิ้งค์ที่สร้างขึ้น" render={(text,record:ICreateRegistrationAccessLinkResponse) => {
                                            return <Button size="small" onClick={() => {
                                                const registration_link = `${CLIENT_ADDRESS}/registration/${record.access_token}`
                                                copy(registration_link)
                                                message.info("ลื้งค์ได้ถูกคัดลอกไปที่ clipboard เป็นที่เรียบร้อยแล้ว")
                                            }}>คัดลอกลิ้งค์</Button>
                                        }}/>
                                        <Column align="center"  title="ชื่อจริง" dataIndex="firstname" key="firstname"/>
                                        <Column align="center"  title="นามสกุล" dataIndex="lastname" key="lastname"/>
                                        <Column align="center"  title="ตำแหน่ง" dataIndex="role" key="role"/>
                                        <Column onFilter={(value,record: ICreateRegistrationAccessLinkResponse) => record.already_used === value} filters={
                                        [
                                            {text: "ยังไม่ถูกใช้งาน",value:false},
                                            {text: "ถูกใช้งานแล้ว",value:true},
                                        ]
                                        } width="8%" align="center" title="สถานะ" dataIndex="already_ussd" key="already_used" render={(text,record:ICreateRegistrationAccessLinkResponse) => {
                                            return !record.already_used ? <Tag color="red">ยังไม่ถูกใช้งาน</Tag> : <Tag color="green">ถูกใช้งานแล้ว</Tag>
                                        }}/>
                                        <Column width="10%" align="center"title="วันที่ถูกสร้าง" render={(text,record:ICreateRegistrationAccessLinkResponse) => {
                                            return <Moment format="DD MMM YY" locale="th">{record.createdAt}</Moment>
                                        }}/>
                                        <Column align="center" width="8%" title="การจัดการ" render={(text,record:ICreateRegistrationAccessLinkResponse) => {
                                            return  <Space>
                                                    <Tooltip placement="bottom" title="ลบลื้งค์การใช้งาน">
                                                        <Button onClick={ConfirmationModalRequired.bind(null,{title:"โปรดยืนยัน",message:`คุณแน่ใจ้หรือไม่ที่จะลบลิ้งค์การใช้งานนี้`},() => onRemoveToken(record.id))} ghost danger shape="circle" icon={<DeleteOutlined />} size="middle" />
                                                    </Tooltip>
                                            </Space>
                                        }} />
                                    </Table>
                                </>
            break;
        case "add":
            rendered_content = <Recruitment on_crud={onChildComponentDoingAnyCRUDOperation} back={setAction.bind(null,'view')}/>
            break;
        default:
            break;
    }

    return (
        <MainContainer>
            {rendered_content}
        </MainContainer>
    )
}

export default RecruitmentTokenList