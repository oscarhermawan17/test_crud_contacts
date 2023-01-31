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

function MainPage() {
  const [contacts, setContacts] = useState([])


  useEffect(() => {
    getData(setContacts)
  }, [])


  return (
    <div>
      {/* {contacts.map((contact) => 
        <Card contact={contact} />
      )} */}
      {contacts.length > 0 && <Card contact={contacts[0]} />}
    </div>
  )
}

export default MainPage
