const mongoose = require('mongoose')
mongoose
    .connect('mongodb://localhost:27017/movieApp')
    .then(() => {
        console.log('CONNECTION OPEN!')
    })
    .catch((err) => {
        console.log('ERROR')
        console.log(err)
    })

const movieSchema = {
    title: String,
    year: Number,
    score: Number,
    rating: String,
}

const Movie = mongoose.model('Movie', movieSchema)

const batman = new Movie({
    title: 'batman',
    year: 2022,
    score: 9.2,
    rating: 'PG13',
})
