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
      .toLowerCase()
      .includes(countryName.toLowerCase()))

  return (
    <div>
      <h1>Find Countries</h1>
      <input value={countryName}
        onChange={countryNameHandler} />

      <DisplayCountries
        countries={countriesToShow}
        setCountry={setCountryName}
      />
    </div>
  )

}

const DisplayCountries = ({ countries, setCountry }) => {
  if (countries.length > 10) {
    return (
      <p>Too many Countries, specify another filter</p>
    )
  }

  if (countries.length == 1) {
    const country = countries[0]

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
    <table>
      <tbody>
        {countries.map(country =>
          <tr>
            <td key={country.id}>
              {country.name.common}
            </td>
            <td>
              <button onClick={() => setCountry(country.name.common)}>
                show
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default App
