import React, { useState, useEffect } from 'react';
import Message from './components/Message';
import Filter from './components/Filter';
import NewPersonForm from './components/NewPersonForm';
import Entries from './components/Entries';
import personService from './services/persons';

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('Add new name...');
  const [ newNumber, setNewNumber ] = useState('Add new number...');
  const [ newFilter, setFilter ] = useState('');
  const [ showAll, setShowAll ] = useState(true);
  const [ message, setMessage ] = useState(null);
  const [ messageType, setMessageType ] = useState('success');

  const filterRows = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()));

  const personsHook = () => {
    personService
      .getAll()
      .then(initPersons => {
      setPersons(initPersons);
    });
  };

  useEffect(personsHook,[]);

  const addPerson = (event) => {
    event.preventDefault();
    
    if(persons.map(person => person.name.toLowerCase()).indexOf(newName.toLowerCase()) < 0) {
      const newPerson = {
        name: newName,
        number: newNumber
      };

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));

          setMessageType('success');
          setMessage(`Added ${newName}`);
          setTimeout(() => setMessage(null),5000);
        });
    } else {
      const updatedPerson = persons.find(p => p.name === newName);
      let result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);

      if (result) {
        const updatePerson = {
          name: newName,
          number: newNumber
        };

        personService
          .update(updatedPerson.id,updatePerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person : returnedPerson));

            setMessageType('success');
            setMessage(`Updated ${newName} with ${newNumber}`);
            setTimeout(() => setMessage(null),5000);
          })
          .catch(error => {
            setMessageType('error');
            setMessage(`Information for ${newName} has already been removed from the server`);
            setTimeout(() => setMessage(null),5000);
            setPersons(persons.filter(person => person.name !== newName));
          });
      }
    }
    
    setNewName('');
    setNewNumber('');
    setFilter('');
    setShowAll(true);
  }

  const handleNameChange = (event) => setNewName(event.target.value);
  
  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleFilterChange = (event) => {
    let filterString = event.target.value;
    setFilter(filterString);
    
    (filterString === '') ? setShowAll(true) : setShowAll(false);
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);
    let result = window.confirm(`Delete ${person.name}?`);
    
    if(result) {
      personService
        .deleteP(id)
        .then(() => {
          setMessageType('success');
          setMessage(`Deleted ${person.name}`);
          setTimeout(() => setMessage(null),5000);
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Message message={message} className={messageType}/>

      <Filter value={newFilter} onChange={handleFilterChange} />

      <h3>add a new</h3>

      <NewPersonForm addPerson={addPerson} newName={newName} onNameChange={handleNameChange} newNumber={newNumber} onNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      
      <Entries persons={filterRows} del={deletePerson}/>
    </div>
  );
}

export default App;