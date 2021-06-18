import React from 'react'
import { Steps, Divider, Descriptions } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ButtonDiv, BuyerDetailDiv, BuyerDiv, HeaderTextSY, ListDetailHeader, ListDetailText, ListDetailText2, MailButtomDiv, MaildetailBox, MaildetailBox2, MailDetailContainer, MailTextHeader, PTBoxContainer, PTrackMainContainer, SellerDetailDiv, SellerDiv, StepDiv, TrackDiv } from './PurchasementTracking.styles'

const { Step } = Steps;
export default function PurchasementTracking() {
    return (
        <>
            <PTrackMainContainer>

                <PTBoxContainer>
                    <MailDetailContainer>
                        <MailTextHeader>รายการสั่งซื้อสินค้า</MailTextHeader>
                        
                        <MailButtomDiv>
                            <MaildetailBox>
                                <ListDetailHeader>วันที่สั่งซื้อ</ListDetailHeader>
                                <ListDetailText>Sunday, February 03, 2021</ListDetailText>
                            </MaildetailBox>
                            <MaildetailBox>
                                <ListDetailHeader>รหัสสินค้า</ListDetailHeader>
                                <ListDetailText>SMLSDVS6500</ListDetailText>
                            </MaildetailBox>
                            <MaildetailBox>
                                <ListDetailHeader>ราคาสินค้าที่เสนอ</ListDetailHeader>
                                <ListDetailText>3,000 บาท</ListDetailText>
                            </MaildetailBox>
                            <MaildetailBox>
                                <ListDetailHeader>รายละเอียดสินค้า</ListDetailHeader>
                                <ListDetailText>ถุงยางอนามัยเรืองแสง</ListDetailText>
                            </MaildetailBox>
                            <MaildetailBox2>
                                <ListDetailHeader>สถานที่จัดส่ง</ListDetailHeader>
                                <ListDetailText2>บริษัท พรีมา เลเซอร์ เทอร์ราพี จำกัด 350 ซอยตลาดบ้านสมเด็จ ถนนสมเด็จเจ้าพระยา แขวงสมเด็จเจ้าพระยา เขตคลองสาน กรุงเทพฯ 10600</ListDetailText2>
                            </MaildetailBox2>
                        </MailButtomDiv>

                    </MailDetailContainer>

                    {/* ///////////   Seller and Buyer Container    ///////////*/}
                    <TrackDiv>

                        <SellerDiv>
                            <SellerDetailDiv>
                                <HeaderTextSY>รายละเอียดผู้จัดขาย</HeaderTextSY>

                                <Descriptions
                                        bordered
                                        size="small"
                                        column={1}
                                        >
                                        <Descriptions.Item label="บริษัท">Cloud Database</Descriptions.Item>
                                        <Descriptions.Item label="ชื่อผู้ขาย">นายธนวัฒน์ จิตอุทัย</Descriptions.Item>
                                        <Descriptions.Item label="เบอร์โทร">091-819-1923</Descriptions.Item>
                                        <Descriptions.Item label="อีเมล">Tanawatt2541@gmail.com</Descriptions.Item>
                                </Descriptions>

                                <ButtonDiv>เพิ่มหลักฐานการจัดส่ง</ButtonDiv>
                            </SellerDetailDiv>
                            <StepDiv direction="vertical" current={1} size="small" >
                                <Step status="process" icon={<LoadingOutlined />} title={<div>ยืนยันออเดอร์</div>} />
                                <Step title={<div>หลักฐานการส่ง</div>}  />
                                <Step title={<div>ดำเนินการส่ง</div>} />
                            </StepDiv>
                        </SellerDiv>
                        
                        <Divider type="vertical" style={{height:"98%"}}></Divider>

                        <BuyerDiv>
                            <StepDiv direction="vertical" current={1} size="small" >
                                <Step title={<div>ยืนยันการสั่งซื้อ</div>}  />
                                <Step title={<div>การชำระเงิน</div>}  />
                                <Step title={<div>ได้รับสินค้า</div>}  />
                            </StepDiv>
                            <BuyerDetailDiv>
                                <HeaderTextSY>รายละเอียดผู้จัดขาย</HeaderTextSY>

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

                                <ButtonDiv>เพิ่มหลักฐานการชำระเงิน</ButtonDiv>
                            </BuyerDetailDiv>
                        </BuyerDiv>
                        
                    </TrackDiv>

                </PTBoxContainer>
            </PTrackMainContainer>
        </>
    )
}
