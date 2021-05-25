import React from 'react'
import {Container, InfoText} from './FullLoadingScreen.styles'

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import "./styles.css"
import { useRecoilState } from 'recoil';
import { loadingScreenState } from '../../../store/recoil/loading-screen/loading-screen.atom';
interface Props{
}

const FullLoadingScreen: React.FC<Props> = () => {
    const [loadingState,setLoadingState] = useRecoilState(loadingScreenState)

    const antIcon = <LoadingOutlined style={{ fontSize: 50,color:'gray' }} spin />;
    let classname_of_container = ""
    const [classname,setClassname] = React.useState("")
    React.useEffect(() => {
        if(loadingState.visible){
            setClassname("fade-in")
            console.log('here')
        }else{
            setClassname("")
        }
    },[loadingState])
    return (
        <Container className={classname}>
            <Spin size="large" indicator={antIcon}/>
            {loadingState.info_text ? <InfoText>{loadingState.info_text}</InfoText> : null}
        </Container>
    )
}

export default FullLoadingScreen