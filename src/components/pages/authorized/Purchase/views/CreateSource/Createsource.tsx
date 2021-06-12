import React from 'react'
import { Input, Divider} from 'antd';
import Navbar from '../../../../../common/navbar'
import { CRTextHeader, CRBtn, CRFormItem2, CRBoxContainer, CreateResourceMainContainer, CRFormItem, CRListContainer, CRSelect, CRTextList } from './Createsource.styles'

export default function Createsource() {
    return (
        <>
            <Navbar/>
            <CreateResourceMainContainer>
                <CRBoxContainer>
                    <CRTextHeader>Lorem ipsum dolor sit amet.</CRTextHeader>
                    <Divider/>
                    <CRListContainer>
                        <CRTextList>Part Number</CRTextList>
                        <Divider type="vertical" style={{height:"2rem"}}></Divider>
                        <CRSelect></CRSelect>
                        <CRFormItem>
                            <Input></Input>
                        </CRFormItem>
                    </CRListContainer>
                    <CRListContainer>
                        <CRTextList>Company</CRTextList>
                        <Divider type="vertical" style={{height:"2rem"}}></Divider>
                        <CRFormItem2>
                            <Input></Input>
                        </CRFormItem2>
                    </CRListContainer>
                    <CRListContainer>
                        <CRTextList>E-mail</CRTextList>
                        <Divider type="vertical" style={{height:"2rem"}}></Divider>
                        <CRFormItem2>
                            <Input></Input>
                        </CRFormItem2>
                    </CRListContainer>
                    <CRListContainer>
                        <CRTextList>Seller</CRTextList>
                        <Divider type="vertical" style={{height:"2rem"}}></Divider>
                        <CRFormItem2>
                            <Input></Input>
                        </CRFormItem2>
                    </CRListContainer>
                    <CRListContainer>
                        <CRTextList>Commercial number</CRTextList>
                        <Divider type="vertical" style={{height:"2rem"}}></Divider>
                        <CRFormItem2>
                            <Input></Input>
                        </CRFormItem2>
                    </CRListContainer>

                    <CRBtn>ยืนยัน</CRBtn>
                </CRBoxContainer>
            </CreateResourceMainContainer>
        </>
    )
}
