import React, { useEffect, useState } from 'react'
import Navbar from '../../../../../common/navbar'
import { API_GetAllProductDetail, API_RemoveProductDetail } from '../../apis/product.api'
import { IProductDetail } from '../../shared/interfaces/product.interfaces'
import {Table,Button, Space, PageHeader, Image} from 'antd'
import { ContentContainer, MainOperatorContainer } from './productDetail.styles'
import { CenteredContainerBox } from '../../../../../../shared/styles/common'
import AddFragment from './fragments/add/AddFragment'

import {SPLITTER_STR,SERVER_ADDRESS} from '../../../../../../config/STATIC.json'

import { onConfirm } from 'react-confirm-pro';
import ImagePreviewer from '../../../../../common/ImagePreviewer'
import {Input} from 'antd'

const {Search} = Input

const {Column} = Table

type TActions = "view" | "add"

const ProductDetail = () => {
  const [action,setAction] = useState<TActions>("view")
  const [prodDetails,setProdDetails] = useState<Array<IProductDetail> | null>(null)
  const [focusedImageList,setFocusedImageList] = useState<Array<string>|null>(null)
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

  
  //
  // ─── SEARCH ─────────────────────────────────────────────────────────────────────
  //
  const [filteredProd,setFilteredProd] = useState<Array<any> | null>(null)
  function onSearch(value:string){
    if(!value) return setFilteredProd(null)
    const search_text = value.toLowerCase()
    setFilteredProd(prodDetails!.filter(data => data.product_code.toLowerCase().includes(search_text) || data.product_name.toLowerCase().includes(search_text)))
  }
  
  const data_source_renderer = filteredProd ? filteredProd : prodDetails // if filtered is currently in action -> use it as main
  // ────────────────────────────────────────────────────────────────────────────────


  let rendered_view = null
  switch (action) {
    case "view":
      rendered_view = <>
      <div style={{ marginLeft:-25,marginBottom:10 }} className="site-page-header-ghost-wrapper">
          <PageHeader
          ghost={false}
          title="รายละเอียดสินค้า"
          subTitle="รายละเอียดของสินค้าทั้งหมด"
          >
          </PageHeader>
      </div>
        <MainOperatorContainer>
        <div style={{ width:'100%' }}>
          <Search placeholder="รหัสสินค้า / ชื่อสินค้า" allowClear onSearch={onSearch} style={{ width: 285 }} />
        </div>
          <Button onClick={() => setAction("add")}>เพิ่มรายละเอียด</Button>
        </MainOperatorContainer>
        <Table onRow={(r) => ({onClick: () => console.log("lol")})} dataSource={data_source_renderer || []} rowKey="id" size="middle" pagination={{ pageSize:8 }} bordered loading={data_source_renderer===null}>
          <Column title="รหัสสินค้า (SKU)" dataIndex="product_code" key="product_code" />
          <Column title="ชื่อสินค้า" dataIndex="product_name" key="product_name" />
          <Column title="รายละเอียด" dataIndex="product_description" key="product_description" />
          <Column align="center" width={100} title="รูปภาพ" render={(text,record:IProductDetail) => {
              let rendered_element = null
              if(record.images_path){
                const images_array = record.images_path.split(SPLITTER_STR)
                return <img style={{ cursor:'pointer' }} onClick={setFocusedImageList.bind(null,images_array)} width={50} height={50} src={`${SERVER_ADDRESS}${images_array[0]}`}/>
              }
              return <span>ไม่มีรูปภาพ</span>
          }}/>
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
      <ImagePreviewer visible={focusedImageList!==null} on_close={setFocusedImageList.bind(null,null)} images_list={focusedImageList}/>
      <ContentContainer>
        {rendered_view}
      </ContentContainer>
    </div>
  )
}


export default ProductDetail