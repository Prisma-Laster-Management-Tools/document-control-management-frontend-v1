import React from 'react'
import { Input, Divider} from 'antd';
import Navbar from '../../../../../../common/navbar'
import { PDBoxContainer, PDBtn, PDFormItem, PDListContainer, PDMainContainer, PDTextHeader, PDTextList } from './Partdetail.styles'

export default function Partdetail() {
    return (
        <>
            <Navbar/>
            <PDMainContainer>
                <PDBoxContainer>
                    <PDTextHeader>Part List</PDTextHeader>
                    <Divider/>
                    <PDListContainer>
                        <PDTextList>Text 1</PDTextList>
                        <Divider type="vertical" style={{height:"2rem"}}></Divider>
                        <PDFormItem>
                            <Input></Input>
                        </PDFormItem>
                    </PDListContainer>
                    <PDListContainer>
                        <PDTextList>Text 2</PDTextList>
                        <Divider type="vertical" style={{height:"2rem"}}></Divider>
                        <PDFormItem>
                            <Input></Input>
                        </PDFormItem>
                    </PDListContainer>

                    <PDBtn>ยืนยัน</PDBtn>
                </PDBoxContainer>
            </PDMainContainer>
        </>
    )
}
