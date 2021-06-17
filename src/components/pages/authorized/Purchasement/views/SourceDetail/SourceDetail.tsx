import { Button, Divider, Form, Input, PageHeader,Popover,Select,Space,Table, Tooltip } from 'antd'
import React, { useState,useCallback } from 'react'
import { MainContainer } from './sourceDetail.styles'
import useSourceDetail from './useSourceDetail'
import { EditFilled,DeleteFilled,PlusOutlined,FormOutlined} from '@ant-design/icons';
import { ConfirmationModalRequired } from '../../../../../../utilities/react-confirm-pro';
import { IPurchasementSoruce } from '../../shared/interfaces/purchasement.interfaces';
import PurchasementOrder from './sub-component/PurchasementOrder/PurchasementOrder';
const {Column} = Table
const {useForm} = Form
const { Option } = Select;
const formItemLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 9 },
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 15 },
    },
  };


type TAction = "view" | "order"
const SourceDetail:React.FC = () => {
    const $hook_source_detail = useSourceDetail()
    const [popOverVisible,setPopoverVisible] = useState(false)
    const [action,setAction] = useState<TAction>('view')
    const [sourceRequestedId,setSourceRequestedId] = useState<number|null>(null)
    const [form] = useForm()

    function onMakingOrderReq($data:IPurchasementSoruce){
        setSourceRequestedId($data.id)
        setAction('order')
    }

    const GET_COMMERCIAL_NUMBER_LIST = useCallback(
        () => {
            if(!$hook_source_detail.get.sourceDetail) return []
            return $hook_source_detail.get.sourceDetail.map(data => data.commercial_number)
        },
        [$hook_source_detail.get.sourceDetail],
    )
    //
    // ─── FOR POPOVER CONTENT ────────────────────────────────────────────────────────
    //
    const rendered_popover_content = <div style={{ fontFamily:'Kanit',width:'400px', }}>
    <div style={{ background:'white' }}>
        <h3 style={{ marginBottom:40 }}>สร้างแหล่งการจัดซื้อ</h3>
        <Form onFinish={$hook_source_detail.events.onCreateSource.bind(null,form,() => setPopoverVisible(false))} form={form} {...formItemLayout}>
            <Form.Item
                    // style={{ width:"50%" }}
                    name="part_number"
                    label="วัสดุ"
                    rules={[
                    {
                        required: true,
                        message: 'กรุณาระบุรหัสวัสดุ (Ex. RM00X)',
                    },
                    ]}
                >
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="เลือกวัสดุ"
                    optionFilterProp="children"
                    // onChange={onChange}
                    // onFocus={onFocus}
                    // onBlur={onBlur}
                    // onSearch={onSearch}
                    filterOption={(input, option) => {
                        return option!.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    }
                >
                    { $hook_source_detail.get.partDetail.map((pDetail) => {
                        return  <Option value={pDetail.part_number}>{pDetail.part_number} - {pDetail.part_name}</Option>
                    })}
                </Select>
            </Form.Item>
            <Form.Item
                    // style={{ width:"50%" }}
                    name="commercial_number"
                    label="รหัสการสั่งซื้อ"
                    rules={[
                    {
                        required: true,
                        message: 'กรุณาระบุรหัสการสั่งซื้อ',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if(!GET_COMMERCIAL_NUMBER_LIST().includes(value)){
                                // check length can be done easiy other way
                                return Promise.resolve()
                            }
                          return Promise.reject(new Error('เลขสั่งซื้อนี้มีอยู่แล้วในระบบ'));
                        },
                      })
                    ]}
                >
                <Input />
            </Form.Item>

            <Form.Item
                    // style={{ width:"50%" }}
                    name="company"
                    label="บริษัท"
                    rules={[
                    {
                        required: true,
                        message: 'กรุณาระบุบริษัท',
                    },
                    ]}
                >
                <Input />
            </Form.Item>

            <Form.Item
                    // style={{ width:"50%" }}
                    name="seller"
                    label="ผู้ขาย"
                    rules={[
                    {
                        required: true,
                        message: 'กรุณาระบุชื่อผู้ขาย',
                    },
                    ]}
                    tooltip="ชื่อผู้ขาย"
                >
                <Input />
            </Form.Item>

            
            <Form.Item
                    // style={{ width:"50%" }}
                    name="email"
                    label="อีเมล์"
                    rules={[
                    {
                        required: true,
                        message: 'กรุณาระบุอีเมล์',
                    },
                    {
                        type:'email',
                        message: 'รูปแบบของอีเมล์ไม่ถูกต้อง'
                    }
                    ]}
                    tooltip="สำคัญ: ใช้ในการสั่งซื้อโดยระบบอัตโนมัติ"
                >
                <Input />
            </Form.Item>

           

            <Form.Item wrapperCol={{ sm:{span:15,offset:9} }}>
                    <Button type="primary" htmlType="submit" block>
                        ยืนยัน
                    </Button>
                    {/* <Button onClick={onCancel} danger block>
                        ยกเลิก
                    </Button> */}
            </Form.Item>

        </Form>
    </div>
