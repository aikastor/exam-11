import axiosApi from "../../axiosApi";
import {push} from "connected-react-router";


export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';

export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';

export const fetchProductsRequest = () => ({type: FETCH_PRODUCTS_REQUEST});
export const fetchProductsSuccess = products => ({type: FETCH_PRODUCTS_SUCCESS, products});
export const fetchProductsFailure = error => ({type: FETCH_PRODUCTS_SUCCESS, error});


export const createProductRequest = () => ({type: CREATE_PRODUCT_REQUEST});
export const createProductSuccess = () => ({type: CREATE_PRODUCT_SUCCESS});
export const createProductFailure = (error) => ({type: CREATE_PRODUCT_FAILURE, error});

export const deleteProductRequest = () => ({type: DELETE_PRODUCT_REQUEST});
export const deleteProductSuccess = () => ({type: DELETE_PRODUCT_SUCCESS});
export const deleteProductFailure = error => ({type: DELETE_PRODUCT_FAILURE, error});

export const fetchProductRequest = () => ({type: FETCH_PRODUCT_REQUEST, });
export const fetchProductSuccess = product => ({type: FETCH_PRODUCT_SUCCESS, product});
export const fetchProductFailure = error => ({type: FETCH_PRODUCT_FAILURE, error});


export const fetchProducts = (categoryID) => {
  return async (dispatch) => {
    try {
      dispatch(fetchProductsRequest());
      const response = await axiosApi.get(`/products/${categoryID ? 'categories/' + categoryID : ''}`);
      dispatch(fetchProductsSuccess(response.data));
    } catch (error) {
      dispatch(fetchProductsFailure(error))
    }

  };
};

export const createProduct = productData => {
  return async (dispatch, getState) => {
    try {
      dispatch(createProductRequest());
      const user = getState().users.user;
      await axiosApi.post('/products', productData, {headers: {'Authorization': 'Token ' + user.token}});
      dispatch(createProductSuccess());
    } catch (error) {
      dispatch(createProductFailure(error))
    }
  };
};

export const fetchProduct = id => {

  return async dispatch => {
    try {
      dispatch(fetchProductRequest());
      const response = await axiosApi.get('/products/' + id);
      dispatch(fetchProductSuccess(response.data));
    } catch (error) {
      dispatch(fetchProductFailure(error))
    }

  }
};

export const deleteProduct = id => {
  return async (dispatch, getState) => {
    try {
      dispatch(deleteProductRequest());
      const user = getState().users.user;
      await axiosApi.delete(`/products/${id}`, {headers: {'Authorization': 'Token ' + user.token, 'Authentication': 'UserID ' + user._id}});
      dispatch(deleteProductSuccess());
      dispatch(push('/'));
    } catch (error) {
      dispatch(deleteProductFailure(error))
    }

  }
};