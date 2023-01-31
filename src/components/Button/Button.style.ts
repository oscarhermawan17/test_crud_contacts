import styled from 'styled-components'

const Styles = {
  WrapperButton: styled.button`
    border: none;
    border-radius: 0.25rem;
    padding: 0.5rem 1.5rem;
    background: ${({ variant }) => {
      if(variant === 'success') {
        return `#2e7d32`;
      }
      if(variant === 'error') {
        return`#d32f2f`;
      }
      return `#1976d2`;
    }};
    color: white;
    cursor: pointer;
  `,
}  

export { Styles };