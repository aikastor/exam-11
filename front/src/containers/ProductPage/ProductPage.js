import React, {Component} from 'react';
import {deleteProduct, fetchProduct} from "../../store/actions/productsActions";
import {connect} from "react-redux";
import {apiURL} from "../../constants";
import {Button} from "reactstrap";

class ProductPage extends Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id)
  }

  render() {
    if (!this.props.product) return null;
    const product = {...this.props.product};

    return (
      <div>
        <h1>{product.title}</h1>
        <h4>Price: {product.price}</h4>
        {
          this.props.user &&
            this.props.user._id === product.seller._id &&
          <Button
            color="danger"
            className="float-right"
            onClick={()=>{this.props.deleteProduct(product._id)}}
          >
            Delete
          </Button>
        }
        <img src={apiURL + '/uploads/' + product.image} alt={product.title}
        height='400px'/>
        <p>{product.description}</p>
        Seller:
        {
          product.seller.displayName
        }
        {
          product.seller.phone
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.products.product,
  user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  fetchProduct: id => dispatch(fetchProduct(id)),
  deleteProduct: (productID) => dispatch(deleteProduct(productID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);