import styled from 'styled-components'

const Styles = {
  WrapperCard: styled.div`
    padding: 1rem;
    border: solid 1px black;
    font-size: 1.5rem;
    display: flex;
    justify-content: space-between;
    :hover {
      border: solid 1px gray;
    }
  `,
  WrapperRead: styled.div`
    padding: 0 1.25rem;
    font-size: 1.125rem;
  `,
  Content: styled.div`
    cursor: pointer;
  `,
  Image: styled.img`
    width: 25px;
  `,
  ImageContact: styled.img`
    display: block;
    margin: auto;
    width: 50%;
  `,
  Action: styled.div`
    cursor: pointer;
    display: flex;
  `
}  

export { Styles };