import { Button, Form, Input, InputNumber, Modal, PageHeader } from 'antd'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import { ERROR_TOAST_OPTION } from '../../../../../../../../shared/options/toast.option';
import { IProductDetail } from '../../../../../Product/shared/interfaces/product.interfaces';
import { API_CreateProductManufactShippingRequest } from '../../../../apis/deliberation.api';

const {useForm} = Form

const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 14 },
  },
};

interface IProps{
    back: () => void
    visible: boolean
    product_detail: IProductDetail | null
    on_crud:() => any
}

const ProdManufactExportModal:React.FC<IProps> = ({back,visible,product_detail,on_crud}) => {
  const [form] = useForm()
  const number_of_product_ready_to_be_shipped = product_detail?.product_entity?.filter(prod => prod.quality_passed && prod.prod_manufact_code === null).length
  useEffect(() => {
    if(!product_detail) return
    const number_of_product_ready_to_be_shipped = product_detail?.product_entity?.filter(prod => prod.quality_passed && prod.prod_manufact_code === null).length
    form.setFieldsValue({label_total_products:number_of_product_ready_to_be_shipped})
  },[product_detail])

  async function onCreatingShippingRequest(){
    const fieldData = form.getFieldsValue()
    fieldData.product_name = product_detail?.product_name
    fieldData.product_code = product_detail?.product_code
    console.log(fieldData)

    const mapped_response = await API_CreateProductManufactShippingRequest(fieldData)
    if(mapped_response.success){
        on_crud() // trigger an action when any operation happended
        form.resetFields()
        toast.success('การจัดจำหน่ายส่งออกสินค้าได้ถูกสร้างขึ้นเรียบร้อยแล้ว',ERROR_TOAST_OPTION)
        back() // close the modal
    }else{
        toast.error('เกิดข้อผิดพลาดในการการจัดจำหน่ายส่งออกสินค้า กรุณาลองใหม่อีกครั้ง',ERROR_TOAST_OPTION)
        // @NOTE -> somethings happen to the entity itself -> and the number of available product to export is not equal with the one that being shown on the frontend side
    }


  }
  return (
        <Modal style={{ fontFamily:'Kanit' }} closable={false} footer={null} centered onCancel={back} visible={visible} width={600}>
            <div style={{ marginBottom:25,marginLeft:-20 }} className="site-page-header-ghost-wrapper">
                <PageHeader
                ghost={false}
                onBack={back}
                title="การจัดจำหน่าย"
                subTitle="ส่งออกสินค้า"
                >
                </PageHeader>
            </div>
                <Form onFinish={onCreatingShippingRequest} style={{ display:'flex',justifyContent:'center',flexDirection:'row',alignContent:'center'}} form={form} {...formItemLayout}>
                    <div style={{ width:'80%' }}>
                        <Form.Item
                                // style={{ width:"50%" }}
                                name="label_total_products"
                                label="ส่งออกได้"
                            >
                            <Input style={{ width:"20%",textAlign:'center' }} disabled={true} />
                        </Form.Item>
                        <Form.Item
                                // style={{ width:"50%" }}
                                name="total_products"
                                label="จำนวนที่ต้องการจะส่งออก"
                                rules={[
                                {
                                    required: true,
                                    message: 'กรุณาระบุจำนวนที่ต้องการจะส่งออก',
                                },
                                ]}
                            >
                            <InputNumber type="number" min={1}  max={number_of_product_ready_to_be_shipped!} style={{ width:"40%",textAlign:'center' }} />
                        </Form.Item>
                        <Form.Item
                                // style={{ width:"50%" }}
                                name="price"
                                label="ราคาที่ต้องการจะขาย (บาท)"
                                rules={[
                                {
                                    required: true,
                                    message: 'กรุณาระบุราคา',
                                },
                                ]}
                            >
                            <InputNumber type="number" min={1} style={{ width:"40%",textAlign:'center' }} />
                        </Form.Item>        
                        <Form.Item
                                name="buyer_name"
                                label="จัดส่งให้"
                                tooltip="ชื่อผู้ซื้อ"
                                rules={[
                                {
                                    required: true,
                                    message: 'กรุณาระบุชื่อผู้ซื้อ',
                                },
                                ]}
                            >
                            <Input style={{textAlign:'center' }} />
                        </Form.Item>       
                        <Form.Item
                                name="buyer_contact"
                                label="เบอร์ / อีเมล์ ติดต่อ"
                                tooltip="เบอร์หรืออีเมล์ ที่สามารถติดต่อถึงผู้ซื้อได้"
                                rules={[
                                {
                                    required: false,
                                },
                                ]}
                            >
                            <Input style={{textAlign:'center' }} />
                        </Form.Item>       
                        {/* <Form.Item wrapperCol={{ sm:{span:13,offset:9} }}> */}
                            <Button style={{ marginTop:25 }} type="primary" htmlType="submit" block>
                                ส่งออกสินค้าเพื่อจัดจำหน่าย
                            </Button>
                        {/* </Form.Item> */}
                    </div>        
                </Form>
        </Modal>
  )
}

export default ProdManufactExportModal