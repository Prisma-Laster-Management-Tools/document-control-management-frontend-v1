import { Button, Space, Table, Tag,Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { ControlledHeightContainer } from '../../../Product/views/ProductList/productList.styles'
import { API_GetAllProductInControlQueue, API_RemoveProductFromQueue } from '../../apis/qc.api'
import { IQualityInQueueData } from '../../shared/interfaces/qc.interface'
import QcHeaderStatus from './sub-component/Header/Header'

import { PartitionOutlined,ExportOutlined } from '@ant-design/icons';
import { onConfirm } from 'react-confirm-pro'
import { toast } from 'react-toastify'
import { ERROR_TOAST_OPTION } from '../../../../../../shared/options/toast.option'
import QcProcess from '../QcProcess'
const {Column} = Table
type TQcStatus = null | boolean
type TAction = "view" | "process"
const QcQueue:React.FC = () => {
    const [prodInQueue,setProdInQueue] = useState<Array<IQualityInQueueData>|null>(null)
    const [action,setAction] = useState<TAction>("view")
    const [focusedProductDataForQc,setFocusedProductDataForQc] = useState<{product_code:string,product_id:number} | null>(null)
    async function getAllProdInQueue(){
        const mapped_response = await API_GetAllProductInControlQueue()
        if(mapped_response.success){
            const filtered_data = mapped_response.data.filter((data:IQualityInQueueData) => !data.product.already_shipped && !data.product.prod_manufact_code) // filtered the one that already ship or in ship process out
            setProdInQueue(filtered_data)
        }else{
            // failed to get the data
        }
    }

    function onMakeAQCProcessForSpecificProduct($data:IQualityInQueueData){
        setFocusedProductDataForQc({product_code:$data.product.product_code,product_id:$data.product.id})
        setAction("process")
    }

    async function onRemoveFromQueue(id:number){
        const mapped_response = await API_RemoveProductFromQueue(id)
        if(mapped_response.success){
            // dq success
            setProdInQueue(prevState => (prevState!.filter(data => data.product.id !== id))) // filtered out the removed element
            toast.success('สินค้าได้ถูกลบออกจากคิวการตรวจสอบแล้ว',ERROR_TOAST_OPTION);
        }else{
            // dequeue failed
            toast.error('ไม่สามารถลบสินค้าออกจากคิวการตรวจสอบได้',ERROR_TOAST_OPTION)
        }
    }

    //
  // ─── CONFIRMATION MODAL ─────────────────────────────────────────────────────────
  //
  const onClickLight = (id:number,serial_number:string) => {
    onConfirm({
      title: (
        <h3>
          โปรดยืนยัน
        </h3>
      ),
      description: (
        <p>คุณแน่ใจหรอว่าคุณต้องการที่นำสินค้าที่มีซีเรียลนัมเบอร์ {serial_number} ออกจากคิวการตรวจสอบ</p>
      ),
      onSubmit: () => {
        onRemoveFromQueue(id)
      },
      onCancel: () => {
        //do nothings
      },
      btnCancel:"ยกเลิก",
      btnSubmit:"ยืนยัน",
      type:"light"
    })
  };

  // ────────────────────────────────────────────────────────────────────────────────

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

    //
    // ─── CB ─────────────────────────────────────────────────────────────────────────
    //
    function onQcSuccess(){
        //forces re-fetching
        getAllProdInQueue()
        setAction("view")
    }
    // ────────────────────────────────────────────────────────────────────────────────


    let rendered_content = null
    switch (action) {
        case 'view':
            rendered_content = <>
             <QcHeaderStatus product_data={prodInQueue}/>
            <Table style={{ padding:22 }} onRow={(r) => ({onClick: () => console.log("lol")})} dataSource={prodInQueue || []} rowKey="id" size="middle" pagination={{ pageSize:8 }} bordered loading={prodInQueue===null}>
                <Column width="5%" title="ซีเรียลนัมเบอร์ (Serial_Number)" dataIndex={["product","serial_number"]} key="serial_number" />
                <Column width="10%" title="รหัสสินค้า (SKU)" dataIndex={["product","product_code"]} key="product_code" />
                <Column width="2%" title="วันที่นำเข้าคิว" render={(text,record) => {
            return <Moment format="D MMM YYYY" withTitle>{(record as IQualityInQueueData).createdAt}</Moment>
          }}  />
                <Column align="center" width="1%" title="สถานะ" render={(text,record) => {
                    return generateStatusTrackFromState((record as IQualityInQueueData).product.quality_passed)
                }} />
                <Column align="center" width="5%" title="การจัดการ" render={(text,record:IQualityInQueueData) => {
                    return  <Space>
                            <Tooltip placement="bottom" title="ตรวจสอบสินค้า">
                                <Button onClick={onMakeAQCProcessForSpecificProduct.bind(null,record)} ghost type="primary" shape="circle" icon={<PartitionOutlined />} size="middle" />
                            </Tooltip>
                            <Tooltip placement="bottom" title="นำสินค้าออกจากคิว">
                                <Button onClick={onClickLight.bind(null,record.product.id,record.product.serial_number)} ghost danger shape="circle" icon={<ExportOutlined />} size="middle" />
                            </Tooltip>
                    </Space>
                }} />
            </Table>
            </>
            break;

        case 'process':
            rendered_content = <QcProcess on_success={onQcSuccess} back={() => setAction("view")} focused_product_data={focusedProductDataForQc}/>
            break;
        default:
            break;
    }


    return (
        <ControlledHeightContainer>
           {rendered_content}
        </ControlledHeightContainer>
    )
}

export default QcQueue