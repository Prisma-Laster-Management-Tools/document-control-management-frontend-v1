import React, { useEffect, useMemo, useState } from 'react'
import { Drawer, Button,Timeline,Table,PageHeader, Descriptions, Tag, Divider } from 'antd';
import { API_GetProductHistoryTimelineOfTheQcProcess } from '../../../../apis/product.api';
import { IControlProecssOfProduct } from '../../../../shared/interfaces/product.interfaces';
import { groupBy,AcendingSorter } from '../../../../../../../../utilities/array/common';
import Moment from 'react-moment';

const {Column} = Table

interface IProps{
    focused_product_id:number | null
    clear_focus: () => any
}
interface IGroupProcessData{
    [x: string]: any // Do typing later
}
interface ISortedQcArray{
    number_of_protocol: number // store the number of protocol list in the past [not cascade on change]
    group_code:string
    createdAt:string // contains date string
    process_data: Array<IControlProecssOfProduct>
}
const QcHistory:React.FC<IProps> = ({focused_product_id,clear_focus}) => {
    const [timelineDrawerVisible,setTimelineDrawerVisible] = useState<boolean>(false)
    const [nestedHistoryDrawerVisible,setNestedHistoryDrawerVisible] = useState<boolean>(false)
    const [currentProcessData,setCurrentProcessData] = useState< Array<IControlProecssOfProduct> |null>(null) // null by default 
    const [sortedHistoricalProcessData,setSortedHistoricalProcessData] = useState<Array<ISortedQcArray>>([]) // empty array by default -> if need to do the check check on the -> currentProcessData
    const [focusedControlProcessData,setFocusedControlProcessData] = useState<Array<IControlProecssOfProduct>|null>(null)

    function createdSortedHistoricalProcessDataOnGroupedObject(grouped_data:IGroupProcessData){
        let sorted_historical_quality_control_data: Array<ISortedQcArray> = [] // waiting for the element to append in

        for (let group_code in grouped_data){
            //nested loop to iterate over the nested element to check and sort the date
            for(let nested_element of grouped_data[group_code]){
               	// before pushing check if the group code of "X" already exist in the array
                const $pointer_reference = sorted_historical_quality_control_data.find(function(data){
                    return data.group_code === group_code
                })
                if($pointer_reference){
                    $pointer_reference.process_data.push(nested_element)
                }else{
                    // append newly created sub-array to the list -> because it hasnt been created yet
                    sorted_historical_quality_control_data.push({number_of_protocol:nested_element.number_of_protocol,group_code,createdAt:nested_element.createdAt,process_data: [nested_element]})
                }
                
            }
        }

        sorted_historical_quality_control_data = sorted_historical_quality_control_data.sort((a,b) => {
            const date1 = new Date(a.createdAt)
            const date2 = new Date(b.createdAt)
            if(date1 < date2){ // change < to > [if you want it to be acending order]
                return 0 // if the date1 is up ahead of the date2 -> set it to have upper priority
            }
            return -1
        })

        console.log(sorted_historical_quality_control_data)
        setSortedHistoricalProcessData(sorted_historical_quality_control_data)

    }

    async function fetchProductTimelineHistoryOfTheQcProcess(product_id:number){
        //fetching the list of the current prod id
        const mapped_response = await API_GetProductHistoryTimelineOfTheQcProcess(product_id)
        if(mapped_response.success){
            console.log(mapped_response.data)
            setCurrentProcessData(mapped_response.data) 
            createdSortedHistoricalProcessDataOnGroupedObject(groupBy(mapped_response.data, (ele) => ele.group_code))
        }else{
            // failed to get the historical data [not included the empty of the process -> if the process currently have no process -> it would return the empty array instead]
        }
    }

    useEffect(() => {
        if(focused_product_id){
            // if the passed prop is not null
            fetchProductTimelineHistoryOfTheQcProcess(focused_product_id)
            // set the visible of the drawer also
            setTimelineDrawerVisible(true)
        }
    },[focused_product_id])

    function onCloseTimelimeDrawer(){
        setTimelineDrawerVisible(false)
        // trigger to the derive component also -> to clearout the focused_product_id
        clear_focus()
    }

    function onViewingProcessDataDetail(data:Array<IControlProecssOfProduct>){
        setFocusedControlProcessData(data)
        setNestedHistoryDrawerVisible(true)
    }

    //
    // ─── VIS HELPER ─────────────────────────────────────────────────────────────────
    //
    const rendered_timeline = useMemo(() => {
        // re-render when the sortedHistoricalProcessData has changed/updated

        if(!sortedHistoricalProcessData.length) return null
        return  <Timeline mode="left">
            {
                sortedHistoricalProcessData.map((data) =>  {
                    const is_pass = data.process_data.every((pcd) => pcd.check_status===true) // is_pass should be true -> if all check_status are marked as true
                    const color = is_pass ? 'green' : 'red'
                    return <Timeline.Item color={color} label={<Moment format="D MMM YYYY" withTitle>{data.createdAt}</Moment>}><Button onClick={onViewingProcessDataDetail.bind(null,data.process_data)} style={{ marginBottom:30 }}>รายละเอียด</Button></Timeline.Item>
                })
            }
        </Timeline>
    },[sortedHistoricalProcessData])
    // ────────────────────────────────────────────────────────────────────────────────



    //
    // ─── FOR NESTEED CONTENT ────────────────────────────────────────────────────────
    //
    function getTotalPassCountFromSortedHistoricalData(){
        if(!focusedControlProcessData) return 0
        return focusedControlProcessData.reduce((pass_count,data) => {
            if(data.check_status) return pass_count + 1
            return pass_count
        },0)
    }
    // ────────────────────────────────────────────────────────────────────────────────


    return (
        <>
            <Drawer
            title={null}
            width={500}
            closable={false}
            onClose={onCloseTimelimeDrawer}
            visible={timelineDrawerVisible}
            >
               
               <div style={{ marginBottom:30,fontFamily:'Kanit' }} className="site-page-header-ghost-wrapper">
                    <PageHeader
                    ghost={false}
                    onBack={onCloseTimelimeDrawer}
                    title="การตรวจสอบคุณภาพ"
                    subTitle="ประวัติและเส้นเวลา"
                    >
                    <Descriptions size="middle" column={4}>
                        <Descriptions.Item>
                            {/* <Space size="small"> */}
                            <Tag color="default">ถูกตรวจสอบทั้งหมด</Tag>
                            {`: ${sortedHistoricalProcessData.length} ครั้ง`}
                            {/* </Space> */}
                        </Descriptions.Item>
                    </Descriptions>
                    </PageHeader>
                </div>
                {/* <Divider/> */}


                 <Drawer
                title={null}
                width={500}
                closable={false}
                onClose={setNestedHistoryDrawerVisible.bind(null,false)}
                visible={nestedHistoryDrawerVisible}
                >

            <div style={{ marginBottom:30,fontFamily:'Kanit' }} className="site-page-header-ghost-wrapper">
                    <PageHeader
                    ghost={false}
                    onBack={setNestedHistoryDrawerVisible.bind(null,false)}
                    title="รายละเอียด"
                    subTitle="ข้อกำหนด"
                    >
                         <Descriptions size="middle" column={2}>
                            <Descriptions.Item>
                                {/* <Space size="small"> */}
                                <Tag color="default">ผ่าน</Tag>
                                {`: ${getTotalPassCountFromSortedHistoricalData()} ข้อกำหนด`}
                                {/* </Space> */}
                            </Descriptions.Item>
                            <Descriptions.Item>
                                {/* <Space size="small"> */}
                                <Tag color="red">ไม่ผ่าน</Tag>
                                {`: ${(focusedControlProcessData?.length || 0) - getTotalPassCountFromSortedHistoricalData()} ข้อกำหนด`}
                                {/* </Space> */}
                            </Descriptions.Item>
                        </Descriptions>
                    </PageHeader>
                </div>

                    <Table style={{ fontFamily:'Kanit' }} dataSource={focusedControlProcessData || []} loading={focusedControlProcessData===null} rowKey="id" size="large" pagination={false} bordered >
                        <Column align="center" width="15%" title="ข้อกำหนด" dataIndex="protocol_description" key="protocol_description" />
                        <Column title="สถานะ" align="center" width="5%" render={(text,record:IControlProecssOfProduct) => {
                            return record.check_status ? <span style={{ color:'green' }}>ผ่าน</span> : <span style={{ color:'green' }}>ไม่ผ่าน</span>
                        }}/>
                    </Table>
                </Drawer>

                <Timeline style={{ fontFamily:'Kanit' }} mode="left">
                    {rendered_timeline}
                </Timeline>

            </Drawer>
        </>
    )
}

export default QcHistory
