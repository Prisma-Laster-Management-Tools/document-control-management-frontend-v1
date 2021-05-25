import styled from '@emotion/styled'
import { Button, List} from 'antd';
import bg_image from '../../../../../../assets/main_background.jpg'

///// Background /////
export const BgContainer = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-image: url(${bg_image});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
`
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
    padding: 10;

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
    font-size: 24px;
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
`

///////////  Container  ////////////////
export const FeedbackContainer = styled.div`
    width: 100%;
    height: 100vh;
    opacity: 0.8;
    padding: 80px 150px 0px 150px;

    //background-color: green;
    display: flex;
    flex-direction: column;

`
export const TopInnerContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
export const TableContainer = styled.div`
    width: 100%;
    height: 120px;
    //background-color: gray;
`
export const MainFeedbackContainer = styled.div`
    width: 100%;
    height: 500px;
    background-color: white;
    overflow-y: auto;
    padding: 50px 50px 50px 50px;
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.1);
    //border: 1px solid black;
`

export const ContainerBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    
    width: 100%;
    height: 100%;
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
    height: 100px;
    margin-top: 10px;
    border: 1px solid #616163;
    border-radius: 20px;
    padding: 20px;
    font-size: 18px;
    //background-color: ;
`
export const InsideHeaderContainer = styled.div`
    width: 100%;
    //background-color: gray;
    justify-content: center;
    //border: 1px solid #616163;
    //padding: 20px;

    display: flex;
    flex-direction: row;
    align-items: baseline;
`
export const ColonText = styled.p`
    margin: 0px 20px 0px 20px;
`
export const HeaderText = styled.p`
    width: 200px;
    font-weight: 600;
    //color: #ec9a29;
    //border: 1px solid #616163;
`

///////////  Component  ////////////////
export const FeedbackText = styled.h1`
    font-family: 'Kanit', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 48px;
    color: #444444;
    margin-top: 40px;
`

//////////  Table Zone //////////////
export const Table = styled.table`
`

export const TheadHeader = styled.thead`
    text-align: left; 
`
export const TrHeader = styled.tr`
    display: flex;
    flex-direction: row;
    //box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`
export const ThHeader = styled.th<{width: number}>`
    width: ${props=>props.width}px;
    height: 50px;

    background-color: #F2C94C; 
    
    font-family: 'Kanit', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 45px;

    padding-left: 15px;
    text-align: left;
    color: #454545;
    //border: 1px solid black;
`
export const ThHeaderUniq = styled.th<{width: number}>`
    width: ${props=>props.width}px;
    height: 50px;

    background-color: #F2C94C; 
    
    font-family: 'Kanit', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 45px;

    text-align: center;
    color: #454545;
    //border: 1px solid black;
`

///// Table Content //// 

export const BodyWrapper = styled.div`
    //width:100%;
    height: 600px;
    //table-layout: fixed;
    //border: 1px solid black;
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
    height: 100%;
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
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid rgba(220, 220, 200, 1);
    &:hover{
        cursor: pointer;
    }
`

export const TdContent = styled.td`
    height: 40px;
    background-color: wheat; 

    font-family: 'Kanit', sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 35px;

    padding-left: 15px;
    text-align: left;
    color: black;
    //border: 1px solid black;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`

export const TdContentUniq = styled.td`
    height: 40px;
    background-color: wheat; 

    font-family: 'Kanit', sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 35px;

    //padding-left: 15px;
    text-align: center;
    color: black;
    //border: 1px solid black;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`

//////////// Feedback List //////////////
export const FeedbackList = styled(List)`
    font-family: 'Kanit', sans-serif;
    //background-color: gray;
`