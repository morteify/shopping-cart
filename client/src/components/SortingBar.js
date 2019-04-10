import React, { Component } from 'react';
import './SortingBar.css';
import { connect } from 'react-redux';
import { updateSortingMethod } from '../actions/actions';

import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';

const sortingOptions = {
	priceAscending: 'price ascending',

	priceDescending: 'price descending',

	nameAscending: 'name: A-Z',

	nameDescending: 'name: Z-A',
};

class SortingBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dropdownOpen: false,
		};
	}

	toggle = () => {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen,
		}));
	};

	handleClick = e => {
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		let selectedSortingMethod = e.currentTarget.innerText;
		Object.keys(sortingOptions)
			.filter(key => sortingOptions[key] === selectedSortingMethod)
			.forEach(option => {
				this.props.updateSortingMethod({
					sortingCriteria: option,
				});
			});
	};

	render() {
		const { sortingCriteria } = this.props;
		const chosenSortingCriteria = sortingOptions[sortingCriteria] || '';
		return (
			<div>
				<Dropdown
					isOpen={this.state.dropdownOpen}
					toggle={this.toggle}
					class="dropdown"
				>
					<DropdownToggle caret>
						Sorty by {chosenSortingCriteria}
					</DropdownToggle>
					<DropdownMenu right>
						{Object.values(sortingOptions).map((item, index) => {
							return (
								<DropdownItem key={index} onClick={e => this.handleClick(e)}>
									{item}
								</DropdownItem>
							);
						})}
					</DropdownMenu>
				</Dropdown>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	sortingCriteria: state.loadedItems.sortingCriteria,
});

const mapDispatchToProps = dispatch => ({
	updateSortingMethod: payload => dispatch(updateSortingMethod(payload)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SortingBar);
