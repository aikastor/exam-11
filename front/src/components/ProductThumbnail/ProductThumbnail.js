import React from 'react';

import imageNotAvailable from '../../assets/images/image_not_available.jpg';
import {apiURL} from "../../constants";

const styles = {
  width: '100px',
  height: '100px',
  marginRight: '10px'
};

const ProductThumbnail = props => {
  let image = imageNotAvailable;

  if (props.image) {
    image = apiURL + '/uploads/' + props.image;
  }

  return <img alt="product" src={image} style={styles} className="img-thumbnail" />;
};

export default ProductThumbnail;