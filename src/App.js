import React,{ Fragment, useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // Essa setLocation, está sendo dita assim, só vou mostrar o clima se você me informa a sua localização.
  const [location, setLocation ] = useState(false);
  // Guarda os dados que vindo API
  const [weather, setWeather] = useState(false);

  //chamando API e passando os valores para ser buscando na URL.
  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather",{
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
    console.log(res.data)
  }

  // Buscando a logitude e latitude da localização da pessoa conforme o browser buscar.
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      //console.log(position.coords.latitude, position.coords.longitude);
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    })
  }, [])

  // Mensagem caso não aceitei ser localizado.
  if(location === false) {
    return(
      <Fragment>
        Você precisa habilitar a sua localização no browser
      </Fragment>
    )}
    else if (weather === false ){
      return (
        <Fragment>
          Carregando o clima...
        </Fragment>
      )
    } else {
        return (
          <Fragment>
            <h3>Clima nas suas Coordenads ({weather['weather'][0]['description']})</h3>
            <hr/>
            <ul>
              <li>Temperatura atual: {weather['main']['temp']}º</li>
              <li>Temperatura Maxima: {weather['main']['temp_max']}º</li>
              <li>Temperatura Minima: {weather['main']['temp_min']}º</li>
              <li>Pressão: {weather['main']['pressure']} hpa</li>
              <li>Umidaed: {weather['main']['humidity']}%</li>
            </ul>
          </Fragment>
      );
    }  
}

export default App;
