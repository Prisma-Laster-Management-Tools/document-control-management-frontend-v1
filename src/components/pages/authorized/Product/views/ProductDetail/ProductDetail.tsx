import React, { useEffect, useState } from 'react'
import Navbar from '../../../../../common/navbar'
import { API_GetAllProductDetail, API_RemoveProductDetail } from '../../apis/product.api'
import { IProductDetail } from '../../shared/interfaces/product.interfaces'
import {Table,Button, Space} from 'antd'
import { ContentContainer, MainOperatorContainer } from './productDetail.styles'
import { CenteredContainerBox } from '../../../../../../shared/styles/common'
import AddFragment from './fragments/add/AddFragment'



import { onConfirm } from 'react-confirm-pro';

const {Column} = Table

type TActions = "view" | "add"

const ProductDetail = () => {
  const [action,setAction] = useState<TActions>("view")
  const [prodDetails,setProdDetails] = useState<Array<IProductDetail> | null>(null)
  async function fetchAllProductDetail(){
    const mapped_response = await API_GetAllProductDetail()
    if(mapped_response.success){
      setProdDetails(mapped_response.data)
    }else{
      // failed to fetch the data
    }
  }
  async function onRemoveProductDetail(product_code:string){
    const mapped_response = await API_RemoveProductDetail(product_code)
    if(mapped_response.success){
      //removal success
      const copied_data = [...prodDetails!]
      const new_data = copied_data.filter((data) => data.product_code !== product_code)
      setProdDetails(new_data)
    }else{
      console.log('removal failed')
    }
  }

  useEffect(() => {
    fetchAllProductDetail()
  },[])

  // DERIVES CB
  function onSuccessAddingProduct(prod:IProductDetail){
    setProdDetails(prevState => ([...prevState as Array<IProductDetail>,prod]))
    setAction("view") // redirect back
  }
  // ────────────────────────────────────────────────────────────────────────────────

  const onClickLight = (product_code:string) => {
    onConfirm({
      title: (
        <h3>
          โปรดยืนยัน
        </h3>
      ),
      description: (
        <p>คุณแน่ใจหรอว่าคุณต้องการที่จะลบรหัสสินค้าของ {product_code}</p>
      ),
      onSubmit: () => {
        onRemoveProductDetail(product_code)
      },
      onCancel: () => {
        //do nothings
      },
      btnCancel:"ยกเลิก",
      btnSubmit:"ยืนยัน"
    })
  };

  let rendered_view = null
  switch (action) {
    case "view":
      rendered_view = <>
              <MainOperatorContainer>
          <Button onClick={() => setAction("add")}>เพิ่มรายละเอียด</Button>
        </MainOperatorContainer>
        <Table onRow={(r) => ({onClick: () => console.log("lol")})} dataSource={prodDetails || []} rowKey="id" size="middle" pagination={{ pageSize:8 }} bordered loading={prodDetails===null}>
          <Column title="รหัสสินค้า (SKU)" dataIndex="product_code" key="product_code" />
          <Column title="ชื่อสินค้า" dataIndex="product_name" key="product_name" />
          <Column title="รายละเอียด" dataIndex="product_description" key="product_description" />
          <Column width={50} title="การจัดการ" render={(text,record) => {
            return <CenteredContainerBox>
                <Space size="middle">
                  <Button type="primary" ghost>แก้ไข</Button>
                  <Button onClick={onClickLight.bind(null,(record as IProductDetail).product_code)} danger>ลบ</Button>
                </Space>
            </CenteredContainerBox>
          }}/>
        </Table>
      </>
      break;

    case "add":
      rendered_view = <AddFragment onCancel={setAction.bind(null,"view")} onSuccess={onSuccessAddingProduct}/>
      break
  
    default:
      break;
  }

  return (
    <div>
      {/* <Navbar/> */}
      <ContentContainer>
        {rendered_view}
      </ContentContainer>
    </div>
  )
}


export default ProductDetail