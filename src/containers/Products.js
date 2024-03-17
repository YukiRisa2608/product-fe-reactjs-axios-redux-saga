import { connect } from "react-redux";
import { Component } from "react";
import PropTypes from 'prop-types';

class Products extends Component {

    getProduct() {
        console.log("method get product")

    }


    render() {
        return <div>
            Product page
        </div>
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        // actionGetListCategories: payload => {
        //     dispatch(actionGetListCategories(payload));
        // }
    };
};
const mapStateToProps = state => {
    return {
        products: state.products,
    };
};

Products.propTypes = {
    dispatch: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);