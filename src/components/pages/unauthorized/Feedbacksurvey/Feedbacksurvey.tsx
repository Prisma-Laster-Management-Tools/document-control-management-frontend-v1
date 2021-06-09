import React, { useEffect, useState } from 'react'
import { Rate,Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { BgContainer, CommentImage, CSSText, FSContainer, GiveScoreContainer, GiveScoreText, PrimaLogo, RateCommentBox, RateCommieBtn, RateContainer, RateText, TextP } from './Feedbacksurvey.styles'
import { useParams } from 'react-router-dom';
import { API_CreateFeedback, API_VerifyFeedbackToken } from './feedbackSurvey.api';
import { sleep } from '../../../../utilities/fake-loader/fakeLoader';
import { LoadingScreen } from '../../../../core/loading-screen/LoadingScreen';
import { IFeedbackData, ISaleData } from '../../authorized/Deliberation/shared/interfaces/deliberation.interfaces';

type TFeedbackCreationDTO = Omit<IFeedbackData, "id"|"createdAt"|"updatedAt"|"sales">

export default function Feedbacksurvey(props:any) {
    const RouteParams = useParams<{access_token:string}>()
    const [isTokenValid,setIsTokenValid] = useState<boolean|null>(null) // null means haven't checked yet
    const [salesData,setSalesData] = useState<ISaleData | null>(null)
    const [isGivenFeedbackAlready,setIsGivenFeedbackAlready] = useState(false)
    const [feedbackGivenData,setFeedbackGivenData] = useState<Omit<TFeedbackCreationDTO,"access_token">>({delivery_rating_score:3,quality_rating_score:3,service_rating_score:3,worthiness_rating_score:3,feedback_str:''})
    async function verifyFeedback(){
        await sleep(500) // wait for the LoadingScreen component is fully-set -> [safe from newly enter website]
        LoadingScreen.show_loading_screen("กำลังตรวจสอบลื้งค์ของคุณ")
        await sleep(1500)
        const mapped_response = await API_VerifyFeedbackToken(RouteParams.access_token)
        if(mapped_response.success){
            setIsTokenValid(true)
            setSalesData(mapped_response.data.sales)
        }else{
            setIsTokenValid(false)
            // TODO redirect to other page
            LoadingScreen.show_loading_screen("การเข้าถึงไม่ถูกต้อง กำลังนำพาคุณออก")
            await sleep(2000)
            props.history.push('/')
        }
        LoadingScreen.hide_loading_screen()
    }

    function setRatingDataForHook(key: keyof Omit<TFeedbackCreationDTO,"access_token"|"feedback_str">,star:number){
        if(star < 1) return // no star removal allow
        setFeedbackGivenData((prevState) => ({
            ...prevState,
            [key]:star
        }))
    }

    async function onSubmitFeedback(){
        const dto:TFeedbackCreationDTO = {access_token:RouteParams.access_token,...feedbackGivenData}
        const mapped_response = await API_CreateFeedback(dto,salesData!.id)
        if(mapped_response.success){
            console.log('Sending feedback successful')
            setIsGivenFeedbackAlready(true)
        }else{
            console.log('Failed to send the feedback')
            console.log(mapped_response)
        }
    }

    useEffect(() => {
        verifyFeedback()
    },[])

    const rendered_content = !isGivenFeedbackAlready ? 
    <FSContainer>
                    <PrimaLogo/>
                    <CSSText>แบบสำรวจความพึงพอใจของลูกค้า</CSSText>
                    <GiveScoreContainer>
                        <GiveScoreText>
                            <CommentImage/>
                        </GiveScoreText>
                        <RateContainer>
                            <RateText>คุณภาพสินค้า</RateText>
                            <Rate onChange={setRatingDataForHook.bind(null,"quality_rating_score")} value={feedbackGivenData.quality_rating_score!} />
                            <RateText>ความคุ้มค่า</RateText>
                            <Rate onChange={setRatingDataForHook.bind(null,"worthiness_rating_score")}  value={feedbackGivenData.worthiness_rating_score!} />
                            <RateText>ความรวดเร็วในการจัดส่ง</RateText>
                            <Rate onChange={setRatingDataForHook.bind(null,"delivery_rating_score")}  value={feedbackGivenData.delivery_rating_score!} />
                            <RateText>บริการหลังการขาย</RateText>
                            <Rate onChange={setRatingDataForHook.bind(null,"service_rating_score")}  value={feedbackGivenData.service_rating_score!} />
                        </RateContainer>
                    </GiveScoreContainer>
                    <TextP>ความคิดเห็น</TextP>
                    <RateCommentBox value={feedbackGivenData.feedback_str!} onChange={(event) => {
                        const {value} = event.target
                        setFeedbackGivenData((prevState) => ({
                            ...prevState,
                            feedback_str:value
                        }))
                    }} placeholder="แสดงความคิดเห็น..."/>
                    <RateCommieBtn onClick={onSubmitFeedback}>ส่งแบบสำรวจ</RateCommieBtn>
                </FSContainer>        
    
    : <Result
    icon={<SmileOutlined />}
    title="ขอบคุณสำหรับความคิดเห็นของคุณ"
    extra={""}
  />

    return (
        <>
            <BgContainer>
                {rendered_content}
            </BgContainer>
        </>
    )
}
