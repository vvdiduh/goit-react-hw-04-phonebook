import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
// import PropTypes from 'prop-types';
import './App.css';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts, isLoaded]);

  const addContact = state => {
    console.log(contacts);
    const nameArray = contacts.map(({ name }) => name);
    if (nameArray.includes(state.name)) {
      alert(`Контакт ${state.name} існує`);
      return;
    }
    setContacts(prevContacts => [
      ...prevContacts,
      { id: nanoid(), name: state.name, number: state.number },
    ]);
  };

  const [filter, setFilter] = useState('');

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const contactFilter = e => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deletContact = ({ target }) => {
    console.log(target.name);
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== target.name)
    );
  };

  return (
    <div>
      <>
        <h1>Телефонна книга</h1>
        <ContactForm addContact={addContact} />
        <h2>Список контактів</h2>
        <h3>Пошук контактів</h3>
        <Filter filter={filter} changeFilter={changeFilter} />
        <ContactList
          contactFilter={contactFilter}
          deletContact={deletContact}
        />
      </>
    </div>
  );
}