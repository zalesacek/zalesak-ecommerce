import express from 'express';
import bodyParser from 'body-parser';
import indexRoutes from './routes/index';
import authRoutes from './routes/auth';
import usersRoutes from './routes/users';
import connectDb from './config/db.js';

const app: express.Application = express();

connectDb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');    
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
});

app.use('/api/shop', indexRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

app.listen(3000, () => {
    console.log('App is listening on port 3000');
});