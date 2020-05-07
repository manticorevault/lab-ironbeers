const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
    punkAPI
        .getBeers()
        .then((beersApi) => {
            // this will create the keys that will be accessed in the beers.hbs
            res.render('beers', { beers: beersApi });
        })
        .catch(error => console.log(error))
});

app.get('/random-beer', (req, res) => {
    punkAPI
        .getRandom()
        .then((randomBeerFromApi) => {
            res.render('random_beer', {randomBeer: randomBeerFromApi[0] });
        })
        .catch(error => console.log(error));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
