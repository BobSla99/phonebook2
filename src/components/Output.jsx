const Output = ({ contacts, onDelete,onEdit }) => {
  return (
    <>
      {contacts.map((contact) => (
        <li className="note" key={contact.id}>
          {contact.name}
          {contact.number}
          
          <button id={contact.id} onClick={onDelete}>
            Delete
          </button>{" "}
          <button id={contact.id} onClick={onEdit} >Edit</button>
        </li>
      ))}
    </>
  );
};
export default Output;
