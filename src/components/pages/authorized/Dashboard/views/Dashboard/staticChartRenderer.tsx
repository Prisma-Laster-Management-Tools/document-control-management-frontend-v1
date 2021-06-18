import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function createStaticQcChartTypeWithPassedData(data:Array<any>){
    return <BarChart
    width={500}
    height={300}
    data={data}
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
    </BarChart>
}


export function createStaticPurchasementChartTypeWithPassedData(data:Array<any>){
    return <BarChart
    width={500}
    height={300}
    data={data}
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
        <Bar dataKey="คำร้องทั้งหมด" stackId="1" fill="#8884d8" />
        <Bar dataKey="คำสั่งซื้อที่รอการตอบกลับ" stackId="1" fill="gray" />
        <Bar dataKey="คำสั่งซื้อถูกปฏิเสธ" stackId="1" fill="red" />
        <Bar dataKey="คำสั่งซื้อที่ดำเนินการอยู่" stackId="1" fill="pink" />
        <Bar dataKey="การสั่งซื้อสำเร็จ" stackId="1" fill="green" />
        {/* <Bar dataKey="uv" stackId="a" fill="#82ca9d" /> */}
    </BarChart>
}