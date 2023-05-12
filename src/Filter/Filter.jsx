export default function Filter({ filter, changeFilter }) {
  return (
    <>
      <input type="text" name="filter" value={filter} onChange={changeFilter}></input>
    </>
  );
}
