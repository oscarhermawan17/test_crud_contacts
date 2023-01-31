import { Styles as S } from './Modal.style';
import Button from '../Button';

const Modal = ({
  onAction,
  onActionTitle = 'Yes',
  cancel,
  cancelTitle = 'No',
  body
}: any) => {

  return (
    <S.WrapperModal>
      <S.Content>
        <S.Body>
          {body}
        </S.Body>
        <S.Footer>
          <Button variant={"error"} onClick={onAction}>{onActionTitle}</Button> &nbsp;
          <Button onClick={cancel}>{cancelTitle}</Button>
        </S.Footer>
      </S.Content>
    </S.WrapperModal>
  )
}

export default Modal;