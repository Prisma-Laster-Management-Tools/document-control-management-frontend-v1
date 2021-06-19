import { Badge, Button, Input, PageHeader,Space,Table, Tag, Tooltip } from 'antd'
import React from 'react'
import { ConfirmationModalRequired } from '../../../../../../utilities/react-confirm-pro'
import { IPurchasementRequest } from '../../shared/interfaces/purchasement.interfaces'
import { MainContainer } from './purchasementRequest.styles'
import usePurchasementRequest from './usePurchasementRequest'
import { EditFilled,DeleteFilled,PlusOutlined,SearchOutlined} from '@ant-design/icons';
import { IPurchasementData } from '../../../../semirized/purchasement/shared/interfaces/purchasementTracking.interfaces'
import {CLIENT_ADDRESS} from '../../../../../../config/STATIC.json'
import { useHistory } from 'react-router-dom'
const {Column} = Table

const PurchasementRequest:React.FC = () => {
  const $hook_purchasement_req = usePurchasementRequest()
  const history = useHistory()

  //
  // ─── VIS HELPER ─────────────────────────────────────────────────────────────────
  //
  // <Badge status="processing" text="รอการยืนยันจากต้นทาง" /> : <Badge status="success" text="ไดรับการยืนยันจากต้นทางแล้ว" /> 
  function createProperBadgeForThePurchasementStatus(record:IPurchasementData){
    if(record.is_order_accepted === null) return  <Badge status="processing" text="รอการยืนยันจากต้นทาง" />
    else if(record.is_order_accepted && !record.purchasement_successfully) return <Badge status="processing" text="ไดรับการยืนยันจากต้นทางแล้ว" /> 
    else if(record.is_order_accepted === false) return <Badge status="error" text="คำสั่งซื้อถูกปฏิเสธจากต้นทาง" /> 
    else if(record.purchasement_successfully) return <Badge status="success" text="การสั่งซ์้อสำเร็จ" /> 
  }
  // ────────────────────────────────────────────────────────────────────────────────


  return (
    <MainContainer>
      <div className="site-page-header-ghost-wrapper">
            <PageHeader
            ghost={false}
            backIcon={null}
            title="คำสั่งซื้อ"
            >
            </PageHeader>
        </div>

        <Table onRow={(r) => ({onClick: () => console.log("lol")})} dataSource={ $hook_purchasement_req.get.purchasementReq || []} rowKey="id" size="middle" pagination={{ pageSize:8 }} bordered loading={$hook_purchasement_req.get.purchasementReq===null}>
                <Column width="30%" title="รหัสการสั่งซื้อ" render={(text,record: IPurchasementData) => {
                  return <>
                      {record.commercial_number} {record.company ? `- ${record.company}` : `- ${record.special_part_contact}`}
                  </>

                }} />
                <Column align="center" width="10%" title="รหัสวัสดุ" render={(text,record: IPurchasementData) => {
                    return <>
                      {record.part_number ? record.part_number : record.special_part_name}
                    </>
                }}/>
                <Column width="10%" align="center" title="จำนวน" dataIndex="quantity" key="quantity" />
                <Column onFilter={(value,record: IPurchasementData) => record.being_confirmed === value} filters={
                  [
                    {text: "ยืนยันแล้ว",value:true},
                    {text: "รอการยืนยัน",value:false},
                  ]
                } width="20%" align="center" title="สถานะ" render={(text,record: IPurchasementData) => {
                  return createProperBadgeForThePurchasementStatus(record)

                }} />
                <Column width="20%" align="center" title="การจัดการ" render={(text,record: IPurchasementData) => {
                  return <>
                    <Button onClick={() => {
                      console.log(`[TODO]: navigate to -> ${CLIENT_ADDRESS}/purchasement-tracking/${record.confirmation_token}/?type=employee`)
                      history.push(`/purchasement-tracking/${record.confirmation_token}/?type=employee`)
                    }}>ตรวจสอบ</Button>
                  </>

                }} />
                {/* <Column align="center" title="ตัวจัดการ" render={(text,record: IPurchasementRequest) => {
                    return <>
                            <Space>
                            <Tooltip placement="bottom" title="แก้ไข">
                                <Button ghost type="primary" shape="circle" icon={<EditFilled />} size="middle" />
                            </Tooltip>
                            <Tooltip placement="bottom" title="ลบ">
                                <Button onClick={() => ConfirmationModalRequired({title:"โปรดยืนยัน",message:`คุณแน่ใจหรอว่าคุณต้องการจะลบแห่ลงการจัดซื้อเลข  ${record.commercial_number} - ${record.company}`},() => null)} ghost danger shape="circle" icon={<DeleteFilled />} size="middle" />
                            </Tooltip>
                    </Space>
                    </>
                }} /> */}
        </Table>
    </MainContainer>
  )
}

export default PurchasementRequest
