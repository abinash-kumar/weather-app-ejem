import React, { Component } from 'react';
import 'whatwg-fetch';
import './style.scss'


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: null
    };

    this.handleCityChange = this.handleCityChange.bind(this);
    this.getCityWeather = this.getCityWeather.bind(this);

  }

  componentDidMount(){
    this.getCityWeather('delhi');
  }

  handleCityChange(e){
    const city = e.target.value;
    console
    this.getCityWeather(city);
  }

  getCityWeather(city){
    fetch(`/api/weather?location=${city}`)
    .then(res => res.json())
    .then(json => {
      this.setState({
        weather: json
      });
    });
  }

   createMarkup(data) {
    var string = data;
    var data = unescape(string).replace(/BR/gi, "br")
    var finalDAta = data.substring(9, data.length -3);
    return finalDAta;
  }

  getDirection(angle) {
    var directions = ['North', 'North-West', 'West', 'South-West', 'South', 'South-East', 'East', 'North-East'];
    return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8];
  }

  render() {
    const { weather } = this.state;
    console.log(weather, 'weatherweatherweather')

    return (
      <div className="weather-app">
        {weather &&
        <div className="app-container">
          <header key={'header'}>
            <p>Select city to get the weather report</p>
            <select className="styled-select" onChange={this.handleCityChange}>
              <option value="delhi">Delhi</option>
              <option value="mumbai">mumbai</option>
              <option value="chicago">Chicago</option>
              
            </select>
          </header>
          <article key={'article'}>
            <p>{weather.rss.channel.lastBuildDate._text}</p>
            <h1>{weather.rss.channel.title._text}</h1>
            <div className="weather-details">
              <table>
                <tbody>
                <tr>
                  <td>Temperature</td>
                  <td>
                  <span>{weather.rss.channel.item['yweather:condition']._attributes.temp}
                    <sup>{weather.rss.channel['yweather:units']._attributes.temperature}</sup>
                  </span>
                  </td>
                </tr>
                <tr>
                  <td>Wind</td>
                  <td>
                  <p>
                    <span>{weather.rss.channel['yweather:wind']._attributes.speed}</span> &nbsp;
                    <span>{weather.rss.channel['yweather:units']._attributes.speed}</span> <br />
                    <span>Direction : {this.getDirection(weather.rss.channel['yweather:wind']._attributes.direction)}</span>
                  </p>
                  </td>
                </tr>
                <tr>
                  <td>Atmosphere</td>
                  <td>
                  <p>
                    <span>Humidity : {weather.rss.channel['yweather:atmosphere']._attributes.humidity} %</span> <br />
                    <span>Pressure : {weather.rss.channel['yweather:atmosphere']._attributes.pressure}</span> &nbsp;
                    <span>{weather.rss.channel['yweather:units']._attributes.pressure}</span> <br />
                    <span>Visibility : {weather.rss.channel['yweather:atmosphere']._attributes.visibility}</span> &nbsp;
                    <span>{weather.rss.channel['yweather:units']._attributes.distance}</span>
                  </p>
                  </td>
                </tr>
                <tr>
                  <td>Astronomy</td>
                  <td>
                  <p>
                    <span>Sunrise : {weather.rss.channel['yweather:astronomy']._attributes.sunrise}</span> <br />
                    <span>Sunset : {weather.rss.channel['yweather:astronomy']._attributes.sunset}</span> <br />
                  </p>
                  </td>
                </tr>
                </tbody>
              </table>

            </div>
            <div className="description">
              <div className="description-container"  dangerouslySetInnerHTML={{__html: this.createMarkup(weather.rss.channel.item.description._text)}} />
            </div>
          </article>
        </div>}
        {!weather && <center><h3>Weather app is loading...</h3></center>}
      </div>
    );
  }
}

export default Home;
