import styled from '@emotion/styled';
import { Button, Dropdown } from 'antd';

export const MainNotificationContainer = styled.div`
    width: 100vw;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f9f9f9;
    font-family: 'Kanit', sans-serif;
`;

export const NotificationDiv = styled.div`
    width: 680px;
    height: 87vh;
    margin-top: 1rem;

    overflow-y: hidden;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    background-color: white;

    padding: 0.5rem 1rem 0rem 1rem;
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
    //border: 1px solid red;
    border-radius: 1rem;
    @media (max-width: 993px) {
        width: 100%;
        border-radius: 0rem;
    }
`;
export const TextHeader = styled.div`
    width: 100%;
    font-size: 24px;
    font-weight: 600;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const NotiListContainer = styled.div`
    width: 100%;
    height: 80px;
    padding: 0rem 0.5rem 0rem 0.5rem;
    border-radius: 0.5rem;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    //border: 1px solid red;
    &:hover {
        background-color: #e9e9e9;
        //color: white;
        border: none;
        box-shadow: none;
        cursor: pointer;
    }
    &:focus {
        background-color: #e9e9e9;
        //color: white;
        border: none;
        box-shadow: none;
        cursor: pointer;
    }
    transition: background-color 0.2s;
`;
export const NotiInsideTextContainer = styled.div`
    margin-left: 1rem;
    width: 82%;
    height: 80px;
    padding: 12px 0px 8px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;
export const NotiDetailText = styled.div<{ color: string }>`
    font-size: 14px;
    font-weight: 50;
    color: ${(props) => props.color};
    line-height: 1.3333;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    @media (max-width: 993px) {
        font-size: 13px;
    }
`;
export const NotiDateText = styled.div<{ color: string }>`
    font-size: 11px;
    margin-top: 5px;
    font-weight: 600;
    color: ${(props) => props.color};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    @media (max-width: 993px) {
        font-size: 10px;
    }
`;
export const DotConTainer = styled.div`
    width: 40px;
    height: 72px;
    //border: 1px solid blue;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const NotiNewDot = styled.div`
    width: 12px;
    height: 12px;
    background-color: #dda520;
    border-radius: 100%;
`;

export const NotiHearderType = styled.div`
    width: 100%;
    color: #333333;
    font-weight: 600;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`
