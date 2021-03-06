import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST, FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS, FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS
} from "../actions/productsActions";

const initialState = {
  products: [],
  product: null,
  createProductError: '',
  fetchProductsError: '',
  loading: false,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
    case FETCH_PRODUCTS_REQUEST:
    case CREATE_PRODUCT_REQUEST:
      return {...state, loading: false};
    case FETCH_PRODUCTS_SUCCESS:
      return {...state, products: action.products};
    case FETCH_PRODUCT_SUCCESS:
      return {...state, product: action.product};
    case FETCH_PRODUCTS_FAILURE:
    case FETCH_PRODUCT_FAILURE:
      return {...state, fetchProductsError: action.error};
    case CREATE_PRODUCT_FAILURE:
      return {...state, createProductError: action.error};
    default:
      return state;
  }
};

export default productsReducer;