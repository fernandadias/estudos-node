const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoscape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const checkAgeQueryParam = (req, res, next) => {
  const { age } = req.query

  if (!age) {
    return res.redirect('/')
  }

  return next()
};

app.get('/', (req, res) => {
  return res.render('age')
})

app.get('/major', (req, res) => {
  const { age } = req.query
  return res.render('major', { age })
})

app.get('/minor', (req, res) => {
  const { age } = req.query
  return res.render('minor', { age })
})

app.post('/check', (req, res) => {
  const age = req.body.age
  let status = age > 18 ? 'major' : 'minor';
  return res.redirect('/'.concat(status, '?age=', age))
})

app.listen(3000)
