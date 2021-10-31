import React, { useState ,useEffect, useContext} from 'react'
import Select from "react-select";
import { CountriesContext } from "../../../contexts/CountriesSelect";
 
// const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  // ];

export const DropList = ({ name }) => {
  const { countries, dispatch, handleSelect } = useContext(CountriesContext);
  
  const [options, setOptions] = useState(optionsList(name, countries));

  function optionsList(name, countries) {
    const unique = [...new Set(countries.map((obj) => obj[name]))];
    return unique.map((str) => {
      return { value: str, label: str };
    });
  };

  // value = {value:'', label:''}
  function onChange(value, { action, name }) {
    switch (action) {
      case "select-option":
        return handleSelect(name, value.value);
      case "clear":
        dispatch({ type: 'reset' });
        options.forEach((vl) => (value = vl));
    }
  }

  useEffect(() => {
    setOptions([...optionsList(name, countries)]);
  }, [countries]);

  console.log(countries, name, options);
  return (
    <div className="mr-2 mb-2" key={name}>
      <label className="ml-1 mb-2 text-l font-sans text-gray-400">
        {name.UpperFirstLetter()}
      </label>
      <Select
        className="mr-2 my-2 shadow-md font-sans text-sm font-extralight"
        name={name}
        isClearable
        blurInputOnSelect
        options={options}
        onChange={onChange}
      />
    </div>
  );
};
