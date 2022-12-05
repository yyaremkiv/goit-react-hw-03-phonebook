import React, { Component } from 'react';

import { ContactForm } from '../components/ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from '../components/ContactList/ContactList';
import css from './app.module.scss';

const shortid = require('shortid');

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts: contacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleSubmit = ({ name, number }) => {
    if (
      this.state.contacts.find(
        contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      alert('This contact already exists');
      return;
    }
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  handleFilter = e => {
    this.setState({ filter: e.target.value.trim().toLocaleLowerCase() });
  };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  getFilteredContacts = () => {
    const filterContact = this.state.contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(this.state.filter)
    );
    return filterContact;
  };

  render() {
    const { handleSubmit, handleFilter, deleteContact, getFilteredContacts } =
      this;
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={handleSubmit} />

        {this.state.contacts.length !== 0 && (
          <>
            <h2>Contacts</h2>
            <div className={css.contacts__container}>
              <Filter onChange={handleFilter} />
              <ContactList
                contacts={getFilteredContacts()}
                delContact={deleteContact}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}
