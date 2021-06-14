import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { ANTD_LayoutWrapper, CategoryLabelSider } from '../../shared/styles/common';
import Navbar from '../../components/common/navbar';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


interface IState {
    collapsed: boolean;
    action: string;
}
interface IAdapterFragmentProps {
    fragment_data: {
        component: React.ComponentType<any>
        name: string
        icon?:React.ComponentType<any>
        proper_label: string
    } []
    default_fragment: string
    title: string
}

class AdapterFragment extends Component<IAdapterFragmentProps, IState> {
    constructor(props: IAdapterFragmentProps) {
        super(props);
        this.state = {
            collapsed: false,
            action: props.default_fragment,
        };
    }

    onCollapse = (collapsed: any) => {
        this.setState({ collapsed });
    };

    render() {
        const { collapsed, action } = this.state;
        const {title,default_fragment,fragment_data} = this.props
        let rendered_content = null;
        rendered_content = React.createElement(fragment_data.find(fragment => fragment.name === action)!.component)
        return (
            <ANTD_LayoutWrapper>
                 <Layout style={{ height:"100%" }}>
                    <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                        <CategoryLabelSider>
                            {title}
                        </CategoryLabelSider>
                        <Menu onSelect={(info) => this.setState({action:info.key as IState["action"]})} theme="dark" selectedKeys={[action]} defaultSelectedKeys={['product-detail']} mode="inline">
                            {
                                fragment_data.map((fragment) => {
                                    return <Menu.Item key={fragment.name} icon={fragment.icon ? React.createElement(fragment.icon) : <DesktopOutlined /> }>
                                    {fragment.proper_label}
                                </Menu.Item>
                                })
                            }
                        </Menu> 
                    </Sider>
                        <Layout className="site-layout">
                            <Header style={{ padding: 0 }}><Navbar/></Header>
                            <Content style={{ margin: '0 16px' }}>
                                <div className="site-layout-background" style={{ padding: 0, minHeight: 320,maxHeight: '100%',overflowX:'hidden',overflowY:'auto' }}>
                                    {rendered_content}
                                </div>
                            </Content>
                        </Layout>
                </Layout>
            </ANTD_LayoutWrapper>
         );
    }
}

export function createAdapterBasedOnAntdLayout(props:IAdapterFragmentProps){
    //return <AdapterFragment {...props}/> //normal way
    return () => React.createElement(AdapterFragment,props,null) // without jsx
}