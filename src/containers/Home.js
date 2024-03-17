import React, { Component, button } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actionRequestLike } from '../store/actions/HomeAction';

// import User from '../../components/User';
// Trong container thì nên viết class. 
class Home extends Component {
	componentWillMount() {
		
	}

    getLike() {
        console.log('click')
        this.props.actionRequestLike('')
    }
    
	render() {
        console.log(this.props)
		return <div>
            <h1>This is Home like is: {this.props.home.like}</h1>
            <button onClick={() => this.getLike() }>get Like</button>
        </div>;
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		actionRequestLike: payload => {
			dispatch(actionRequestLike(payload));
		}
	};
};
const mapStateToProps = state => {
	return {
		home: state.home
	};
};

Home.propTypes = {
	dispatch: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);