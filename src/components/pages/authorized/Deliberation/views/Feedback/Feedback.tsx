import React from 'react'
import Navbar from '../../../../../common/navbar'
import Ratingstar from '../../../../../common/Ratingstar';
import { BodyWrapper, TbodyContent, TdContent,TrContent, FeedbackContainer, FeedbackText, MainFeedbackContainer, TableContainer, ThHeader, TopInnerContainer, TrHeader, FeedbackList, ContainerBox, CommentBox, InsideHeaderContainer, ColonText, HeaderText, GenLinkContainer, GenBtn, GenPopContainer, GenPopTextBox, GenPopCopyBtn, TableFeed} from './feedback.styles'
import { Popover } from 'antd';

export default function Feedback() {
    const [hasFeedback, setHasFeedback] = React.useState(false);

    const [visible, setVisible] = React.useState(false)
    const GeneretedLinkAndCopyBTN =
    <>
        <GenPopContainer>
            <GenPopTextBox value="https://github.com/SSPRITEz-DEV/react-fundamental-workshop.git"/>
            <GenPopCopyBtn>คัดลอก</GenPopCopyBtn>
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
                >
                   <GenBtn>สร้าง URL สำหรับให้คำแนะนำ</GenBtn>
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
                                <TdContent width={20}>Thiti Mahawannakit</TdContent>
                                <TdContent width={20}>-</TdContent>
                                <TdContent width={20}>02-487-8822</TdContent>
                                <TdContent width={20}>หมวกสมาร์ท</TdContent>
                                <TdContent width={30}>BK0207442087</TdContent>
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

