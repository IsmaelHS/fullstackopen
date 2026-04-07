import Delete from "./Delete.jsx";

const Person = ({ person, deletePerson }) => {
  const handleDeletePerson = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson(person.id);
    }
  };

  return (
    <p>
      {person.name} {person.number} <Delete handler={handleDeletePerson} />
    </p>
  );
};
export default Person;
