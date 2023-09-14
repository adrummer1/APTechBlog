const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {maxAge: 24 * 60 * 60 * 1000,},
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({ db: sequelize })
};

app.use(session(sess));

const hbs = exphbs.create({
    helpers: {
        format_date: date => {
            if (!(date instanceof Date)) {
                console.error('Invalid date:', date);
                return 'Invalid date';
            }
            console.log('Date:', date);
            return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(require('./controllers'));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});



