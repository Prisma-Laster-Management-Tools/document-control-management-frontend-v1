import React from 'react'
import { MainContainer } from './addFragment.styles'
import {Button, Form,Input, Upload} from 'antd'
import {InboxOutlined} from '@ant-design/icons'
import { API_AddProductDetail } from '../../../../apis/product.api'
import { ICreateProductDetailDTO, IProductDetail } from '../../../../shared/interfaces/product.interfaces'

const {useForm} = Form

const formItemLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 19 },
    },
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

interface Props{
    onSuccess: (prod:IProductDetail) => void
    onCancel: () => void
}

const AddFragment:React.FC<Props> = ({onSuccess,onCancel})  => {
    const [form] = useForm()
    async function onAddProduct(){
        // This will be triggered on the onFinish callback (means it is already validated)
        const post_data = form.getFieldsValue() as ICreateProductDetailDTO
        const mapped_response = await API_AddProductDetail(post_data)
        if(mapped_response.success){
            // send callback to the parent that additional callback is done
            console.log('done')
            onSuccess(mapped_response.data)
        }else{
            // failed to add
            console.log('failed to create prod-detail')
        }
    }
    return (
        <MainContainer>
            <h1>เพิ่มรายละเอียดรหัสสินค้า (sku)</h1> 
            <div style={{ width:"50%",alignSelf:'center' }}>
                <Form form={form} onFinish={onAddProduct} {...formItemLayout}>
                    <Form.Item
                            // style={{ width:"50%" }}
                            name="product_code"
                            label="รหัสสินค้า (sku)"
                            rules={[
                            {
                                required: true,
                                message: 'กรุณาระบุรหัสสินค้า (Ex. SKUXXX)',
                            },
                            ]}
                        >
                        <Input />
                    </Form.Item>
                    <Form.Item
                            // style={{ width:"50%" }}
                            name="product_name"
                            label="ชื่อสินค้า"
                            rules={[
                            {
                                required: true,
                                message: 'กรุณาระบุชื่อสินค้า',
                            },
                            ]}
                        >
                        <Input />
                    </Form.Item>
                    <Form.Item
                            // style={{ width:"50%" }}
                            name="product_description"
                            label="รายละเอียด"
                            rules={[
                            {
                                required: true,
                                message: 'กรุณาระบุรายละเอียดสินค้า',
                            },
                            ]}
                        >
                        <Input />
                    </Form.Item>
                    <Form.Item label="รูปภาพสิ่งของ">
                        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                            <Upload.Dragger onChange={({file,fileList }) => {
                                 if (file.status !== 'uploading') {
                                    console.log(file, fileList);
                                  }
                            }}  name="files" action="http://localhost:3000/upload.do">
                                <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">คลิกหรือลากไฟล์ เพื่อใส่รูปภาพให้กับสินค้า</p>
                                <p className="ant-upload-hint">รองรับหลายรูปภาพ</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item wrapperCol={{ sm:{span:19,offset:5} }}>
                        <Button type="primary" htmlType="submit" block>
                            สร้างรายละเอียดสินค้า
                        </Button>
                        <Button onClick={onCancel} danger block>
                            ยกเลิก
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </MainContainer>
    )
}

export default AddFragment