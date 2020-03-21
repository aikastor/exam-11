import {
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS
} from "../actions/categoriesActions";

const initialState = {
  loading: false,
  categories: [],
  error: null,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return {...state, loading: true};
    case FETCH_CATEGORIES_SUCCESS:
      return {...state, categories: action.categories};
    case FETCH_CATEGORIES_FAILURE:
      return {...state, loading: false, error: action.error};
    default: return state;
  }


};

export default categoriesReducer;