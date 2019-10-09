import React from 'react';
import Languages from './Languages';

const ShowResult = ({result}) => {
    return (
      <>
        <h2>{result.name}</h2>
        <p>Capital: {result.capital}</p>
        <p>Population: {result.population}</p>
        <h3>Languages</h3>
        <Languages langs={result.languages} />
        <img src={result.flag} alt="flag" width="200" height="100"/>
      </>
    );
  }

export default ShowResult;