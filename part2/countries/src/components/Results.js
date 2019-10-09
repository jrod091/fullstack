import React from 'react';
import ShowResult from './ShowResult';
import Weather from './Weather';

const Results = ({results,set,weather}) => {
  let numResults = results.length;
  if(numResults === 0) {
    return (
      <p>no results found</p>
    );
  } else if (numResults === 1) { console.log(weather);
    if ("location" in weather) {
      return (
        <>
          <ShowResult result={results[0]} />
          <Weather weather={weather} />
        </>
      );
    } else {
      return (
        <>
          <ShowResult result={results[0]} />
        </>
      );
    }
  } else if (numResults > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    );
  } else {
    return (
      results.map(result => {
        const setSearch = () => set(result.name);
        return (
          <p key={result.name}>{result.name} <button onClick={setSearch}>show</button></p>
        );
      })
    );
  }
}

export default Results;