import React from 'react'
import {createAdapterBasedOnAntdLayout} from "../../../../../../core/hoc/createAdapterBasedOnAntdLayout"
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import RecruitmentTokenList from '../../views/RecruitmentTokenList';
const RecruitmentLayout = createAdapterBasedOnAntdLayout({title:"จัดสรรคทรัพยากรบุคคล",default_fragment:'generated_token_list',fragment_data:[{
    component: RecruitmentTokenList,
    name: "generated_token_list",
    proper_label: "ลิ้งค์ที่ถูกสร้างขึ้น",
    icon: DesktopOutlined
},
{
    component: () => <p>Recruitment: Employee list</p>,
    name: "employee_list",
    proper_label: "พนักงานทั้งหมด",
    icon: DesktopOutlined
}

]})

export default RecruitmentLayout