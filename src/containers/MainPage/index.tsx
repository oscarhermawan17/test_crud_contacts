import axios from 'axios';
import { useState, useEffect } from 'react';

import Card from '../../components/Card';
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
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    getData(setContacts)
  }, [])


  return (
    <S.WrapperMainPage>
      {contacts.map((contact) => 
        <Card contact={contact} onDelete={(id) => onDelete(id, contacts, setContacts)} onUpdate={() => {}}/>
      )}
    </S.WrapperMainPage>
  )
}

export default MainPage;
