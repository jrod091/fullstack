import React from 'react';

const NewPersonForm = (props) =>  {
    return (
        <form onSubmit={props.addPerson}>
        <div>
            name: <input
            value={props.newName}
            onChange={props.onNameChange} 
            />
        </div>
        <div>
            number: <input
            value={props.newNumber}
            onChange={props.onNumberChange}
            />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
        </form>
    );
}

export default NewPersonForm;