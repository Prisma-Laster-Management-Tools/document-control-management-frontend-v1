import styled from '@emotion/styled'
import { Button } from 'antd';
import prima_icon from '../../../../../common/navbar/assets/PLT-gray.png'

export const RegisBGMain = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #d9d9d9;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-family: 'Kanit', sans-serif;
    color: #555555;
`

export const RegisBoxContainer = styled.div`
    width: 40rem;
    /* height: 40rem; */
    background-color: white;
    border-radius: 1rem;
    padding: 3rem 4rem 4rem 4rem;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const RegisCommitBtn = styled(Button)`
    margin-top: 2rem;
    width: 14rem;
    height: 3rem;
    font-size: 16px;
    background-color: #454545;
    color: white;
    box-shadow: none;
    border-radius: 1rem;
    border: none;
    &:hover{
        background-color: gray;
        color: white;
        border: none;
        box-shadow: none;
    }
    &:focus{
        background-color: gray;
        color: white;
        border: none;
        box-shadow: none;
    }
    user-select: none;
    transition: background-color 0.2s ;
`
export const RegisTextHeader = styled.p`
    user-select: none;
    font-size: 24px;
    font-weight: 600;
    color: #555555;
    margin: 0rem;
`

export const LogoPrima = styled.div`
    //border: 1px solid #555;
    width: 10rem;
    height: 3rem;
    background-image: url('${prima_icon}');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    z-index: 1001;
    margin-bottom: 1rem;
`