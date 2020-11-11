const express = require('express');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./models/Survey');
require('./services/passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { dirname } = require('path');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //lasts 30 days
    keys: [keys.cookieKey]
}))

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file or main.css file 
    app.use(express.static('client/build'));

    //Express will serve
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })

}

const PORT = process.env.PORT || 5000;
app.listen(PORT);