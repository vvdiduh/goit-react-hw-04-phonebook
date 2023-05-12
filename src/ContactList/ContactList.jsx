export default function ContactList({ contactFilter, deletContact }) {
  const filteredContacts = contactFilter();

  return (
    <ul>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id}>
          {name}: {number}
          <button name={id} onClick={deletContact}>
            Видалити
          </button>
        </li>
      ))}
    </ul>
  );
}
