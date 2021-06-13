import { Button, PageHeader,Space,Table, Tooltip } from 'antd'
import React from 'react'
import { MainContainer } from './sourceDetail.styles'
import useSourceDetail from './useSourceDetail'
import { EditFilled,DeleteFilled,PlusOutlined} from '@ant-design/icons';
import { ConfirmationModalRequired } from '../../../../../../utilities/react-confirm-pro';
import { IPurchasementSoruce } from '../../shared/interfaces/purchasement.interfaces';
const {Column} = Table
const SourceDetail:React.FC = () => {
    const $hook_source_detail = useSourceDetail()
    return (
        <MainContainer>
            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                ghost={false}
                backIcon={null}
                title="ข้อมูลแหล่งการจัดซื้อ"
                >
                </PageHeader>
            </div>
            <Table onRow={(r) => ({onClick: () => console.log("lol")})} dataSource={ $hook_source_detail.get.sourceDetail || []} rowKey="id" size="middle" pagination={{ pageSize:8 }} bordered loading={$hook_source_detail.get.sourceDetail===null}>
                    <Column title="รหัสการสั่งซื้อ" dataIndex="commercial_number" key="commercial_number" />
                    <Column title="รหัสวัสดุ" dataIndex="part_number" key="part_number" />
                    <Column title="บริษัท" dataIndex="company" key="company" />
                    <Column title="ผู้ขาย" dataIndex="seller" key="seller" />
                    <Column title="อีเมล์" dataIndex="email" key="email" />
                    <Column align="center" title="ตัวจัดการ" render={(text,record: IPurchasementSoruce) => {
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
                    }} />
            </Table>
        </MainContainer>
    )
}


export default SourceDetail