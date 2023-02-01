import axios from 'axios';
import { useState, useEffect } from 'react';

import Form from '../../components/Form';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Modal from '../../components/Modal'
import { Styles as S } from './MainPage.style';

import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from '../../app/store';

const onDelete = (id, contactsBaru) => {
  const tmp = contactsBaru.filter((contact) => id !== contact.id)
  // setContacts(tmp); dispatch
}

const MainPage = () => {
  const contactsBaru = useSelector((state) => state.contacts.contacts);
  const loading = useSelector((state) => state.contacts.loading);
  const error = useSelector((state) => state.contacts.error);
  const dispatch = useDispatch();

  const [displayModal, setDisplayModal] = useState(false);
  const modal = {
    onAction: () => {},
    onActionTitle: 'Save',
    cancel: () => setDisplayModal(false),
    cancelTitle: 'Cancel',
  }
  const [formContact, setFormContact] = useState({
    firstName: '',
    lastName: '',
    age: 0,
    photo: ''
  })

  useEffect(() => {
    dispatch(fetchContacts())
  }, [])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <S.WrapperMainPage>
      {console.log('contactsBaru', contactsBaru)}
      {displayModal &&
        <Modal {...modal}>
          <Form/>
        </Modal>}
      <Button onClick={() => setDisplayModal(true)}>Create Contact</Button>
      <S.Contacts>
        {contactsBaru.map((contact) =>
          <Card key={contact.id} contact={contact} onDelete={(id) => onDelete(id, contactsBaru)} onUpdate={() => {}}/>
        )}
      </S.Contacts>
    </S.WrapperMainPage>
  )
}

export default MainPage;
