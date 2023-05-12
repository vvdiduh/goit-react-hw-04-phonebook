export default function ContactList({ contactFilter, deletContact }) {
  return (
    <ul>
      {contactFilter.map(({ id, name, number }) => (
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
