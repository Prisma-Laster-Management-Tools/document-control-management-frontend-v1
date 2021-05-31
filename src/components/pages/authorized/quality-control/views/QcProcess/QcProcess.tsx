import React from 'react'
import { Pagination, Divider } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import Navbar from '../../../../../common/navbar'
import { BtnWithImage, BtnWithImage2, CheckBtnContainer, InfoTextBox, InsideBtn, PicCon, PicDefault, QcBtn, QcPicText, QcProcessBodyMainContainer, QcProcessDetailContainer, QcProcessMainContainer, QcProcessPictureContainer, QcTextD, QcTextR, TextInsideBoxInfo } from './QcProcess.styles'

export default function Qc() {
    return (
        <>
            <Navbar/>
            <QcProcessMainContainer>
                <QcProcessBodyMainContainer>
                    <QcProcessPictureContainer>
                        <QcPicText>ภาพรายละเอียด</QcPicText>
                        <PicCon>
                            <PicDefault/>
                        </PicCon>
                    </QcProcessPictureContainer>
                    <Divider type="vertical" style={{height:"48rem"}}/>
                    <QcProcessDetailContainer>
                        <QcTextD>ขั้นตอน</QcTextD>
                        <Pagination simple defaultCurrent={1} current={1} pageSize={1} total={5} />
                        <QcTextR>รายละเอียด</QcTextR>
                        <InfoTextBox>
                            <TextInsideBoxInfo>ยาว 2 มิลลิเมตร</TextInsideBoxInfo>
                        </InfoTextBox>
                        <CheckBtnContainer>
                            <BtnWithImage>
                                <CheckCircleFilled style={{color: 'white'}}/>
                                <InsideBtn>ไม่ผ่าน</InsideBtn>
                            </BtnWithImage>
                            <BtnWithImage2>
                                <CheckCircleFilled style={{color: 'white'}}/>
                                <InsideBtn>ผ่าน</InsideBtn>
                            </BtnWithImage2>
                        </CheckBtnContainer>
                        {/* <QcBtn>ยืนยัน</QcBtn> */}
                    </QcProcessDetailContainer>
                </QcProcessBodyMainContainer>
            </QcProcessMainContainer>
        </>
    )
}
