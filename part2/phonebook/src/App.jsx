import { useState } from "react";
import { useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  // const [persons, setPersons] = useState([]);
  const [persons, setPersons] = useState([]);
  const [notificationColor, setNotificationColor] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [newMessage, setNewMessage] = useState(null);

  const addNewNameAndNumber = (event) => {
    event.preventDefault();
    let isAdded = false;
    let addedId = null;
    for (let person of persons) {
      if (person.name === newName) {
        isAdded = true;
        addedId = person.id;
        break;
      }
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (!isAdded) {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setNewMessage(null);
        }, 5000);
      });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        personService
          .update(addedId, personObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== addedId ? p : returnedPerson)),
            );
            setNotificationColor("green");
            setNewMessage(`Updated ${returnedPerson.name}`);
            setTimeout(() => {
              setNewMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setNotificationColor("red");
            setNewMessage(
              `Information of ${persons.find((p) => p.id == addedId).name} has already been removed for server`,
            );
            setTimeout(() => {
              setNewMessage(null);
            }, 5000);
          });
      }
    }
  };

  const handleDeletePerson = (id) => {
    personService.deletePerson(id).then(() => {
      setPersons(persons.filter((p) => p.id !== id));
    });
  };

  // const handleDeletePerson = (id) => {
  //   personService.deletePerson(id).then((returnedPerson) => {
  //     setPersons(persons.filter((person) => person.id !== returnedPerson.id));
  //   });
  // };

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} color={notificationColor} />
      <Filter handler={handleFilter} value={newFilter} />
      <h2>add a new</h2>
      <PersonForm
        formHandler={addNewNameAndNumber}
        nameHandler={handleNameChange}
        nameValue={newName}
        numberHandler={handleNumberChange}
        numberValue={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        filter={newFilter}
        list={persons}
        deletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
