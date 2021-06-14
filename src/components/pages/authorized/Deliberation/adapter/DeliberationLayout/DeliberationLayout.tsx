import React from 'react'
import {createAdapterBasedOnAntdLayout} from "../../../../../../core/hoc/createAdapterBasedOnAntdLayout"
import Sales from "../../views/Sales"
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
const DeliberationLayout = createAdapterBasedOnAntdLayout({title:"การขาย",default_fragment:'sales',fragment_data:[{
    component: Sales,
    name: "sales",
    proper_label: "กิจกรรมการขาย",
    icon: DesktopOutlined
}]})

export default () => DeliberationLayout