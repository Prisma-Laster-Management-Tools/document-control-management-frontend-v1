import { Button, Descriptions, Divider, Drawer, PageHeader, Space, Spin, Table, Tag, Upload } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { ERROR_TOAST_OPTION } from '../../../../../../../shared/options/toast.option'
import { downloadAs } from '../../../../../../../utilities/downloader/downloaderAs'
import { API_CancelShippingProduct, API_GetProductManufactData, API_UploadProductManufactShippingEvidence } from '../../../apis/deliberation.api'
import { IProductManufactData } from '../../../shared/interfaces/deliberation.interfaces'
import {SERVER_ADDRESS} from '../../../../../../../config/STATIC.json'
const {Column} = Table
interface IProps{
    visible: boolean
    back: () => any
    focused_generated_key:string | null
    on_crud: () => any
}

const ProductManufactDetailDrawer:React.FC<IProps> =  ({visible,back,focused_generated_key,on_crud}) => {
    const [manufactData,setManufactData] = useState<null | IProductManufactData>(null)

    async function getProductManufactData(generated_key:string){
        console.log('TODO fetching ' + generated_key)
        const mapped_response = await API_GetProductManufactData(generated_key)
        if(mapped_response.success){
            setManufactData(mapped_response.data)
            //console.log(mapped_response.data)
        }else{
            //failed to get the manufact data
        }
    }

    useEffect(()=> {
        if(!focused_generated_key) return
        getProductManufactData(focused_generated_key)

    },[focused_generated_key])

    async function onCancelShippingProcess(){
        if(!focused_generated_key) return
        const mapped_response = await API_CancelShippingProduct(focused_generated_key)
        if(mapped_response.success){
            back()
            on_crud() // trigger the mom's component
            toast.success('ยกเลิกการจัดส่งเรียบร้อยแล้ว',ERROR_TOAST_OPTION)
        }else{
            // failed to cancel the shipping request
            toast.error('เกิดข้อผิดพลาดในการยกเลิกการจัดส่ง',ERROR_TOAST_OPTION)
        }
    }
    const uploadShippingEvidence = async (options:any) => {
        if(!focused_generated_key) return
        const { onSuccess, onError, file, onProgress } = options;
    
        const fmData = new FormData();
        console.log(file)
        fmData.append("file", file);

        const mapped_response = await API_UploadProductManufactShippingEvidence(focused_generated_key,fmData)
        if(mapped_response.success){
            onSuccess("Ok");
            toast('✔️ หลักฐานการจัดส่งของคุณได้ถูกส่งไปแล้ว', ERROR_TOAST_OPTION)
            setManufactData(prevState => ({...prevState!,...mapped_response.data})) // replace with the new one [can't because it will remove the nest product inside] <SO WE MERGE IT>
            on_crud() // trigger mom's component to do the refresh

        }else{
            const error = new Error("Some error happended");
            onError({ err:error });
            toast.error('ไม่สามารถส่งหลักฐานการจัดส่งได้ กรุณาลองใหม่อีกครั้ง', ERROR_TOAST_OPTION)
        }

        // const mapped_response = await API_ClientUploadEvidence(RouteParams.confirmation_token,fmData)
        // if(mapped_response.success){
        //     onSuccess("Ok");
        //     setRequestData(prevState => ({...prevState!,delivery_attachments:mapped_response.data.delivery_attachments}))
        //     toast('✔️ หลักฐานการจัดส่งของคุณได้ถูกส่งไปแล้ว', ERROR_TOAST_OPTION)
        // }else{
        //     const error = new Error("Some error");
        //     onError({ err:error });
        //     toast.error('ไม่สามารถส่งหลักฐานการจัดส่งได้ กรุณาลองใหม่อีกครั้ง', ERROR_TOAST_OPTION)
        // }
    };

    function onViewShippingEvidence(){
        downloadAs(`${SERVER_ADDRESS}${manufactData?.shipping_evidence}`,`หลักฐาน_การจัดส่ง_${manufactData?.generated_key}`)
    }

    const rendered_operation_btn = useMemo(() => {
        if(!manufactData) return null
        if(manufactData.shipping_status === null){
            return                 <Space>
            <Button onClick={onCancelShippingProcess} type="primary" danger>
            ยกเลิกการจัดส่ง
            </Button>
            <Upload accept=".pdf,.png,.jpg,.jpeg" customRequest={uploadShippingEvidence}>
                <Button type="primary">
                    เพิ่มหลักฐานการจัดส่ง
                </Button>
            </Upload>
        </Space>
        }else if(manufactData.shipping_status === true){
            return  <Button onClick={onViewShippingEvidence} type="ghost">
                ดูหลักฐานการจัดส่ง
            </Button>
        }
        // we dont have to do the case for false -> because the button out there is already disabled and there is no way they can access to this drawer
    },[manufactData])

    return (
        <Drawer
        title={null}
        width={500}
        closable={false}
        onClose={back}
        visible={visible}
        >
            <div style={{ marginBottom:0,fontFamily:'Kanit' }} className="site-page-header-ghost-wrapper">
                <PageHeader
                ghost={false}
                onBack={back}
                title="การจัดจำหน่าย"
                subTitle="รายละเอียด"
                >

                    {
                        manufactData ? 
                        <Descriptions size="middle" column={2}>
                            <Descriptions.Item>
                                <Tag color="default">สินค้า</Tag><span>{manufactData.product_name}</span>
                            </Descriptions.Item>
                            <Descriptions.Item>
                                <Tag color="default">จำนวน</Tag><span>{manufactData.total_products} ชื้น</span>
                            </Descriptions.Item>
                            <Descriptions.Item>
                                <Tag color="default">ผู้ซื้อ</Tag><span>{manufactData.buyer_name} {manufactData.buyer_contact ? `- ${manufactData.buyer_contact}` : null}</span>
                            </Descriptions.Item>
                    </Descriptions>
                        
                        : <Spin/>
                    }
                </PageHeader>
            </div>

            <div style={{ width:'100%',display:'flex',justifyContent:'flex-end',marginBottom:25 }}>
                {rendered_operation_btn}
            </div>

            <Divider/>


            <Table style={{ fontFamily:'Kanit' }} dataSource={manufactData?.product || []} loading={manufactData===null} rowKey="id" size="large" pagination={{pageSize:20}} bordered>
                    <Column align="center" width="15%" title="รหัสสินค้า [SKU]" dataIndex="product_code" key="product_code" />
                    <Column align="center" width="15%" title="ซีเรียลนัมเบอร์" dataIndex="serial_number" key="serial_number" />
                    {/* <Column title="สถานะ" align="center" width="5%" render={(text,record:IProductManufactData['product']) => {
                        return record.check_status ? <span style={{ color:'green' }}>ผ่าน</span> : <span style={{ color:'red' }}>ไม่ผ่าน</span>
                    }}/> */}
            </Table>
        </Drawer>
    )
}

export default ProductManufactDetailDrawer