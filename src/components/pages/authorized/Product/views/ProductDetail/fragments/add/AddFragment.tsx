import React from 'react'
import { MainContainer } from './addFragment.styles'
import {Button, Form,Input, PageHeader, Upload} from 'antd'
import {InboxOutlined} from '@ant-design/icons'
import { API_AddProductDetail } from '../../../../apis/product.api'
import { ICreateProductDetailDTO, IProductDetail } from '../../../../shared/interfaces/product.interfaces'
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'

import {SPLITTER_STR} from '../../../../../../../../config/STATIC.json'
import { toast } from 'react-toastify'
import { ERROR_TOAST_OPTION } from '../../../../../../../../shared/options/toast.option'

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
    /*console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;*/
  };

interface Props{
    onSuccess: (prod:IProductDetail) => void
    onCancel: () => void
}

const AddFragment:React.FC<Props> = ({onSuccess,onCancel})  => {
    const [form] = useForm()
    let image_path : string | null =null;
    let image_upload_list: Array<{uid:string,path:string}> = []
    function onImageUploaded(event: UploadChangeParam<UploadFile<any>>){
        const {status,response,uid} = event.file
        if(status === 'uploading') return // ignore
        else if(status === 'removed'){
            console.log('removing picture with uid: ' + uid)
            image_upload_list = image_upload_list.filter(data => data.uid!==uid)
            console.log(image_upload_list)
            return
        }
        if(response.success){
            image_upload_list.push({uid,path:response.stored_path})

        }

    }


    async function onAddProduct(){
        // This will be triggered on the onFinish callback (means it is already validated)
        const post_data = form.getFieldsValue() as ICreateProductDetailDTO
        const upload_list = image_upload_list.map(data => data.path)
        const images_path = upload_list.join(SPLITTER_STR) || null
        post_data.images_path = images_path
        const mapped_response = await API_AddProductDetail(post_data)
        if(mapped_response.success){
            // send callback to the parent that additional callback is done
            console.log('done')
            onSuccess(mapped_response.data)
            toast.success('เพิ่มรายละเอียดสินค้าเรียบร้อยแล้ว',ERROR_TOAST_OPTION)
        }else{
            // failed to add
            console.log('failed to create prod-detail')
            toast.success('เกิดข้อผิดพลาดในการเพิ่มรายละเอียดสินค้า',ERROR_TOAST_OPTION)
        }
    }
    return (
        <MainContainer>
           <div style={{ marginBottom:10 }} className="site-page-header-ghost-wrapper">
          <PageHeader
          ghost={false}
          title="เพิ่ม"
          subTitle="รายละเอียดของสินค้า (sku)"
          onBack={onCancel}
          >
          </PageHeader>
      </div> 
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
                            <Upload.Dragger multiple={true}  name="file" action="http://localhost:3000/api/upload/image-single" maxCount={100}  onChange={onImageUploaded}>
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