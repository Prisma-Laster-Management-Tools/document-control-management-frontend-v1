import styled from '@emotion/styled';
import { Button, Upload } from 'antd';
import upload_image from './assets/upload_files_image.svg';

export const ProductMainContainer = styled.div`
    width: 100%;
    height: 70vh;

    //background-color: green;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    font-family: 'Kanit', sans-serif;
`;

export const BoxContainer = styled.div`
    /* margin-top: 5rem; */
    width: 100%;
    height: 100%;
    box-shadow: 0rem 0rem 0.5rem 0.1rem rgba(0, 0, 0, 0.05);
    border-radius: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 0.5rem;
`;
export const BoxContainer2 = styled.div`
    padding-top: 1rem;
    /*margin-top: 5rem; */
    width: 100%;
    height: 100%;
    //background-color: wheat;
    box-shadow: 0rem 0rem 0.5rem 0.1rem rgba(0, 0, 0, 0.05);
    border-radius: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

////////    Add from file   ///////////
export const UploadImageCon = styled.div`
    margin: 2rem;
    width: 70%;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    box-shadow: 0rem 0rem 1rem 0.5rem rgba(0, 0, 0, 0.05);
    border-radius: 0.5rem;
`;
export const UploadImage = styled.image`
    width: 15rem;
    height: 15rem;
    background-image: url(${upload_image});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
`;

export const NoteText = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: red;
    font-size: 16px;
    margin: 1rem;
    @media (max-width: 1260px) {
        font-size: 12px;
    }
`;

export const UploadfileBtn = styled(Button)`
    margin: 3rem;
    font-size: 16px;
    width: 50%;
    height: 6%;
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
    @media (max-width: 1260px) {
        font-size: 12px;
        margin: 2rem;
    }
    @media (max-width: 950px) {
        font-size: 8px;
        margin: 1rem;
    }
`;
export const ReportText = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #454545;
    font-size: 16px;
    margin-top: 2rem;
    @media (max-width: 1260px) {
        font-size: 12px;
    }
`;
//////////  Add Manual  ///////////
export const AddText = styled.h1`
    color: #454545;
    font-size: 24px;
    font-weight: 600;
    margin: 2rem;
    @media (max-width: 1260px) {
        font-size: 20px;
    }
    @media (max-width: 950px) {
        font-size: 18px;
    }
`;
export const SelextManualContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    //border: 1px solid black;
`;
export const SelectText = styled.p`
    margin: 1rem;
    color: #454545;
    font-size: 18px;
    @media (max-width: 1260px) {
        font-size: 16px;
    }
`;
export const SelectTextSN = styled.p`
    margin-top: 2rem;
    color: #454545;
    font-size: 18px;
    @media (max-width: 1260px) {
        font-size: 16px;
    }
`;
export const SelectText2 = styled.input`
    padding: 2px 10px 2px 10px;
    color: #454545;
    font-size: 16px;

    width: 60%;
    //height: 95%;
    border: 0.5px solid #d9d9d9;
    border-radius: 0.1rem;
`;

export const ErrorText = styled.p`
    color: red;
    font-size: 14px;
    margin-top: 2rem;
`;
export const DiviDIV = styled.div`
    width: 90%;
`;
