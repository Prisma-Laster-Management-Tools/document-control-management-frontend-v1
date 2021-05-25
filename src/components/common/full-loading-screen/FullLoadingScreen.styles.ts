import styled from '@emotion/styled';

const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: opacity 1s;
  z-index: 9999;
  pointer-events: none; // make this click thru
`;

const InfoText = styled.p`
  margin-top: 40px;
  color: aliceblue;
  /* background-color: red; */
  z-index: 9999;
`;

export { Container, InfoText };
