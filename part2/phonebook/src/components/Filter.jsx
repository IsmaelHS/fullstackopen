const Filter = (props) => {
  return (
    <div>
      filter shown with: <input onChange={props.handler} value={props.value} />
    </div>
  );
};
export default Filter;
