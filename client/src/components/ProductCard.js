import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../actions/actions';

import './ProductCard.css';
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardFooter,
} from 'reactstrap';

class ProductCard extends Component {
	handleClick = event => {
		event.preventDefault();
		this.props.addToCart({
			name: this.props.data.name,
			price: this.props.data.price,
			photo: this.props.data.photo,
		});
	};

	render() {
		const {
			name,
			photo,
			price,
			processor,
			memory,
			storage,
			graphics,
			os,
			screen,
			screenSize,
		} = { ...this.props.data };
		return (
			<div>
				<Card>
					<div>

						<CardImg
							top
							width="100%"
							src={photo}
							alt="Card image cap"
							style={{ maxWidth: '348px', maxHeight: '261px' }}
						/>
					</div>
					<CardBody>
						<CardTitle>{name}</CardTitle>

						<CardText>
							<div className="cardTextContainer" style={{ color: '#666666' }}>
								<div className="itemInfo">CPU {processor}</div>
								<div className="itemInfo">Memory {memory} GB</div>
								<div className="itemInfo">Storage {storage}</div>
								<div className="itemInfo">GPU {graphics}</div>
							</div>
						</CardText>

						<CardFooter style={{ backgroundColor: '#fff', marginTop: '2vh' }}>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-around',
									alignItems: 'center',
									marginTop: '.5em',
								}}
							>
								<div onClick={this.handleClick}>
									<i style={{ fontSize: '2em' }} className="fa fa-cart-plus" />
								</div>
								<div style={{ fontSize: '1.3em' }}>{price},00 PLN</div>
							</div>
						</CardFooter>
					</CardBody>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	saved: state.data.saved,
});

const mapDispatchToProps = dispatch => ({
	addToCart: data => dispatch(addToCart(data)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductCard);
