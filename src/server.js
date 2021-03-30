'use strict';

// Dependincies
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

// Middlewares
const logger = require('./middleware/logger.js');

// routes
const clothesRouter = require('./routes/clothes.js');
const moviesRouter = require('./routes/movies.js');

// Error handlers
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');

// Parsing json
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Global middleware
app.use(logger);

// Routes definitions
app.get('/', homeHandler);
app.use('/api/v1/clothes/', clothesRouter);
app.use('/api/v1/movies/', moviesRouter);
// Error handlers
app.use('*', notFoundHandler);
app.use(errorHandler);

// Routes functions
function homeHandler(req, res) {
  res.send('Home Page');
}

module.exports = {
  app: app,
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}/`);
    });
  },
};
