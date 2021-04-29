const CountryItem = ({ data }) => {
  const { flag, name, population, region, capital  } = data;
  return (
    <div className="country-wrapper">
      <img src={flag} alt={`${name}-flag`} />
      <div className="content">
        <p className="title">{name}</p>
        <p><span>Population:</span> {population}</p>
        <p><span>Region:</span> {`${region ? region : "None"}`}</p>
        <p><span>Capital:</span> {`${capital ? capital : "None"}`}</p>
      </div>
    </div>
  );
};

export default CountryItem;
