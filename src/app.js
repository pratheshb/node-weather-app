const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCods = require('./utils/geoCods');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;
// set handle bar as view engine and set views path
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials');
const publicDirectoryPath = path.join(__dirname, '../public');

// set view engine and views directory path
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);

// set Public Directory Path
app.use(express.static(publicDirectoryPath));

hbs.registerPartials(partialsDirectoryPath);

app.get('', (req, res) => {
  res.render('index', { title: 'Weather App', name: 'Prathesh B' });
});

app.get('/help', (req, res) => {
  res.render('help', { title: 'Help', name: 'Prathesh B' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', name: 'Prathesh B' });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      data: 'Please provide valid address to get forecast.',
      name: 'Prathesh B'
    });
  }

  geoCods.getGeoCoords(req.query.address, (error, {location,latitude, longtitude } = {}) => {
    if (error) {
      res.send( {
        data: error,
        location: req.query.address,
      name: 'Prathesh B'
      });
      return console.log(error);
    }

    forecast.getWether(latitude, longtitude, (error, forecastData) => {
      if (error) {
       console.log(error);
      }
      res.send( {
        data: forecastData,
        location,
      name: 'Prathesh B'
      });
    });
  });
});


app.get('/help/*', (req, res) => {
  res.render('404-page', {
    title: '404',
    name: 'Prathesh B',
    msg: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404-page', {
    title: '404',
    name: 'Prathesh B',
    msg: 'Page not found',
  });
});

app.listen(port, () => console.log('Server running in port '+ port));
