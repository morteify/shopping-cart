const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	brand: {
		type: String,
		required: true,
	},
	processor: {
		type: String,
	},
	memory: Number,
	storage: {
		type: String,
	},
	graphics: {
		type: String,
	},
	screen: String,

	os: {
		type: String,
	},
	price: {
		type: Number,
	},
	photo: String,
	screenSize: Number,
});

let Product = (module.exports = mongoose.model('product', productSchema));

module.exports.get = (callback, limit) => {
	Product.find(callback).limit(limit);
};
