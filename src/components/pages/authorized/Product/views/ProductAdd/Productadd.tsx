import React, { useEffect, useState } from 'react'
import Navbar from '../../../../../common/navbar'
import { Menu, Upload, Divider , Button, Dropdown,Input,Form } from 'antd';
import { DownOutlined, UserOutlined, UploadOutlined , InboxOutlined } from '@ant-design/icons';
import { BoxContainer2, BoxContainer, ProductMainContainer, UploadImage, NoteText, UploadfileBtn, ReportText, AddText, SelectText, SelextManualContainer, SelectText2, SelectTextSN, ErrorText, UploadImageCon, DiviDIV, FormItemStyled, InputStyled } from './Productadd.styles'
import { ICreateProductDTO, IProductDetail } from '../../shared/interfaces/product.interfaces';
import { API_CreateProduct, API_GetProductDetails } from '../../apis/product.api';
import { useForm } from 'antd/lib/form/Form';
import { ERROR_TOAST_OPTION } from '../../../../../../shared/options/toast.option';
import { toast } from 'react-toastify';
import { sleep } from '../../../../../../utilities/fake-loader/fakeLoader';

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
};

interface Props{
  on_success: () => void
}


const Productadd:React.FC<Props> = ({on_success}) => {
  const [prodDetails,setProdDetails] = useState<Array<IProductDetail>>([])
  const [createProductCred,setCreateProductCred] = useState<ICreateProductDTO>({product_code:'',serial_number:''})
  const [currentProductDisplayTxt,setCurrentProductDisplayTxt] = useState('')
  const [takenSerials,setTakenSerial] = useState<Array<string>>([])
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const [form] = useForm()
  async function getAllProductDetails(){
    const mapped_response = await API_GetProductDetails()
    if(mapped_response.success){
      console.log('here')
      setProdDetails(mapped_response.data)
    }else{
      //failed
      console.log(mapped_response)
    }
  }

  async function addProductToTheList(){
    const post_data = form.getFieldsValue() as ICreateProductDTO
    post_data.product_code = createProductCred.product_code
    setIsLoading(true)
    await sleep(1000) // fake loader
    const mapped_response = await API_CreateProduct(post_data)
    if(mapped_response.success){
      console.log('success creating product')
      toast.success('สินค้าได้ถูกเพิ่มลงในระบบเรียบร้อยแล้ว',ERROR_TOAST_OPTION);
      on_success() // redirect back
    }else{
      // failed creating product
        if(mapped_response.data.message === "Key already exist"){
          // Serial number already taken
          toast.error('ซีเรียลนัมเบอร์นี้มีอยู่แล้วในคลังสินค้า',ERROR_TOAST_OPTION);
          setTakenSerial((prevState) => ([...prevState,post_data.serial_number]))
          form.validateFields() // trigger an update for the form itslef -> to automatically show that the serial already taken on the form
          // • • • • •

        }
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getAllProductDetails()
  },[])

    const menu = (
        <Menu style={{ maxHeight:"300px",overflow:'hidden',overflowY:'auto' }}>

        {prodDetails.map((prod) => 
          <Menu.Item onClick={() => {
            setCreateProductCred(prevState => ({...prevState,product_code: prod.product_code}))
            setCurrentProductDisplayTxt(`${prod.product_code} - ${prod.product_name}`)
            form.setFieldsValue({product_code:`${prod.product_code} - ${prod.product_name}`})
          }} key={prod.id} icon={<InboxOutlined />}>
            {prod.product_code} - {prod.product_name}
          </Menu.Item>)}

        </Menu>
      );
    return (
        <Form onFinish={addProductToTheList} form={form}>
            {/* <Navbar/> */}
            <ProductMainContainer>

            {/* ADD WITH FILE */}
                <BoxContainer>
                    <UploadImageCon>
                      <UploadImage/>
                    </UploadImageCon>
                    <Upload {...props}
                    style={{width:"100%", color:"black"}}
                    >
                        <Button icon={<UploadOutlined />}>เลือกไฟล์อัพโหลด</Button>
                    </Upload>
                    <ReportText>จำนวนของลิสต์สินค้าที่ตรวจสอบได้ จำนวน : 23 รายการ</ReportText>
                    <NoteText>***หมายเหตุ ไฟล์ที่อัพโหลดจะต้องเป็นสกุล .csv หรือ .xlsx เท่านั้น</NoteText>
                    <div>Download Example</div>
                    <UploadfileBtn>อัพโหลดไฟล์ข้อมูลสินค้า</UploadfileBtn>
                </BoxContainer>
            
            {/* ADD MANUAL */}
                <BoxContainer2>

                      <AddText>เพื่มข้อมูลจากประเภทในระบบ</AddText>
                      <DiviDIV>
                        <Divider />
                      </DiviDIV>
                      <SelectText>เลือกผลิตภัณฑ์</SelectText>
                      <SelextManualContainer>
                          <Dropdown overlay={menu}>
                              <Button>
                                  เลือก <DownOutlined />
                              </Button>
                          </Dropdown>
                          <Divider type="vertical" style={{height:"2rem"}}/>
                          <FormItemStyled name="product_code" rules={[{required:true,message:"กรุณาระบุ SKU ของสินค้า"}]}>
                            <InputStyled disabled/>
                          </FormItemStyled>
                      </SelextManualContainer>
                      <SelectTextSN>ซีเรียลนัมเบอร์ S/N</SelectTextSN>
                      <SelextManualContainer>
                          <Button style={{width:"5rem"}}>สร้าง</Button>
                          <Divider type="vertical" style={{height:"2rem"}}/>
                          <FormItemStyled name="serial_number" rules={[{required:true,message:"กรุณาระบุซีเรียลนัมเบอร์ของสินค้า"},
                        
                        ({ getFieldValue }) => ({
                              validator(_, value) {
                                  if(!takenSerials.includes(value)){
                                      // check length can be done easiy other way
                                      return Promise.resolve()
                                  }
                                return Promise.reject(new Error('ซีเรียล์นัมเบอร์นี้มีอยู่แล้วในระบบ'));
                              },
                            })
                        ]}>
                            <InputStyled />
                          </FormItemStyled>
                      </SelextManualContainer>
                      {/* <ErrorText>Text error Mock</ErrorText> */}
                      <UploadfileBtn loading={isLoading} htmlType="submit">อัพโหลดข้อมูลสินค้า</UploadfileBtn>
                </BoxContainer2>

            </ProductMainContainer>
        </Form>
    )
}


export default Productadd