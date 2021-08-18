require('./config/mongooseConnect');
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'script-src': ["'self'", "'unsafe-inline'"],
      },
    },
  })
);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(cookieParser());

const authRoute = require('./routes/auth');
const projectRoute = require('./routes/project');
const timeRecordRoute = require('./routes/timeRecord');
const participantRoute = require('./routes/participant');

app.use('/auth', authRoute);
app.use('/project', projectRoute);
app.use('/time-record', timeRecordRoute);
app.use('/participant', participantRoute);

app.use((err, req, res, next) => {
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    return res
      .status(409)
      .json({ error: { [field]: `${value} already exists.` } });
  }
  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  res.status(500).json({ error: 'Something went wrong, please try it later.' });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '..', 'frontend', 'build', 'index.html')
    );
  });
}

app.listen(process.env.PORT);
