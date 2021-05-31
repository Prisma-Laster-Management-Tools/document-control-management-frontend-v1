import styled from '@emotion/styled'
import { Button } from 'antd';
import qc_image from './assets/qc_image.svg'

export const QcProcessMainContainer = styled.div`
    padding: 0px 180px 0px 180px;
    display: flex;
    //flex-direction: ;
    justify-content: center;
    align-items: center;
    //align-content: center;

    font-family: 'Kanit', sans-serif;
`

export const QcProcessBodyMainContainer = styled.div`
    margin-top: 2rem;
    width: 90rem;
    height: 50rem;
    box-shadow: 0rem 0.1rem 1rem 0.2rem rgba(0, 0, 0, 0.02);
    border-radius: 1rem;
    //border: 1px solid red;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`
export const QcProcessPictureContainer = styled.div`
    width: 50rem;
    height: 50rem;
    //border: 1px solid blue;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    padding: 2rem;
    //padding-top: 4rem;
`

export const QcProcessDetailContainer = styled.div`
    width: 45rem;
    height: 50rem;
    //border: 1px solid blue;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 2rem;
`
export const QcPicText = styled.p`
    font-size: 20px;
    font-weight: 600;
    //width: 10rem;
`  

export const PicDefault = styled.div`
    width: 35rem;
    height: 35rem;

    background-image: url('${qc_image}');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
`
export const PicCon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40rem;
    height: 40rem;
    padding: 1rem;
    border: 1px solid #d9d9d9;
    border-radius: 0.5rem;
    box-shadow: 0rem 0.1rem 1rem 0.2rem rgba(0, 0, 0, 0.02);
`
export const QcTextD = styled.p`
    font-size: 20px;
    font-weight: 500;
    //width: 10rem;
`

export const QcTextR = styled.p`
    margin-top: 3rem;
    font-size: 16px;
    font-weight: 500;
    //width: 10rem;
`

export const InfoTextBox = styled.div`
    width: 36rem;
    height: 20rem;
    border-radius: 0.5rem;
    border: 1px solid #d9d9d9;
    padding: 1rem;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const CheckBtnContainer = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 36rem;
    height: 5rem;
`
export const BtnWithImage = styled.div`
    width: 10rem;
    height: 4rem;
    padding-top: 1.2rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: red;
    background-color: gray;
    border-radius: 10px;
    border: none;
`
export const BtnWithImage2 = styled.div`
    width: 10rem;
    height: 4rem;
    padding-top: 1.2rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: green;
    background-color: gray;
    
    border-radius: 10px;
    border: none;
`

export const InsideBtn = styled.p`
    //margin-top: 0.5rem;
    font-size: 16px;
    color: white;
`

export const QcBtn = styled(Button)`
    margin: 3rem;
    font-size: 16px;
    width: 10rem;
    height: 4rem;
    border: none;
    background-color: goldenrod;
    color: white;
    box-shadow: none;
    border-radius: 10px;
    //box-shadow: 0px 3px 3px 3px rgba(0, 0, 0, 0.05);
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
`

export const TextInsideBoxInfo = styled.p`
    font-size: 16px;
`