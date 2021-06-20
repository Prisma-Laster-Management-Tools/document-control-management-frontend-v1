import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../../../../../common/navbar'
import { Menu, Upload, Divider , Button, Dropdown,Input,Form } from 'antd';
import { DownOutlined, UserOutlined, UploadOutlined , InboxOutlined } from '@ant-design/icons';
import { BoxContainer2, BoxContainer, ProductMainContainer, UploadImage, NoteText, UploadfileBtn, ReportText, AddText, SelectText, SelextManualContainer, SelectText2, SelectTextSN, ErrorText, UploadImageCon, DiviDIV, FormItemStyled, InputStyled } from './Productadd.styles'
import { ICreateProductDTO, IProductDetail } from '../../shared/interfaces/product.interfaces';
import { API_CreateProduct, API_CreateProductBULK, API_GetProductDetails, API_GetRandomUnusedSerialNumber } from '../../apis/product.api';
import { useForm } from 'antd/lib/form/Form';
import { ERROR_TOAST_OPTION } from '../../../../../../shared/options/toast.option';
import { toast } from 'react-toastify';
import { sleep } from '../../../../../../utilities/fake-loader/fakeLoader';

import Excel from 'exceljs'
import * as XLSX from "xlsx";
import { fromExcelFileToJSON } from '../../../../../../utilities/excel/common';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import ProdAddingDetailModal from './sub-component/ProdAddingDetailModal';

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

const make_cols = (refstr:any) => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
  return o;
};


