import styled from '@emotion/styled';
import { Steps, Button } from 'antd';

export const PTrackMainContainer = styled.div`
    width: 100vw;
    
    display: flex;
    justify-content: center;
    align-items: center;
    

    font-family: 'Kanit', sans-serif;
    font-style: normal;
`

export const PTBoxContainer = styled.div`
    width: 100%;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: #f9f9f9;

    padding: 0.5rem 1rem 0rem 1rem;
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
    //border: 1px solid red;
    border-radius: 0rem 0rem 1rem 1rem;

    @media (max-width:993px){
        width: 100%;
        border-radius: 0rem;
    }
`
export const MailDetailContainer = styled.div`
    width: 500px;
    height: 350px;
    background-color: #d9d9d9;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    border-radius: 0.5rem;
`
export const MailButtomDiv = styled.div`
    width: 500px;
    height: 100%;
    background-color: #333333;
    border-radius: 0rem 0rem 0.5rem 0.5rem;
    padding-top: 5px;
    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`
export const MailTextHeader = styled.div`
    width: 100%;
    font-size: 28px;
    font-weight: 600;
    padding: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`
export const MaildetailBox = styled.div`
    width: 230px;
    height: 70px;
    //background-color: blue;
    margin: 0px 10px 0px 10px; 
`
export const MaildetailBox2 = styled.div`
    width: 100%;
    height: 100px;
    //background-color: blue;
    margin: 0px 10px 0px 10px; 
`
export const ListDetailHeader = styled.div`
    width: 100%;
    height: 35px;
    font-size: 20px;
    padding: 5px;
    font-weight: 600px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: flex-start;
`
export const ListDetailText = styled.div`
    width: 100%;
    font-size: 14px;
    padding: 5px;
    font-weight: 500px;
    color: #999999;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const ListDetailText2 = styled.div`
    width: 100%;
    font-size: 14px;
    padding: 5px 0px 5px 40px;
    font-weight: 500px;
    color: #999999;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const TrackDiv = styled.div`
    width: 90%;
    height: 400px;
    background-color: white;
    margin: 20px 0px 20px 0px;

    padding: 0.5rem 1rem 0rem 1rem;
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
    //border: 1px solid red;
    border-radius: 0.5rem;
    
    display: flex;
    flex-direction: row;
    justify-content: center;
    @media (max-width:993px){
        width: 100%;
    }
`
export const StepDiv = styled(Steps)`
    width: 160px;
    //font-size: 20px;
    padding: 20px 10px 0px 10px;
    
    display: flex;
    justify-content: center;
    align-self:center;

    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
    //border: 1px solid red;
    border-radius: 0.5rem;
`

///////////////////////////////////////////////

export const SellerDiv = styled.div`
    width: 50%;
    //height: 80%;
    //background-color: blue;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const BuyerDiv = styled.div`
    width: 50%;
    //height: 80%;
    //background-color: green;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const SellerDetailDiv = styled.div`
    width: 75%;
    //background-color: #d9d9d9;
    padding-right: 5px;
    padding: 5px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`
export const BuyerDetailDiv = styled.div`
    width: 75%;
    //background-color: #d9d9d9;
    padding: 5px;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`
export const HeaderTextSY = styled.div`
    font-size: 20px;
    font-weight: 600;

    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;
`
export const ButtonDiv = styled(Button)`

`

export const ButtonContainer = styled.div`
    width: 75%; 
    height: 50%;

    padding-right: 5px;
    padding: 5px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`