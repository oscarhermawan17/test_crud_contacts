import { Styles as S } from './Form.style';

const changeValue = (value, onChange, entity) => {
  onChange((prevState) => {
    return {
      ...prevState,
      [entity]: value
    }
  })
}

const Form = ({ onChange, value }) => {
  return (
    <S.WrapperForm>
      First Name <S.InputText value={value.firstName} onChange={(e) => changeValue(e.target.value, onChange, 'firstName')}/>
      Last Name <S.InputText value={value.lastName} onChange={(e) => changeValue(e.target.value, onChange, 'lastName')} />
      Age <S.InputText type="number" value={value.age} onChange={(e) => changeValue(Number(e.target.value), onChange, 'age')}/>
      Photo <S.InputText value={value.photo} onChange={(e) => changeValue(e.target.value, onChange, 'photo')}/>
    </S.WrapperForm>
  )
}

export default Form;