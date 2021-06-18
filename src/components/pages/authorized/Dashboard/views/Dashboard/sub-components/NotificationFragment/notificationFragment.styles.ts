import styled from '@emotion/styled';

//////////////////////////////////
export const NotificationContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 50px 10px 10px;

    //border: 1px solid blue;

    width: 30%;
    height: 100%;
    overflow: hidden;
`;

export const Notih1 = styled.h1`
    width: 100%;
    //height: 10%;
    font-family: 'Kanit', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    background: white;
    margin-bottom: 20px;
    border-radius: 0.5rem;
    text-align: center;
    color: #555555;
    //border: 1px solid black;
    &:hover {
        cursor: default;
        user-select: none;
    }
    transition: background-color 0.2s;

    @media (max-width: 1575px) {
        font-size: 18px;
    }
    @media (max-width: 1200px) {
        font-size: 16px;
    }
`;

export const NotificationListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 10px;
    border-radius: 0.5rem;
    -moz-box-shadow: inset 0 0 10px #f9f9f9;
    -webkit-box-shadow: inset 0 0 10px #f9f9f9;
    box-shadow: inset 0 0 10px #f9f9f9;

    /* background-color: blue;
    border: 1px solid white; */

    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }
    transition: background-color 0.2s;
`;

export const DivBox = styled.div`
    padding: 10px 10px 0px 15px;

    font-family: 'Kanit', sans-serif;
    font-style: normal;
    margin-bottom: 5px;
    background: white;
    //text-align: center;
    color: white;
    border-radius: 20px;
    //border: 1px solid #454545;
    &:hover {
        background-color: #d9d9d9;
        //color: white;
        border: none;
        box-shadow: none;
        cursor: pointer;
    }
    &:focus {
        background-color: gray;
        //color: white;
        border: none;
        box-shadow: none;
        cursor: pointer;
    }
    transition: background-color 0.2s;
`;

export const DateP = styled.p`
    font-size: 12px;
    color: #a9a9a9;
    @media (max-width: 1575px) {
        font-size: 10px;
    }
    @media (max-width: 1200px) {
        font-size: 8px;
    }
`;
export const TitleP = styled.h4`
    font-size: 20px;
    color: #454545;
    @media (max-width: 1575px) {
        font-size: 18px;
    }
    @media (max-width: 1200px) {
        font-size: 16px;
    }
`;
export const DetailP = styled.p`
    font-size: 15px;
    color: #454545;
    @media (max-width: 1575px) {
        font-size: 13px;
    }
    @media (max-width: 1200px) {
        font-size: 11px;
    }
`;

////////////////////////////////////////////////
