const router = require('express').Router();

router.get('/', (req, res) => {
	res.json({
		status: 'API is working',
		message: 'Entry point of REST API.',
	});
});

const productController = require('./productController');

router
	.route('/products')
	.get(productController.index)
	.post(productController.new);

router
	.route('/products/:product_id')
	.get(productController.view)
	.patch(productController.update)
	.put(productController.update)
	.delete(productController.delete);

module.exports = router;
