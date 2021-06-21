import React, { useEffect, useMemo, useState } from 'react'
import { Pagination, Divider,Spin, Image } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import Navbar from '../../../../../common/navbar'
import { BtnWithImage, BtnWithImage2, CheckBtnContainer, InfoTextBox, InsideBtn, PicCon, PicDefault, QcBtn, QcPicText, QcProcessBodyMainContainer, QcProcessDetailContainer, QcProcessMainContainer, QcProcessPictureContainer, QcTextD, QcTextR, TextInsideBoxInfo } from './QcProcess.styles'
import { API_CreateControlProcessForProduct, API_GetProtocolListFromProductCode } from '../../apis/qc.api';
import { ICreateControlProcessDTO, IQualityControlProtocol } from '../../shared/interfaces/qc.interface';
import {SERVER_ADDRESS} from '../../../../../../config/STATIC.json'
import { toast } from 'react-toastify';
import { ERROR_TOAST_OPTION } from '../../../../../../shared/options/toast.option';
import { useHistory } from 'react-router-dom';
interface IProps{
    focused_product_data:{product_code:string,product_id:number} | null
    back: () => any
    on_success: () => any
}
interface IQualityControlProcessDTO{
    check_status:boolean
    protocol_id:number
}
const Qc:React.FC<IProps> = ({focused_product_data,back,on_success}) => {
    const history = useHistory()
    const [protocolList,setProtocolList] = useState<Array<IQualityControlProtocol> | null>(null)
    const [currentStep,setCurrentStep] = useState<number>(0)
    const [qcDatas,setQcDatas] = useState<Array<IQualityControlProcessDTO>>([])
    async function getProtocolList(product_code:string){
        const mapped_response = await API_GetProtocolListFromProductCode(product_code)
        if(mapped_response.success){
            const protocol_datas = !mapped_response.data.length ? null : mapped_response.data
            setProtocolList(protocol_datas)
            if(!protocol_datas){
                back()
                toast.error(`สินค้ารหัส ${focused_product_data?.product_code} ยังไม่มีข้อกำหนดในการตรวจสอบ`,ERROR_TOAST_OPTION)
            }
        }else{
            // faiiled to get the protocol list
        }
    }
    async function onSubmitQcProcess(){
        if(!protocolList) return
        if(qcDatas.length !== protocolList.length) return // if length is not match > means user still havent checked for all question
        const postData:ICreateControlProcessDTO ={qc_datas:qcDatas,product_id:focused_product_data!.product_id}
        console.log(postData)
        const mapped_response = await API_CreateControlProcessForProduct(postData)
        if(mapped_response.success){
            // success
            on_success() // return back to previous fragment
            toast.success('ผลลัพท์ของการประเมินคุณภาพได้ถูกส่งเป็นที่เรียบร้อย',ERROR_TOAST_OPTION);
        }else{
            // failed to submit the qc result
            toast.error('ไม่สามารถส่งผลลัพท์ของการประเมินคุณภาพได้',ERROR_TOAST_OPTION);
        }
    }
    useEffect(() => {
        if(focused_product_data){
            // if focused_product_data is not null
            getProtocolList(focused_product_data.product_code)
        }
    },[focused_product_data])


    //
    // ─── LOGIC ──────────────────────────────────────────────────────────────────────
    //
    function onCheckProcessStatus(isPass:boolean){
        if(!protocolList) return 
        //prefab
        const protocol_id = protocolList[currentStep].id
        // ─────────────────────────────────────────────────────────────────


        // edit if exist
        const copied_qcDatas = [...qcDatas]
        const existed_qcData = copied_qcDatas.find(data => data.protocol_id === protocol_id)  // contains moms reference
        if(existed_qcData){
            // if already existed -> EDIT
            existed_qcData.check_status = isPass
            setQcDatas(copied_qcDatas)
        }else{
            //not exist -> append new value
            const newQcData:IQualityControlProcessDTO = {protocol_id,check_status:isPass}
            setQcDatas(prevState => ([...prevState,newQcData])) // append the new one
        }
        // ─────────────────────────────────────────────────────────────────

    }
    // ────────────────────────────────────────────────────────────────────────────────

    useEffect(() => {
        console.log(qcDatas)
    }, [qcDatas])


    //
    // ─── VIS HELPER ─────────────────────────────────────────────────────────────────
    //
    const rendered_description_content = useMemo(()=> {
        if(!protocolList || !protocolList.length) return null
        return <TextInsideBoxInfo>{protocolList[currentStep].process_description}</TextInsideBoxInfo>
    },[currentStep,protocolList])
    const rendered_picture_content = useMemo(()=> {
        if(!protocolList) return <PicDefault/>
        if(!protocolList[currentStep].attachment_path) return <PicDefault/>
        return <Image width="100%" height="100%" src={`${SERVER_ADDRESS}/${protocolList[currentStep].attachment_path}`}/>
    },[currentStep,protocolList])
    const rendered_pass_btn = useMemo(()=> {
        if(!protocolList) return   <BtnWithImage2>
                                            <CheckCircleFilled style={{color: 'white'}}/>
                                            <InsideBtn >ผ่าน</InsideBtn>
                                     </BtnWithImage2>

        // extract is is pass or not
        const protocol_id = protocolList[currentStep].id
        let is_pass = qcDatas.find(data => data.protocol_id===protocol_id)?.check_status
        if(!is_pass) is_pass = false
        return  <BtnWithImage2 onClick={onCheckProcessStatus.bind(null,true)}  is_active={is_pass}>
                    <CheckCircleFilled style={{color: 'white'}}/>
                     <InsideBtn>ผ่าน</InsideBtn>
                </BtnWithImage2>
        
    },[qcDatas,currentStep,protocolList])
    const rendered_fail_btn = useMemo(()=> {
        if(!protocolList) return   <BtnWithImage>
                                            <CheckCircleFilled style={{color: 'white'}}/>
                                            <InsideBtn >ไม่ผ่าน</InsideBtn>
                                     </BtnWithImage>

        // extract is is pass or not
        const protocol_id = protocolList[currentStep].id
        let is_pass = qcDatas.find(data => data.protocol_id===protocol_id)?.check_status
        let is_fail = false
        if(is_pass){
            // means it is pass
            is_fail = false
        }else{
            if(is_pass !== undefined){
                // is_pass = false
                is_fail = true
            }else{
                // is_pass === null
                is_fail = false
            }
        }
        return  <BtnWithImage onClick={onCheckProcessStatus.bind(null,false)}  is_active={is_fail}>
                    <CheckCircleFilled style={{color: 'white'}}/>
                     <InsideBtn>ไม่ผ่าน</InsideBtn>
                </BtnWithImage>
        
    },[qcDatas,currentStep,protocolList])


    const rendered_submit_btn = useMemo(() => {
        if(!protocolList) return null
        if(qcDatas.length !== protocolList.length) return null
        return   <QcBtn onClick={onSubmitQcProcess} type="primary">ส่งผลการตรวจสอบ</QcBtn>
    },[qcDatas,protocolList])
    // ────────────────────────────────────────────────────────────────────────────────


    const rendered_pagination = protocolList ? <Pagination onChange={(nextPage) => setCurrentStep(nextPage-1)} simple defaultCurrent={1} current={currentStep+1} pageSize={1} total={protocolList.length} /> : <Spin/>

    return (
        <>
            <QcProcessMainContainer>
                <QcProcessBodyMainContainer>
                    <QcProcessPictureContainer>
                        <QcPicText>ภาพรายละเอียด</QcPicText>
                        <PicCon>
                            
                            {rendered_picture_content}
                            
                        </PicCon>
                    </QcProcessPictureContainer>
                    <Divider type="vertical" style={{height:"90%"}}/>
                    <QcProcessDetailContainer>
                        <QcTextD>ขั้นตอน</QcTextD>
                        {rendered_pagination}
                        <Divider style={{width:"90%"}}/>
                        
                        <div>asdasdasd</div>
                        <div>asdasdasd</div>

                        <Divider style={{width:"90%"}}/>
                        <QcTextR>รายละเอียด</QcTextR>
                        <InfoTextBox>
                            {rendered_description_content}
                        </InfoTextBox>
                        <CheckBtnContainer>
                            {rendered_fail_btn}
                            {rendered_pass_btn}
                        </CheckBtnContainer>
                        {rendered_submit_btn}
                    </QcProcessDetailContainer>
                </QcProcessBodyMainContainer>
            </QcProcessMainContainer>
        </>
    )
}
export default Qc