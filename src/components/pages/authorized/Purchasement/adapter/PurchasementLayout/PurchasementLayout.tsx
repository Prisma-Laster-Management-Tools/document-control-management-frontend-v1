
import React from 'react'
import {createAdapterBasedOnAntdLayout} from "../../../../../../core/hoc/createAdapterBasedOnAntdLayout"
import PartDetail from '../../views/PartDetail';
import SourceDetail from '../../views/SourceDetail';
import PurchasementRequest from '../../views/PurchasementRequest';
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
const PurchasementLayout = createAdapterBasedOnAntdLayout({title:"การสั่งซื้อ",default_fragment:'part-detail',fragment_data:[
    {
        component: PartDetail,
        name: "part-detail",
        proper_label: "ข้อมูลส่วนประกอบ/วัสดุ",
        icon: DesktopOutlined
    },
    {
        component: SourceDetail,
        name: "source-detail",
        proper_label: "แหล่งการจัดซื้อ",
        icon: DesktopOutlined
    },
    {
        component: PurchasementRequest,
        name: "request",
        proper_label: "คำสั่งซื้อ",
        icon: DesktopOutlined
    }
]})

export default PurchasementLayout