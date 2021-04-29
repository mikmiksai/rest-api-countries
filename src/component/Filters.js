const Filter = ({ searchFilter, optionFilter }) => {
  return (
    <div className="filters">
      <input
        type="text"
        onChange={searchFilter}
        placeholder="Search for a country..."
        aria-label="filter-input"
        className="form-control"
      />
      <select onChange={optionFilter} aria-label="filter-select" className="form-control">
        <option value="All">All</option>
        <option value="Europe">Europe</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Oceania">Oceania</option>
        <option value="Asia">Asia</option>
      </select>
    </div>
  );
};
export default Filter;
