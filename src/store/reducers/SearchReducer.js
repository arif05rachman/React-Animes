import { get_search } from "../actions/action_types";

const defaultState = {
  searchQuery: ""
};

const searchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case get_search:
      return { ...state, searchQuery: action.payload.searchQuery };
    default:
      return state;
  }
};

export default searchReducer;
