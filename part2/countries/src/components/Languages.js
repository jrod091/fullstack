import React from 'react';

const Languages = ({langs}) => langs.map(lang => <li key={lang.name}>{lang.name}</li>);

export default Languages;