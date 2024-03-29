import { Button, PageHeader, Space, Table, Tag, Tooltip,Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { API_GetAllProductManufactData } from '../../apis/deliberation.api'
import { IProductManufactData } from '../../shared/interfaces/deliberation.interfaces'
import { MainContainer } from './productManufact.styles'
import { DeleteOutlined , SearchOutlined} from'@ant-design/icons';
import ProductManufactDetailDrawer from './sub-component/ProductManufactDetailDrawer'
const {Column} = Table
const {Search} = Input
const ProductManufact = () => {
    const [prodManufactDatas,setProdManufactDatas] = useState<null | Array<IProductManufactData>>(null)
    const [focusedManufactKey,setFocusedManufactKey] = useState<null | string>(null)
    async function getAllProductManufactData(){
      const mapped_response = await API_GetAllProductManufactData()
      if(mapped_response.success){
        console.log(mapped_response)
        setProdManufactDatas(mapped_response.data)
      }else{
        // failed to get the prodmanu datas
      }
    }
    useEffect(() => {
      getAllProductManufactData()
    },[])

    //
    // ─── VIS HELPER ──────────────────────────────────────────────────
    //
    function createStatusTextTag(status:IProductManufactData['shipping_status']){
      if(status === null) return <Tag color="default">รอการจัดส่ง</Tag>
      else  if(status) return <Tag color="green">จัดส่งแล้ว</Tag>
      return  <Tag color="red">ถูกยกเลิก</Tag>
    }
    // ─────────────────────────────────────────────────────────────────

    function onChildComponentDoingAnyCRUDOperation(){
      getAllProductManufactData() // force - re fetching [FAST FIRST lol no time]
    }

    //
    // ─── SEARCH ─────────────────────────────────────────────────────────────────────
    //
    const [filteredProd,setFilteredProd] = useState<Array<any> | null>(null)
    function onSearch(value:string){
      if(!value) return setFilteredProd(null)
      const search_text = value.toLowerCase()
      setFilteredProd(prodManufactDatas!.filter(data => data.buyer_name.toLowerCase().includes(search_text) || data.product_name.toLowerCase().includes(search_text) || (data.buyer_contact || "").toLowerCase().includes(search_text)))
    }

    const data_source_renderer = filteredProd ? filteredProd : prodManufactDatas // if filtered is currently in action -> use it as main
    // ────────────────────────────────────────────────────────────────────────────────

    return (
      <MainContainer>
          <ProductManufactDetailDrawer on_crud={onChildComponentDoingAnyCRUDOperation} focused_generated_key={focusedManufactKey} visible={!!focusedManufactKey} back={setFocusedManufactKey.bind(null,null)}/>
          <div style={{ marginLeft: -20,marginBottom:25 }} className="site-page-header-ghost-wrapper">
              <PageHeader
              ghost={false}
              title="การจัดจำหน่าย"
              subTitle="ประวัติ"
              >
              </PageHeader>
          </div>
          <div style={{ width:'100%',marginBottom:20 }}>
                <Search placeholder="ชื่อสินค้า / ผู้ซื้อ / ติดต่อ" allowClear onSearch={onSearch} style={{ width: 285 }} />
          </div>
          <Table dataSource={data_source_renderer || []} bordered loading={data_source_renderer===null} size="middle" pagination={{ pageSize:8 }} rowKey="id" >
            <Column width="8%" align="center" title="รหัสสินค้า [SKU]" dataIndex="product_code" key="product_code"/>
            <Column align="center" title="ชื่อสินค้า" dataIndex="product_name" key="product_name"/>
            <Column width="5%" align="center" title="จำนวนสินค้า" render={(text,record:IProductManufactData) => {
              return  <Tag color="geekblue">{record.total_products} ชื้น</Tag>
            }}/>
            <Column align="center" title="ราคา" render={(text,record:IProductManufactData) => {
              return <Tag color="volcano">{record.price} บาท</Tag>
            }}/>
            <Column width="15%" align="center" title="ผู้ซื้อ" dataIndex="buyer_name" key="buyer_name"/>
            <Column align="center" title="ติดต่อ" render={(text,record:IProductManufactData) => {
              return <span>{record.buyer_contact || 'ไม่ระบุ'}</span>
            }}/>
            <Column onFilter={(value:any,record: IProductManufactData) => record.shipping_status === value} filters={
                  [
                    {text: "รอการจัดส่ง",value:null as unknown as any},
                    {text: "จัดส่งแล้ว",value:true},
                    {text: "ถูกยกเลิก",value:false},
                  ]
                } width="5%" align="center" title="สถานะ" render={(text,record:IProductManufactData) => {
              return createStatusTextTag(record.shipping_status)
            }}/>
            <Column width="5%" align="center" title="การจัดการ" render={(text,record:IProductManufactData) => {
               return  <Space>
               <Tooltip placement="bottom" title="จัดการเพิ่มเติม">
                   <Button disabled={record.shipping_status===false} onClick={setFocusedManufactKey.bind(null,record.generated_key)} type="primary" ghost shape="circle" icon={<SearchOutlined />} size="middle" />
               </Tooltip>
               {/* <Tooltip placement="bottom" title="ลบพนักงานออกจากระบบ">
                   <Button ghost danger shape="circle" icon={<DeleteOutlined />} size="middle" />
               </Tooltip> */}
              </Space>
            }}/>
          </Table>
      </MainContainer>
    )
}

export default ProductManufact