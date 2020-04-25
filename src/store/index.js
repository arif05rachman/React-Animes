import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import { FavoriteReducer, AnimeReducer, DetailAnimeReducer, SearchReducer } from "./reducers";
import thunk from "redux-thunk"
import logger from "redux-logger";
const reducers = combineReducers({
  listFavorite: FavoriteReducer,
  listAnime: AnimeReducer,
  detailAnime: DetailAnimeReducer,
  inputSearch: SearchReducer
});

const store = createStore(reducers, applyMiddleware(thunk, logger))

export default store