import Person from "./Person.jsx";

const Persons = (props) => {
  return (
    <div>
      {props.filter
        ? props.list
            .filter((person) =>
              person.name
                .toLowerCase()
                .includes(props.filter.toLocaleLowerCase()),
            )
            .map((person) => <Person key={person.id} person={person} />)
        : props.list.map((person) => (
            <Person key={person.id} person={person} />
          ))}
    </div>
  );
};

export default Persons;
