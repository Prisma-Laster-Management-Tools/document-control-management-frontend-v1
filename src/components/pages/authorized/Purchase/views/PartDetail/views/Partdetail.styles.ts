import styled from '@emotion/styled'
import { Button, Select, Form } from 'antd';

export const PDMainContainer = styled.div`
    width: 100Vw;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2rem;
    //background-color: white;
    font-family: 'Kanit', sans-serif;
`
export const PDBoxContainer = styled.div`
    width: 680px;
    margin-top: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: white;

    padding: 1rem 1rem 1rem 1rem;
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
    //border: 1px solid red;
    border-radius: 1rem;
    @media (max-width:993px){
        width: 100%;
        border-radius: 0rem;
    }
`
export const PDListContainer = styled.div`
    width: 100%;
    height: 3rem;
    margin-bottom: 1rem;
    //background-color: wheat;
    //border: 1px solid red;

    display: flex;
    justify-content: center;
    align-items: center;
`

export const PDSelect = styled(Select)`
    width: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const PDTextList = styled.div`
    width: 10rem;
    font-size: 16px;
    //font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const PDFormItem = styled(Form)`
    width: 15rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const PDBtn = styled(Button)`
    margin: 2rem 0rem 1rem 0rem;
    font-size: 16px;
    width: 10rem;
    height: 2rem;
    border: none;
    background-color: goldenrod;
    color: white;
    box-shadow: none;
    border-radius: 10px;
    //box-shadow: 0px 3px 3px 3px rgba(0, 0, 0, 0.05);
    &:hover {
        background-color: gray;
        color: white;
        border: none;
        box-shadow: none;
    }
    &:focus {
        background-color: gray;
        color: white;
        border: none;
        box-shadow: none;
    }
    transition: background-color 0.2s ;
    /* @media (max-width: 1260px) {
        font-size: 16px;
    }
    @media (max-width: 950px) {
        font-size: 14px;
    } */
`

export const PDTextHeader = styled.div`
    margin-top: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    color: #454545;
    font-size: 24px;
    font-weight: 600;
`