import PropTypes from "prop-types";
import {useEffect, useState} from "react";

function Searcher({ value, placeholder, onChange, name = 'searcher' }) {
  const [searcherValue, setSearcherValue] = useState('')
  const handleChange = e => {
    if (onChange) {
      onChange({text: e.target.value})
    }
  };
  useEffect(() => {
    setSearcherValue(value)
  }, [value])
  return (
    <input name={name} value={searcherValue} placeholder={placeholder} className="u-full-width" type="search" onChange={handleChange}/>
  )

}

Searcher.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string
};

export default Searcher
