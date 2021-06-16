import React from 'react'
import {createAdapterBasedOnAntdLayout} from "../../../../../../core/hoc/createAdapterBasedOnAntdLayout"
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import Maintenance from '../../views/Maintenance';
const MaintenanceCalibrationLayout = createAdapterBasedOnAntdLayout({title:"การตรวจวัดและการบำรุงรักษา",default_fragment:'maintenance',fragment_data:[{
    component: Maintenance,
    name: "maintenance",
    proper_label: "การบำรุงรักษา",
    icon: DesktopOutlined
},
{
    component: () => <h1>Calibration page</h1>,
    name: "calibration",
    proper_label: "การตรวจวัดประสิทธิภาพของอุปกรณ์",
    icon: DesktopOutlined
}

]})

export default MaintenanceCalibrationLayout