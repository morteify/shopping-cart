import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchItems } from '../actions/actions';
import {
	Form,
	FormGroup,
	Input,
	Button,
	InputGroup,
	InputGroupText,
	InputGroupAddon,
} from 'reactstrap';

class SearchBar extends Component {
	handleChange = event => {
		event.preventDefault();
		this.props.searchItems(event.target.value);
	};

	handleFocus = event => {
		event.target.placeholder = 'null';
	};

	render() {
		const { searchText } = this.props;
		return (
			<InputGroup style={{ maxWidth: '20vw' }} onChange={this.handleChange}>
				<Input
					placeholder="Search product"
					onFocus={event =>
						(event.target.placeholder = 'Enter min. 2 characters')
					}
					onBlur={event => (event.target.placeholder = 'Search product')}
				/>
				<InputGroupAddon addonType="append">
					<InputGroupText>
						<span className="fas fa-search" />
					</InputGroupText>
				</InputGroupAddon>
			</InputGroup>
		);
	}
}

const mapStateToProps = state => ({
	searchText: state.loadedItems.searchText,
});

const mapDispatchToProps = dispatch => ({
	searchItems: text => dispatch(searchItems(text)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchBar);
