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
  Content: styled.div`
    cursor: pointer;
  `,
  Action: styled.div`
    cursor: pointer;
    display: flex;
  `
}  

export { Styles };