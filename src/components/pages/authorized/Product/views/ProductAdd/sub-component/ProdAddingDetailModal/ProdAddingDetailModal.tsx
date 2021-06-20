import { Modal, PageHeader, Table,Typography } from 'antd'
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
}
const ProdAddingDetailModal:React.FC<IProps> = ({visible,invalid_datas,valid_datas,back}) => {
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
        <Table size="small" pagination={{ pageSize:10 }} rowKey="serial_number" dataSource={valid_datas || []} loading={valid_datas===null} bordered style={{ marginTop:20,marginBottom:20 }}>
            <Column title="รหัสสินค้า [SKU]" dataIndex="product_code" key="product_code"/>
            <Column title="ซีเรียลนัมเบอร์" dataIndex="serial_number" key="serial_number"/>
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