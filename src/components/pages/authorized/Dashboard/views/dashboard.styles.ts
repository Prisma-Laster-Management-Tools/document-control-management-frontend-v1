import styled from '@emotion/styled'
import { Button, Dropdown} from 'antd';
import bg_image from '../../../../../assets/main_background.jpg'

export const BgContainer = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-image: url(${bg_image});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`

export const DashboardMainContainer = styled.div`
    position: relative;
    width: 100%;
    opacity: 1;
    padding: 0px 150px 0px 150px;

    //background-color: green;
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    
    font-family: 'Kanit', sans-serif;
    font-style: normal;
`

///////// MenuLeft /////////
export const MenuLeft = styled.div`
    width: 20rem;
    //height: 100vh;
    //background: rgba(196, 196, 196, 0.5);
    padding-top: 60px;
`
export const MenuDivInner =  styled.div`
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    //background-color: gray;
`
export const MenuDivButton =  styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 80%;
    height: 50px;
    border-radius: 10px;
    //background-color: green;
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
    transition: background-color 0.2s ;
`

export const MenuButtonText = styled.p`
    width: 50%;
    margin-top: 24px;
    font-family: 'Kanit', sans-serif;
    font-style: normal;
    font-size: 25px;
    color: #555555;
    user-select: none;
    //border: 1px solid #555;
`
//////////// Mid body /////////////

export const MidBody = styled.div`
    padding: 60px 20px 20px 20px;
    width: 920px;
    //height: 55rem;
    background-color: rgba(97, 208, 255, 0.2);

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    font-family: 'Kanit', sans-serif;
    font-size: 15px;
    //border: 1px solid black;
`
export const MidTopContainer = styled.div`
    width: 100%;
    height: 10vh;
    padding: 20px 20px 20px 20px;

    background-color: pink;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    border: 1px solid black;
`
export const MidMainContainer = styled.div`
    width: 100%;
    height: 65vh;
    padding: 20px 20px 20px 20px;
    
    //background-color: purple;
    border: 1px solid black;
`
export const TopPicBox = styled.div`
    width: 70px;
    height: 70px;
    //background-color: gray;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);

    border: 1px solid black;
`
export const NameText = styled.p`
    height: 70px;
    width: 50%;
    display: flex;
    align-items: center;

    border: 1px solid black;
    margin: 1px 0px 0px 10px;
    padding-left: 10px;
    font-size: 20px;
`

export const GoTaskBtn = styled(Button)`
    margin-top: 20px;
    width: 400px;
    height: 50px;
    background-color: #454545;
    color: white;
    box-shadow: none;
    border-radius: 10px;
    border: none;
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
/////////   Top DropDown  ////////
export const SelectDropDown = styled(Dropdown)`
    width: 200px;
    box-shadow: none;
    margin-left: 10px;
    &:hover{
        background-color: gray;
        color: white;
        border: none;
        border-color: gray;
        box-shadow: none;
    }
    &:focus{
        background-color: gray;
        color: white;
        border: none;
        border-color: gray;
        box-shadow: none;
    }
`


//////////////////////////////////
export const NotificationContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: flex-start;
    padding: 60px 10px 10px;

    background: white;
    
    width: 440px;
    height: 53rem;
    overflow-y: auto;
`

export const Notih1 = styled.h1`
    width: 100%;
    font-family: 'Kanit', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    
    margin-bottom: 20px;

    text-align: center;
    color: #555555;
    //border: 1px solid black;
    &:hover{
        cursor: default;
        user-select: none;
    }
`

export const NotificationListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    //height: 100vh;
    overflow-y: auto;

    
    /* background-color: blue;
    border: 1px solid white; */

    ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    }
`

export const DivBox = styled.div`
    padding: 10px 10px 0px 15px;
    
    /* display: flex;
    flex-direction: column;
    justify-content: flex-start; */
    //width: 100%;
    font-family: 'Kanit', sans-serif;
    font-style: normal;
    margin-bottom: 5px;

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
    transition: background-color 0.2s ;
`

export const DateP = styled.p`
    font-size: 12px;
    color: #a9a9a9;
`
export const TitleP = styled.h4`
    font-size: 20px;
    color: #454545;
`
export const DetailP = styled.p`
    font-size: 15px;
    color: #454545;
    
`