const Productadd:React.FC<Props> = ({on_success}) => {
  const [prodDetails,setProdDetails] = useState<Array<IProductDetail>>([])
  const [createProductCred,setCreateProductCred] = useState<ICreateProductDTO>({product_code:'',serial_number:''})
  const [currentProductDisplayTxt,setCurrentProductDisplayTxt] = useState('')
  const [takenSerials,setTakenSerial] = useState<Array<string>>([])
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const [form] = useForm()

  //
  // ─── EXCEL ──────────────────────────────────────────────────────────────────────
  //
  const [focusedFile,setFocusedFile] = useState<UploadFile<any>[] | undefined>(undefined)

  const [pendingListOfDatasToBeImported,setPendingListOfDatasToBeImported] = useState<null | Array<any>>(null)
  const [tookOutList,setTookOutList] = useState<null | Array<any>>(null)
  const [viewingExcelDetail,setViewingExcelDetail] = useState<boolean>(false)
  const [duplicationSerialNumbers,setDuplicationSerialNumber] = useState<Array<string> | null>(null)
  // ────────────────────────────────────────────────────────────────────────────────



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

  async function onUploadBulkProduct(){
      if(!pendingListOfDatasToBeImported || !pendingListOfDatasToBeImported.length) return toast.error('ไม่มีสินค้าให้นำเข้า กรุณาเพิ่มรายการ',ERROR_TOAST_OPTION);
      const mapped_response = await API_CreateProductBULK({importation_datas:pendingListOfDatasToBeImported })
      if(mapped_response.success){

        if(mapped_response.data.code === 'duplication'){
          toast.error(`เกิดข้อผิดพลาดในการนำเข้าสินค้า โปรดตรวจเช็ครายการ`,ERROR_TOAST_OPTION)
          //console.log(mapped_response.data.duplicated_lists)
          setDuplicationSerialNumber(mapped_response.data.duplicated_lists)
          return
        }

        clearAllImportedData()
        toast.success(`นำเข้าสินค้า จำนวน ${pendingListOfDatasToBeImported.length} ชิ้น เรียบร้อยแล้ว`,ERROR_TOAST_OPTION)
      }else{
        // server errors or duplication error let's check
        // This will never happened
      }
  }

  async function onRemoveDuplicatedProductFromPendingList(){
    const current_list = [...pendingListOfDatasToBeImported!]
    setPendingListOfDatasToBeImported(prevState => (prevState!.filter(data => !!duplicationSerialNumbers?.includes(data.serial_number))))
    const filtered_out: Array<any> = []
    current_list.forEach(data => {
      const {serial_number} = data
      if(duplicationSerialNumbers?.includes(serial_number.toString())){
        filtered_out.push(data)
      }
    })
    console.log(filtered_out)
    setTookOutList(prevState => [...prevState!,...filtered_out])
    setDuplicationSerialNumber(null)
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

    function validateImportedProduct(data:any){
        const prods_code_list = prodDetails.map((prod) => prod.product_code)
        const validated_set_of_data_to_be_appended:Array<any> = []
        const took_out_lists: any[] = []
        data.forEach((row:any) => {
           const {product_code,serial_number} = row
           if(!prods_code_list.includes(product_code)) {
              return took_out_lists.push(row)
           }
           validated_set_of_data_to_be_appended.push(row)
        })

        setPendingListOfDatasToBeImported(validated_set_of_data_to_be_appended)
        setTookOutList(took_out_lists)
    }

    function clearAllImportedData(){
      setPendingListOfDatasToBeImported(null)
      setTookOutList(null)
      setViewingExcelDetail(false)
      setDuplicationSerialNumber(null)
      setFocusedFile(undefined)
    }

    async function onUploadExcel(options:any){
      const { onSuccess, onError, file, onProgress } = options;
      //console.log(file)
      const json_parsed = await fromExcelFileToJSON(file)
      if(!json_parsed.success){
        onError(json_parsed.data)
        throw new Error('error importing the csv/xlsx file')
      }
      validateImportedProduct(json_parsed.data)
      onSuccess("ok")
      setFocusedFile(file)
    }

    function onUploadChangeCallback({file,fileList}:UploadChangeParam<UploadFile<any>>){
      if(file.status === 'removed'){
        clearAllImportedData()
      }
    }

    const rendered_description_text = useMemo(() => {
      if(pendingListOfDatasToBeImported === null) return <>
<NoteText>***หมายเหตุ ไฟล์ที่อัพโหลดจะต้องเป็นสกุล .csv หรือ .xlsx เท่านั้น</NoteText>
                    <div>Download Example</div>
      </>
      return  <>
        <ReportText>จำนวนของรายการใน excel/xlsx จำนวน : {pendingListOfDatasToBeImported.length + (tookOutList?.length || 0)} รายการ</ReportText>
        <ReportText>จำนวนของสินค้าที่นำเข้าระบบได้ : {pendingListOfDatasToBeImported.length} รายการ</ReportText>
        <ReportText><a onClick={setViewingExcelDetail.bind(null,true)}>ดูรายละเอียด {duplicationSerialNumbers ? <span style={{ color:'red' }}>(มี {duplicationSerialNumbers.length} รายการซ้ำ โปรดตรวจสอบ)</span> : null}</a></ReportText>
      </>
    },[pendingListOfDatasToBeImported,tookOutList,duplicationSerialNumbers])


    async function onGenerateRandomToken(){
      const mapped_response = await API_GetRandomUnusedSerialNumber()
      if(mapped_response.success){
        //console.log(mapped_response.data)
        form.setFieldsValue({serial_number:mapped_response.data.serial_number})
      }else{
        toast.error('เกิดข้อผิดพลาด ไม่สามารถสร้าง serial number ได้',ERROR_TOAST_OPTION);
      }
    }

    return (
        <Form onFinish={addProductToTheList} form={form}>
            <ProdAddingDetailModal remove_duplication={onRemoveDuplicatedProductFromPendingList} duplication_serial_numbers={duplicationSerialNumbers} valid_datas={pendingListOfDatasToBeImported} invalid_datas={tookOutList} visible={viewingExcelDetail} back={setViewingExcelDetail.bind(null,false)}/>
            {/* <Navbar/> */}
            <ProductMainContainer>

            {/* ADD WITH FILE */}
                <BoxContainer>
                    <UploadImageCon>
                      <UploadImage/>
                    </UploadImageCon>
                    <Upload showUploadList={!!focusedFile} onChange={onUploadChangeCallback} maxCount={1} customRequest={onUploadExcel}
                    style={{width:"100%", color:"black"}}
                    >
                        <Button  icon={<UploadOutlined />}>เลือกไฟล์อัพโหลด</Button>
                    </Upload>
                    {rendered_description_text}
                    <UploadfileBtn onClick={onUploadBulkProduct}>อัพโหลดไฟล์ข้อมูลสินค้า</UploadfileBtn>
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
                          <Button onClick={onGenerateRandomToken} style={{width:"5rem"}}>สร้าง</Button>
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