import React from 'react';
import { CustomInput, Form, FormGroup, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { updateFilterMethod } from '../actions/actions';

const FILTERS = [
	'brand',
	'processor',
	'graphics',
	'memory',
	'screen',
	'storage',
	'os',
];

class Filters extends React.Component {
	state = {
		filters: {},
	};

	componentDidMount() {
		FILTERS.map(filter => {
			this.state.filters[filter] = [];
			this.props.loadedItems.forEach(item => {
				this.state.filters[filter].push(item[filter]);
			});
			this.state.filters[filter] = [...new Set(this.state.filters[filter])];
		});
	}

	handleChange = (e, filter) => {
		this.props.updateFilterMethod({
			filterMethod: e.target.id,
			filterCategory: filter,
		});
	};

	render() {
		const { loadedItems } = this.props;
		return (
			<div>
				{this.state.filters &&
					Object.keys(this.state.filters).map(filter => (
						<div>
							<h2>{filter}</h2>
							{this.state.filters[filter].map((item, idx) => (
								<CustomInput
									key={idx}
									type="checkbox"
									id={item}
									label={item}
									onChange={e => this.handleChange(e, filter)}
								/>
							))}
						</div>
					))}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loadedItems: state.loadedItems.loadedItems,
	filterMethod: state.loadedItems.filterMethod,
});

const mapDispatchToProps = dispatch => ({
	updateFilterMethod: payload => dispatch(updateFilterMethod(payload)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Filters);
