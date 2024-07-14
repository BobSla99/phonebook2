import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import NewContact from "./components/NewContact";
import Output from "./components/Output";
import contactService from "./services/contact";
import Notification from "./components/Notification";

function App({ agenda }) {
  const [contacts, setContacts] = useState([]);
  const [inValue, setInValue] = useState("");
  const [inNumberValue, setInNumberValue] = useState("");
  const [inFilterValue, setInFilterValue] = useState("");
  const [filteredContact, setFilteredContact] = useState(contacts);
  const [message, setMessage] = useState({ content: null, type: null });

  //load contact at begining
  useEffect(() => {
    contactService.getAll().then((data) => setContacts(data));
  }, []);

  //Event handlers*****************

  //input name change
  const handleInChange = (e) => {
    setInValue(e.target.value);
  };

  // input number changed
  const handleNumberValue = (e) => setInNumberValue(e.target.value);

  //input filter changed
  const handleFilter = (e) => {
    const filterValue = e.target.value;

    if (filterValue === "") {
      contactService.getAll().then((allContact) => {
        setContacts(allContact);
        setFilteredContact(allContact);
      });
    } else {
      //creo nuevos contactos filtrados
      const newfilteredContact = contacts.filter(
        (contact) =>
          contact.name.slice(0, filterValue.length).toLowerCase() ===
          filterValue.toLowerCase()
      );
      setFilteredContact(newfilteredContact);
      setContacts(newfilteredContact);
    }
    setInFilterValue(filterValue);
  };

  //On deleting contact
  const onDelete = (e) => {
    const idToDelete = e.target.id;
    const confirmed = window.confirm(
      `Delete ${contacts.find((c) => c.id === idToDelete).name}' contact ?`
    );
    if (!confirmed) return;
    // console.log(e.target.id);
    contactService.deleteThis(idToDelete).then((contactDeleted) => {
      console.log(contactDeleted);
      setContacts(contacts.filter((cont) => cont.id !== contactDeleted.id));
      setMessage({
        content: `The contact has been erased sucessfully from the server`,
        type: "info",
      });
      setTimeout(() => {
        setMessage({ text: null });
      }, 4000);
    });
  };

  //on editing
  const onEdit = (e) => {
    console.log(e.target.id);
  };

  // on form submiting
  const handleOnSubmit = (e) => {
    e.preventDefault();
    //Validar que no este vacio los campos.
    if (inValue === "" || inNumberValue === "") {
      alert("Tiene que llenar todos los campos");

      return;
    }

    //Validar si existe ya un contacto con ese nombre.
    const exist = contacts.some(
      (contact) => contact.name.toLowerCase() === inValue.toLowerCase()
    );
    if (exist) {
      const update = window.confirm(
        `${inValue} already has a number registered,do you want to dou you want to replace it ?`
      );
      if (!update) return;
      //actualizando el numero de al contacto
      const contactToEdit = contacts.find(
        (c) => c.name.toLowerCase() === inValue.toLowerCase()
      );
      const newContact = { ...contactToEdit, number: inNumberValue };
      contactService.update(newContact.id, newContact).then((cont) => {
        console.log(cont)
        setContacts(contacts.map((c) => (c.id == cont.id ? cont : c)));
        setInValue("");
        setInNumberValue("");
        setMessage({
          content: `${cont.name}' number modificated sussecfuly`,
          type: "info",
        });
        setTimeout(() => {
          setMessage({ content: null });
        }, 4000);
      });
    } else {
      const newContact = {
        name: inValue,
        //el id lo genera el server por eso se omite
        // id: contacts.length + 1,
        number: inNumberValue,
      };

      //saving new contact to bd
      contactService.create(newContact).then((newReturneContact) => {
        setContacts(contacts.concat(newReturneContact));
        setInNumberValue("");
        setInValue("");
        setMessage({
          content: `${newReturneContact.name}' contacts saved succefully `,
          type: "info",
        });
        setTimeout(() => setMessage({ content: null }), 4000);
      });
    }
  };

  return (
    <>
      {/* titulo */}
      <h1>Phonebook</h1>
      <Notification message={message} />
      {/* filter */}
      <Filter value={inFilterValue} onChange={handleFilter} />

      <h2>Add new Contact</h2>

      <NewContact
        onSubmit={handleOnSubmit}
        inValue={inValue}
        handleInChange={handleInChange}
        inNumberValue={inNumberValue}
        handleNumberValue={handleNumberValue}
      />

      <h1>Contacts</h1>

      <Output contacts={contacts} onDelete={onDelete} onEdit={onEdit} />
    </>
  );
}

export default App;
