import { Styles as S } from './Modal.style';
import Button from '../Button';

const Modal = ({
  onAction,
  onActionTitle = 'Yes',
  actionVariant,
  cancel,
  cancelTitle = 'No',
  children
}: any) => {

  return (
    <S.WrapperModal>
      <S.Content>
        <S.Body>
          {children}
        </S.Body>
        <S.Footer>
          {onAction && <Button variant={actionVariant} onClick={onAction}>{onActionTitle}</Button>} &nbsp;
          <Button onClick={cancel}>{cancelTitle}</Button>
        </S.Footer>
      </S.Content>
    </S.WrapperModal>
  )
}

export default Modal;