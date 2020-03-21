import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import {Link} from "react-router-dom";

import {apiURL} from "../../constants";

const ProductListItem = props => {
  return (
    <Card>
      <CardImg top width="100%" src={apiURL + '/uploads/' + props.image} alt={props.title}/>
      <CardBody>
        <CardTitle>
          <Link to={"/products/" + props.id}>
            {props.title}
          </Link>
        </CardTitle>
        <CardText>
            <strong>
              {props.price} KGS
            </strong>
        </CardText>
      </CardBody>
    </Card>
  );
};

ProductListItem.propTypes = {
  image: PropTypes.string,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

export default ProductListItem;