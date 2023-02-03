import { Styles as S } from './Form.style';

const Form = ({ onChange, value }) => {
  return (
    <S.WrapperForm>
      First Name <S.InputText data-testid="test-firstName" value={value.firstName} onChange={(e) => onChange({ value: e.target.value, entity: 'firstName' })}/>
      Last Name <S.InputText value={value.lastName} onChange={(e) => onChange({ value: e.target.value, entity: 'lastName' })}/>
      Age <S.InputText type="number" value={value.age} onChange={(e) => onChange({ value: e.target.value, entity: 'age' })}/>
      Photo <S.InputText value={value.photo} onChange={(e) => onChange({ value: e.target.value, entity: 'photo' })}/>
    </S.WrapperForm>
  )
}

export default Form;