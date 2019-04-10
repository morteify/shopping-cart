Product = require('./productModel');

exports.index = (req, res) => {
	Product.get((err, products) => {
		if (err) {
			res.json({
				status: 'error',
				message: error,
			});
		}
		res.json({
			status: 'success',
			message: 'Products retrieved successfully',
			data: products,
		});
	});
};

exports.new = (req, res) => {
	let product = new Product();
	product.name = req.body.name ? req.body.name : product.name;
	product.brand = req.body.brand;
	product.processor = req.body.processor;
	product.storage = req.body.storage;
	product.graphics = req.body.graphics;
	product.screen = req.body.screen;
	product.screenSize = req.body.screenSize;
	product.os = req.body.os;
	product.price = req.body.price;
	product.photo = req.body.photo;

	product.save(err => {
		if (err) res.json(err);
		res.json({
			message: 'New product added!',
			data: product,
		});
	});
};

exports.view = (req, res) => {
	Product.findById(req.params.product_id, (error, product) => {
		if (error) {
			es.send(error);
		}
		res.json({
			message: 'Product details loading...',
			data: product,
		});
	});
};

exports.update = (req, res) => {
	Product.findById(req.params.product_id, (err, product) => {
		if (err) res.send(err);
		product.name = req.body.name ? req.body.name : product.name;
		product.brand = req.body.brand;
		product.processor = req.body.processor;
		product.memory = req.body.memory;
		product.storage = req.body.storage;
		product.graphics = req.body.graphics;
		product.screen = req.body.screen;
		product.screenSize = req.body.screenSize;
		product.os = req.body.os;
		product.price = req.body.price;
		product.photo = req.body.photo;

		product.save(err => {
			if (err) res.json(err);
			res.json({
				message: 'Product updated',
				data: product,
			});
		});
	});
};

exports.delete = function(req, res) {
	Product.remove(
		{
			_id: req.params.product_id,
		},
		function(err, product) {
			if (err) res.send(err);
			res.json({
				status: 'success',
				message: 'Product deleted',
			});
		}
	);
};
