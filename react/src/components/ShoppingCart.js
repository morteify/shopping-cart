import React, { Component } from 'react';
import { Table, Container, Button } from 'reactstrap';
import { connect } from 'react-redux';

import { removeFromCart } from '../actions/actions';

class ShoppingCart extends Component {
	getProductsTable = saved => {
		return (
			<Table responsive>
				<thead>
					<tr>
						<th>
							<div className="float-left">Product</div>
						</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Subtotal</th>
					</tr>
				</thead>
				<tbody>
					{saved &&
						saved.map((item, index) => {
							return (
								<tr>
									<td>
										<div className="float-left">
											<img src={item.photo} width="50" />
											&nbsp;
											{item.name}
										</div>
									</td>
									<td>{item.price}$</td>
									<td>1</td>
									<td>
										<div className="float-right">
											{item.price}$ &nbsp;
											<Button
												color="link"
												onClick={e => {
													e.preventDefault();
													this.props.removeItem(index);
												}}
											>
												<i class="fas fa-times" />
											</Button>
										</div>
									</td>
								</tr>
							);
						})}
					<tr>
						<td />
						<td />
						<td />
						<td>
							<div className="float-right">
								<b>Total Cost: {this.props.totalCost}$</b>
							</div>
						</td>
					</tr>
				</tbody>
			</Table>
		);
	};

	render() {
		const { saved } = this.props;
		return (
			<Container>
				{saved.length > 0 && this.getProductsTable(saved)}
				{!saved.length && (
					<div style={{ marginTop: '50px' }}>
						<h2>Your shopping cart is empty</h2>
					</div>
				)}
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	saved: state.data.saved,
	totalCost: state.data.totalCost,
});

const mapDispatchToProps = dispatch => ({
	removeItem: removeIndex => dispatch(removeFromCart(removeIndex)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ShoppingCart);
