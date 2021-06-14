import React, { useState } from 'react'
import { Input, DatePicker, Table, Typography,Space } from 'antd';
import Navbar from '../../../../../common/navbar'
import { ListBtn2, ListBtn, ItemModal, ThHeaderUniq, TdContent, BgContainer, SaleActivityText, SalesContainer,SalesInnerHeaderContainer, HeaderTopRightZone, AddSalesBtn, AddactivityModal, ListText, InsideModalContainer, ListInputBox, ListModalFooter, ListContainer, ListImage, ListTextDetailContainer, ListSigleContainer, ListHeaderText, ListColonText, ListDetailText } from './sales.styles'
import { API_CreateSaleData, API_GetAllSalesData } from '../../apis/deliberation.api';
import { CreateSaleDataDTO, ISaleData } from '../../shared/interfaces/deliberation.interfaces';
import Moment from 'react-moment';

const { Text, Link } = Typography;
const { Search } = Input;
const {Column} = Table
const columns = [
    {
      title: 'สินค้า',
      dataIndex: 'product_name',
    },
    {
      title: 'ซีเรียลนัมเบอร์ (S/N)',
      dataIndex: 'serial_number',
    },
    {
        title: 'ลูกค้า',
        dataIndex: 'customer_name',
      },
      {
        title: 'วันที่ขาย',
        dataIndex: 'issued_at',
        render: (date:string) => <Moment format="D MMM YYYY" withTitle>{date}</Moment>
      },
      {
        title: 'ราคา',
        dataIndex: 'price',
      },
  ];

// MAPPED TYPE
type TCreateSaleDataErrors = {
    [Property in keyof CreateSaleDataDTO]?: string;
}
// ────────────────────────────────────────────────────────────────────────────────


