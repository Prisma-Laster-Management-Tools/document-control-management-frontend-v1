import { Button, Modal, PageHeader, Table,Typography } from 'antd'
import React from 'react'
const {Column} = Table
const {Text} = Typography
interface IExcelColumnDescription{
    product_code:string
    serial_number:string
}

interface IProps{
    visible:boolean
    valid_datas: Array<IExcelColumnDescription> | null
    invalid_datas: Array<IExcelColumnDescription> | null
    back: () => any
    duplication_serial_numbers: Array<string> | null
    remove_duplication: () => any
}
const ProdAddingDetailModal:React.FC<IProps> = ({visible,invalid_datas,valid_datas,back,duplication_serial_numbers,remove_duplication}) => {
  return (
    <Modal onCancel={back} style={{ fontFamily:'Kanit' }} width={700} visible={visible} footer={null} closable={false}>
         <div style={{ marginBottom:25,marginLeft:-20 }} className="site-page-header-ghost-wrapper">
                <PageHeader
                ghost={false}
                onBack={back}
                title="การนำเข้าสินค้า"
                subTitle="รายละเอียดรายการที่นำเข้า"
                >
                </PageHeader>
        </div>
        <Text code>รายการที่นำเข้าได้</Text> <span>{valid_datas?.length || 0} รายการ</span>
        {
            duplication_serial_numbers!== null && duplication_serial_numbers.length ?
            <div style={{ display:'flex',justifyContent:'flex-end' }}>
            <Button onClick={remove_duplication}>ลบ {duplication_serial_numbers.length} รายการที่ซ้ำออก</Button>
        </div>
            : null
        }
        <Table size="small" pagination={{ pageSize:10 }} rowKey="serial_number" dataSource={valid_datas || []} loading={valid_datas===null} bordered style={{ marginTop:20,marginBottom:20 }}>
            <Column title="รหัสสินค้า [SKU]" dataIndex="product_code" key="product_code"/>
            <Column title="ซีเรียลนัมเบอร์" render={(text,record:IExcelColumnDescription) => {
                if(!duplication_serial_numbers) return <span>{record.serial_number}</span>
                if(duplication_serial_numbers.includes(record.serial_number.toString())){
                    return <span style={{ color:'red' }}>{record.serial_number} (ซ้ำ)</span>
                }
                return <span>{record.serial_number}</span>
            }}/>
        </Table>

        {
            invalid_datas ? 

                    <>
                        <Text type="danger" code>รายการที่นำเข้าไม่ได้</Text><span>{invalid_datas?.length || 0} รายการ</span>
                        <Table size="small" pagination={{ pageSize:10 }} rowKey="serial_number" dataSource={invalid_datas || []} loading={invalid_datas===null} bordered style={{ marginTop:20 }}>
                            <Column title="รหัสสินค้า [SKU]" dataIndex="product_code" key="product_code"/>
                            <Column title="ซีเรียลนัมเบอร์" dataIndex="serial_number" key="serial_number"/>
                        </Table>
                    </>
            : null
        }
    </Modal>
  )
}


export default ProdAddingDetailModal