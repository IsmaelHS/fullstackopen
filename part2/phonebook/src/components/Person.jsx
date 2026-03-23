import Delete from "./Delete.jsx";

const Person = ({ person, setPersons, deletePerson }) => {
  const handleDeletePerson = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson(person.id).then((returnedPerson) => {
        setPersons(persons.filter((person) => person.id !== returnedPerson.id));
      });
    }
  };

  return (
    <p>
      {person.name} {person.number} <Delete handler={handleDeletePerson} />
    </p>
  );
};
export default Person;
