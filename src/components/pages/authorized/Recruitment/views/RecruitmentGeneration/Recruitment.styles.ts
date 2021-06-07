import styled from '@emotion/styled';
import { Button, Input } from 'antd';

export const RecruitmentContainer = styled.div`
    width: 100%;
    padding-top: 4rem;

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: 'Kanit', sans-serif;
    font-style: normal;
    //color: #555555;
`;
export const GenLinkContainer = styled.div`
    width: 40rem;
    background-color: white;
    //border: 1px solid red;
    padding: 0rem 2rem 0rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export const RCTextHeader = styled.p`
    //width: 76rem;
    font-size: 24px;
    font-weight: 600;
    margin: 2rem 0rem 0rem 0rem;
    user-select: none;

    //border: 1px solid blueviolet;
`;

export const GenLinkBTN = styled(Button)`
    width: 10rem;
    height: 3rem;
    font-size: 16px;
    background-color: #454545;
    color: white;
    box-shadow: none;
    border-radius: 2rem;
    border: none;
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
    user-select: none;
`;
export const GeneratedLinkText = styled.input`
    width: 30rem;
    height: 2rem;
    margin: 1rem 0rem 1rem 0rem;
    padding: 0rem 1rem 0rem 1rem;
    //background-color: white;
    border: 0.2rem solid #555555;
    border-radius: 0.2rem;
    cursor: pointer;
    /* user-select: none; */
`;
export const DropTextSelect = styled.div`
    width: 10rem;
    border: none;
    &:focus {
        //background-color: gray;
        //color: white;
        border: none;
        box-shadow: none;
    }
    //font-size: 16rem;
`;

export const RCInputContainer = styled.div`
    //height: 4rem;
    width: 33rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    //border: 1px solid green;
    margin: 1rem 0rem 1.5rem 0rem;
`;
export const RCInnerTextContainer = styled.div`
    width: 12.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const RCInputText2 = styled.input`
    padding: 2px 10px 2px 10px;
    color: #454545;
    font-size: 16px;

    width: 20rem;
    //height: 95%;
    border: 0.5px solid #d9d9d9;
    border-radius: 0.1rem;
`;
export const RCText = styled.text`
    font-size: 16px;
    user-select: none;
`;

export const RCFnameText = styled.text`
    padding-top: 0.3rem;
    padding-left: 0.5rem;
    font-size: 10px;
    color: #b9b9b9;
`;

//
// ─── ANTD MIGRATION ─────────────────────────────────────────────────────────────
//
export const AntdInputStyled = styled(Input)`
    /* padding: 2px 10px 2px 10px; */
    /* margin-top: 20px; */
    color: #454545;
    font-size: 16px;

    width: 20rem;
    //height: 95%;
    border: 0.5px solid #d9d9d9;
    border-radius: 0.1rem;
`;
// ────────────────────────────────────────────────────────────────────────────────
