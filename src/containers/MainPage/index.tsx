import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Form from '../../components/Form';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Modal from '../../components/Modal'
import { Styles as S } from './MainPage.style';
import {
  fetchContacts,
  getSingleContact,
  createContact,
  removeError,
  updateContact,
  updateSingleContact
} from '../../app/store';

// Delete Error (API), dont need fix this
const onDelete = (id, setDisplayModal) => {
  setDisplayModal(false);
}

const initialFormState = {
  firstName: '',
  lastName: '',
  age: 0,
  photo: ''
}

const onClear = (setFormContact, setDisplayModal) => {
  setFormContact(initialFormState);
  setDisplayModal(false);
}

const cancelModalError = (setErrorModal, dispatch) => {
  setErrorModal(false)
  dispatch(removeError());
}

const handleCreateContact = (dispatch, formContact, setDisplayModal) => {
  dispatch(createContact(formContact));
  setDisplayModal(false);
};

const handleUpdateContact = (dispatch, contactSingle, contacts, setUpdateContactModal) => {
  dispatch(updateSingleContact({ ...contactSingle, contacts }));
  setUpdateContactModal(false);
};

const getContactById = (dispatch, getSingleContact, id) => {
  dispatch(getSingleContact(id))
}

const MainPage = () => {
  const contacts = useSelector((state) => state.contacts.contacts);
  const loading = useSelector((state) => state.contacts.loading);
  const error = useSelector((state) => state.contacts.error);
  const errorCreate = useSelector((state) => state.contacts.errorCreate);

  const contactSingle = useSelector((state) => state.contactSingle.contact);

  const dispatch = useDispatch();

  const [displayModal, setDisplayModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false)
  const [updateContactModal, setUpdateContactModal] = useState(false)

  const modal = {
    onAction: () => handleCreateContact(dispatch, formContact, setDisplayModal),
    onActionTitle: 'Save',
    cancel: () => onClear(setFormContact, setDisplayModal),
    cancelTitle: 'Cancel',
    actionVariant: 'success'
  }

  const modalUpdateContact = {
    onAction: () => handleUpdateContact(dispatch, contactSingle, contacts, setUpdateContactModal),
    onActionTitle: 'Save',
    cancel: () => setUpdateContactModal(false),
    cancelTitle: 'Cancel',
    actionVariant: 'success'
  }

  const modalError = {
    cancel: () => cancelModalError(setErrorModal, dispatch),
    cancelTitle: 'Ok',
  }

  const [formContact, setFormContact] = useState(initialFormState)

  useEffect(() => {
    dispatch(fetchContacts())
  }, [])

  useEffect(() => {
    if(errorCreate) {
      setErrorModal(true)
    }
  }, [errorCreate])

  // GET SINGLE (FOR UPDATE, AND OPEN MODAL)
  useEffect(() => {
    if(contactSingle) {
      setUpdateContactModal(true);
    }
  }, [contactSingle])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const changeValue = (value, entity) => {
    setFormContact((prevState) => {
      return {
        ...prevState,
        [entity]: value
      }
    })
  }

  return (
    <S.WrapperMainPage>
      {displayModal &&
        <Modal {...modal}>
          <Form onChange={({ value, entity }) => changeValue(value, entity)} value={formContact} />
        </Modal>}

      {updateContactModal &&
        <Modal {...modalUpdateContact}>
          <Form onChange={({ value, entity }) => dispatch(updateContact({ value, entity }))} value={contactSingle} />
        </Modal>}

      {errorModal &&
        <Modal {...modalError}>
          <p>{errorCreate}</p>
        </Modal>}

      <Button onClick={() => setDisplayModal(true)}>Create Contact</Button>

      <S.Contacts>
        {contacts.map((contact) =>
          <Card
            key={contact.id} contact={contact} onDelete={(id) => onDelete(id, setDisplayModal)}
            onUpdate={() => getContactById(dispatch, getSingleContact, contact.id)}
          />
        )}
      </S.Contacts>
    </S.WrapperMainPage>
  )
}

export default MainPage;
