import React, { useEffect, useState } from 'react'
import Navbar from '../../../../../common/navbar'
import Ratingstar from '../../../../../common/Ratingstar';
import { BodyWrapper, TbodyContent, TdContent,TrContent, FeedbackContainer, FeedbackText, MainFeedbackContainer, TableContainer, ThHeader, TopInnerContainer, TrHeader, FeedbackList, ContainerBox, CommentBox, InsideHeaderContainer, ColonText, HeaderText, GenLinkContainer, GenBtn, GenPopContainer, GenPopTextBox, GenPopCopyBtn, TableFeed} from './feedback.styles'
import { message, Popover } from 'antd';
import { useParams } from 'react-router-dom';
import { API_CreateFeedbackAccessToken, API_GetFeedbackData, API_GetSalesData } from '../../apis/deliberation.api';
import { IFeedbackData, ISaleData } from '../../shared/interfaces/deliberation.interfaces';
import { sleep } from '../../../../../../utilities/fake-loader/fakeLoader';
import copy from 'clipboard-copy'
const LINK_PREFIX = 'http://localhost:3001/feedback-survey/'
export default function Feedback(props:any) {
    const [hasFeedback, setHasFeedback] = React.useState(false);
    const [generatedAccessLink,setGeneratedAccessLink] = useState('') 
    const [feedbackData,setFeedbackData] = useState<IFeedbackData|null>(null)
    const [saleData,setSaleData] = useState<ISaleData | null>(null)
    const [isLoading,setIsLoading] = useState(false)

    const [visible, setVisible] = React.useState(false)
    const RouteParams = useParams<{id:string}>()

    async function generateAccessTokenForSurvey(){
        if(generatedAccessLink) return // return if already generated to not having conflict with the popover

        const sales_id = parseInt(RouteParams.id)
        setIsLoading(true)
        await sleep(800)
        const mapped_response = await API_CreateFeedbackAccessToken(sales_id)
        if(mapped_response.success){
            const {access_token}  = mapped_response.data as IFeedbackData
            setGeneratedAccessLink(LINK_PREFIX+access_token)
        }else{
            //failed
        }
        setIsLoading(false)
    }

    async function fetchSaleData(){
        const sales_id = parseInt(RouteParams.id)
        const mapped_response = await API_GetSalesData(sales_id)
        if(mapped_response.success){
            setSaleData(mapped_response.data)
        }else{
            // failed to fetch sales data
        }
    }

    async function fetchFeedbackData(){
        const sales_id = parseInt(RouteParams.id)
        const mapped_response = await API_GetFeedbackData(sales_id)
        if(mapped_response.success){

        }else{
            const error_message = mapped_response.data.message
            if(mapped_response.error_type === 'not-found'){
                //check if it's the sales that doesn't exist or not [or its the feedback that havent been yet initiated]
                if(error_message.startsWith("Sale data") && error_message.endsWith("exist")){
                    // sales doesn't exist
                    console.log("Sales data is not even exist")
                    //TODO show 404 page
                    props.history.push('/sales')
                }else if(error_message.endsWith("any feedback")){
                    // feedback not exist
                    console.log("Feedback is not exist")
                }
            }
        }
    }

    //
    // ─── ON MOUNT ───────────────────────────────────────────────────────────────────
    //
    useEffect(() => {
        fetchSaleData()
        fetchFeedbackData()
    },[])
    // ────────────────────────────────────────────────────────────────────────────────

    function copyLinkToClipboard(){
        copy(generatedAccessLink)
        message.info("ลิ่งสำหรับเข้าสมัครสู่เว็บไซต์ ได้ถูกก๊อปปี้ไปที่คลิปบอร์ดแล้ว")
        
    }


    const GeneretedLinkAndCopyBTN =
    <>
        <GenPopContainer>
            <GenPopTextBox disabled value={generatedAccessLink || 'กำลังสร้างลิ้งค์'}/>
            <GenPopCopyBtn onClick={copyLinkToClipboard}>คัดลอก</GenPopCopyBtn>
        </GenPopContainer>
    </>

    const rendered_feedback = 
        hasFeedback?
            <>
                <ContainerBox>
                <InsideHeaderContainer><HeaderText>คุณภาพสินค้า</HeaderText>     <ColonText>:</ColonText>  <Ratingstar starcount={0}/> </InsideHeaderContainer>
                <InsideHeaderContainer><HeaderText>ความคุ้มค่า</HeaderText>        <ColonText>:</ColonText>    <Ratingstar starcount={0}/> </InsideHeaderContainer>
                <InsideHeaderContainer><HeaderText>ความเร็วในการจัดส่ง</HeaderText>    <ColonText>:</ColonText>    <Ratingstar starcount={0}/></InsideHeaderContainer>
                <InsideHeaderContainer><HeaderText>การให้บริการจากบริษัท</HeaderText>   <ColonText>:</ColonText>   <Ratingstar starcount={0}/> </InsideHeaderContainer>
                <CommentBox> สินค้าโอเคมาก ถูกใจ สุดๆได้ของครบตามสั่ง เเนะนำ มาตำเลย สินค้าโอเคมาก ถูกใจ สุดๆได้ของครบตามสั่ง เเนะนำ มาตำเลย สินค้าโอเคมากสินค้าโอเคมาก ถูกใจ สุดๆได้ของครบตามสั่ง เเนะนำ มาตำเลย สินค้าโอเคมาก ถูกใจ สุดๆได้ของครบตามสั่ง เเนะนำ มาตำเลย สินค้าโอเคมาก ถูกใจ สุดๆได้ของครบตามสั่ง เเนะนำ มาตำเลย</CommentBox>
                </ContainerBox>
            </>
            
        :
            <>
                <GenLinkContainer>
                <Popover
                    content={GeneretedLinkAndCopyBTN}
                    trigger="click"
                    //visible={!!generatedAccessLink}
                >
                   <GenBtn loading={isLoading} onClick={generateAccessTokenForSurvey}>สร้าง URL สำหรับให้คำแนะนำ</GenBtn>
                </Popover>
                </GenLinkContainer>
            </>
        ;
        
    return (
        <div>
            <Navbar/>
            <FeedbackContainer>
                {/* Top Text and Button */}
                <TopInnerContainer>
                    <FeedbackText> ผลตอบรับ </FeedbackText>
                </TopInnerContainer>

                {/* Table Detail*/}
                <TableContainer>
                    <TableFeed>
                            <TrHeader>
                                <ThHeader width={20}>ลูกค้า</ThHeader>
                                <ThHeader width={20}>ช่องทางติดต่อ</ThHeader>
                                <ThHeader width={20}>เบอร์ติดต่อภายใน</ThHeader>
                                <ThHeader width={20}>สินค้า</ThHeader>
                                <ThHeader width={30}>ซีเรียลนัมเบอร์ (S/N)</ThHeader>
                                
                                {/* <ThHeader > ลูกค้า </ThHeader>
                                <th> ช่องทางติดต่อ </th>
                                <th> เบอร์ติดต่อภายใน </th>
                                <th> สินค้า </th>
                                <th> ซีเรียลนัมเบอร์ (S/N) </th> */}
                            </TrHeader>
                            <TrContent>
                                <TdContent width={20}>{saleData?.customer_name}</TdContent>
                                <TdContent width={20}>{"-"}</TdContent>
                                <TdContent width={20}>{"-"}</TdContent>
                                <TdContent width={20}>{saleData?.product_name}</TdContent>
                                <TdContent width={30}>{saleData?.serial_number}</TdContent>
                            </TrContent>
                    </TableFeed>
                </TableContainer>

                {/* Feedback form result*/}
                <MainFeedbackContainer>
                    {rendered_feedback}
                </MainFeedbackContainer>
            </FeedbackContainer>
        </div>
    )
}

