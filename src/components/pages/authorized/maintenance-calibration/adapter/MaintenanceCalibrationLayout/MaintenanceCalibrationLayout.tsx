import React from 'react'
import {createAdapterBasedOnAntdLayout} from "../../../../../../core/hoc/createAdapterBasedOnAntdLayout"
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import Maintenance from '../../views/Maintenance';
import Calibration from '../../views/Calibration';
const MaintenanceCalibrationLayout = createAdapterBasedOnAntdLayout({title:"การตรวจวัดและการบำรุงรักษา",default_fragment:'maintenance',fragment_data:[{
    component: Maintenance,
    name: "maintenance",
    proper_label: "การบำรุงรักษา",
    icon: DesktopOutlined
},
{
    component: Calibration,
    name: "calibration",
    proper_label: "การตรวจวัดประสิทธิภาพของอุปกรณ์",
    icon: DesktopOutlined
}

]})

export default MaintenanceCalibrationLayout