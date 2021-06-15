import styled from '@emotion/styled';
import { Button } from 'antd';
import qc_image from './assets/qc_image.svg';

export const QcProcessMainContainer = styled.div`
    padding: 0px 180px 0px 180px;
    display: flex;
    //flex-direction: ;
    justify-content: center;
    align-items: center;
    height: 80vh;
    //align-content: center;
    //background-color: gray;

    font-family: 'Kanit', sans-serif;
`;

export const QcProcessBodyMainContainer = styled.div`
    margin-top: 3rem;
    width: 100%;
    height: 100%;
    box-shadow: 0rem 0.1rem 1rem 0.2rem rgba(0, 0, 0, 0.02);
    border-radius: 1rem;
    //border: 1px solid red;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: white;
`;
export const QcProcessPictureContainer = styled.div`
    width: 50%;
    height: 100%;
    border: 1px solid blue;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 2rem;
    //padding-top: 4rem;
`;

export const QcProcessDetailContainer = styled.div`
    width: 50%;
    height: 100%;
    border: 1px solid green;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 2rem;
`;
export const QcPicText = styled.p`
    font-size: 20px;
    font-weight: 600;
    //width: 10rem;
    @media (max-width: 1180px) {
        font-size: 16px;
    }
`;

export const PicDefault = styled.div`
    width: 100%;
    height: 100%;

    background-image: url('${qc_image}');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
`;
export const PicCon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 60%;
    padding: 1rem;
    border: 1px solid #d9d9d9;
    border-radius: 0.5rem;
    box-shadow: 0rem 0.1rem 1rem 0.2rem rgba(0, 0, 0, 0.02);
`;
export const QcTextD = styled.p`
    font-size: 20px;
    font-weight: 600;
    //width: 10rem;
    @media (max-width: 1180px) {
        font-size: 16px;
    }
`;

export const QcTextR = styled.p`
    font-size: 16px;
    font-weight: 600;
    //width: 10rem;
    @media (max-width: 1180px) {
        font-size: 12px;
    }
`;

export const InfoTextBox = styled.div`
    width: 95%;
    height: 100%;
    border-radius: 0.5rem;
    border: 1px solid #d9d9d9;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export const CheckBtnContainer = styled.div`
    width: 90%;
    height: 20%;
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;
export const BtnWithImage = styled.div<{ is_active?: boolean }>`
    width: 40%;
    height: 70%;
    padding-top: 1.2rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: ${(props) => (props.is_active ? 'red' : 'gray')};

    border-radius: 10px;
    border: none;
    cursor: pointer;
`;
export const BtnWithImage2 = styled.div<{ is_active?: boolean }>`
    width: 40%;
    height: 70%;
    padding-top: 1.2rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: ${(props) => (props.is_active ? 'green' : 'gray')};

    border-radius: 10px;
    border: none;
    cursor: pointer;
`;

export const InsideBtn = styled.p`
    //margin-top: 0.5rem;
    font-size: 16px;
    color: white;
    @media (max-width: 1180px) {
        font-size: 12px;
    }
`;

export const QcBtn = styled(Button)`
    margin: 3rem;
    font-size: 18px;
    width: 60%;
    height: 15%;
    /* border: none;
    background-color: goldenrod; */
    /* color: white; */
    /* box-shadow: none; */
    border-radius: 10px;
    //box-shadow: 0px 3px 3px 3px rgba(0, 0, 0, 0.05);
    /* &:hover {
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
    } */
    @media (max-width: 1180px) {
        font-size: 14px;
    }
`;

export const TextInsideBoxInfo = styled.p`
    font-size: 16px;
    @media (max-width: 1180px) {
        font-size: 12px;
    }
`;
