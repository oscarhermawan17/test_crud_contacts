
import { useState } from 'react';

import DeleteIcon from '../../assets/delete.svg'
import UpdateIcon from '../../assets/update.svg'
import Modal from '../Modal'
import { Styles as S } from './Card.style';

const fullName = (contact) => `${contact.firstName} ${contact.lastName}`;

const setModalDelete = (setModal, setDisplayModal, onDelete, id) => {
  setModal((prevState) => {
    return {
      ...prevState,
      onAction: () => onDelete(id)
    }
  })
  setDisplayModal('delete');
}

// Refactor?
const modalView = (modal, displayModal, contact) => {
  return (
    <>
      {displayModal === 'read' && <Modal {...modal}>
        read
      </Modal>}
      {displayModal === 'update' && <Modal {...modal}>
        edit
      </Modal>}
      {displayModal === 'delete' && <Modal {...modal}>
        <span>Are you sure delete {fullName(contact)}?</span>
      </Modal>}
    </>
  )
}

const Card = ({ contact, onDelete, onUpdate }: any) => {
  const [displayModal, setDisplayModal] = useState('');
  const [modal, setModal] = useState({
    onAction: () => setDisplayModal(''),
    onActionTitle: 'Yes',
    cancel: () => setDisplayModal(''),
    cancelTitle: 'No',
  })

  return (
    <S.WrapperCard>
      {modalView(modal, displayModal, contact)}
      <S.Content onClick={() => alert('oke')}>
        {fullName(contact)}
      </S.Content>
      <S.Action>
        <S.Image src={UpdateIcon} alt="Update" onClick={() => setDisplayModal('edit')}/> &nbsp;
        <S.Image src={DeleteIcon} alt="Delete" onClick={() => setModalDelete(setModal, setDisplayModal, onDelete, contact.id)}/>
      </S.Action>
    </S.WrapperCard>
  )
}

export default Card;
