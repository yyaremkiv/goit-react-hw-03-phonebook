import React, { Component } from 'react';
import css from './app.module.scss';

import { ContactForm } from '../components/ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from '../components/ContactList/ContactList';

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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
    console.log('prevProps', prevProps);
    console.log('prevState', prevState);
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

  render() {
    const filterContact = this.state.contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(this.state.filter)
    );
    const { handleSubmit, handleFilter, deleteContact } = this;
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
                contacts={filterContact}
                delContact={deleteContact}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}
