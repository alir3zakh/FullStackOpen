import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryName, setCountryName] = useState('iran')

  const openWeatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?q=dallas
&appid=c4e857e2e633494bbff6f8f0cf39bdb4`

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

        <h3>{country.capital}'s Weather</h3>
        <Weather city={country.capital} />
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

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({})
  const openWeatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric
&appid=c4e857e2e633494bbff6f8f0cf39bdb4`


  useEffect(() => {
    axios.get(openWeatherAPIURL)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  // debugger;
  let weatherIconURL;

  return (
    <div id="weather-info">
      <p>Temperature {weather?.main?.temp} Celcius</p>
      {/* <img src={weather?.weather?.icon} alt=":("/> */}
      <p>Wind {weather?.wind?.speed} m/s</p>
    </div>
  )
}

export default App
