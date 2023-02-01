import styled from 'styled-components'

const Styles = {
  Contacts: styled.div`
    margin-top: 1rem;
    display: grid;
    gap: 1rem 1rem;
    grid-template-columns: auto auto auto;
    @media (max-width: 1020px) {
      gap: 1rem 1rem;
      grid-template-columns: auto auto;
    }
    @media (max-width: 720px) {
      gap: 1rem 1rem;
      grid-template-columns: auto;
    }
  `,
  InputText: styled.input`
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  `,
  Text: styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
  `,
}  

export { Styles };
  