import './App.css';

import { useContact, Contact } from './components/contact';

const appContactExamples: Contact[] = [
  {
    name: 'tinker',
    emails: ['tinker@abc.com', 'tinker2@cbc.com', 'tinker3@nbc.com'],
  },
];

const appStyleNameAndEmail: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
};

const appStyleEmail: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '60px',
  padding: '5px',
};

const appStyleInputs: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '5px',
};

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
    init: appContactExamples,
  });

  return (
    <div>
      <div style={appStyleInputs}>
        <input
          disabled={hasError}
          type="text"
          value={name}
          placeholder="name"
          onChange={onChangeName}
        ></input>
        <input
          disabled={hasError}
          type="text"
          value={email}
          placeholder="email"
          onChange={onChangeEmail}
        ></input>
        <button disabled={hasError} onClick={onClickInsertNameAndEmail}>
          insert
        </button>
        {hasError && <p>has invalid input error</p>}
      </div>
      <hr />
      <ul>
        {contacts.map((contact_i: Contact): JSX.Element => {
          const { name, emails } = contact_i;
          return (
            <li key={name}>
              <div style={appStyleNameAndEmail}>{name}</div>
              <ul>
                {emails.map(
                  (email_i: string): JSX.Element => (
                    <li key={email_i}>
                      <div style={appStyleEmail}>
                        {email_i}
                        <button
                          onClick={() => {
                            deleteEmail(name, email_i);
                          }}
                        >
                          delete
                        </button>
                      </div>
                    </li>
                  ),
                )}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
