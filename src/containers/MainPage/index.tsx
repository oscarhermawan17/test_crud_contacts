import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Form from '../../components/Form';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Modal from '../../components/Modal'
import { Styles as S } from './MainPage.style';
import { fetchContacts, createContact } from '../../app/store';

// Delete Error (API)
const onDelete = (id, setDisplayModal) => {
  console.log('delete id', id)
  setDisplayModal(false);
}

const handleCreateContact = (dispatch, formContact, setDisplayModal) => {
  console.log('handleCreateContact', formContact)
  dispatch(createContact(formContact));
  setDisplayModal(false);
};

const initialFormState = {
  firstName: '',
  lastName: '',
  age: 0,
  photo: ''
}

const MainPage = () => {
  const contactsBaru = useSelector((state) => state.contacts.contacts);
  const loading = useSelector((state) => state.contacts.loading);
  const error = useSelector((state) => state.contacts.error);
  const dispatch = useDispatch();

  const [displayModal, setDisplayModal] = useState(false);
  const modal = {
    onAction: () => handleCreateContact(dispatch, formContact, setDisplayModal),
    onActionTitle: 'Save',
    cancel: () => setDisplayModal(false),
    cancelTitle: 'Cancel',
  }
  const [formContact, setFormContact] = useState(initialFormState)

  useEffect(() => {
    dispatch(fetchContacts())
  }, [])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <S.WrapperMainPage>
      {displayModal &&
        <Modal {...modal}>
          <Form onChange={setFormContact} value={formContact} />
        </Modal>}
      <Button onClick={() => setDisplayModal(true)}>Create Contact</Button>

      <S.Contacts>
        {contactsBaru.map((contact) =>
          <Card key={contact.id} contact={contact} onDelete={(id) => onDelete(id, setDisplayModal)} onUpdate={() => {}}/>
        )}
      </S.Contacts>
    </S.WrapperMainPage>
  )
}

export default MainPage;
