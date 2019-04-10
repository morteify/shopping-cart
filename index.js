const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const cors = require('cors');
app.use(cors());

const apiRoutes = require('./api-routes');

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(bodyParser.json());

//process.env.MONGOLAB_URI 
const dbURI =
	'mongodb://mweglarz:jadlbymkapuste88@ds125125.mlab.com:25125/shopping-cart';
mongoose.connect(dbURI, { useNewUrlParser: true }, err => {
	if (err) {
		console.log('Some problem with the connection ' + err);
	} else {
		console.log('The Mongoose connection is ready');
	}
});
let db = mongoose.connection;
app.use(express.static(path.join(__dirname, 'client/build')));

let port = process.env.PORT || 5000;
app.get('/', (req, res) => {
	res.send('This is the entry point for backend of shopping cart');
});

app.use('/api', apiRoutes);

app.listen(port, () => {
	console.log(`Running on port ${port}`);
});
