import React from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { SpinSize } from 'antd/lib/spin';


interface Props{
    size?: SpinSize
    color?: string
}

// export default function LoadingIndicator() {
//     return (
//         <Spin size="large" indicator={antIcon}/>
//     )
// }

const LoadingIndicator: React.FC<Props>  = ({color="white",size="default"}) => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24,color }} spin />;
    return (
        <Spin size={size} indicator={antIcon}/>
    )
}

export default LoadingIndicator