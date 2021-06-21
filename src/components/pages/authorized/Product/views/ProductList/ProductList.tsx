import React, { useEffect, useState } from 'react'
import { CenteredContainerBox, ContentContainer } from '../../../../../../shared/styles/common'
import {Table,Button, Space, Badge, BadgeProps,Input, PageHeader } from 'antd'
import { IProductList } from '../../shared/interfaces/product.interfaces'
import { API_GetAllProduct, API_RemoveProduct } from '../../apis/product.api'
import { AudioOutlined } from '@ant-design/icons';
import Moment from 'react-moment'
import { MainOperatorContainer } from '../ProductDetail/productDetail.styles'
import ProductAdd from '../ProductAdd'
import { ControlledHeightContainer } from './productList.styles'
import { onConfirm } from 'react-confirm-pro'
import { toast } from 'react-toastify'
import { ERROR_TOAST_OPTION } from '../../../../../../shared/options/toast.option'
import { API_SendProductToControlQueue } from '../../../quality-control/apis/qc.api'
import { sleep } from '../../../../../../utilities/fake-loader/fakeLoader'
import QcHistory from './fragments/QcHistory/QcHistory'
const {Column} = Table
const { Search } = Input;
type TQcStatus = null | boolean
type TActions = "view" | "add"
export const ProductList:React.FC = () => {
  const [prodDetails,setProdDetails] = useState<Array<IProductList> | null>(null)
  const [filteredProd,setFilteredProd] = useState<Array<any> | null>(null)
  const [action,setAction] = useState<TActions>("view")
  let prodDetailCached = []
  
  //
  // ─── FOR HISTORICAL DRAWER TIMELINE ─────────────────────────────────────────────
  //
  const [focusedProductId,setFocusedProductId] = useState<number | null> (null)

  function setViewingProductHistory(record:IProductList){
      console.log(record)
      setFocusedProductId(record.id)
  }
  function onStopViewingTheProductHistory(){
    setFocusedProductId(null)
  }
  // ────────────────────────────────────────────────────────────────────────────────


  //
  // ─── FOR BEAUTIFY CONTENT ───────────────────────────────────────────────────────
  //
  const [productIdPendingInQueue,setProductIdPendingInQueue] = useState<null | number>(null)
  // ────────────────────────────────────────────────────────────────────────────────


  async function fetchAllProductList(){
    const mapped_response = await API_GetAllProduct()
    if(mapped_response.success){
      console.log(mapped_response)
      setProdDetails(mapped_response.data.data.data) // nested 3 lol -> cuz of the pagination support [but we ignore that for a moment]
    }else{
      // failed to fetch
    }
  }

  async function removeProduct(serial_number:string){
    const mapped_response = await API_RemoveProduct(serial_number)
    if(mapped_response.success){
      // success
      console.log('removal success')
      setProdDetails(prevState => (prevState!.filter(prod => prod.serial_number !== serial_number)))
      toast.success('สินค้าได้ถูกลบออกจากระบบเรียบร้อยแล้ว',ERROR_TOAST_OPTION);
    }else{
      //failed to remove
      toast.error('เกิดข้อผิดพลาดในการส่งสินค้าเข้าคิว',ERROR_TOAST_OPTION);
    }
  }

  async function sendProductToQueue(product_id:number){
    setProductIdPendingInQueue(product_id)
    await sleep(1300)
    const mapped_response = await API_SendProductToControlQueue({product_id})
    if(mapped_response.success){
      const copied_data = [...prodDetails!]
      const target_element = copied_data.find((data) => data.id === product_id)
      if(!target_element) return // in case of not found [ return ]
      target_element.is_in_queue = true
      setProdDetails(copied_data)
    }else{
      // failed to send to the queue
    }
    setProductIdPendingInQueue(null)
  }

  useEffect(() => {
    fetchAllProductList()
  },[])

  //
  // ─── HELPER ─────────────────────────────────────────────────────────────────────
  //
  function generateBadgePropFromQcStatus(ttype: TQcStatus){
    if(ttype === null){
      return {status:"default",text:"ไม่เคยได้รับการตรวจสอบ"}
    }else if(ttype === true){
      return {status:"success",text:"ผ่านมาตรฐาน"}
    }else{
      return {status:"error",text:"ไม่ผ่านมาตรฐาน"}
    }
  }
  // ────────────────────────────────────────────────────────────────────────────────

  //
  // ─── CONFIRMATION MODAL ─────────────────────────────────────────────────────────
  //
  const onClickLight = (serial_number:string) => {
    onConfirm({
      title: (
        <h3>
          โปรดยืนยัน
        </h3>
      ),
      description: (
        <p>คุณแน่ใจหรอว่าคุณต้องการที่จะลบสินค้าที่มีรหัสซีเรียลนัมเบอร์เป็น {serial_number}</p>
      ),
      onSubmit: () => {
        removeProduct(serial_number)
      },
      onCancel: () => {
        //do nothings
      },
      btnCancel:"ยกเลิก",
      btnSubmit:"ยืนยัน"
    })
  };

  // ────────────────────────────────────────────────────────────────────────────────

  //
  // ─── SEARCH ─────────────────────────────────────────────────────────────────────
  //
  function onSearch(value:string){
    if(!value) return setFilteredProd(null)
    setFilteredProd(prodDetails!.filter(data => data.serial_number.includes(value)))
  }
  // ────────────────────────────────────────────────────────────────────────────────

  const data_source_renderer = filteredProd ? filteredProd : prodDetails // if filtered is currently in action -> use it as main



  let rendered_view = null
  switch (action) {
    case "view":
      rendered_view = <>
      <QcHistory clear_focus={onStopViewingTheProductHistory} focused_product_id={focusedProductId}/>
      <div style={{ marginLeft:-25,marginBottom:10 }} className="site-page-header-ghost-wrapper">
                <PageHeader
                ghost={false}
                title="สินค้า"
                subTitle="รายการสินค้าทั้งหมด"
                >
                </PageHeader>
      </div>
      <MainOperatorContainer>
        <div style={{ width:'100%' }}>
          <Search placeholder="เลขซีเรียลนัมเบอร์ที่ต้องการจะค้นหา" allowClear onSearch={onSearch} style={{ width: 285 }} />
        </div>
        <Button type="text">สินค้าทั้งหมด {prodDetails ? prodDetails.length : 0} ชิ้น</Button>
        <Button onClick={() => setAction("add")}>เพิ่มสินค้าเข้าระบบ</Button>
     </MainOperatorContainer>
     <Table onRow={(r) => ({onClick: () => console.log("lol")})} dataSource={data_source_renderer || []} rowKey="id" size="middle" pagination={{ pageSize:8 }} bordered loading={prodDetails===null}>
          <Column width="15%" title="ซีเรียลนัมเบอร์ (Serial_Number)" dataIndex="serial_number" key="serial_number" />
          <Column width="10%" title="รหัสสินค้า (SKU)" dataIndex="product_code" key="product_code" />
          <Column  align="center" width="10%" title="วันที่นำเข้าระบบ" render={(text,record) => {
            return <Moment format="D MMM YYYY" withTitle locale="th">{(record as IProductList).createdAt}</Moment>
          }} />
          <Column align="center" width="20%" title="การตรวจสอบคุณภาพ" render={(text,record) => {
            return <CenteredContainerBox>

              <Space>
                <Badge {...generateBadgePropFromQcStatus((record as IProductList).quality_passed) as BadgeProps}/>
                {(record as IProductList).is_in_queue ? <Badge status="processing" text="อยู่ในคิว"/> : null}
              </Space>
            </CenteredContainerBox>
          }} />
          <Column align="center" width="10%" title="ประวัติการตรวจสอบ" render={(text,record:IProductList) => {
            return <CenteredContainerBox>
              <Button onClick={setViewingProductHistory.bind(null,record)} type="primary" ghost disabled={(record as IProductList).quality_passed === null}>ดูประวัติ</Button>
            </CenteredContainerBox>
          }} />
          <Column align="center" width="20%" title="ตัวจัดการ" render={(text,record:IProductList) => {
              if(record.already_shipped && record.prod_manufact_code) return <span>สินค้าถูกส่งออกแล้ว</span>
              else if(record.prod_manufact_code && record.already_shipped===false) return <span>สินค้าอยู่ในกระบวนการส่งออก</span>
              return <CenteredContainerBox>
              <Space>
                <Button loading={productIdPendingInQueue === (record as IProductList).id} onClick={sendProductToQueue.bind(null,(record as IProductList).id)} type="primary" ghost disabled={(record as IProductList).is_in_queue}>ส่งไปตรวจสอบคุณภาพ</Button>
                <Button onClick={onClickLight.bind(null,(record as IProductList).serial_number)} danger ghost>ลบ</Button>
              </Space>
          </CenteredContainerBox>
          }} />
     </Table>
                      </>
      break;
  
    case "add":
      rendered_view = <ProductAdd on_success={() => {
        fetchAllProductList() // re-fetching the new list down here
        setAction.call(null,"view")
      }}/>
      break
    default:
      break;
  }

  return (
    <ControlledHeightContainer>
      {rendered_view}
    </ControlledHeightContainer>
  )
}

export default ProductList