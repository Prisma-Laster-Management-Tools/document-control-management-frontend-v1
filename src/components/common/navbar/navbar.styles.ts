import styled from '@emotion/styled';
import { Button } from 'antd';
import menu_outline from './assets/menu_outline.png'
import prima_icon from './assets/PLT-gray.png'

export const NavTop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 280px;
    padding-right: 280px;

    position: relative;
    width: 100%;
    height: 4rem;

    background: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);

    z-index: 1000;
    font-family: 'Kanit', sans-serif;
`;
export const RegisZone = styled.div`
    /* Regis zone */
    /* Auto Layout */

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;

    /* Inside Auto Layout */

    width: 20;
    flex: none;
    order: 1;
    flex-grow: 0;
    //margin: 0px 10px;
    //border: 1px solid blue;
`;

export const LogoName = styled.h1`
    margin-top: 10px;
    font-size: 30px;
    color: goldenrod;
`;
export const LoginBtn = styled(Button)`
    margin-left: 20px;

    font-family: 'Kanit', sans-serif;
    font-size: 15px;
    width: 150px;
    height: 35px;
    border: none;
    background-color: gray;
    color: white;
    box-shadow: none;
    border-radius: 10px;
    &:hover {
        background-color: #454545;
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
`;
export const RegisterBtn = styled(Button)`
    font-family: 'Kanit', sans-serif;
    font-size: 15px;
    width: 150px;
    height: 35px;
    border: none;
    /* background-color: none; */
    color: goldenrod;
    box-shadow: none;
    border-radius: 10px;
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
`;

export const LogoPrima = styled.div`
    //border: 1px solid #555;
    width: 10rem;
    height: 3rem;
    background-image: url('${prima_icon}');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    z-index: 1001;
`;

export const IconContainer = styled.div`
    width: 3rem;
    height: 3rem;
    padding: 0.4rem;
    &:hover {
        background-color: #d9d9d9;
        border: none;
        box-shadow: none;
    }
    &:focus {
        background-color: #f9f9f9;
        color: white;
        border: none;
        box-shadow: none;
    }
    transition: background-color 0.2s ;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;
    //border: 1px solid red;
`
export const IconMenuOutline = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    background-image: url("${menu_outline}");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    //margin-left: 2rem;
    //border: 1px solid red;
`

export const NameTop = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: #555555;
    //border: 1px solid green;
    margin-right: 1rem;
`

/////////////////   Drawer  ////////////////////
export const DrawerOutside = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const DrawerContainer = styled.div`
    width: 28.5rem;
    //height: 45rem;
    //background-color: #f9f9f9;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`
export const ListItemContainer = styled.div`
    width: 28.5rem;
    height: 3rem;

    //border: 1px solid green;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-radius: 0.2rem;
    
    font-size: 19px;
    font-weight: 600;
    color: gray;
    padding-left: 1rem;

    &:hover {
        background-color: gray;
        color: white;
        border: none;
        box-shadow: none;
        cursor: pointer;
    }
    &:focus {
        background-color: gray;
        color: white;
        border: none;
        box-shadow: none;
        cursor: pointer;
        
    }
    transition: background-color 0.2s ;
    user-select: none;
`
export const DrawerListText = styled.div`
    margin-left: 1rem;
`


////////////////////////////////////////////////