import { Styles as S } from './Button.style';

const Button = ({ children, variant = 'primary', onClick }: any) => {
  return (
    <S.WrapperButton variant={variant} onClick={onClick}>
      {children}
    </S.WrapperButton>
  )
}

export default Button;