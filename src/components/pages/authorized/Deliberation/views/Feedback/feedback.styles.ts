import styled from '@emotion/styled'
import { Button, List} from 'antd';

/////////   Button Generate Link ///////////
export const GenLinkContainer = styled.div`
    font-family: 'Kanit', sans-serif;

    width: 100%;
    height: 100%;
    //background-color: gray;

    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    align-content: center;
`
//////////// Pop over Container /////////////
export const GenPopContainer = styled.div`
    width: 400px;
    height: 40px;
    //background-color: gray;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
`
export const GenPopTextBox = styled.input`
    width: 90%;
    height: 80%;
    border: 1px solid gray;
    border-radius: 5px;
    margin-right: 2px;
    padding: 10px 10px;
`
export const GenPopCopyBtn = styled(Button)`

    font-family: 'Kanit', sans-serif;
    font-size: 15px;
    width: 20%;
    height: 80%;
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
////////////////////////////////////////////
export const GenBtn = styled(Button)`

    font-family: 'Kanit', sans-serif;
    font-size: 20px;
    width: 400px;
    height: 60px;
    border: none;
    background-color: goldenrod;
    color: white;
    box-shadow: none;
    border-radius: 100px;
    box-shadow: 0px 3px 3px 3px rgba(0, 0, 0, 0.2);
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
    @media (max-width:768px){
        font-size: 16px;
    }
`

///////////  Container  ////////////////
export const FeedbackContainer = styled.div`
    width: 100%;
    height: 100vh;
    opacity: 0.8;
    padding: 0px 150px 0px 150px;

   // background-color: green;
    display: flex;
    flex-direction: column;
    //overflow: hidden;
    @media (max-width:768px){
        font-size: 12px;
    }

`
export const TopInnerContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const MainFeedbackContainer = styled.div`
    width: 100%;
    height: 55%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    overflow-y: auto;
    padding: 0px 50px 0px 50px;
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.1);
    //border: 1px solid black;
    @media (max-width:768px){
        font-size: 12px;
    }
`

export const ContainerBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    
    width: 100%;
    height: 80%;
    //background-color: #44FFD2;
    //border: 1px solid red;
    font-family: 'Kanit', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    
    padding: 20px;
`
export const CommentBox = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 20px;
    border: 1px solid #616163;
    border-radius: 20px;
    padding: 20px;
    font-size: 16px;
    //background-color: ;
    @media (max-width:768px){
        font-size: 12px;
    }
    
`
export const InsideHeaderContainer = styled.div`
    width: 100%;
    height: 50%;
    //background-color: gray;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    //border: 1px solid #616163;
    //padding: 20px;
`
export const ColonText = styled.p`
    margin: 0px 20px 0px 20px;
`
export const HeaderText = styled.div`
    width: 200px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 16px;
    //color: #ec9a29;
    //border: 1px solid #616163;
    @media (max-width:810px){
        font-size: 12px;
    }
    user-select: none;
`

///////////  Component  ////////////////
export const FeedbackText = styled.h1`
    font-family: 'Kanit', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    color: #444444;
    margin-top: 40px;
    @media (max-width:768px){
        font-size: 24px;
    }
    user-select: none;
`

//////////  Table Zone //////////////
export const TableContainer = styled.div`
    width: 100%;
    //height: 120px;
    //background-color: gray;
    margin-bottom: 1rem;
`

export const TableFeed = styled.div`
`

export const TrHeader = styled.tr`
    width: 100%;
    display: flex;
    flex-direction: row;
    //border: 1px solid green;
    //box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    user-select: none;
`
export const ThHeader = styled.th<{width: number}>`
    width: ${props=>props.width}%;
    height: 10%;

    background-color: #F2C94C; 
    
    font-family: 'Kanit', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 45px;

    padding-left: 15px;
    text-align: left;
    color: #454545;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    //border: 1px solid blue;
    @media (max-width:1180px){
        font-size: 14px;
    }
    user-select: none;
`

///// Table Content //// 

export const BodyWrapper = styled.div`
    
    //height: 600px;
    border: 1px solid black;
    overflow-y: auto;

    ::-webkit-scrollbar {
    width: 13px;
    height: 13px;
    }
    ::-webkit-scrollbar-thumb {
    background: darkgray;
    border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:active{
    background: gray;
    }
    ::-webkit-scrollbar-track{
    background: #ffffff;
    border-radius: 10px;
    box-shadow: inset 7px 10px 12px #f0f0f0;
    }
    
`
export const TbodyContent = styled.tbody`

    padding: 20px 15px;
    text-align: left;
    font-weight: 500;
    font-size: 12px;
    //background-color: #F2C94C;
    //color: #F2C94C;
    box-shadow: #454545 1px;

    /* &tr:nth-col(odd) {
        background-color: whitesmoke;
    } */

`

export const TrContent = styled.tr`
    width: 100%;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid rgba(220, 220, 200, 1);
    &:hover{
        cursor: pointer;
    }
    user-select: none;
`

export const TdContent = styled.td<{width: number}>`
    width: ${props=>props.width}%;
    background-color: white; 

    font-family: 'Kanit', sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 35px;

    padding-left: 15px;
    text-align: left;
    color: black;
    //border: 1px solid black;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    user-select: none;
    @media (max-width:1180px){
        font-size: 14px;
    }
`

//////////// Feedback List //////////////
export const FeedbackList = styled(List)`
    font-family: 'Kanit', sans-serif;
    //background-color: gray;
`