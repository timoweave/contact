import { useCallback, useEffect, useState, useMemo } from 'react';

export type Contact = {
  name: string;
  emails: string[];
};

export type UseContact = {
  contacts: Contact[];
  name: string;
  email: string;
  hasError: boolean;

  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteEmail: (name: string, email: string) => void;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
  onClickInsertNameAndEmail: (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
};

export type UseContactProps = {
  init: Contact[];
};

export const useContact = (props: UseContactProps): UseContact => {
  const [contacts, setContacts] = useState<Contact[]>(props.init);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const lookup = useMemo(() => {
    return new Set<string>(contacts.map(({ name }) => name));
  }, [contacts]);

  const onChangeName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setName(e.target.value);
    },
    [],
  );

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setEmail(e.target.value);
    },
    [],
  );

  const onClickInsertNameAndEmail = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      if (
        email == null ||
        name == null ||
        email === '' ||
        name === '' ||
        email.split('@').filter((s) => s.length > 0).length < 2
      ) {
        setHasError(true);
        return;
      }

      if (!lookup.has(name)) {
        setContacts((prevContacts) => {
          return [...prevContacts, { name, emails: [email] }];
        });
      } else {
        setContacts((prevContacts) =>
          prevContacts.map((contact_i) => {
            if (contact_i.name !== name) {
              return contact_i;
            } else {
              return { ...contact_i, emails: [...contact_i.emails, email] };
            }
          }),
        );
      }
    },
    [email, lookup, name],
  );

  const deleteEmail = useCallback((name: string, email: string): void => {
    setContacts((prevContacts) =>
      prevContacts
        .map((contact_i) => {
          if (contact_i.name !== name) {
            return contact_i;
          } else {
            return {
              ...contact_i,
              emails: contact_i.emails.filter((email_i) => email_i !== email),
            };
          }
        })
        .filter(({ emails }) => emails.length > 0),
    );
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setHasError(false);
    }, 2000);
  }, [hasError]);

  return {
    contacts,
    name,
    email,
    hasError,
    setContacts,
    setName,
    onChangeName,
    setEmail,
    onChangeEmail,
    deleteEmail,
    setHasError,
    onClickInsertNameAndEmail,
  };
};
