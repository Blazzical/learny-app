// server.js

// modules
var express			= require('express');
var app 			= express();
var bodyParser 		= require('body-parser');
var methodOverride 	= require('method-override');
var mongoose		= require('mongoose');
var Wordy			= require('./app/models/wordy');


// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 8080;


// connect to our mongoDB database
 mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. Simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
// on routes that end in /wordys
// ----------------------------------------------------
router.route('/wordys')

    // create a wordy (accessed at POST http://localhost:8080/api/wordys)
    .post(function(req, res) {
        
        var wordy = new Wordy();      // create a new instance of the Wordy model
        wordy.actualword = req.body.actualword;  // set the wordys actualword (comes from the request)
        wordy.submittedword = req.body.submittedword;  // set the wordys actualword (comes from the request)
        wordy.timetaken = req.body.timetaken;  // set the wordys actualword (comes from the request)

        // save the wordy and check for errors
        wordy.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Wordy created!' });
			console.log(wordy.actualword + ' | ' + wordy.submittedword + ' | ' + wordy.timetaken);
        });
        
    })
	
	// get all the wordys (accessed at GET http://localhost:8080/api/wordys)
    .get(function(req, res) {
        Wordy.find(function(err, wordys) {
            if (err)
                res.send(err);

            res.json(wordys);
        });
    });

// on routes that end in /bears/:wordy_id
// ----------------------------------------------------
router.route('/wordys/:wordy_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/wordys/:wordy_id)
    .get(function(req, res) {
        Wordy.findById(req.params.wordy_id, function(err, wordy) {
            if (err)
                res.send(err);
            res.json(wordy);
        });
    })
	 // update the wordy with this id (accessed at PUT http://localhost:8080/api/wordys/:wordy_id)
    .put(function(req, res) {

        // use our wordy model to find the wordy we want
        Wordy.findById(req.params.wordy_id, function(err, wordy) {

            if (err)
                res.send(err);

			wordy.actualword = req.body.actualword;  // set the wordys actualword (comes from the request)
			wordy.submittedword = req.body.submittedword;  // set the wordys actualword (comes from the request)
			wordy.timetaken = req.body.timetaken;  // set the wordys actualword (comes from the request)

            // save the wordy
            wordy.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Wordy updated!' });
            });

        });
    })
	
	// delete the wordy with this id (accessed at DELETE http://localhost:8080/api/wordys/:wordy_id)
    .delete(function(req, res) {
        Wordy.remove({
            _id: req.params.wordy_id
        }, function(err, wordy) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// routes
require('./app/routes')(app); // configure our routes

// start app
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;