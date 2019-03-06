import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import Result from './Result';

const APIKey = '92a9c0e0acfb8bb2bb291d2965da851b';

class App extends Component {

  state = {
    value: '',
    date: '',
    city: '',
    sunrise: '',
    sunset: '',
    temp: '',
    pressure: '',
    wind: '',
    clouds: '',
    err: false,
  }

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  handleCitySubmit = e => {
    e.preventDefault();
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;

    fetch(API)
      .then(response => {
        if (response.ok) {
          return response
        }
        throw Error("Nie udało się!")
      })
      .then(response => response.json())
      .then(data => {
        const weather = data.weather;
        const currentWeather = weather.map(item => <p key={item.id}>{item.main}: {item.description}</p>);
        const time = new Date().toLocaleString();
        this.setState(prevState => ({
          err: false,
          date: time,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: data.main.temp,
          pressure: data.main.pressure,
          wind: data.wind.speed,
          clouds: data.clouds.all,
          city: prevState.value,
          weather: currentWeather,
        }))
      })
      .catch(err => {
        console.log(err)
        this.setState(prevState => ({
          err: true,
          city: prevState.value,
        }))
      })
  }


  render() {
    return (
      <div className="App">
        <Form value={this.state.value} change={this.handleInputChange} submit={this.handleCitySubmit} />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
