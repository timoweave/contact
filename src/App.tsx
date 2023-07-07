import './App.css';

import { useContact, Contact } from './components/contact';

const exampleContacts: Contact[] = [
  {
    name: 'tinker',
    emails: ['tinker@abc.com', 'tinker2@cbc.com', 'tinker3@nbc.com'],
  },
];

function App() {
  const {
    contacts,
    name,
    email,
    hasError,
    onChangeName,
    onChangeEmail,
    deleteEmail,
    onClickInsertNameAndEmail,
  } = useContact({
    init: exampleContacts,
  });

  return (
    <>
      <ul>
        {contacts.map((contact_i) => {
          const { name, emails } = contact_i;
          return (
            <li key={name}>
              {name}
              <ul>
                {emails.map((email_i) => (
                  <li key={email_i}>
                    {email_i}{' '}
                    <button
                      onClick={() => {
                        deleteEmail(name, email_i);
                      }}
                    >
                      delete
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
      <div>
        <input
          disabled={hasError}
          type="text"
          value={name}
          onChange={onChangeName}
        ></input>
        <input
          disabled={hasError}
          type="text"
          value={email}
          onChange={onChangeEmail}
        ></input>
        <button disabled={hasError} onClick={onClickInsertNameAndEmail}>
          insert
        </button>
        {hasError && <p>has invalid error</p>}
      </div>
    </>
  );
}

export default App;
