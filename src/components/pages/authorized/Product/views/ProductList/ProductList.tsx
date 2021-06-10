import React, { useEffect, useState } from 'react'
import { CenteredContainerBox, ContentContainer } from '../../../../../../shared/styles/common'
import {Table,Button, Space, Badge, BadgeProps } from 'antd'
import { IProductList } from '../../shared/interfaces/product.interfaces'
import { API_GetAllProduct } from '../../apis/product.api'
import Moment from 'react-moment'
import { MainOperatorContainer } from '../ProductDetail/productDetail.styles'
import ProductAdd from '../ProductAdd'
import { ControlledHeightContainer } from './productList.styles'
const {Column} = Table

type TQcStatus = null | boolean
type TActions = "view" | "add"
export const ProductList:React.FC = () => {
  const [prodDetails,setProdDetails] = useState<Array<IProductList> | null>(null)
  const [action,setAction] = useState<TActions>("view")

  async function fetchAllProductList(){
    const mapped_response = await API_GetAllProduct()
    if(mapped_response.success){
      console.log(mapped_response)
      setProdDetails(mapped_response.data.data.data) // nested 3 lol -> cuz of the pagination support [but we ignore that for a moment]
    }else{
      // failed to fetch
    }
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

  let rendered_view = null
  switch (action) {
    case "view":
      rendered_view = <>
      <MainOperatorContainer>
        <Button type="text">สินค้าทั้งหมด {prodDetails ? prodDetails.length : 0} ชิ้น</Button>
        <Button onClick={() => setAction("add")}>เพิ่มสินค้าเข้าระบบ</Button>
     </MainOperatorContainer>
     <Table onRow={(r) => ({onClick: () => console.log("lol")})} dataSource={prodDetails || []} rowKey="id" size="middle" pagination={{ pageSize:8 }} bordered loading={prodDetails===null}>
          <Column width="15%" title="ซีเรียลนัมเบอร์ (Serial_Number)" dataIndex="serial_number" key="serial_number" />
          <Column width="10%" title="รหัสสินค้า (SKU)" dataIndex="product_code" key="product_code" />
          <Column  align="center" width="10%" title="วันที่นำเข้าระบบ" render={(text,record) => {
            return <Moment format="D MMM YYYY" withTitle>{(record as IProductList).createdAt}</Moment>
          }} />
          <Column align="center" width="20%" title="การตรวจสอบคุณภาพ" render={(text,record) => {
            return <CenteredContainerBox>

              <Space>
                <Badge {...generateBadgePropFromQcStatus((record as IProductList).quality_passed) as BadgeProps}/>
                {(record as IProductList).is_in_queue ? <Badge status="processing" text="อยู่ในคิว"/> : null}
              </Space>
            </CenteredContainerBox>
          }} />
          <Column align="center" width="10%" title="ประวัติการตรวจสอบ" render={(text,record) => {
            return <CenteredContainerBox>
              <Button type="primary" ghost disabled={(record as IProductList).quality_passed === null}>ดูประวัติ</Button>
            </CenteredContainerBox>
          }} />
          <Column align="center" width="20%" title="ตัวจัดการ" render={(text,record) => {
            return <CenteredContainerBox>
                <Space>
                  <Button type="primary" ghost disabled={(record as IProductList).is_in_queue}>ส่งไปตรวจสอบคุณภาพ</Button>
                  <Button danger ghost>ลบ</Button>
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