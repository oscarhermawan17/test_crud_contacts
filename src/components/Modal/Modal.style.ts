import styled from 'styled-components'

const Styles = {
  WrapperModal: styled.div`
    display: 'block';
    position: fixed; 
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
  `,
  Content: styled.div`
    background-color: white;
    margin: 1% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 30%;
  `,
  Body: styled.div`
  `,
  Footer: styled.div`
    display: flex;
    justify-content: flex-end;
  `
}  

export { Styles };