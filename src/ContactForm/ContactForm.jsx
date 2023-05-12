import React, { Component } from 'react';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submit = e => {
    e.preventDefault();
    this.props.addContact(this.state);
  };

  render() {
    const { name, number } = this.state;
    return (
      <>
        <form onSubmit={this.submit}>
          <h2>Ім'я</h2>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.onInput}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />{' '}
          <h2>Номер</h2>
          <input
            type="tel"
            name="number"
            value={number}
            onChange={this.onInput}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />{' '}
          <button type="submit">Додати контакт</button>
        </form>
      </>
    );
  }
}

export default ContactForm;
