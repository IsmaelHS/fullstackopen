import Person from "./Person.jsx";

const Persons = (props) => {
  const filteredList = props.filter
    ? props.list.filter((person) =>
        person.name.toLowerCase().includes(props.filter.toLowerCase()),
      )
    : props.list;

  return (
    <div>
      {filteredList.map((person) => (
        <Person
          key={person.id}
          person={person}
          deletePerson={props.deletePerson}
        />
      ))}
    </div>
  );
};

export default Persons;
