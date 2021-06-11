import { Button, Space, Table, Tag,Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { ControlledHeightContainer } from '../../../Product/views/ProductList/productList.styles'
import { API_GetAllProductInControlQueue } from '../../apis/qc.api'
import { IQualityInQueueData } from '../../shared/interfaces/qc.interface'
import QcHeaderStatus from './sub-component/Header/Header'

import { PartitionOutlined,ExportOutlined } from '@ant-design/icons';
const {Column} = Table
type TQcStatus = null | boolean
const QcQueue:React.FC = () => {
    const [prodInQueue,setProdInQueue] = useState<Array<IQualityInQueueData>|null>(null)
    async function getAllProdInQueue(){
        const mapped_response = await API_GetAllProductInControlQueue()
        if(mapped_response.success){
            setProdInQueue(mapped_response.data)
        }else{
            // failed to get the data
        }
    }

    useEffect(() => {
        getAllProdInQueue()
    },[])

    //
    // ─── HELPER ─────────────────────────────────────────────────────────────────────
    //
    function generateStatusTrackFromState(ttype:TQcStatus){
        if(ttype === null){
            return <Tag color="default">ยังไม่เคยตรวจสอบ</Tag>
        }else if(ttype === true){
            return <Tag color="warning">ถูกส่งกลับมาให้ยืนยัน</Tag>
        }else{
            return <Tag color="error">ยังไม่ผ่านมาตรฐาน</Tag>
        }
    }
    // ────────────────────────────────────────────────────────────────────────────────


    return (
        <ControlledHeightContainer>
            <QcHeaderStatus/>
            <Table style={{ padding:22 }} onRow={(r) => ({onClick: () => console.log("lol")})} dataSource={prodInQueue || []} rowKey="id" size="middle" pagination={{ pageSize:8 }} bordered loading={prodInQueue===null}>
                <Column width="5%" title="ซีเรียลนัมเบอร์ (Serial_Number)" dataIndex={["product","serial_number"]} key="serial_number" />
                <Column width="10%" title="รหัสสินค้า (SKU)" dataIndex={["product","product_code"]} key="product_code" />
                <Column width="2%" title="วันที่นำเข้าคิว" render={(text,record) => {
            return <Moment format="D MMM YYYY" withTitle>{(record as IQualityInQueueData).createdAt}</Moment>
          }}  />
                <Column align="center" width="1%" title="สถานะ" render={(text,record) => {
                    return generateStatusTrackFromState((record as IQualityInQueueData).product.quality_passed)
                }} />
                <Column align="center" width="5%" title="การจัดการ" render={(text,record) => {
                    return  <Space>
                            <Tooltip placement="bottom" title="ตรวจสอบสินค้า">
                                <Button ghost type="primary" shape="circle" icon={<PartitionOutlined />} size="middle" />
                            </Tooltip>
                            <Tooltip placement="bottom" title="นำสินค้าออกจากคิว">
                                <Button ghost danger shape="circle" icon={<ExportOutlined />} size="middle" />
                            </Tooltip>
                    </Space>
                }} />
            </Table>
        </ControlledHeightContainer>
    )
}

export default QcQueue