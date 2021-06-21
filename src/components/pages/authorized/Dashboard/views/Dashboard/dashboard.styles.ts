import styled from '@emotion/styled';
import { Button, Dropdown } from 'antd';
import bg_image from '../../../../../../assets/main_background.jpg';
import avatar_dummy from './assets/avatar_dummy.png'

export const BgContainer = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-image: url(${bg_image});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

export const DashboardMainContainer = styled.div`
    position: relative;
    width: 100%;
    height: 90vh;
    opacity: 1;
    padding: 0px 150px 0px 150px;

    //background-color: green;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;

    font-family: 'Kanit', sans-serif;
    font-style: normal;
    @media (max-width: 1400px) {
        padding: 0px 80px 0px 80px;
    }
    @media (max-width: 1200px) {
        padding: 0px 50px 0px 50px;
    }
    transition: background-color 1s;
`;

///////// MenuLeft /////////
export const MenuLeft = styled.div`
    width: 15%;
    height: 100%;
    //background: rgba(196, 196, 196, 0.5);
    padding-top: 60px;
    //background-color: white;
`;
export const MenuDivInner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    //background-color: white;
`;
export const MenuDivButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 90%;
    height: 50px;
    border-radius: 10px;
    background-color: white;
    margin-bottom: 20px;
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

export const MenuButtonText = styled.div`
    width: 60%;
    font-family: 'Kanit', sans-serif;
    font-style: normal;
    font-size: 20px;
    color: #555555;
    user-select: none;
    //border: 1px solid #555;
    @media (max-width: 1575px) {
        font-size: 16px;
    }
    @media (max-width: 1200px) {
        font-size: 14px;
    }
`;
//////////// Mid body /////////////

export const MidBody = styled.div`
    padding: 60px 20px 20px 20px;
    width: 60%;
    height: 100%;
    //background-color: #f9f9f9;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    font-family: 'Kanit', sans-serif;
    font-size: 15px;
    border-radius: 0rem 0rem 1rem 1rem;
    //border: 1px solid red;
`;
export const MidTopContainer = styled.div`
    width: 100%;
    //height: 10%;
    padding: 20px 0px 20px 0px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    background-color: #f9f9f9;
    border-radius: 1rem 1rem 0rem 0rem;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.05);
    //border: 1px solid #333333;
`;
export const MidMainContainer = styled.div`
    width: 100%;
    height: 60vh;
    padding: 20px 20px 20px 20px;

    background-color: #f9f9f9;
    border-radius: 0rem 0rem 1rem 1rem;
    //background-color: purple;
    //border: 1px solid black;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.05);
`;
export const TopPicBox = styled.div`
    width: 70px;
    height: 70px;
    //margin-right: -20px;
    //background-color: gray;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
    border-radius: 1rem;
    //border: 1px solid black;

    background-image: url(${avatar_dummy});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;
export const NameText = styled.p`
    height: 70px;
    width: 50%;
    display: flex;
    align-items: center;

    //border: 1px solid black;
    margin: 1px 0px 0px 10px;
    //padding-left: 10px;
    font-size: 20px;
    @media (max-width: 1575px) {
        font-size: 18px;
    }
    @media (max-width: 1200px) {
        font-size: 16px;
    }
`;

export const GoTaskBtn = styled(Button)`
    margin-top: 20px;
    width: 50%;
    height: 8%;
    background-color: #454545;
    color: white;
    box-shadow: none;
    border-radius: 10px;
    border: none;
    font-size: 18px;
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
    @media (max-width: 1575px) {
        font-size: 16px;
    }
    @media (max-width: 1200px) {
        font-size: 14px;
    }
`;
/////////   Top DropDown  ////////
export const SelectDropDown = styled(Dropdown)`
    width: 200px;
    box-shadow: none;
    margin-left: 10px;
    &:hover {
        background-color: gray;
        color: white;
        border: none;
        border-color: gray;
        box-shadow: none;
    }
    &:focus {
        background-color: gray;
        color: white;
        border: none;
        border-color: gray;
        box-shadow: none;
    }
`;

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
