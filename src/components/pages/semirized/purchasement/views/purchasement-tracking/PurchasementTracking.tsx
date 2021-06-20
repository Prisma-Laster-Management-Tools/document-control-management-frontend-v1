import React, { useEffect, useState } from 'react'
import { Steps, Divider, Descriptions,Spin, Upload } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ButtonContainer, ButtonContainer2, ButtonDiv, BuyerDetailDiv, BuyerDiv, HeaderTextSY, ListDetailHeader, ListDetailText, ListDetailText2, MailButtomDiv, MaildetailBox, MaildetailBox2, MailDetailContainer, MailTextHeader, PTBoxContainer, PTrackMainContainer, SellerDetailDiv, SellerDiv, StepDiv, TrackDiv } from './PurchasementTracking.styles'
import { API_GetPurchasementRequest } from '../../../../authorized/Purchasement/apis/purchasement.api';
import { useLocation, useParams } from 'react-router-dom';
import { IPurchasementData } from '../../shared/interfaces/purchasementTracking.interfaces';
import { LoadingScreen } from '../../../../../../core/loading-screen/LoadingScreen';
import { sleep } from '../../../../../../utilities/fake-loader/fakeLoader';
import Moment from 'react-moment'
import { API_ClientUploadEvidence, API_CreateResponseToRequest, API_EmployeeCloseRequest, API_EmployeeUploadEvidence } from '../../apis/purchasementTracking.api';
import { toast, ToastOptions } from 'react-toastify';
import ImgsViewer from "react-images-viewer";
import { downloadAs } from '../../../../../../utilities/downloader/downloaderAs';
import {SERVER_ADDRESS} from '../../../../../../config/STATIC.json'
const { Step } = Steps;

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SUCCESS_TOAST_OPTIONS:ToastOptions =  {
    position: "top-left",
    autoClose: 2800,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
}

