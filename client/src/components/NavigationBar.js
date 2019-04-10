import React, { Component } from 'react';
import SearchBar from './SearchBar';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	Navbar,
	NavbarBrand,
	UncontrolledButtonDropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Container,
	Button,
} from 'reactstrap';
import { removeFromCart, updateTotalCost } from '../actions/actions';

class NavigationBar extends Component {
	constructor(props) {
		super(props);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.totalCost != this.props.totalCost) {
			let currentTotalCost = this.props.saved
				.map(item => parseInt(item.price))
				.reduce((acc, curr) => acc + curr, 0);
			this.props.updateTotalCost(currentTotalCost.toFixed(2));
		}
	}

	render() {
		const { saved, removeItem, totalCost } = this.props;
		return (
			<Navbar color="light" sticky="top">
				<Container>
					<NavLink to="/">
						<NavbarBrand href="/">React Shopping Cart</NavbarBrand>
					</NavLink>
					<SearchBar />
					<UncontrolledButtonDropdown nav inNavbar>
						<DropdownToggle nav caret>
							Your cart{' '}
							{totalCost > 0 ? (
								<span style={{ position: 'relative' }}>
									<i class="fas fa-cart-plus" />
									<span
										style={{
											fontSize: '0.6em',
											position: 'absolute',
											top: '-1.5em',
											left: '0.8em',
											borderRadius: '100px',
											backgroundColor: 'red',
											minWidth: '2em',
											padding: '0.5em',
											color: '#ffffff',
										}}
									>
										{saved.length}
									</span>
								</span>
							) : (
								<span className="fa fa-shopping-cart" />
							)}
						</DropdownToggle>
						<DropdownMenu right>
							<div style={{ maxHeight: '30em', overflow: 'auto' }}>
								{saved &&
									saved.map((item, index) => (
										<DropdownItem header>
											<div
												style={{
													display: 'flex',
													justifyContent: 'space-between',
												}}
											>
												<div
													style={{
														maxWidth: '230px',
														overflow: 'hidden',
														textOverflow: 'ellipsis',
														whiteSpace: 'nowrap',
														marginRight: '.5em',
													}}
												>
													<img src={item.photo} width="50" />
													&nbsp;
													{item.name}
													&nbsp;
												</div>
												<div>
													<b>{item.price}$</b>
													&nbsp;
													<Button
														color="link"
														onClick={e => {
															e.preventDefault();
															removeItem(index);
														}}
													>
														<i class="fas fa-trash-alt" />
													</Button>
												</div>
											</div>
										</DropdownItem>
									))}
							</div>
							{totalCost == 0 && (
								<DropdownItem header>Your cart is empty</DropdownItem>
							)}
							<DropdownItem>
								Total cost: <b>{totalCost}$</b>
							</DropdownItem>
							<DropdownItem divider />
							<NavLink to="/mycart">
								<DropdownItem>My Cart</DropdownItem>
							</NavLink>
						</DropdownMenu>
					</UncontrolledButtonDropdown>
				</Container>
			</Navbar>
		);
	}
}

const mapStateToProps = state => ({
	saved: state.data.saved,
	totalCost: state.data.totalCost,
});

const mapDispatchToProps = dispatch => ({
	removeItem: removeIndex => dispatch(removeFromCart(removeIndex)),
	updateTotalCost: newTotalCost => dispatch(updateTotalCost(newTotalCost)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NavigationBar);
