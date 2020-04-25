import { get_anime } from "../actions/action_types";

const defaultState = {
  anime: {}
};

const DetailanimeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case get_anime:
      let newAnime = action.payload.anime;
      return { ...state, anime: newAnime };
    default:
      return state;
  }
};

export default DetailanimeReducer;
