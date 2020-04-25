import {
  add_favorite,
  un_favorite
} from '../actions/action_types'

const defaultState = {
  favorites: []
};

const favoriteReducer = (state = defaultState, action) => {
  
  switch (action.type) {
    case add_favorite:
      let newFavorite = state.favorites.concat(action.payload.favorite)
      return { ...state, favorites: newFavorite }
    case un_favorite:
      let unFavorite = state.favorites.filter((element) => element.mal_id !== action.payload.id)
      return {...state, favorites: unFavorite}
    default:
      return state
  }
}

export default favoriteReducer