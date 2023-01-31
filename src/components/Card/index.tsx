
import { useState } from 'react';

import Modal from '../Modal'
import { Styles as S } from './Card.style';

const setModalDelete = (setModal, setDisplay, fullName) => {
  setModal((prevState) => {
    return {
      ...prevState,
      onActionTitle: 'Test',
      body: <span>Are you sure delete {fullName}?</span>
    }
  })
  setDisplay(true);
}

const fullName = (contact) => `${contact.firstName} ${contact.lastName}`;

const Card = ({ contact }: any) => {
  const [displayModal, setDisplay] = useState(false);
  const [modal, setModal] = useState({
    onAction: () => setDisplay(false),
    onActionTitle: 'Yes',
    cancel: () => setDisplay(false),
    cancelTitle: 'No',
  })

  return (
    <S.WrapperCard>
      {displayModal ? <Modal {...modal} /> : null}
      <S.Content onClick={() => alert('oke')}>
        {fullName(contact)}
      </S.Content>
      <S.Action>
        <div onClick={() => setDisplay(true)}>
          -
        </div>
        <div onClick={() => setModalDelete(setModal, setDisplay, fullName(contact))}>
          X
        </div>
      </S.Action>
    </S.WrapperCard>
  )
}

export default Card;
