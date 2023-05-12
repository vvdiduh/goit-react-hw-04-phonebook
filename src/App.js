import { Component } from 'react';
import { nanoid } from 'nanoid';
// import PropTypes from 'prop-types';
import './App.css';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

class Phonebook extends Component {
  state = {
    contacts: [
      // { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      // { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      // { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      // { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    console.log(contacts);
    if (contacts) {
      const contactsParsed = JSON.parse(contacts);
      this.setState({ contacts: contactsParsed });
    }
  }

  componentDidUpdate(prevState, prevProps) {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  addContact = state => {
    console.log(state);
    const nameArray = this.state.contacts.map(({ name }) => name);
    if (nameArray.includes(state.name)) {
      alert(`Контакт ${state.name} існує`);
      return;
    }
    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        { id: nanoid(), name: state.name, number: state.number },
      ],
    }));
  };

  contactFilter = e => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  deletContact = ({ target }) => {
    console.log(target.name);
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.id !== target.name
      ),
    }));
  };

  render() {
    const { filter } = this.state;
    const { addContact, changeFilter, deletContact } = this;
    const contactFilter = this.contactFilter();

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
}

// Phonebook.propTypes = {
//   name: PropTypes.string.isRequired,
//   id: PropTypes.string.isRequired,
// };

export default Phonebook;
