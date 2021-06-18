import React from 'react'
import { Steps, Divider} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ListDetailHeader, ListDetailText, ListDetailText2, MailButtomDiv, MaildetailBox, MaildetailBox2, MailDetailContainer, MailTextHeader, PTBoxContainer, PTrackMainContainer, StepDiv, TrackDiv } from './PurchasementTracking.styles'

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

                    <TrackDiv>
                        <StepDiv direction="vertical" current={1} size="small" >
                            <Step status="process" icon={<LoadingOutlined />} title={<div>ยืนยันออเดอร์</div>} />
                            <Step title={<div>หลักฐานการส่ง</div>}  />
                            <Step title={<div>ดำเนินการส่ง</div>} />
                        </StepDiv>
                        <Divider type="vertical" style={{height:"98%"}}></Divider>
                        <StepDiv direction="vertical" current={1} size="small" >
                            <Step title={<div>ยืนยันการสั่งซื้อ</div>}  />
                            <Step title={<div>การชำระเงิน</div>}  />
                            <Step title={<div>ได้รับสินค้า</div>}  />
                        </StepDiv>
                    </TrackDiv>

                </PTBoxContainer>
            </PTrackMainContainer>
        </>
    )
}
