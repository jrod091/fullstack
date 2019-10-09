import React from 'react';

const Entry = ({person,del}) => <p>{person.name} {person.number} <button onClick={del}>Delete</button></p>

export default Entry;