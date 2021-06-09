import React from 'react'
import Navbar from '../../../../../common/navbar'
import { Menu, Upload, Divider , Button, Dropdown } from 'antd';
import { DownOutlined, UserOutlined, UploadOutlined , InboxOutlined } from '@ant-design/icons';
import { BoxContainer2, BoxContainer, ProductMainContainer, UploadImage, NoteText, UploadfileBtn, ReportText, AddText, SelectText, SelextManualContainer, SelectText2, SelectTextSN, ErrorText, UploadImageCon, DiviDIV } from './Productadd.styles'

export default function Productadd() {
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },
        // onChange(info) {
        //   if (info.file.status !== 'uploading') {
        //     console.log(info.file, info.fileList);
        //   }
        //   if (info.file.status === 'done') {
        //     message.success(`${info.file.name} file uploaded successfully`);
        //   } else if (info.file.status === 'error') {
        //     message.error(`${info.file.name} file upload failed.`);
        //   }
        // },
      };

    const menu = (
        <Menu>
          <Menu.Item key="1" icon={<InboxOutlined />}>
            RM000024124 - หน้ากากกันฝุ่น
          </Menu.Item>
          <Menu.Item key="2" icon={<InboxOutlined />}>
            PTCS00021453 - หมวกเลเซอร์
          </Menu.Item>
          <Menu.Item key="3" icon={<InboxOutlined />}>
            GT00024955 - แก้วเก็บอุณหภูมิ
          </Menu.Item>
        </Menu>
      );
    return (
        <>
            {/* <Navbar/> */}
            <ProductMainContainer>

            {/* ADD WITH FILE */}
                <BoxContainer>
                    <UploadImageCon>
                      <UploadImage/>
                    </UploadImageCon>
                    <Upload {...props}
                    style={{width:"100%", color:"black"}}
                    >
                        <Button icon={<UploadOutlined />}>เลือกไฟล์อัพโหลด</Button>
                    </Upload>
                    <ReportText>จำนวนของลิสต์สินค้าที่ตรวจสอบได้ จำนวน : 23 รายการ</ReportText>
                    <NoteText>***หมายเหตุ ไฟล์ที่อัพโหลดจะต้องเป็นสกุล .csv หรือ .xlsx เท่านั้น</NoteText>
                    <div>Download Example</div>
                    <UploadfileBtn>อัพโหลดไฟล์ข้อมูลสินค้า</UploadfileBtn>
                </BoxContainer>
            
            {/* ADD MANUAL */}
                <BoxContainer2>
                    <AddText>เพื่มข้อมูลจากประเภทในระบบ</AddText>
                    <DiviDIV>
                      <Divider />
                    </DiviDIV>
                    <SelectText>เลือกผลิตภัณฑ์</SelectText>
                    <SelextManualContainer>
                        <Dropdown overlay={menu}>
                            <Button>
                                เลือก <DownOutlined />
                            </Button>
                        </Dropdown>
                        <Divider type="vertical" style={{height:"2rem"}}/>
                        <SelectText2></SelectText2>
                    </SelextManualContainer>
                    <SelectTextSN>ซีเรียลนัมเบอร์ S/N</SelectTextSN>
                    <SelextManualContainer>
                        <Button style={{width:"5rem"}}>สร้าง</Button>
                        <Divider type="vertical" style={{height:"2rem"}}/>
                        <SelectText2></SelectText2>
                    </SelextManualContainer>
                    <ErrorText>Text error Mock</ErrorText>
                    <UploadfileBtn>อัพโหลดข้อมูลสินค้า</UploadfileBtn>
                </BoxContainer2>

            </ProductMainContainer>
        </>
    )
}
