import React, { useEffect, useMemo, useState } from 'react'
import { TRoles } from './Dashboard'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { API_GetQcStatistic } from '../../apis/dashboard.api';
import { IQcStatisticData } from '../../shared/interfaces/dashboard.interfaces';

// const format = [
//     {
//       name: 'Page A',
//       uv: 4000,
//       pv: 2400,
//       amt: 2400,
//     },
//     {
//       name: 'Page B',
//       uv: 3000,
//       pv: 1398,
//       amt: 2210,
//     },
//     {
//       name: 'Page C',
//       uv: 2000,
//       pv: 9800,
//       amt: 2290,
//     },
//     {
//       name: 'Page D',
//       uv: 2780,
//       pv: 3908,
//       amt: 2000,
//     },
//     {
//       name: 'Page E',
//       uv: 1890,
//       pv: 4800,
//       amt: 2181,
//     },
//     {
//       name: 'Page F',
//       uv: 2390,
//       pv: 3800,
//       amt: 2500,
//     },
//     {
//       name: 'Page G',
//       uv: 3490,
//       pv: 4300,
//       amt: 2100,
//     },
//   ]

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
                // ,
                // {
                //     name: 'ยังไม่เคยได้รับการตรวจสอบ',
                //     total: statistic.total_never_qc
                // },
                // {
                //     name: 'ผ่านมาตรฐานการตรวจสอบ',
                //     total: statistic.total_qc_passed
                // },
                // {
                //     name: 'ไม่ผ่านมาตรฐานการตรวจสอบ',
                //     total: 2
                // }
                // ,
                // {
                //     name: 'อยู่ในคิวการตรวจสอบ',
                //     total: statistic.total_in_queue
                // }
            ]
        }
                    
      setChartElement(<BarChart
        width={500}
        height={300}
        data={dataset}
        margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
        }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="สินค้าทั้งหมด" stackId="1" fill="#8884d8" />
            <Bar dataKey="ยังไม่เคยได้รับการตรวจสอบ" stackId="1" fill="gray" />
            <Bar dataKey="ผ่านมาตรฐานการตรวจสอบ" stackId="1" fill="green" />
            <Bar dataKey="ไม่ผ่านมาตรฐานการตรวจสอบ" stackId="1" fill="red" />
            <Bar dataKey="อยู่ในคิวการตรวจสอบ" stackId="1" fill="orange" />
            {/* <Bar dataKey="uv" stackId="a" fill="#82ca9d" /> */}
        </BarChart>)
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
