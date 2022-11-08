import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryName, setCountryName] = useState('swi')

  //Fetching coutries data from 'restouries.com'
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(responce => {
        setCountries(responce.data)
    })
  }, [])

  //Event Handlers
  const countryNameHandler = (event) => {
    setCountryName(event.target.value)
  }

  // Variable & other functions
  const countriesToShow = countries
    .filter(country => (country.name.common)
      .toLowerCase().includes(countryName))

  return (
    <div>
      <p>find countries</p>
      <input value={countryName}
        onChange={countryNameHandler} />

      <DisplayCountries countries={countriesToShow} />
    </div>
  )

}

const DisplayCountries = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <p>Too many Countries, specify another filter</p>
    )
  }

  if (countries.length == 1) {
    const country = countries[0]
    console.log(country);
    return (
      <div id="country">
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>

        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map(
            lang => <li>{lang}</li>
          )}
        </ul>

        <img src={country.flags.png} width='150px' />
      </div>
    )
  }

  return (
    <ul>
      {countries.map(country =>
        <li key={country.id}>{country.name.common}</li>
      )}
    </ul>
  )
}

export default App
