import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import Navbar from '../../../../../common/navbar';
import { ANTD_LayoutWrapper, CategoryLabelSider } from '../../../../../../shared/styles/common';
import PartDetail from '../../views/PartDetail';
import SourceDetail from '../../views/SourceDetail';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface IState {
    collapsed: boolean;
    action: 'part-detail' | 'source' | 'request';
}
interface IProps {}

export default class PurchasementLayout extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            collapsed: false,
            action: 'part-detail',
        };
    }

    onCollapse = (collapsed: any) => {
        this.setState({ collapsed });
    };

    render() {
        const { collapsed, action } = this.state;
        let rendered_content = null;
        switch (action) {
            case 'part-detail':
                rendered_content = <PartDetail/>;
                break;

            case 'source':
                rendered_content = <SourceDetail/>;
                break;

            case 'request':
                rendered_content = null;
                break;

            default:
                break;
        }
        return (
            <ANTD_LayoutWrapper>
                 <Layout style={{ height:"100%" }}>
                 <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                 <CategoryLabelSider>
                     การสังซื้อ
                 </CategoryLabelSider>
                 <Menu onSelect={(info) => this.setState({action:info.key as IState["action"]})} theme="dark" selectedKeys={[action]} defaultSelectedKeys={['product-detail']} mode="inline">
                 <Menu.Item key="part-detail" icon={<PieChartOutlined />}>
                     ข้อมูลส่วนประกอบ/วัสดุ
                 </Menu.Item>
                 <Menu.Item key="source" icon={<DesktopOutlined />}>
                     แห่ลงการจัดซื้อ
                 </Menu.Item>
                 </Menu>
             </Sider>
             <Layout className="site-layout">
                 <Header style={{ padding: 0 }}><Navbar/></Header>
                 <Content style={{ margin: '0 16px' }}>

                     <div className="site-layout-background" style={{ padding: 0, minHeight: 320,maxHeight: '100%',overflowX:'hidden',overflowY:'auto' }}>
                         {rendered_content}
                     </div>
                 </Content>
                 {/* <Footer style={{ textAlign: 'center' }}>Design by AAW0KENN CREWS</Footer> */}
             </Layout>
             </Layout>
            </ANTD_LayoutWrapper>
         );
    }
}
