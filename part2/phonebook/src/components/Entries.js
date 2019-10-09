import React from 'react';
import Entry from './Entry';

const Entries = ({persons, del}) => persons.map(person => <Entry key={person.id} person={person} del={() => del(person.id)} />);

export default Entries;