export default function Sales(props:any) {
    const [visible, setVisible] = useState(false);
    const [tdcontainervisible, tdcontainersetVisible] = useState(false);
    const [saleDatas,setSaleDatas] = useState<Array<ISaleData>>([])
    const [createSaleDataInput,setCreateSaleDataInput] = useState<CreateSaleDataDTO>({customer_name:'',issued_at:'',price:0,product_name:'',serial_number:''})
    const [createSaleDataErrors,setCreateSaleDataErrors] = useState<TCreateSaleDataErrors>({})
    const [currentFocusSaleData, setCurrentFocusSaleData] = useState<ISaleData | null>(null)

    async function getSalesData(){
        const mapped_response = await API_GetAllSalesData()
        if(mapped_response.success){
            const {data:sales_data} = mapped_response.data
            setSaleDatas(sales_data)
        }else{
            // failed fetching data
        }
    }

    React.useEffect(() => {
        getSalesData()
    },[])

    function setSaleDataInput(which: keyof CreateSaleDataDTO,event:React.ChangeEvent<HTMLInputElement>){
        const {value} = event.target
        setCreateSaleDataInput(prevState => ({...prevState,[which]:value}))
    }

    async function onAddingNewSaleData(){
        console.log(createSaleDataInput)
        const mapped_response = await API_CreateSaleData(createSaleDataInput)
        if(mapped_response.success){
            setCreateSaleDataErrors({}) // clear out the errors
            await getSalesData()
            setVisible(false)
        }else{
            if(mapped_response.error_type === 'validation'){
                setCreateSaleDataErrors(mapped_response.data.errors)
            }
        }
    }
    function onViewingEachSaleData(data: ISaleData){
        setCurrentFocusSaleData(data)
        tdcontainersetVisible(true)
    }

    return (
        <>
            {/* <Navbar/> */}
            {/* <BgContainer/> */}
            <SalesContainer>
                <SalesInnerHeaderContainer>
                    <SaleActivityText>กิจกรรมการขาย</SaleActivityText>
                    <HeaderTopRightZone>
                        <Search 
                            placeholder="ใส่คำที่ต้องการค้นหา..." 
                            //enterButton
                        />
                        <AddSalesBtn onClick={() => setVisible(true)}> เพิ่มรายการ </AddSalesBtn>
                    </HeaderTopRightZone>
                </SalesInnerHeaderContainer>

                <AddactivityModal
                    title="เพิ่มกิจกรรมการขายใหม่"
                    centered
                    visible={visible}
                    onOk={onAddingNewSaleData}
                    onCancel={() => setVisible(false)}
                    width={1000}
                    okText={"ยืนยัน"}
                    cancelText={"ยกเลิก"}
                    okButtonProps={{ style: {background: "gray", border: "none"}}}
                    cancelButtonProps={{ style: {border: "none"} }}
                >
                    <InsideModalContainer><ListText>ชื่อสินค้า</ListText><ListInputBox value={createSaleDataInput.product_name} onChange={setSaleDataInput.bind(null,'product_name')} /><Text type="danger">{createSaleDataErrors['product_name']}</Text> </InsideModalContainer>
                    <InsideModalContainer><ListText>ซีเรียลนัมเบอร์ (S/N)</ListText><ListInputBox value={createSaleDataInput.serial_number} onChange={setSaleDataInput.bind(null,'serial_number')}/><Text type="danger">{createSaleDataErrors['serial_number']}</Text></InsideModalContainer>
                    <InsideModalContainer><ListText>ลูกค้า</ListText><ListInputBox value={createSaleDataInput.customer_name} onChange={setSaleDataInput.bind(null,'customer_name')}/><Text type="danger">{createSaleDataErrors['customer_name']}</Text></InsideModalContainer>
                    <InsideModalContainer><ListText>ราคาสินค้า</ListText><ListInputBox type="number" value={createSaleDataInput.price} onChange={setSaleDataInput.bind(null,'price')}/><Text type="danger">{createSaleDataErrors['price']}</Text></InsideModalContainer>
                    <InsideModalContainer><ListText>วันที่ขาย</ListText><DatePicker placeholder="กรุณาเลือกวัน" onChange={(date,dateString) => setCreateSaleDataInput(prevState => ({...prevState,issued_at: new Date(dateString).toISOString()}))} /><Text type="danger">{createSaleDataErrors['issued_at']}</Text></InsideModalContainer>
                </AddactivityModal>
            
                
                {/* TableHeader */}
                
                <ItemModal
                    title="รายละเอียดการขาย"
                    centered
                    closable={false}
                    visible={tdcontainervisible}
                    onCancel={() => tdcontainersetVisible(false)}
                    width={1000}
                    cancelText={"ปิด"}
                    footer={null}
                >

                    <ListContainer>
                        <ListImage></ListImage>
                        <ListTextDetailContainer>
                            {currentFocusSaleData ? 
                                <>
                                    <ListSigleContainer><ListHeaderText>สินค้า</ListHeaderText><ListColonText>:</ListColonText><ListDetailText>{currentFocusSaleData.product_name}</ListDetailText></ListSigleContainer>
                                <ListSigleContainer><ListHeaderText>ซีเรียลนัมเบอร์ (S/N)</ListHeaderText><ListColonText>:</ListColonText><ListDetailText>{currentFocusSaleData.serial_number}</ListDetailText></ListSigleContainer>
                                <ListSigleContainer><ListHeaderText>ลูกค้า</ListHeaderText><ListColonText>:</ListColonText><ListDetailText>{currentFocusSaleData.customer_name}</ListDetailText></ListSigleContainer>
                                <ListSigleContainer><ListHeaderText>วันที่ขาย</ListHeaderText><ListColonText>:</ListColonText><ListDetailText><Moment format="D MMM YYYY" withTitle>{currentFocusSaleData.issued_at}</Moment></ListDetailText></ListSigleContainer>
                                <ListSigleContainer><ListHeaderText>ราคา</ListHeaderText><ListColonText>:</ListColonText><ListDetailText>{currentFocusSaleData.price}</ListDetailText></ListSigleContainer>
                                </>
                                
                            : null}
                        </ListTextDetailContainer>
                       
                    </ListContainer>
                    

                    <ListModalFooter>
                        <ListBtn onClick={() => {
                            props.history.push(`/feedback/${currentFocusSaleData?.id}`)
                        }}>ดูข้อเสนอแนะ</ListBtn>
                        <ListBtn2 onClick={() => tdcontainersetVisible(false)}>ออก</ListBtn2>
                    </ListModalFooter>
                    
                </ItemModal>
        
                <div style={{ width:"100%" }}>
                    {/* <Table columns={columns} dataSource={saleDatas} rowKey="id" size="large" pagination={{ pageSize:8 }} bordered/> */}
                    <Table dataSource={saleDatas} rowKey="id" size="large" pagination={{ pageSize:8 }} bordered>
                        <Column title="สินค้า" dataIndex="product_name" key="product_name" />
                        <Column title="ซีเรียลนัมเบอร์ (S/N)" dataIndex="serial_number" key="serial_number" />
                        <Column title="ลูกค้า" dataIndex="customer_name" key="customer_name" />
                        <Column title="วันที่ขาย" dataIndex="issued_at" key="issued_at" render={(text,record) => {
                            return <>
                                <Moment format="D MMM YYYY" withTitle>{text}</Moment>
                            </>
                        }} />
                        <Column title="ราคา" dataIndex="price" key="price" />
                        <Column title="การจัดการ" key="action" render={(text,record) => {
                            return <>
                                <Space size="middle">
                                    <a onClick={onViewingEachSaleData.bind(null,record as ISaleData)}>ดูรายละเอียด</a>
                                    <a style={{ color:'red' }} onClick={() => console.log("Removing record")}>ลบ</a>
                                </Space>
                            </>
                        }}  />
                    </Table>
                </div>

            </SalesContainer>
            
        </>
    )
}
