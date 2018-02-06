require('babel-core/register')
require('babel-polyfill')
const express = require('express')
const next = require('next')
const { parse } = require('url')
const isDev = process.env.NODE_ENV === 'develop'
const app = next({ dir: './client', dev: isDev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000
const server = express()
const db = require('./server/models/')
const apis = require('./server/apis')
const errorHandlers = require('./server/errorHandlers')
const middlewares = require('./server/middlewares')
global.db = db;

app.prepare().then(() => {

  server.use(middlewares(server));

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
