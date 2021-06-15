import styled from '@emotion/styled';
import { Button, Upload } from 'antd';
//import upload_image from './assets/upload_files_image.svg'

export const PrOrderMainContainer = styled.div`
    padding: 0px 180px 0px 180px;
    display: flex;
    //flex-direction: ;
    justify-content: center;
    align-items: center;
    //align-content: center;

    font-family: 'Kanit', sans-serif;
`;
export const PrBodyMainContainer = styled.div`
    margin-top: 2rem;
    width: 100vw;
    height: 80vh;
    box-shadow: 0rem 0.1rem 1rem 0.2rem rgba(0, 0, 0, 0.02);
    border-radius: 1rem;
    //border: 1px solid red;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;
export const PrDetailContainer = styled.div`
    width: 45rem;
    height: 40rem;
    //border: 1px solid blue;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 2rem;
    //padding-top: 4rem;
`;

export const PrExampleContainer = styled.div`
    width: 40rem;
    height: 40rem;
    //border: 1px solid blue;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 2rem;
`;
export const ListDetailContainer = styled.div`
    margin: 1rem;
    width: 40rem;
    display: flex;
    flex-direction: row;
    justify-content: center;

    //border: 1px solid green;
`;
export const TextHeader = styled.p`
    width: 10rem;
    font-size: 16px;
    font-weight: 600;
`;
export const TextDetail = styled.p`
    width: 10rem;
    font-size: 16px;
`;
export const InputPrice = styled.input`
    width: 10rem;
    height: 2rem;
    font-size: 16px;
    border: 1px solid #d9d9d9;
`;
export const OrderBtn = styled(Button)`
    margin-top: 2rem;
    font-size: 16px;
    width: 10rem;
    height: 3rem;
    /* border: none;
    background-color: goldenrod;
    color: white; */
    box-shadow: none;
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
`;

export const PaperExample = styled.div`
    margin-top: 1rem;
    padding: 2rem;
    width: 32rem;
    height: 40rem;
    box-shadow: 0rem 0.1rem 1rem 0.2rem rgba(0, 0, 0, 0.05);

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: center;
`;

export const TextPrima = styled.p`
    margin-top: 1rem;
    font-size: 0.9rem;
`;
export const TextPrimaAddress = styled.p`
    font-size: 0.6rem;
    width: 7rem;
`;
export const TextPrimaEng = styled.p`
    font-size: 0.6rem;
    //width: 5rem;
    margin-bottom: 2rem;
`;

export const TextMail = styled.p`
    margin-top: 0.5rem;
    font-size: 0.6rem;
    //width: 5rem;
`;

export const BoxListMail = styled.div`
    width: 28rem;
    height: 10rem;
    border: 1px solid #9d9d9d;
    padding: 1rem;
`;
