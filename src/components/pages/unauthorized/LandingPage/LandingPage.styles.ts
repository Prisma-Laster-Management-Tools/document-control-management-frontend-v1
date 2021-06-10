import styled from '@emotion/styled'
import firstPic from './assets/1.svg'
import p1 from '../../../../assets/main_background.jpg'

export const MainLandingContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    //align-content: center;

    font-family: 'Kanit', sans-serif;

    padding: 0px 240px 0px 240px;
    @media (max-width:1400px){
        padding-left: 200px;
        padding-right: 200px;
    }
    @media (max-width:993px){
        padding-left: 80px;
        padding-right: 80px;
    }
    @media (max-width:768px){
        padding-left: 20px;
        padding-right: 20px;
    }
    overflow-x: hidden;
`
////////////////// 1 /////////////////////
export const FirstContainer = styled.div`
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    //border: 1px solid red;
    @media (max-width:768px){
        flex-direction: column;
    }
`
export const FirstTextContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    padding-top: 1rem;
`
export const H3TextGold = styled.div`
    width: 32rem;
    height: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    font-size: 54px;
    font-weight: 600;
    color: #DAA520;
    @media (max-width:1200px){
        font-size: 35px;
        width: 22rem;
    }
    @media (max-width:993px){

    }
    @media (max-width:768px){
        font-size: 30px;
    }
`
export const H3TextGray = styled.div`
    width: 32rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    font-size: 54px;
    font-weight: 600;
    color: #454545;
    @media (max-width:1200px){
        font-size: 35px;
        width: 22rem;
    }
    @media (max-width:993px){

    }
    @media (max-width:768px){
        font-size: 30px;
    }
`
export const FirstTextP = styled.p`
    margin-top: 2rem;
    width: 29rem;
    font-size: 18px;
    font-weight: 400;
    color: #a9a9a9;
    @media (max-width:1200px){
        font-size: 14px;
        width: 20rem;
    }
    @media (max-width:993px){

    }
    @media (max-width:768px){
        width: 19rem;
    }
`
export const FirstPic = styled.div`
    width: 18rem;
    height: 18rem;
    background-image: url(${firstPic});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 1rem;

    @media (max-width:1200px){
        width: 14rem;
        height: 14rem;
    }
    @media (max-width:993px){

    }
    @media (max-width:768px){
        width: 14rem;
        height: 14rem;
        margin-top: 1rem;
        width: 100%;
    }
    margin-bottom: 2rem;
    //border: 1px solid green;
`
 
///////////////////////   2    /////////////////////////////

export const SecondContainer = styled.div`
    width: 100%;
    //border: 4px solid black;
    display: flex;
    justify-content: center;

    flex-wrap: wrap;
    flex-shrink: 3;
    padding: 2rem;
    

    margin-bottom: 1rem;
`

export const TestCard = styled.div`
    width: 10rem;
    height: 7rem;
    margin: 1rem;
    color: white;
    font-size: 1rem;
    background-color: #848484;
    padding: 1.5rem;
    border-radius: 0.5rem;
`

//////////////////////////////////////////////
export const FirstPic2 = styled.div`
    width: 100vw;
    height: 30rem;
    background-image: url(${p1});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 0.5rem;
`
///////////////// footer /////////////////////
export const FooterContainer = styled.div`
    margin-top: 4rem;
    width: 100vw;
    height: 4rem;
    background-color: #d9d9d9;

    display: flex;
    justify-content: center;
    align-items: center;
`