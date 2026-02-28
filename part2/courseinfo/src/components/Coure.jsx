const Course = (props) => {
  return (
    <>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
    </>
  );
};
const Header = (props) => {
  return <h2>{props.course.name}</h2>;
};
const Content = (props) => {
  return props.course.parts.map((part) => (
    <Part key={part.id} name={part.name} exercises={part.exercises} />
  ));
};
const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};
const Total = (props) => {
  const total = props.course.parts.reduce((acc, part) => {
    return acc + part.exercises;
  }, 0);
  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  );
};
export default Course;
