
import { useState } from 'react';

import DeleteIcon from '../../assets/delete.svg'
import UpdateIcon from '../../assets/update.svg'
import Modal from '../Modal'
import { Styles as S } from './Card.style';

const fullName = (contact) => `${contact.firstName} ${contact.lastName}`;

const readContact = ({ firstName, lastName, age, photo }) => {
  return (
    <S.WrapperRead>
      <S.ImageContact src={photo} alt={'image'}/> <br/>
      <span>First Name: {firstName}</span> <br/>
      <span>Last Name: {lastName}</span> <br/>
      <span>Age: {age}</span>
    </S.WrapperRead>
  )
}

const setModalDelete = (setModal, setDisplayModal, onDelete, id) => {
  setModal((prevState) => {
    return {
      ...prevState,
      onAction: () => {}, // () => onDelete(id)
      cancelTitle: 'No', 
    }
  })
  setDisplayModal('delete');
}

const setModalReadContact = (setModal, setDisplayModal) => {
  setModal((prevState) => {
    return {
      ...prevState,
      onAction: null,
      cancelTitle: 'OK',
    }
  })
  setDisplayModal('read');
}

// Refactor?
const modalView = (modal, displayModal, contact) => {
  return (
    <>
      {displayModal === 'read' && <Modal {...modal}>
        {readContact(contact)}
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
    cancel: () => setDisplayModal(''),
    actionVariant: 'error'
  })

  return (
    <S.WrapperCard>
      {modalView(modal, displayModal, contact)}
      <S.Content onClick={() => setModalReadContact(setModal, setDisplayModal)}>
        {fullName(contact)}
      </S.Content>
      <S.Action>
        <S.Image src={UpdateIcon} alt="Update" onClick={onUpdate}/> &nbsp;
        <S.Image src={DeleteIcon} alt="Delete" onClick={() => setModalDelete(setModal, setDisplayModal, onDelete, contact.id)}/>
      </S.Action>
    </S.WrapperCard>
  )
}

export default Card;
