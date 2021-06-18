import React, { useEffect, useMemo, useState } from 'react'
import { TRoles } from './Dashboard'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { API_GetQcStatistic } from '../../apis/dashboard.api';
import { IQcStatisticData } from '../../shared/interfaces/dashboard.interfaces';
import { createStaticQcChartTypeWithPassedData } from './staticChartRenderer';

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
    }

    useEffect(() => {
        console.log('role changed')
        onRoleChanged(focusedRole)
    },[focusedRole])

    //
    // ─── QC ─────────────────────────────────────────────────────────────────────────
    //
    async function fetchAndPrepareQcDataForStatistic(){
        console.log('Fetching qc data')
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


    // const rendered_chart_content = useMemo(() => {

    // },[focusedRole])
    
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
