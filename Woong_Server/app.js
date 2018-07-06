const express = require('express')

const app = express()
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')

// const options = require('./swagger/swaggerSpec.js')
<<<<<<< HEAD
const index = require('./src/routes/index')
=======
<<<<<<< .merge_file_EKM7mv
const index = require('./src/routes') // 재현수정
=======
const index = require('./src/routes/index.js') // 재현수정
>>>>>>> .merge_file_JjX5cW
>>>>>>> 5aece8ac7db12717a1acbaef2e462dd597fac14c

const swaggerDefinition = {
  info: { // API informations (required)
    title: 'Hello World', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'A sample API', // Description (optional)
  },
  host: 'localhost:3000', // Host (optional)
  basePath: '/', // Base path (optional)
}

const options = {
  // Import swaggerDefinitions
  swaggerDefinition,
  // Path to the API docs
  apis: ['./swagger/woong_api.yml'],
}

const swaggerSpec = swaggerJSDoc(options)


// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
console.log('asd')
app.use('/', index)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
