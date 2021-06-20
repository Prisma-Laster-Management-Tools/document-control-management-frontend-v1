import React, { useEffect, useMemo, useState } from 'react'
import { TRoles } from './Dashboard'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { API_GetPurchasementStatistic, API_GetQcStatistic, API_GetRecruitmentStatistic } from '../../apis/dashboard.api';
import { IPurchasementStatisticData, IQcStatisticData, IRecruitmentStatisticData } from '../../shared/interfaces/dashboard.interfaces';
import { createStaticPurchasementChartTypeWithPassedData, createStaticQcChartTypeWithPassedData, createStaticRecruitmentChartTypeWithPassedData } from './staticChartRenderer';

export default function useDashboard() {
    const [focusedRole,setFocusRole] = useState<TRoles>('qc')
    const [chartData,setChartData] = useState<any>(null)
    const [chartElement,setChartElement] = useState<React.ReactElement<any> | null>(null)
    // INSTANCE ONLY [NO EXPORT]

    function resetChartData(){
        setChartData(null)
        setChartElement(null)
    }

    function onRoleChanged(role:TRoles){
        resetChartData()
        if(role === "qc") return fetchAndPrepareQcDataForStatistic()
        else if(role==='purchasement') return fetchAndPreparePurchasementDataForStatistic()
        else if(role === 'hr') return fetchAndPrepareRecruitmentDataForStatistic()
    }

    useEffect(() => {
        console.log('role changed')
        onRoleChanged(focusedRole)
    },[focusedRole])

    //
    // ─── QC ─────────────────────────────────────────────────────────────────────────
    //
    async function fetchAndPrepareQcDataForStatistic(){
        const mapped_response = await API_GetQcStatistic()
        let dataset: any = [];
        if(mapped_response.success){
            const {statistic}: IQcStatisticData = mapped_response.data
            dataset = [
                {
                    name: 'สินค้าทั้งหมด',
                    'สินค้าทั้งหมด': statistic.product_count
                },{
                    name: 'ยังไม่เคยได้รับการตรวจสอบ',
                    'ยังไม่เคยได้รับการตรวจสอบ': statistic.total_never_qc                    
                },
                {
                    name: 'ผ่านมาตรฐานการตรวจสอบ',
                    'ผ่านมาตรฐานการตรวจสอบ': statistic.total_qc_passed                    
                },
                {
                    name: 'ไม่ผ่านมาตรฐานการตรวจสอบ',
                    'ไม่ผ่านมาตรฐานการตรวจสอบ': statistic.total_qc_failed
                },
                {
                    name: 'อยู่ในคิวการตรวจสอบ',
                    'อยู่ในคิวการตรวจสอบ': statistic.total_in_queue
                }
            ]
        }
                    
      setChartElement(createStaticQcChartTypeWithPassedData(dataset))
    }
    // ────────────────────────────────────────────────────────────────────────────────


    //
    // ─── PURCHASEMENT ───────────────────────────────────────────────────────────────
    //
    async function fetchAndPreparePurchasementDataForStatistic(){
        const mapped_response = await API_GetPurchasementStatistic()
        let dataset: any = [];
        if(mapped_response.success){
            const {statistic}: IPurchasementStatisticData = mapped_response.data
            dataset = [
                {
                    name: 'คำร้องทั้งหมด',
                    'คำร้องทั้งหมด': statistic.totaL_request
                },{
                    name: 'คำสั่งซื้อที่รอการตอบกลับ',
                    'คำสั่งซื้อที่รอการตอบกลับ': statistic.total_await_request_to_be_accept                    
                },
                {
                    name: 'คำสั่งซื้อถูกปฏิเสธ',
                    'คำสั่งซื้อถูกปฏิเสธ': statistic.total_rejected_request                    
                },
                {
                    name: 'คำสั่งซื้อที่ดำเนินการอยู่',
                    'คำสั่งซื้อที่ดำเนินการอยู่': statistic.total_in_process_request
                },
                {
                    name: 'การสั่งซื้อสำเร็จ',
                    'การสั่งซื้อสำเร็จ': statistic.total_successfully_request
                }
            ]
        }
        setChartElement(createStaticPurchasementChartTypeWithPassedData(dataset))
    }
    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── RECRUITMENT ────────────────────────────────────────────────────────────────
    //
    async function fetchAndPrepareRecruitmentDataForStatistic(){
        const mapped_response = await API_GetRecruitmentStatistic()
        let dataset: any = [];
        if(mapped_response.success){
            const {statistic}: IRecruitmentStatisticData = mapped_response.data
            dataset = [
                {
                    name: 'จำนวนลื้งค์ใช้งานที่สร้างขึ้น',
                    'จำนวนลื้งค์ใช้งานที่สร้างขึ้น': statistic.total_generated_link
                },{
                    name: 'จำนวนลื่งค์ที่ใช้งานแล้ว',
                    'จำนวนลื่งค์ที่ใช้งานแล้ว': statistic.total_used_link                    
                },
                {
                    name: 'จำนวนลิ้งค์ที่ยังไม่ได้ใช้งาน',
                    'จำนวนลิ้งค์ที่ยังไม่ได้ใช้งาน': statistic.total_unused_link                    
                }
            ]
        }
        setChartElement(createStaticRecruitmentChartTypeWithPassedData(dataset))
    }
    // ────────────────────────────────────────────────────────────────────────────────


    
    return {
        get: {
            focusedRole,
            chartElement
        },
        set:{
            setFocusRole
        },
        events:{

        }
    }
}