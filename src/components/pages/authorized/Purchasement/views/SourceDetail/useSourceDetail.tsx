import { FormInstance } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ERROR_TOAST_OPTION } from '../../../../../../shared/options/toast.option'
import { API_CreateSourceDetail, API_GetAllPartDetail, API_GetAllSourceDetail, API_RemoveSourceDetail } from '../../apis/purchasement.api'
import { IPurchasementPartDetail, IPurchasementSoruce } from '../../shared/interfaces/purchasement.interfaces'

export default function useSourceDetail() {
    const [sourceDetail,setSourceDetail] = useState<Array<IPurchasementSoruce> | null>(null)
    const [partDetail,setPartDetail] = useState<Array<IPurchasementPartDetail>>([])
    async function getAllSourceDetail(){
        const mapped_response = await API_GetAllSourceDetail()
        if(mapped_response.success){
            console.log(mapped_response)
            setSourceDetail(mapped_response.data)
        }else{
            // failed to fetch
        }
    }
    async function getAllPartDetail(){
        const mapped_response = await API_GetAllPartDetail()
        if(mapped_response.success){
            setPartDetail(mapped_response.data)
        }else{
            //failed to fetch
        }
    }

    async function onCreateSource(form:FormInstance<any>,$cb?:Function){
        const postData = form.getFieldsValue()
        const mapped_response = await API_CreateSourceDetail(postData)
        if(mapped_response.success){
            form.resetFields()
            setSourceDetail(prevState => ([...prevState!,mapped_response.data]))
            toast.success('สร้างข้อมูลแหล่งจัดซื้อสำเร็จ',ERROR_TOAST_OPTION);
            if($cb) $cb() // hide the popover
        }else{
            //failed to create
            if(mapped_response.data.message === "Key already exist"){
                // Serial number already taken
                toast.error('รหัสการสั่งซื้อนี้มีอยู่แล้วในระบบ',ERROR_TOAST_OPTION);
            }else{
                toast.error('เกิดข้อผิดพลาดในการสร้างแหล่งจัดซื้อ',ERROR_TOAST_OPTION);
            }
        }
    }

    async function onRemoveSource(id:number){
        const mapped_response = await API_RemoveSourceDetail(id)
        if(mapped_response.success){
            // removal successful
            toast.success('แหล่งการสั่งซื้อได้ถูกลบเรียบร้อยแล้ว',ERROR_TOAST_OPTION);
            setSourceDetail(prevState => prevState!.filter(data => data.id !== id)) // filtered out the removed element

        }else{
            // failed to remove
            toast.error('เกิดข้อผิดพลาดในการลบแหล่งสั่งซื้อ',ERROR_TOAST_OPTION);
        }
    }
    
    useEffect(() => {
        //On mount
        getAllSourceDetail()
        getAllPartDetail()
    },[])

    // MAPPED USAGE
    return {
        get: {
            sourceDetail,
            partDetail
        },
        set: {
            setSourceDetail
        },
        events: {
            onCreateSource,
            onRemoveSource
        }
    }
}
