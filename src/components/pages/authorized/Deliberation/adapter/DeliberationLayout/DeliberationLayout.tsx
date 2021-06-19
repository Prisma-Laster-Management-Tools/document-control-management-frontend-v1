import React from 'react'
import {createAdapterBasedOnAntdLayout} from "../../../../../../core/hoc/createAdapterBasedOnAntdLayout"
import Sales from "../../views/Sales"
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import ProductManufact from '../../views/ProductManufact';
import ProductManufactExport from '../../views/ProductManufactExport/';
const DeliberationLayout = createAdapterBasedOnAntdLayout({title:"การขาย/จัดจำหน่าย",default_fragment:'prod_manufact',fragment_data:[{
    component: ProductManufact,
    name: "prod_manufact",
    proper_label: "การจัดจำหน่าย",
    icon: DesktopOutlined
},
{
    component: ProductManufactExport,
    name: "prod_manufact_export",
    proper_label: "ส่งสินค้าออกจำหน่าย",
    icon: DesktopOutlined
}

]})

export default DeliberationLayout