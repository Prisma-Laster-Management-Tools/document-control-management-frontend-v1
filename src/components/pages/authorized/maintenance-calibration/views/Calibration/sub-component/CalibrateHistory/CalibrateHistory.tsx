import React, { useEffect, useState } from 'react'
import { Drawer, Button,Timeline,Table,PageHeader, Descriptions, Tag, Divider } from 'antd';
import Moment from 'react-moment';
import { ICalibrationEvidenceData } from '../../../../shared/interfaces/calibration.interfaces';
import { API_GetAllCalibrationEvidenceOfSpecificProduct } from '../../../../apis/calibration.api';
import ImgsViewer from "react-images-viewer";
import { SERVER_ADDRESS} from '../../../../../../../../config/STATIC.json'
const {Column} = Table
interface IProps{
    focused_serial_number:string | null
    clear_focus:() => any
}


const CalibrateHistory:React.FC<IProps> = ({focused_serial_number,clear_focus}) => {
    const [drawerVisible,setDrawerVisible] = useState<boolean>(false)
    const [evidencesList,setEvidencesList] = useState<null | Array<ICalibrationEvidenceData>>(null)

    // For image viewing
    const [focusedEvidenceImageList,setFocusedEvidenceImageList] = useState<string[] | null>(null)
    const [currentImageIndex,setCurrentImageIndex] = useState<number>(0)
    // ────────────────────────────────────────────────────────────────────────────────


    async function getEvidenceData(serial_number:string){
        const mapped_response = await API_GetAllCalibrationEvidenceOfSpecificProduct(serial_number)
        if(mapped_response.success){
            console.log(mapped_response.data)
            setEvidencesList(mapped_response.data)
        }else{
            // failed to fetch the data
        }
    }

    useEffect(() => {
        if(focused_serial_number){
            // if passed props in not null
            setDrawerVisible(true)
            getEvidenceData(focused_serial_number)
        }else{
            setDrawerVisible(false)
        }
    },[focused_serial_number])

    function onCloseDrawer(){
        setDrawerVisible(false)
        // trigger to the derive component also -> to clearout the focused_serial_number
        clear_focus()
    }

    //8*100/10
    function getFailedPercentageOfEvidenceList(){
        if(!evidencesList) return 0
        const total_evidence = evidencesList.length
        const total_failure = evidencesList.reduce((fail_count,data) => {
            if(!data.is_pass) return fail_count+1
            return fail_count
        },0)

        return ((total_failure*100)/total_evidence).toFixed(2)
    }

    //
    // ─── IMAGE PREVIEW ──────────────────────────────────────────────────────────────
    //

    
    const rendered_image_viewr = drawerVisible && focusedEvidenceImageList ? 
    <ImgsViewer imgs={focusedEvidenceImageList.map((path) => ({src: `${SERVER_ADDRESS}/${path}`}))}
       currImg={currentImageIndex} isOpen={true} onClickPrev={onClickPrevImage} onClickNext={onClickNextImage} onClose={onStopViewingAttachmentImage}/>
    : null

    function onViewingAttachmentImage(image_lists: string[]){
        setCurrentImageIndex(0) // reset the viewing index to the first pic
        setFocusedEvidenceImageList(image_lists)
    }
    function onStopViewingAttachmentImage(){
        setCurrentImageIndex(0)
        setFocusedEvidenceImageList(null)
    }
    function onClickNextImage(){
        if(!focusedEvidenceImageList) return
        const nxt_page_index = currentImageIndex + 1
        const total_imgs = focusedEvidenceImageList.length
        if(nxt_page_index >= total_imgs)return
        setCurrentImageIndex(nxt_page_index)
    }
    function onClickPrevImage(){
        if(!focusedEvidenceImageList) return
        const previous_page_index = currentImageIndex - 1
        const total_imgs = focusedEvidenceImageList.length
        if(previous_page_index < 0)return
        setCurrentImageIndex(previous_page_index)
    }

    // ────────────────────────────────────────────────────────────────────────────────


    return <>
        {rendered_image_viewr}
        <Drawer
        title={null}
        width={500}
        closable={false}
        onClose={onCloseDrawer}
        visible={drawerVisible}
        >
            <div style={{ marginBottom:15,fontFamily:'Kanit',marginLeft:-20 }} className="site-page-header-ghost-wrapper">
                    <PageHeader
                    ghost={false}
                    onBack={onCloseDrawer}
                    title="การตรวจวัดประสิทธิภาพ"
                    subTitle="ประวัติ"
                    >
                        <Descriptions size="middle" column={2}>
                            <Descriptions.Item>
                                <Tag color="default">จำนวนครั้งที่ตรวจ</Tag>
                                {`: ${evidencesList?.length || 0} ครั้ง`}
                            </Descriptions.Item>
                            <Descriptions.Item>
                                <Tag color="red">โอกาศที่เกิดความผิดปกติ</Tag>
                                {`: ${getFailedPercentageOfEvidenceList()} %`}
                            </Descriptions.Item>
                        </Descriptions>
                    </PageHeader>
            </div>
            <Table style={{ fontFamily:'Kanit' }} onRow={(r) => ({onClick: () => console.log("lol")})} dataSource={evidencesList || []} rowKey="id" size="small" pagination={{ pageSize:15 }} bordered loading={evidencesList===null}>
                <Column  align="center" width="10%" title="สถานะ" render={(text,record:ICalibrationEvidenceData) => {
                    return record.is_pass ? <span style={{ color:'green' }}>ผ่าน</span> : <span style={{ color:'red' }}>ไม่ผ่าน</span>
                }} />
                <Column align="center" width="15%" title="ลายละเอียด" render={(text,record:ICalibrationEvidenceData) => {
                    return <span>{record.description || 'ไม่ระบุ'}</span>
                }} />
                <Column align="center" width="15%" title="หลักฐาน" render={(text,record:ICalibrationEvidenceData) => {
                    
                    const images = record.attachments.split(',spiltter-23564,')
                    return <a onClick={() => onViewingAttachmentImage(images)}>ดูภาพแนบ</a>
                }} />
                <Column  align="center" width="15%" title="วันที่ตรวจวัด" render={(text,record:ICalibrationEvidenceData) => {
                    return <Moment format="D MMM YYYY" withTitle locale="th">{record.createdAt}</Moment>
                }} />
            </Table>
        </Drawer>
    </>
}

export default CalibrateHistory