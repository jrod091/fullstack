import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Search from './components/Search';
import Results from './components/Results';

const App = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [weather, setWeather] = useState({});

  const resultsToShow = showAll ? results : results.filter(result => result.name.toLowerCase().includes(search.toLowerCase()));

  const cityForWeather = (resultsToShow.length === 1) ? resultsToShow[0].capital : '';

  const countryHook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all/')
      .then(response => setResults(response.data));
  }

  useEffect(countryHook,[]);

  const handleSearchChange = (event) => {
    let searchString = event.target.value;
    setSearch(searchString);
    (search === '') ? setShowAll(true) : setShowAll(false);
  }

  const weatherHook = () => {
      axios
        .get('http://api.weatherstack.com/current?access_key=6958b75f89314b56a33301fe3a39d8ef&query='+cityForWeather+'&units=f')
        .then(response => setWeather(response.data));
  }

  useEffect(weatherHook,[cityForWeather]); console.log(weather);

  return (
    <div>
      <Search value={search} onChange={handleSearchChange} />
      <Results results={resultsToShow} set={setSearch} weather={weather} />
    </div>
  );
}

export default App;
