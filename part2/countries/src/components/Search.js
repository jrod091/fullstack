import React from 'react';

const Search = ({value,onChange}) =>
<p>
  find countries <input
    value={value}
    onChange={onChange}
  />
</p>

export default Search;