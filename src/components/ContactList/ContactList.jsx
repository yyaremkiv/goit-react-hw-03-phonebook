import css from './ContactList.module.scss';

export const ContactList = ({ contacts, delContact }) => {
  return (
    <ul className={css.contactList}>
      {contacts.map(({ id, name, number }) => {
        return (
          <li key={id} className={css.contactList__item}>
            <p>
              {name}: {number}
            </p>
            <button
              className={css.contactList__button}
              type="button"
              onClick={e => delContact(id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
