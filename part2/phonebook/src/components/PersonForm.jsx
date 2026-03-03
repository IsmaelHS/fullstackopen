const PersonForm = (props) => {
  return (
    <form onSubmit={props.formHandler}>
      <div>
        name:
        <input onChange={props.nameHandler} value={props.nameValue} />
      </div>
      <div>
        number:
        <input onChange={props.numberHandler} value={props.numberValue} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default PersonForm;
