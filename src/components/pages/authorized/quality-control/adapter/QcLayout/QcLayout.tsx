import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Navbar from '../../../../../common/navbar';
import { ANTD_LayoutWrapper, CategoryLabelSider } from '../../../../../../shared/styles/common';
import QcQueue from '../../views/QcQueue';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface IState{
    collapsed:boolean
    action: "queue" | "protocol"
}
interface IProps{

}

export default class QcLayout extends Component<IProps,IState> {
    constructor(props:IProps){
        super(props)
        this.state = {
            collapsed: false,
            action: "queue"
        };
    }
    
    onCollapse = (collapsed:any) => {
        this.setState({ collapsed });
    };
    
    render() {
        const { collapsed,action } = this.state;
        let rendered_content = null
        switch (action) {
            case "queue":
                rendered_content = <QcQueue/>
                break;

            case "protocol":
                rendered_content = null
                break
        
            default:
                break;
        }
        return (
           <ANTD_LayoutWrapper>
                <Layout style={{ height:"100%" }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                <CategoryLabelSider>
                    ควบคุมคุณภาพ
                </CategoryLabelSider>
                <Menu onSelect={(info) => this.setState({action:info.key as IState["action"]})} theme="dark" selectedKeys={[action]} defaultSelectedKeys={['product-detail']} mode="inline">
                <Menu.Item key="queue" icon={<PieChartOutlined />}>
                    รายการรอตรวจสอบ
                </Menu.Item>
                <Menu.Item key="protocol" icon={<DesktopOutlined />}>
                    ข้อกำหนด
                </Menu.Item>
                {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined />}>
                    Files
                </Menu.Item> */}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
                <Header style={{ padding: 0 }}><Navbar/></Header>
                <Content style={{ margin: '0 16px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb> */}
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
