import axios from 'axios';
import { useState, useEffect } from 'react';

import Form from '../../components/Form';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Modal from '../../components/Modal'
import { Styles as S } from './MainPage.style';

const getData = async (setContacts) => {
  try {
    const response = await axios.get('https://contact.herokuapp.com/contact');
    setContacts(response.data.data);
  } catch (error) {
    setContacts([]);
  }
}

const onDelete = (id, contacts, setContacts) => {
  const tmp = contacts.filter((contact) => id !== contact.id)
  setContacts(tmp);
}

const MainPage = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const modal = {
    onAction: () => {},
    onActionTitle: 'Save',
    cancel: () => setDisplayModal(false),
    cancelTitle: 'Cancel',
  }
  const [contacts, setContacts] = useState([])
  const [formContact, setFormContact] = useState({
    firstName: '',
    lastName: '',
    age: 0,
    photo: ''
  })

  useEffect(() => {
    getData(setContacts)
  }, [])


  return (
    <S.WrapperMainPage>
      {displayModal &&
        <Modal {...modal}>
          <Form/>
        </Modal>}
      <Button onClick={() => setDisplayModal(true)}>Create Contact</Button>
      <S.Contacts>
        {contacts.map((contact) => 
          <Card contact={contact} onDelete={(id) => onDelete(id, contacts, setContacts)} onUpdate={() => {}}/>
        )}
      </S.Contacts>
    </S.WrapperMainPage>
  )
}

export default MainPage;
