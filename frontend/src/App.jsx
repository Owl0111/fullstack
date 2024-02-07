import { useEffect, useState } from "react";
import Filter from "./Filter";
import Notification from "./Notification";
import Item from "./Item";
import personService from "./personService";
import PersonForm from "./PersonForm";
import axios from "axios";
const App = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNumber] = useState("");
  const [displayList, setDisplayList] = useState(persons);
  const [filter, setFilter] = useState("");
  const handleMessage = (message, type) => {
    setMessage(message);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
      console.log("eep");
    }, 2000);
  }
  const hook = () => {
    personService.getAll().then(personlist => {
      console.log(personlist);
      setPersons(personlist);
      setDisplayList(personlist);
    });

  };
  useEffect(hook, []);
  const ifExist = (name) => {

    for (let person of persons) {
      if (name === person.name) return person.id;
    }
    return false;
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };
  const filterByName = (event) => {
    setFilter(event.target.value);
    const newArray = persons.filter((person) => {
      return person.name.toLowerCase().includes(filter);
    });
    setDisplayList(newArray);
  };
  const deletePerson = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name} ?`)) {
      personService.deletePerson(id);
      console.log(persons);
      const newArray = persons.filter(person => {
        return person.id != id;
      })

      setPersons(newArray);
      setDisplayList(newArray);

    }

  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      // id: persons[persons.length - 1].id + 1,
      number: newNumber,
    };
    if (ifExist(newPerson.name)) {

      let id = ifExist(newPerson.name);

      personService.update(id, newPerson).then(data => {
        console.log(data);

        const newList = persons.map(person => {
          if (person.id == data.id)
            return data;
          return person;
        });
        setPersons(newList);
        setDisplayList(newList);
        handleMessage(`${data.name} has been updated.`, 'add');

      }).catch(error => {
        console.log(error)
        alert("Oops something just went wrong");
      });

      setNewName("");

      return;
    };
    personService.create(newPerson).then(response => {
      setPersons([...persons, response]);
      setDisplayList([...persons, response]);
      handleMessage(`${response.name} has been added.`, 'add');
    })

    setNewName("");
    setNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filterState={filter} filterFunction={filterByName}></Filter>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit} newName={newName} newNumber={newNumber}></PersonForm>
      <h2>Numbers</h2>
      <ul>
        {displayList.map((info) => {
          return (
            <Item key={info.id} person={info} deletePerson={() => { deletePerson(info.id, info.name) }} ></Item>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
