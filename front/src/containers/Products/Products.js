import React, {Component, Fragment} from 'react';
import {Button, Col, ListGroup, ListGroupItem, Row, Spinner} from "reactstrap";
import {fetchProducts} from "../../store/actions/productsActions";
import {connect} from "react-redux";
import {Link, NavLink} from "react-router-dom";
import ProductListItem from "../../components/ProductListItem/ProductListItem";
import {fetchCategories} from "../../store/actions/categoriesActions";

class Products extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchProducts();
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.name !== prevProps.match.params.name) {
      this.props.fetchCategories();
      this.props.fetchProducts(this.props.match.params.name);
    }
  }
  render() {
    return (
      <Fragment>
        <Row style={{paddingTop: '25px', paddingBottom: '25px'}}>
          <Col xs={4}>
            <ListGroup>
              {this.props.categories.map(c=>(
                <ListGroupItem key={c._id}>
                  <NavLink to={'/categories/'+ c._id}>{c.title}</NavLink>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col xs={8}>
            <h2>
              Products
              {
                this.props.user &&
                <Button
                  color="primary"
                  className="float-right"
                  tag={Link}
                  to={"/posts/new"}
                >
                  Add post
                </Button>
              }
            </h2>
            {
              this.props.products.map(product => (
                <ProductListItem
                  key={product._id}
                  title={product.title}
                  id={product._id}
                  price={product.price}
                  image={product.image}
                />
              ))
            }

            {}
          </Col>
        </Row>
        <div ref={this.bottom}/>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.products,
  categories: state.categories.categories,
  user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: (id) => dispatch(fetchProducts(id)),
  fetchCategories:() => dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
