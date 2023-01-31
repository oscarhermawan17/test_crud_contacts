import { Styles as S } from './Form.style';

const Form = () => {
  return (
    <S.WrapperForm>
      First Name <S.InputText />
      Last Name <S.InputText />
      Age <S.InputText type="number" />
      Photo <S.InputText />
    </S.WrapperForm>
  )
}

export default Form;