import React, { useReducer , createContext }from 'react'
import countries_list from '../data/countries-list.json'

   // const [country, setCountry] = useState({
   //   name: "Afghanistan",
   //   capital: "Kabul",
   //   region: "Asia",
   //   alpha2Code: "AF",
   //   flag: "https://restcountries.eu/data/afg.svg",
   // });
   // console.log(countries)

export const CountriesContext = createContext('contextCountries');

const Reducer = (state, action) => {
   switch (action.type) {
      case 'name': {
         const objSelect = state.find(
            (country) => country["name"] === action.payLoad
         );
         return [objSelect];
      }
      case 'region': {
         const CountriesSelect = state.filter(
            (country) => country["region"] === action.payLoad
         );
         return [...CountriesSelect];
      }
      case 'reset': return countries_list;
      default: return state
   }
}

// custom provide component
const CountriesSelect = ({ children }) => {

   const [countries, dispatch] = useReducer(Reducer , countries_list);

   function handleSelect(name,value) {
      dispatch({type: name , payLoad: value})
   };
   
   const contexts = React.useMemo(() =>
   ({
      handleSelect,
      dispatch,
      countries, countries_list
   }), [countries]);
   
   return (
     <CountriesContext.Provider value={contexts}>
       {children}
     </CountriesContext.Provider>
   );
}

export default CountriesSelect
