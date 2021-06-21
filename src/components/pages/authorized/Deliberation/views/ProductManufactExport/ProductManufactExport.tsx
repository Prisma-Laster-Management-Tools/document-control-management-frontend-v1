import { Button, PageHeader, Space, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { API_GetAllProductDetail } from '../../../Product/apis/product.api'
import { IProductDetail } from '../../../Product/shared/interfaces/product.interfaces'
import { MainContainer } from './productManufactExport.styles'
import { DeleteOutlined , ExportOutlined} from'@ant-design/icons';
import ProdManufactExportModal from './sub-components/ProdManufactExportModal/ProdManufactExportModal'
const {Column} = Table

export default function ProductManufactExport() {
    const [prodDetails,setProdDetails] = useState<null | Array<IProductDetail>>(null)
    //const [isInExportation,setIsInExportation] = useState<boolean>(false)
    const [focusedProductDetail,setFocusedProductDetail] = useState<null | IProductDetail>(null)
    async function getAllProductDetailData(){
      const mapped_response = await API_GetAllProductDetail({with_product:true})
      if(mapped_response.success){
        console.log(mapped_response)
        setProdDetails(mapped_response.data)
      }else{
        // failed to get the prodmanu datas
      }
    }
    useEffect(() => {
        getAllProductDetailData()
    },[])

    function onTriggerExportationModal(record:IProductDetail){
        //setIsInExportation(true)
        setFocusedProductDetail(record)
    }

    function onChildComponentDoAnyCRUDOperation(){
        // force re-fetching the latest data
        getAllProductDetailData()
    }

    return (
        <MainContainer>
            <ProdManufactExportModal on_crud={onChildComponentDoAnyCRUDOperation} product_detail={focusedProductDetail} visible={focusedProductDetail!== null} back={setFocusedProductDetail.bind(null,null)}/>
            <div style={{ marginLeft: -20,marginBottom:25 }} className="site-page-header-ghost-wrapper">
                    <PageHeader
                    ghost={false}
                    title="การจัดจำหน่าย"
                    subTitle="ส่งสินค้าออกจำหน่าย"
                    >
                    </PageHeader>
            </div>
            <Table dataSource={prodDetails || []} bordered loading={prodDetails===null} size="middle" pagination={{ pageSize:8 }} rowKey="id" >
                <Column width="8%" align="center" title="รหัสสินค้า [SKU]" dataIndex="product_code" key="product_code"/>
                <Column width="8%" align="center" title="ชื่อสินค้า" dataIndex="product_name" key="product_name"/>
                <Column width="10%" align="center" title="สินค้าที่รอ qc" render={(text,record:IProductDetail) => {
                    // We will filtered the on in queue out [but for now i think this is enough]
                    // return <span>{record.product_entity?.filter(data => data.quality_passed && !data.is_in_queue).length} ชื้น</span>
                    
                    return <span>{record.product_entity?.filter(data => data.quality_passed!==true&&data.prod_manufact_code===null).length} ชื้น</span>
                }}/>
                <Column width="10%" align="center" title="จำนวนที่พร้อมส่งออก" render={(text,record:IProductDetail) => {
                    // We will filtered the on in queue out [but for now i think this is enough]
                    // return <span>{record.product_entity?.filter(data => data.quality_passed && !data.is_in_queue).length} ชื้น</span>
                    return <span>{record.product_entity?.filter(data => data.quality_passed && data.prod_manufact_code === null).length} ชื้น</span>
                }}/>
                 <Column width="5%" align="center" title="การจัดการ" render={(text,record:IProductDetail) => {
                    return  <Space>
                        <Tooltip placement="bottom" title="ส่งสินค้าออกจำหน่าย">
                            <Button onClick={onTriggerExportationModal.bind(null,record)} type="primary" ghost shape="circle" icon={<ExportOutlined />} size="middle" />
                        </Tooltip>
                        {/* <Tooltip placement="bottom" title="ลบพนักงานออกจากระบบ">
                            <Button ghost danger shape="circle" icon={<DeleteOutlined />} size="middle" />
                        </Tooltip> */}
                        </Space>
            }   }/>
            </Table>
        </MainContainer>
    )
}
