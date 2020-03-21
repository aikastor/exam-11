import React, {Component} from 'react';
import {fetchProduct} from "../../store/actions/productsActions";
import {connect} from "react-redux";

class ProductPage extends Component {
  componentDidMount() {

  }


  render() {
    if (!this.props.product) return null;

    return (
      <div>
        <h1>{this.props.product.title}</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.products.product
});

const mapDispatchToProps = dispatch => ({
  fetchProduct: id => dispatch(fetchProduct(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);