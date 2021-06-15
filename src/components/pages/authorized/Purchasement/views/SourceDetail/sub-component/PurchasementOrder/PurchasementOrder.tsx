import React, { useEffect, useState } from 'react'
import { Divider, Input, InputNumber,Form, PageHeader } from 'antd';
import Navbar from '../../../../../../../common/navbar'
import { BoxListMail, InputPrice, ListDetailContainer, OrderBtn, PaperExample, PrBodyMainContainer, PrDetailContainer, PrExampleContainer, PrOrderMainContainer, TextDetail, TextHeader, TextMail, TextPrima, TextPrimaAddress, TextPrimaEng } from './purchasementOrder.styles'
import { API_CreatePurchasementRequest, API_GetPurchasementSource } from '../../../../apis/purchasement.api';
import { ICreatePurchasementRequestDTO, IPurchasementSoruce } from '../../../../shared/interfaces/purchasement.interfaces';
import { LoadingScreen } from '../../../../../../../../core/loading-screen/LoadingScreen';
import { sleep } from '../../../../../../../../utilities/fake-loader/fakeLoader';
import { isOnlyHasNumberInString } from '../../../../../../../../utilities/string/common';
import { useForm } from 'antd/lib/form/Form';
import { toast } from 'react-toastify';
import { ERROR_TOAST_OPTION } from '../../../../../../../../shared/options/toast.option';

interface IProps{
    focused_source_id: number | null
    back: () => void
}
const PurchasementOrder:React.FC<IProps> = ({focused_source_id,back}) => {
    const [sourceData,setSourceData] = useState<Required<IPurchasementSoruce>| null>(null)
    const [cred,setCred] = useState<Partial<ICreatePurchasementRequestDTO>>({quantity:'',price:0})
    const [form] = useForm()
    async function getSourceData(id:number){
        LoadingScreen.show_loading_screen("กำลังโหลดข้อมูล")
        await sleep(1500)
        const mapped_response = await API_GetPurchasementSource(id)
        if(mapped_response.success){
            setSourceData(mapped_response.data)
        }else{
            // fetch faile
        }
        LoadingScreen.hide_loading_screen()
    }
    async function onCreateRequestOrder(){
        const postData:ICreatePurchasementRequestDTO = {...cred as ICreatePurchasementRequestDTO,commercial_number:sourceData!.commercial_number,is_special_request:false,special_part_contact:null,special_part_name:null,quantity: isOnlyHasNumberInString(cred.quantity!) ? cred.quantity+" ชื้น" : cred.quantity!}
        console.log(postData)
        const mapped_response = await API_CreatePurchasementRequest(postData)
        if(mapped_response.success){
            // success
            toast.success('คำร้องขอการซื้อขายได้ถูกส่งเป็นที่เรียบร้อยแล้ว',ERROR_TOAST_OPTION);
            back() // back to previous fragment
        }else{
            // failed to make a order
            toast.error('ไม่สามารถสร้างคำร้องขอการซื้อขายได้',ERROR_TOAST_OPTION);
        }
    }

    useEffect(() => {
        if(focused_source_id){
            // if passed prop is not null
            getSourceData(focused_source_id)
        }
    },[focused_source_id])

    //
    // ─── VIS HELPER ─────────────────────────────────────────────────────────────────
    //
    function getProperAmountText(){
        const text = cred.quantity!
        if(isOnlyHasNumberInString(text)){
            // only number
            return " -" + text + " ชื้น"
        }else{
            if (text){
                return " -" + text
            }
            return text // empty
        }
    }
    // ────────────────────────────────────────────────────────────────────────────────


    return (
        <Form onFinish={onCreateRequestOrder} form={form}>
            <div style={{ position:'absolute' }} className="site-page-header-ghost-wrapper">
                        <PageHeader
                            ghost={false}
                            onBack={back}
                            title="คำร้องขอการซื้อขาย"
                        >
                        </PageHeader>
                    </div>
            {/* <Navbar/> */}
            <PrOrderMainContainer>
                <PrBodyMainContainer>
                    <PrDetailContainer>
                        <ListDetailContainer><TextHeader>Company Name</TextHeader><Divider type="vertical" style={{paddingRight:"1rem" ,height:"2rem"}}/> 
                            <TextDetail>{sourceData?.company}</TextDetail>
                        </ListDetailContainer>
                        <ListDetailContainer><TextHeader>PIN Comercial</TextHeader><Divider type="vertical" style={{paddingRight:"1rem" ,height:"2rem"}}/> 
                            <TextDetail>{sourceData?.commercial_number}</TextDetail>
                        </ListDetailContainer>
                        <ListDetailContainer><TextHeader>Part Number</TextHeader><Divider type="vertical" style={{paddingRight:"1rem" ,height:"2rem"}}/> 
                            <TextDetail>{sourceData?.part_number} - {sourceData?.part_name}</TextDetail>  
                        </ListDetailContainer>
                        <ListDetailContainer><TextHeader>จำนวน</TextHeader><Divider type="vertical" style={{paddingRight:"1rem" ,height:"2rem"}}/> 
                            
                            <Form.Item name="quantity" rules={[
                                {required:true,message:'กรุณาระบุจำนวน'}
                            ]}>
                                <Input onChange={(event) => setCred(prevState => ({...prevState,quantity:event.target.value}))} placeholder="Ex. 1 ชื้น/กิโล/โหล" style={{ width:"10rem", height:"2rem"}} />
                            </Form.Item>
                        </ListDetailContainer>
                        <ListDetailContainer><TextHeader>ราคา</TextHeader><Divider type="vertical" style={{paddingRight:"1rem" ,height:"2rem"}}/> 
                            <Form.Item name="price" rules={[
                                {required:true,message:'กรุณาระบุราคา'}
                            ]}>
                                <InputNumber type="number" onChange={(amount) => setCred(prevState => ({...prevState,price:amount}))}  min={1} max={1000000000} placeholder="ราคาที่ต้องการจะซื้อขาย" style={{ width:"10rem", height:"2rem"}} />
                            </Form.Item>
                        </ListDetailContainer>
                        <OrderBtn type="primary" block htmlType="submit">สั่งสินค้า</OrderBtn>
                    </PrDetailContainer>

                    <Divider type="vertical" style={{height:"50vh"}}/>

                    <PrExampleContainer>
                        <div>ตัวอย่างสำเนาการขอซื้อขาย</div>
                        <PaperExample>
                            <TextPrima>บริษัท พรีมา เลเซอร์ เทอร์ราพี จำกัด</TextPrima>
                            <TextPrimaAddress>350 ซ.ตลาดบ้านสมเด็จเจ้าพระยา ถ.สมเด็จเจ้าพระยา แขวง สมเด็จเจ้าพระยา เขต คลองสาน กรุงเทพมหานครฯ 10600</TextPrimaAddress>
                            <TextPrimaEng>Prima Laser Co.,Ltd</TextPrimaEng>
                            <TextMail>เรียน บริษัท {sourceData?.company}</TextMail>
                            <TextMail>เรื่อง การสั่งซื้อสินค้า และรายละเอียดข้อมูลสินค้า</TextMail>
                            <BoxListMail>
                                <div>1. {sourceData?.part_name} ({sourceData?.part_number}) {getProperAmountText()}</div>
                            </BoxListMail>
                            <TextMail>สรุปค่าใช้จ่ายทั้งหมดเป็นเงิน {cred.price ? cred.price + " บาท"  : ""}</TextMail>
                        </PaperExample>
                    </PrExampleContainer>

                </PrBodyMainContainer>
            </PrOrderMainContainer>
        </Form>
    )
}

export default PurchasementOrder