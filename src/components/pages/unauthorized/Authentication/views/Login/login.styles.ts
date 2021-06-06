import styled from '@emotion/styled';
import { Button, Row, Col } from 'antd';
import login_image from './assets/login_image.jpg';


export const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  ////////////////////////////////////  *****************************************************
  overflow: hidden;
  @media (max-width:768px){
    overflow-y: auto;
  }
  font-family: 'Kanit', sans-serif;
`

//// Other /////
export const LoginContainer = styled.div`
  width: 100%;
  //height: calc(100% - 4rem);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

 // border: 1px solid violet;
` 
export const LoginText = styled.h1`
  /* ลงชื่อเข้าใช้ */

  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  /* or 50% */

  color: #444444;
  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin-bottom: 30px;
`;
export const TextP = styled.p<{ fontSize: number }>`
  /* ไอดี */
  width: 60%;
  font-style: normal;
  font-weight: 500;
  font-size: ${(props) => props.fontSize}px;
  line-height: 18px;
  /* or 100% */
  
  display: flex;
  align-items: center;

  color: #707070;
  margin: 10px 10px 10px 0px;
`;
export const InputValue = styled.input`
  /* Rectangle 1 */

  width: 60%;
  height: 45px;
  left: 280px;
  top: 369px;

  border: 3px solid #f2c94c;
  border-radius: 10px;

  /* Inside Auto Layout */
  padding: 0rem 1rem 0rem 1rem;
  flex: none;
  //order: 1;
  flex-grow: 0;
  margin: 1rem 0rem 1rem 0rem;
`;
export const LoginBtn = styled(Button)`
  /* Login Button 1 */
  width: 30%;
  height: 65px;

  /* Inside Auto Layout */
  flex: none;
  //order: 1;
  flex-grow: 0;
  margin: 50px 0px;
  border-radius: 20px;

  background: #f2c94c;
  border: 3px solid #f2c94c;
  border-radius: 20px;

  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: white;
  /* or 100% */
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
`
export const LoginPicContainer = styled.div`
    width: 100%;
    height: calc(100% - 4rem);
    display: flex;
    justify-content: center;
    align-items: center;
    //padding: 4rem 0rem 4rem 0rem ;
    //border: 1px solid red;
`

export const LoginPic = styled.div`
    //border: 1px solid #555;
    width: 100%;
    height: 100%;
    background-image: url('${login_image}');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    //z-index: 1001;
    //margin-bottom: 1rem;
`
export const RowStyle = styled(Row)`
  height: 100%;
`

export const ColPic1 = styled(Col)`
  display: none;
  @media (max-width:768px){
    display: block;
    height: 400px;
  }
`
export const ColPic2 = styled(Col)`
  display: block;
  @media (max-width:768px){
    display: none;
  }
`

