import styled from '@emotion/styled'
import { Button, Upload} from 'antd';
import upload_image from './assets/upload_files_image.svg'

export const ProductMainContainer = styled.div`
    padding: 0px 180px 0px 180px;
    width: 100%;
    height: 100%;
    
    //background-color: green;
    
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    font-family: 'Kanit', sans-serif;
`

export const BoxContainer = styled.div`
    margin-top: 5rem;
    width: 40rem;
    height: 43rem;
    box-shadow: 0rem 0rem 1rem 0.5rem rgba(0, 0, 0, 0.1);
    border-radius: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    
`


export const BoxContainer2 = styled.div`
    margin-top: 5rem;
    width: 40rem;
    height: 43rem;
    //background-color: wheat;
    box-shadow: 0rem 0rem 1rem 0.5rem rgba(0, 0, 0, 0.1);
    border-radius: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

////////    Add from file   ///////////
export const UploadImage = styled.image`
    margin: 2rem;
    width: 15rem;
    height: 15rem;
    background-image: url(${upload_image});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    //box-sizingbox-shadow: 0rem 0rem 1rem 0.5rem rgba(0, 0, 0, 0.05);
`

export const NoteText = styled.p`
    color: red;
    font-size: 16px;
    margin: 1rem;
`

export const UploadfileBtn = styled(Button)`
    margin: 3rem;
    font-size: 16px;
    width: 40%;
    height: 6%;
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
export const ReportText = styled.p`
    color: #454545;
    font-size: 16px;
    margin: 2rem;
`
//////////  Add Manual  ///////////
export const AddText = styled.h1`
    color: #454545;
    //font-size: 16px;
    margin: 6rem;
`
export const SelextManualContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    //border: 1px solid black;
`
export const SelectText = styled.p`
    margin: 1rem;
    color: #454545;
    font-size: 18px;
`
export const SelectTextSN = styled.p`
    margin-top: 2rem;
    color: #454545;
    font-size: 18px;
`
export const SelectText2 = styled.input`
    padding: 2px 10px 2px 10px;
    color: #454545;
    font-size: 16px;

    width: 20rem;
    //height: 95%;
    border: 0.5px solid #d9d9d9;
    border-radius: 0.1rem;
`

export const ErrorText = styled.p`
    color: red;
    font-size: 14px;
    margin-top: 2rem;
`