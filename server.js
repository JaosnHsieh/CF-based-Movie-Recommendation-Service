require('babel-core/register')
require('babel-polyfill')
const express = require('express')
const cookieSession = require('cookie-session')
const next = require('next')
const { parse } = require('url')
const bodyParser = require('body-parser') // turns the body into json object
const isDev = process.env.NODE_ENV === 'develop'
const app = next({ dev: isDev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000
const server = express()
const db = require('./models/')
const apis = require('./server/apis')
const errorHandlers = require('./server/errorHandlers')
const isAuthenticated = require('./server/middlewares/isAuthenticated')
global.db = db;

app.prepare().then(() => {
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: false }));
  server.set('trust proxy', 1) // trust first proxy

  server.use(cookieSession({
    name: 'session',
    keys: ['Movie-Recommendation']
  }))

  server.use(apis(server))

  server.use(errorHandlers(server));

  server.get('*', (req, res) => {
    return handle(req, res)
  })


  server.listen(port, err => {
    if (err) throw err
    console.log('> Ready on: ' + port + ' using express')
  })
})