</div>
    // ────────────────────────────────────────────────────────────────────────────────

    let rendered_content = null
    switch (action) {
        case 'view':
            rendered_content = <>
            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                ghost={false}
                backIcon={null}
                title="ข้อมูลแหล่งการจัดซื้อ"
                >
                </PageHeader>
            </div>
            <div style={{ display:'flex',justifyContent:'flex-end',marginBottom:20,paddingRight:10 }}>

            <Popover
                content={rendered_popover_content}
                // title="สร้างส่วนประกอบ"
                trigger="click"
                placement="left"
                visible={popOverVisible}
                onVisibleChange={(visible) => setPopoverVisible(visible)}
            >
                <Button type="primary" shape="circle" icon={<PlusOutlined />} size="middle" />
            </Popover>
            </div>
            <Table onRow={(r) => ({onClick: () => console.log("lol")})} dataSource={ $hook_source_detail.get.sourceDetail || []} rowKey="id" size="middle" pagination={{ pageSize:8 }} bordered loading={$hook_source_detail.get.sourceDetail===null}>
                    <Column title="รหัสการสั่งซื้อ" dataIndex="commercial_number" key="commercial_number" />
                    <Column title="รหัสวัสดุ" dataIndex="part_number" key="part_number" />
                    <Column title="บริษัท" dataIndex="company" key="company" />
                    <Column title="ผู้ขาย" dataIndex="seller" key="seller" />
                    <Column title="อีเมล์" dataIndex="email" key="email" />
                    <Column align="center" title="ตัวจัดการ" render={(text,record: IPurchasementSoruce) => {
                        return <div style={{ display:'flex',flexDirection:'row' }}>
                                    <div style={{ width:'50%',height:'100%',alignItems:'center' }}>
                                        <Tooltip placement="bottom" title="สร้างคำสั่งซื้อ">
                                            <Button onClick={onMakingOrderReq.bind(null,record)} style={{ borderColor:'green' }} ghost type="primary" shape="circle" icon={<FormOutlined style={{ color:'green' }} />} size="middle" />
                                        </Tooltip>
                                    </div>
                                    <Divider style={{ height:'35px' }} type="vertical" />
                                    <div style={{ width:'50%',height:'100%',alignItems:'center'  }}>
                                        <Space>
                                            <Tooltip placement="bottom" title="แก้ไข">
                                                <Button ghost type="primary" shape="circle" icon={<EditFilled />} size="middle" />
                                            </Tooltip>
                                            <Tooltip placement="bottom" title="ลบ">
                                                <Button onClick={() => ConfirmationModalRequired({title:"โปรดยืนยัน",message:`คุณแน่ใจหรอว่าคุณต้องการจะลบแห่ลงการจัดซื้อเลข  ${record.commercial_number} - ${record.company}`},() => $hook_source_detail.events.onRemoveSource(record.id))} ghost danger shape="circle" icon={<DeleteFilled />} size="middle" />
                                            </Tooltip>
                                        </Space>
                                    </div>
                            
                                </div>
                    }} />

            </Table>

            </>
            break;
        case 'order':
            rendered_content = <PurchasementOrder back={() => setAction('view')} focused_source_id={sourceRequestedId}/>
            break;    
        default:
            break;
    }

    return (
        <MainContainer>
            {rendered_content}
        </MainContainer>
    )
}


export default SourceDetail