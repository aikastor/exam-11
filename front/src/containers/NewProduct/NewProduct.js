import React, {Component, Fragment} from 'react';
import ProductForm from "../../components/ProductForm/ProductForm";
import {createProduct} from "../../store/actions/productsActions";
import {connect} from "react-redux";
import {fetchCategories} from "../../store/actions/categoriesActions";
import {Alert} from "reactstrap";

class NewProduct extends Component {
  componentDidMount() {
    if(!this.props.user) {
      this.props.history.push('/login');
    }

    this.props.fetchCategories();
  }
  createProduct = async (productData) => {
    await this.props.createProduct(productData);
    this.props.history.push('/');
  };

  render() {
    return (
      <Fragment>
        <h2>New product</h2>
        {this.props.error && (
          <Alert color="danger">{this.props.error.error}</Alert>
        )}
        <ProductForm
          onSubmit={this.createProduct}
          options={this.props.categories}
          seller={this.props.user._id}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
  user: state.users.user,
  error: state.products.createProductError,
});

const mapDispatchToProps = dispatch => ({
  createProduct: productData => dispatch(createProduct(productData)),
  fetchCategories: () => dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);