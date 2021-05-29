import React from 'react'
import { Divider, InputNumber } from 'antd';
import Navbar from '../../../../../common/navbar'
import { BoxListMail, InputPirce, ListDetailContainer, OrderBtn, PaperExample, PrBodyMainContainer, PrDetailContainer, PrExampleContainer, PrOrderMainContainer, TextDetail, TextHeader, TextMail, TextPrima, TextPrimaAddress, TextPrimaEng } from './Prorder.styles'

export default function Prorder() {
    
    return (
        <>
            <Navbar/>
            <PrOrderMainContainer>
                <PrBodyMainContainer>

                    <PrDetailContainer>
                        <ListDetailContainer><TextHeader>Company Name</TextHeader><Divider type="vertical" style={{paddingRight:"1rem" ,height:"2rem"}}/> 
                            <TextDetail>Prima Laser Co.,Ltd</TextDetail>
                        </ListDetailContainer>
                        <ListDetailContainer><TextHeader>PIN Comercial</TextHeader><Divider type="vertical" style={{paddingRight:"1rem" ,height:"2rem"}}/> 
                            <TextDetail>PN0001034 -บริษัท</TextDetail>
                        </ListDetailContainer>
                        <ListDetailContainer><TextHeader>Part Number</TextHeader><Divider type="vertical" style={{paddingRight:"1rem" ,height:"2rem"}}/> 
                            <TextDetail>RM001224</TextDetail>  
                        </ListDetailContainer>
                        <ListDetailContainer><TextHeader>จำนวน</TextHeader><Divider type="vertical" style={{paddingRight:"1rem" ,height:"2rem"}}/> 
                            <InputNumber min={1} max={9999} defaultValue={1} style={{ width:"10rem", height:"2rem"}} />
                        </ListDetailContainer>
                        <ListDetailContainer><TextHeader>ราคา</TextHeader><Divider type="vertical" style={{paddingRight:"1rem" ,height:"2rem"}}/> 
                            <InputPirce></InputPirce>
                        </ListDetailContainer>
                        <OrderBtn>สั่งสินค้า</OrderBtn>
                    </PrDetailContainer>

                    <Divider type="vertical" style={{height:"48rem"}}/>

                    <PrExampleContainer>
                        <div>Example</div>
                        <PaperExample>
                            <TextPrima>บริษัท พรีมา เลเซอร์ เทอร์ราพี จำกัด</TextPrima>
                            <TextPrimaAddress>350 ซ.ตลาดบ้านสมเด็จเจ้าพระยา ถ.สมเด็จเจ้าพระยา แขวง สมเด็จเจ้าพระยา เขต คลองสาน กรุงเทพมหานครฯ 10600</TextPrimaAddress>
                            <TextPrimaEng>Prima Laser Co.,Ltd</TextPrimaEng>
                            <TextMail>เรียน บริษัท เอไอเอ จำกัด</TextMail>
                            <TextMail>เรื่อง การสั่งซื้อสินค้า และรายละเอียดข้อมูลสินค้า</TextMail>
                            <BoxListMail>
                                <div>1. หมวกสมาร์ธ</div>
                                <div>2. หน้ากากกันไอ</div>
                            </BoxListMail>
                            <TextMail>สรุปค่าใช้จ่ายทั้งหมดเป็นเงิน 200,000 G-Coin</TextMail>
                        </PaperExample>
                    </PrExampleContainer>

                </PrBodyMainContainer>
            </PrOrderMainContainer>
        </>
    )
}