export default function PurchasementTracking(props:any) {
    const RouteParams = useParams<{confirmation_token:string}>()
    const [isClient,setIsClient] = useState<boolean>(false)
    const [imageViewingPointer,setImageViewingPointer] = useState<{src:string} | null>(null)
    const [isViewingImage,setIsViewingImage] = useState<boolean>(false)

    let query = useQuery();
    const [requestData,setRequestData] = useState<null| IPurchasementData>(null)
    async function getRequestData(){
        await sleep(500) // wait for the LoadingScreen component is fully-set -> [safe from newly enter website]
        LoadingScreen.show_loading_screen("กำลังตรวจสอบลื้งค์ของคุณ")
        await sleep(1000)
        const mapped_response = await API_GetPurchasementRequest(RouteParams.confirmation_token)
        if(mapped_response.success){
            console.log(mapped_response)
            setRequestData(mapped_response.data)
        }else{
            //failed
            props.history.push('/406') // การเข้าถึงไม่ถูกต้อง
        }
        LoadingScreen.hide_loading_screen()
    }

    //
    // ─── CLIENT ─────────────────────────────────────────────────────────────────────
    //

    async function clientConfirmRequest(){
        const mapped_response = await API_CreateResponseToRequest(RouteParams.confirmation_token,{accept:true})
        if(mapped_response.success){
            toast.success('✔️ คุณได้ตอบรับออเดอร์เรียบร้อยแล้ว', SUCCESS_TOAST_OPTIONS)
            setRequestData(prevState => ({...prevState!,is_order_accepted:true}))
        }else{
            // failed
            toast.error('เกิดข้อผิดพลาดบางอย่างในการตอบรับข้อเสนอ', SUCCESS_TOAST_OPTIONS)
        }
    }

    async function clientDeclineRequest(){
        const mapped_response = await API_CreateResponseToRequest(RouteParams.confirmation_token,{accept:false})
        if(mapped_response.success){
            toast.success('❌ คุณได้ปฏิเสธออเดอร์เรียบร้อยแล้ว', SUCCESS_TOAST_OPTIONS)
            setRequestData(prevState => ({...prevState!,is_order_accepted:false}))
        }else{
            // failed
            toast.error('เกิดข้อผิดพลาดบางอย่างในการปฏิเสธข้อเสนอ', SUCCESS_TOAST_OPTIONS)
        }
    }

    async function clientUploadEvidence(){
        //const mapped_response = await API_ClientUploadEvidence(RouteParams.confirmation_token)
    }

    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── EMPLOYEE ───────────────────────────────────────────────────────────────────
    //
    async function employeeUploadEvidence(){

    }
    async function employeeCloseRequest(){
        console.log('[TODO]: closing request')
        const mapped_response = await API_EmployeeCloseRequest(RouteParams.confirmation_token)
        if(mapped_response.success){
            toast.success('✔️ การยืนยันได้รับสินค้าสำเร็จ', SUCCESS_TOAST_OPTIONS)
            setRequestData((prevState) => ({...prevState!,purchasement_successfully:true})) // update the state mark as purchasement-successfully
        }else{
            // failed to close the response [probably 5xx error]
            toast.error('เกิดข้อผิดพลาในการยืนยันได้รับสินค้า', SUCCESS_TOAST_OPTIONS)
        }
    }
    // ────────────────────────────────────────────────────────────────────────────────


    useEffect(() => {
        const is_client = query.get('type') === 'client'
        if(is_client){
            setIsClient(true)
        }
        getRequestData()
    },[])

    //
    // ─── IMAGE UPLOAD CUSTOM REQUEST ────────────────────────────────────────────────────────────
    //  
    const uploadImageClient = async (options:any) => {
        const { onSuccess, onError, file, onProgress } = options;
    
        const fmData = new FormData();
        console.log(file)
        fmData.append("file", file);

        const mapped_response = await API_ClientUploadEvidence(RouteParams.confirmation_token,fmData)
        if(mapped_response.success){
            onSuccess("Ok");
            setRequestData(prevState => ({...prevState!,delivery_attachments:mapped_response.data.delivery_attachments}))
            toast('✔️ หลักฐานการจัดส่งของคุณได้ถูกส่งไปแล้ว', SUCCESS_TOAST_OPTIONS)
        }else{
            const error = new Error("Some error");
            onError({ err:error });
            toast.error('ไม่สามารถส่งหลักฐานการจัดส่งได้ กรุณาลองใหม่อีกครั้ง', SUCCESS_TOAST_OPTIONS)
        }

        try {
          /*const res = await axios.post(
            "https://jsonplaceholder.typicode.com/posts",
            fmData,
            config
          );
    
          onSuccess("Ok");
          console.log("server res: ", res);*/
        } catch (err) {
          /*console.log("Eroor: ", err);
          const error = new Error("Some error");
          onError({ err });*/
        }
      };

      const uploadImageEmployee = async (options:any) => {
        const { onSuccess, onError, file, onProgress } = options;
    
        const fmData = new FormData();
        console.log(file)
        fmData.append("file", file);

        const mapped_response = await API_EmployeeUploadEvidence(RouteParams.confirmation_token,fmData)
        if(mapped_response.success){
            onSuccess("Ok");
            setRequestData(prevState => ({...prevState!,payment_attachments:mapped_response.data.payment_attachments}))
            toast('✔️ หลักฐานการชำระเงินของคุณได้ถูกส่งไปแล้ว', SUCCESS_TOAST_OPTIONS)
        }else{
            const error = new Error("Some error");
            onError({ err:error });
            toast.error('ไม่สามารถส่งหลักฐานการชำระเงินได้ กรุณาลองใหม่อีกครั้ง', SUCCESS_TOAST_OPTIONS)
        }

       
      };
    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── ON VIEWING EVIDENCE ────────────────────────────────────────────────────────
    //
    function onViewingEvidence(side: "client" | "employee"){
        const $key = side=== "client" ? 'delivery_attachments' : 'payment_attachments'
        const file_path = requestData![$key]
        const file_path_lowered = requestData![$key]?.toLowerCase()
        let file_type: "picture" | "file" = "file" 
        if(file_path_lowered?.endsWith('jpg') || file_path_lowered?.endsWith('jpeg') || file_path_lowered?.endsWith('png')){
            file_type = 'picture'
        }
        console.log(file_type)
        if(file_type === 'file'){
            // download the file
            console.log(`Downloading : ${file_path}`)
            downloadAs(`${SERVER_ADDRESS}${file_path}`,`หลักฐาน_${requestData?.confirmation_token}`)
        }else{
            downloadAs(`${SERVER_ADDRESS}${file_path}`,`หลักฐาน_${requestData?.confirmation_token}`)
        }

    }
    // ────────────────────────────────────────────────────────────────────────────────



    const rendered_order_description = requestData ? 
        <>

            <MaildetailBox>
                <ListDetailHeader>วันที่สั่งซื้อ</ListDetailHeader>
                {/* <ListDetailText>Sunday, February 03, 2021</ListDetailText> */}
                <ListDetailText><Moment format="LLLL" locale="th">{requestData.createdAt}</Moment></ListDetailText>
            </MaildetailBox>
            <MaildetailBox>
                <ListDetailHeader>รหัสสินค้า</ListDetailHeader>
                <ListDetailText>{requestData.part_number}</ListDetailText>
            </MaildetailBox>
            <MaildetailBox>
                <ListDetailHeader>ราคาสินค้าที่เสนอ</ListDetailHeader>
                <ListDetailText>{requestData.price} บาท - {requestData.quantity}</ListDetailText>
            </MaildetailBox>
            <MaildetailBox>
                <ListDetailHeader>ชื่อสินค้า</ListDetailHeader>
                <ListDetailText>{requestData.part_name}</ListDetailText>
            </MaildetailBox>

        </>
    : <Spin size="large"/>

    const rendered_client_panel = requestData?.is_order_accepted || !isClient || requestData?.is_order_accepted===false ? 
        <>
                <HeaderTextSY>รายละเอียดผู้จัดขาย</HeaderTextSY>
                <Descriptions
                        bordered
                        size="small"
                        column={1}
                        >
                        <Descriptions.Item label="บริษัท">{requestData?.company}</Descriptions.Item>
                        <Descriptions.Item label="ชื่อผู้ขาย">{requestData?.seller}</Descriptions.Item>
                        <Descriptions.Item label="เบอร์โทร">{requestData?.contact_number || '-'}</Descriptions.Item>
                        <Descriptions.Item label="อีเมล">{requestData?.email}</Descriptions.Item>
                </Descriptions>
                {

                    isClient ? 
                            requestData?.delivery_attachments===null && requestData.is_order_accepted===true ? 
                            <Upload accept=".pdf,.png,.jpg,.jpeg" customRequest={uploadImageClient}>
                                <ButtonDiv>เพิ่มหลักฐานการจัดส่ง</ButtonDiv> 
                            </Upload>
                        : (requestData?.is_order_accepted===false ? <span style={{ color:'red' }}>การสั่งซื้อถูกปฏิเสธ</span> : <ButtonDiv disabled={true}>เพิ่มหลักฐานการจัดส่ง</ButtonDiv> )
                    : (requestData?.is_order_accepted===false ? <span style={{ color:'red' }}>การสั่งซื้อถูกปฏิเสธ</span>  : <ButtonDiv style={{ opacity:0 }} disabled={true}>ต้องมีไว้ไม่งั้น flex เน่า</ButtonDiv>)
                }
        </>
    
    : <ButtonContainer>
    <ButtonDiv style={{color:"green",border:"1px solid green"}} onClick={clientConfirmRequest}>ยืนยันข้อเสนอสั่งซื้อ</ButtonDiv>
    <ButtonDiv onClick={clientDeclineRequest} style={{color:"red",border:"1px solid red"}}>ปฏิเสธข้อเสนอ</ButtonDiv>
</ButtonContainer> 

    return (
        <>
            <PTrackMainContainer>

                <PTBoxContainer>
                    <MailDetailContainer>
                        <MailTextHeader>รายการสั่งซื้อสินค้า</MailTextHeader>
                        
                        <MailButtomDiv>
                            {rendered_order_description}
                            <MaildetailBox2>
                                <ListDetailHeader>สถานที่จัดส่ง</ListDetailHeader>
                                <ListDetailText2>บริษัท พรีมา เลเซอร์ เทอร์ราพี จำกัด 350 ซอยตลาดบ้านสมเด็จ ถนนสมเด็จเจ้าพระยา แขวงสมเด็จเจ้าพระยา เขตคลองสาน กรุงเทพฯ 10600</ListDetailText2>
                            </MaildetailBox2>
                        </MailButtomDiv>

                    </MailDetailContainer>

                    {/* ............   Seller and Buyer Container    ............*/}
                    <TrackDiv>

                        <SellerDiv>
                            <SellerDetailDiv>

                                {rendered_client_panel}
                            </SellerDetailDiv>
                            <StepDiv direction="vertical" current={requestData?.is_order_accepted===false ? 0 : (requestData?.delivery_attachments !== null ? 3 : (requestData.is_order_accepted ? 1 : 0))} status={requestData?.is_order_accepted===false ? 'error' : undefined}  size="small" >
                                {
                                    requestData?.is_order_accepted || requestData?.is_order_accepted===false ?  
                                    
                                    <Step title={<div>ยืนยันออเดอร์</div>} /> 
                                    
                                    :  
                                    
                                    <Step status="process" icon={<LoadingOutlined />} title={<div>ยืนยันออเดอร์</div>} />
                                }
                                <Step title={<div>หลักฐานการส่ง</div>}  description={<ButtonDiv onClick={onViewingEvidence.bind(null,'client')} disabled={requestData?.delivery_attachments===null} size="small">ดูหลักฐาน</ButtonDiv>}/>
                                <Step title={<div>ดำเนินการส่ง</div>} />
                            </StepDiv>
                        </SellerDiv> 
                        
                        <Divider type="vertical" style={{height:"98%"}}></Divider>

                        <BuyerDiv>
                            <StepDiv direction="vertical" current={requestData?.purchasement_successfully ? 3 : (requestData?.payment_attachments !== null ? 2 : 1)} size="small" >
                                <Step title={<div>ยืนยันการสั่งซื้อ</div>}   />
                                <Step title={<div>การชำระเงิน</div>}  description={<ButtonDiv onClick={onViewingEvidence.bind(null,'employee')} disabled={requestData?.payment_attachments===null}  size="small">ดูหลักฐาน</ButtonDiv>}/>
                                <Step title={<div>ได้รับสินค้า</div>}  />
                            </StepDiv>
                            <BuyerDetailDiv>
                                <HeaderTextSY>รายละเอียดผู้จัดซื้อ</HeaderTextSY>

                                <Descriptions
                                        bordered
                                        size="small"
                                        column={1}
                                        >
                                        <Descriptions.Item label="บริษัท">บริษัท พรีมา เลเซอร์ เทอร์ราพี จำกัด</Descriptions.Item>
                                        <Descriptions.Item label="ชื่อผู้ขาย">นายเจริญ ตั้งตรงเบญจศีล</Descriptions.Item>
                                        <Descriptions.Item label="เบอร์โทร">087-912-2112</Descriptions.Item>
                                        <Descriptions.Item label="อีเมล">Charoent@primalasertherapy.com</Descriptions.Item>
                                </Descriptions>
                                
                                <ButtonContainer2>
                                    {
                                        !isClient ?
                                            
                                            requestData?.payment_attachments === null && requestData.is_order_accepted!==false ?
                                            <>
                                                <Upload accept=".pdf,.png,.jpg,.jpeg" customRequest={uploadImageEmployee}>
                                                    <ButtonDiv>เพิ่มหลักฐานการชำระเงิน</ButtonDiv>
                                                </Upload>
                                                <ButtonDiv disabled={requestData.purchasement_successfully} onClick={employeeCloseRequest} danger>ยืนยันได้รับสินค้า</ButtonDiv>
                                            </>    
                                            :  <>
                                                   {
                                                       requestData?.is_order_accepted===false ? null : <>
                                                             <ButtonDiv disabled={true}>เพิ่มหลักฐานการชำระเงิน</ButtonDiv>
                                                    <ButtonDiv disabled={requestData?.purchasement_successfully || false}  onClick={employeeCloseRequest} danger>ยืนยันได้รับสินค้า</ButtonDiv>
                                                       </>
                                                   }
                                                </>
                                        : null
                                    
                                    }

                                    
                                </ButtonContainer2>
                                
                            </BuyerDetailDiv>
                        </BuyerDiv>
                        
                    </TrackDiv>

                </PTBoxContainer>
            </PTrackMainContainer>
        </>
    )
}
