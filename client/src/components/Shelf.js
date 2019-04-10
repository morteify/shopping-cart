import React, { Component } from 'react';
import ProductCard from './ProductCard';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { updateLoadedItems } from '../actions/actions';
import SortingBar from './SortingBar';
import Filters from './Filters';
import './shelf.css';

const url = 'http://localhost:5000/api/products';

class Shelf extends Component {
	state = {
		loadedItemsOutput: null,
	};

	componentDidMount() {
		this.fetchData();
		this.setState({ loadedItemsOutput: this.props.loadedItems });
	}

	componentDidUpdate(prevProps, prevState) {
		let updatedLoadedItemsOutput;
		if (
			this.state.loadedItemsOutput &&
			prevState.loadedItemsOutput === this.state.loadedItemsOutput
		) {
			if (this.props.searchText) {
				this.setState({
					loadedItemsOutput: this.props.loadedItems.filter(object => {
						if (this.props.searchText === undefined) return object.name;
						if (this.props.searchText.length >= 2) {
							return object.name.toLowerCase().includes(this.props.searchText);
						}
						return object.name;
					}),
				});
			}
		}
	}

	fetchData = async () => {
		let response = await fetch(url);
		let result = await response.json();
		this.props.updateLoadedItems(result.data);
	};

	sortItems = (sortingCriteria, a, b) => {
		let nameA = a.name.toUpperCase();
		let nameB = b.name.toUpperCase();
		switch (sortingCriteria) {
			case 'priceAscending':
				return a.price - b.price;
			case 'priceDescending':
				return b.price - a.price;
			case 'nameAscending':
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				return 0;
			case 'nameDescending':
				if (nameA < nameB) {
					return 1;
				}
				if (nameA > nameB) {
					return -1;
				}
				return 0;
			default:
				return null;
		}
	};

	render() {
		const {
			loadedItems,
			searchText,
			filterMethod,
			filterCategory,
			sortingCriteria,
		} = this.props;
		return (
			<div
				id="shelfContainer"
				style={{ marginTop: '2em', marginBottom: '2em', marginLeft: '15em', marginRight: '15em' }}
			>
				<SortingBar />
				<div id="shelf">

					<div class="products">
						<Row>
							{this.state.loadedItemsOutput &&
								this.state.loadedItemsOutput
									.sort((a, b) => {
										return this.sortItems(this.props.sortingCriteria, a, b);
									})
									.map((item, index) => {
										return (
											<Col
												key={index}
												sm="6"
												md="6"
												lg="6"
												xl="4"
												style={{ padding: '1em' }}
											>
												<ProductCard data={item} />
											</Col>
										);
									})}
						</Row>
					</div>
				</div>
			</div>
		);
	}
}

const mapStatetoProps = state => ({
	loadedItems: state.loadedItems.loadedItems,
	searchText: state.loadedItems.searchText,
	sortingMethod: state.loadedItems.sortingMethod,
	sortingCriteria: state.loadedItems.sortingCriteria,
	filterMethod: state.loadedItems.filterMethod,
	filterCategory: state.loadedItems.filterCategory,
});

const mapDispatchToProps = dispatch => ({
	updateLoadedItems: items => dispatch(updateLoadedItems(items)),
});

export default connect(
	mapStatetoProps,
	mapDispatchToProps
)(Shelf);
