import {
  add_favorite,
  un_favorite,
  get_animes,
  get_anime,
  get_search
} from './action_types'

export const addFavorite = (anime) => ({
  type: add_favorite,
  payload: {
    favorite: anime
  }
})

export const unFavorite = (id) => ({
  type: un_favorite,
  payload: {
    id
  }
});

export const getAnimes = (url) => {
  return async dispatch => {
    const res = await fetch(url);
    const animes = await res.json();
    dispatch({
      type: get_animes,
      payload: {
        animes: animes.top
      }
    });
  };
};

export const getAnime = (url) => {
  return async dispatch => {
    const res = await fetch(url);
    const anime = await res.json();
    dispatch({
      type: get_anime,
      payload: {
        anime: anime
      }
    });
  };
};

export const setSearchQuery = searchQuery => ({
  type: get_search,
  payload: {
    searchQuery
  }
});