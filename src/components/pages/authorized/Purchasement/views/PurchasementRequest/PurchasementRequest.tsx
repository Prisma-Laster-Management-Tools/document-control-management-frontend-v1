import { Badge, Button, Input, PageHeader,Space,Table, Tag, Tooltip } from 'antd'
import React from 'react'
import { ConfirmationModalRequired } from '../../../../../../utilities/react-confirm-pro'
import { IPurchasementRequest } from '../../shared/interfaces/purchasement.interfaces'
import { MainContainer } from './purchasementRequest.styles'
import usePurchasementRequest from './usePurchasementRequest'
import { EditFilled,DeleteFilled,PlusOutlined,SearchOutlined} from '@ant-design/icons';
const {Column} = Table

const PurchasementRequest:React.FC = () => {
  const $hook_purchasement_req = usePurchasementRequest()

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
                <Column width="30%" title="รหัสการสั่งซื้อ" render={(text,record: IPurchasementRequest) => {
                  return <>
                      {record.commercial_number} {record.company ? `- ${record.company}` : `- ${record.special_part_contact}`}
                  </>

                }} />
                <Column align="center" width="10%" title="รหัสวัสดุ" render={(text,record: IPurchasementRequest) => {
                    return <>
                      {record.part_number ? record.part_number : record.special_part_name}
                    </>
                }}/>
                <Column width="10%" align="center" title="จำนวน" dataIndex="quantity" key="quantity" />
                <Column onFilter={(value,record: IPurchasementRequest) => record.being_confirmed === value} filters={
                  [
                    {text: "ยืนยันแล้ว",value:true},
                    {text: "รอการยืนยัน",value:false},
                  ]
                } width="20%" align="center" title="สถานะ" render={(text,record: IPurchasementRequest) => {
                  return <>
                      {
                        !record.being_confirmed ? <Badge status="processing" text="รอการยืนยันจากต้นทาง" /> : <Badge status="success" text="ไดรับการยืนยันจากต้นทางแล้ว" /> 
                      }
                  </>

                }} />
                <Column width="20%" align="center" title="การจัดการ" render={(text,record: IPurchasementRequest) => {
                  return <>
                    <Button disabled={!record.being_confirmed}>เพิ่มหลักฐานการจัดส่ง</Button>
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
