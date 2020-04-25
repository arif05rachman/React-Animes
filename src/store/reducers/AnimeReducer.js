import { get_animes } from "../actions/action_types";

const defaultState = {
  animes: [],
  counter: 10
};

const animeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case get_animes:
      let newAnime = action.payload.animes;
      return { ...state, animes: newAnime };
    case "ADD_COUNTER":
      return {...state, counter: action.payload.counter}
    default:
      return state;
  }
};

export default animeReducer;
