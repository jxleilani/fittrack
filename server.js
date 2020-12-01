const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const db = require('./models');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
  useNewUrlParser: true,
  useFindAndModify: false
});

//HTML Routes
app.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'exercise.html'));
});

//API Routes
app.get('/api/workouts', (req, res) => {
  db.Workout.find({})
  .then(dbWorkout => res.json(dbWorkout))
  .catch(err => {
    res.status(400).json(err);
  });
});

app.post('/api/workouts/', (req, res) => {
  db.Workout.create(req.body)
  .then(dbWorkout => {
    res.json(dbWorkout)
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

//Server listening
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
