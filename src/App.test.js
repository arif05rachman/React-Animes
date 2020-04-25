import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import { createMemoryHistory } from "history";
import { Router } from 'react-router-dom'
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux'
import thunk from "redux-thunk";
import store from './store'
import {
  addFavorite,
  unFavorite,
  getAnimes,
  getAnime,
  setSearchQuery
} from "./store/actions";
import {
  FavoriteReducer,
  AnimeReducer,
  DetailAnimeReducer,
  SearchReducer
} from './store/reducers'
import {
  add_favorite,
  un_favorite,
  get_animes,
  get_anime,
  get_search
} from "./store/actions/action_types";
// import { get_animes } from './store/actions/action_types';
import Home from './views/Home'
import CardComponent from "./components/Card";
import DetailComponent from "./components/Detail";
import NavbarComponent from './components/Navbar';
jest.mock('./store/actions/index.js')

const response = {
  request_hash: "request:top:06dfba4e4f4423169acee0f04a14dea786f40261",
  request_cached: true,
  request_cache_expiry: 68408,
  top: [
    {
      mal_id: 1535,
      rank: 1,
      title: "Death Note",
      url: "https://myanimelist.net/anime/1535/Death_Note",
      image_url:
        "https://cdn.myanimelist.net/images/anime/9/9453.jpg?s=b89e80691ac5cc0610847ccbe0b8424a",
      type: "TV",
      episodes: 37,
      start_date: "Oct 2006",
      end_date: "Jun 2007",
      members: 1942446,
      score: 8.63
    }
  ]
};
const responseDetail = {
  "request_hash": "request:anime:704c9a8ba55a2888accf1b2b89d9d6a2308d2ac5",
  "request_cached": true,
  "request_cache_expiry": 21113,
  "mal_id": 5114,
  "url": "https:\/\/myanimelist.net\/anime\/5114\/Fullmetal_Alchemist__Brotherhood",
  "image_url": "https:\/\/cdn.myanimelist.net\/images\/anime\/1223\/96541.jpg",
  "trailer_url": "https:\/\/www.youtube.com\/embed\/--IcmZkvL0Q?enablejsapi=1&wmode=opaque&autoplay=1",
  "title": "Fullmetal Alchemist: Brotherhood",
  "title_english": "Fullmetal Alchemist: Brotherhood",
  "title_japanese": "鋼の錬金術師 FULLMETAL ALCHEMIST",
  "title_synonyms": [
    "Hagane no Renkinjutsushi: Fullmetal Alchemist",
    "Fullmetal Alchemist (2009)",
    "FMA",
    "FMAB"
  ],
  "type": "TV",
  "source": "Manga",
  "episodes": 64,
  "status": "Finished Airing",
  "airing": false,
  "aired": {
    "from": "2009-04-05T00:00:00+00:00",
    "to": "2010-07-04T00:00:00+00:00",
    "prop": {
      "from": {
        "day": 5,
        "month": 4,
        "year": 2009
      },
      "to": {
        "day": 4,
        "month": 7,
        "year": 2010
      }
    },
    "string": "Apr 5, 2009 to Jul 4, 2010"
  },
  "duration": "24 min per ep",
  "rating": "R - 17+ (violence & profanity)",
  "score": 9.23,
  "scored_by": 1029872,
  "rank": 1,
  "popularity": 4,
  "members": 1697700,
  "favorites": 146320,
  "synopsis": "\"In order for something to be obtained, something of equal value must be lost.\" Alchemy is bound by this Law of Equivalent Exchange—something the young brothers Edward and Alphonse Elric only realize after attempting human transmutation: the one forbidden act of alchemy. They pay a terrible price for their transgression—Edward loses his left leg, Alphonse his physical body. It is only by the desperate sacrifice of Edward's right arm that he is able to affix Alphonse's soul to a suit of armor. Devastated and alone, it is the hope that they would both eventually return to their original bodies that gives Edward the inspiration to obtain metal limbs called \"automail\" and become a state alchemist, the Fullmetal Alchemist. Three years of searching later, the brothers seek the Philosopher's Stone, a mythical relic that allows an alchemist to overcome the Law of Equivalent Exchange. Even with military allies Colonel Roy Mustang, Lieutenant Riza Hawkeye, and Lieutenant Colonel Maes Hughes on their side, the brothers find themselves caught up in a nationwide conspiracy that leads them not only to the true nature of the elusive Philosopher's Stone, but their country's murky history as well. In between finding a serial killer and racing against time, Edward and Alphonse must ask themselves if what they are doing will make them human again... or take away their humanity. [Written by MAL Rewrite]",
  "background": "Fullmetal Alchemist: Brotherhood is an alternate retelling of Hiromu Arakawa's Fullmetal Alchemist manga that is closer to the source material than the previous 2003 adaptation, this time covering the entire story.\r\nOn March 31, 2016, FUNimation Entertainment's license to the series expired.",
  "premiered": "Spring 2009",
  "broadcast": "Sundays at 17:00 (JST)",
  "related": {
    "Adaptation": [
      {
        "mal_id": 25,
        "type": "manga",
        "name": "Fullmetal Alchemist",
        "url": "https:\/\/myanimelist.net\/manga\/25\/Fullmetal_Alchemist"
      }
    ],
    "Alternative version": [
      {
        "mal_id": 121,
        "type": "anime",
        "name": "Fullmetal Alchemist",
        "url": "https:\/\/myanimelist.net\/anime\/121\/Fullmetal_Alchemist"
      }
    ],
    "Side story": [
      {
        "mal_id": 6421,
        "type": "anime",
        "name": "Fullmetal Alchemist: Brotherhood Specials",
        "url": "https:\/\/myanimelist.net\/anime\/6421\/Fullmetal_Alchemist__Brotherhood_Specials"
      },
      {
        "mal_id": 9135,
        "type": "anime",
        "name": "Fullmetal Alchemist: The Sacred Star of Milos",
        "url": "https:\/\/myanimelist.net\/anime\/9135\/Fullmetal_Alchemist__The_Sacred_Star_of_Milos"
      }
    ],
    "Spin-off": [
      {
        "mal_id": 7902,
        "type": "anime",
        "name": "Fullmetal Alchemist: Brotherhood - 4-Koma Theater",
        "url": "https:\/\/myanimelist.net\/anime\/7902\/Fullmetal_Alchemist__Brotherhood_-_4-Koma_Theater"
      }
    ]
  },
  "producers": [
    {
      "mal_id": 17,
      "type": "anime",
      "name": "Aniplex",
      "url": "https:\/\/myanimelist.net\/anime\/producer\/17\/Aniplex"
    },
    {
      "mal_id": 58,
      "type": "anime",
      "name": "Square Enix",
      "url": "https:\/\/myanimelist.net\/anime\/producer\/58\/Square_Enix"
    },
    {
      "mal_id": 143,
      "type": "anime",
      "name": "Mainichi Broadcasting System",
      "url": "https:\/\/myanimelist.net\/anime\/producer\/143\/Mainichi_Broadcasting_System"
    },
    {
      "mal_id": 1155,
      "type": "anime",
      "name": "Studio Moriken",
      "url": "https:\/\/myanimelist.net\/anime\/producer\/1155\/Studio_Moriken"
    }
  ],
  "licensors": [
    {
      "mal_id": 102,
      "type": "anime",
      "name": "Funimation",
      "url": "https:\/\/myanimelist.net\/anime\/producer\/102\/Funimation"
    },
    {
      "mal_id": 493,
      "type": "anime",
      "name": "Aniplex of America",
      "url": "https:\/\/myanimelist.net\/anime\/producer\/493\/Aniplex_of_America"
    }
  ],
  "studios": [
    {
      "mal_id": 4,
      "type": "anime",
      "name": "Bones",
      "url": "https:\/\/myanimelist.net\/anime\/producer\/4\/Bones"
    }
  ],
  "genres": [
    {
      "mal_id": 1,
      "type": "anime",
      "name": "Action",
      "url": "https:\/\/myanimelist.net\/anime\/genre\/1\/Action"
    },
    {
      "mal_id": 38,
      "type": "anime",
      "name": "Military",
      "url": "https:\/\/myanimelist.net\/anime\/genre\/38\/Military"
    },
    {
      "mal_id": 2,
      "type": "anime",
      "name": "Adventure",
      "url": "https:\/\/myanimelist.net\/anime\/genre\/2\/Adventure"
    },
    {
      "mal_id": 4,
      "type": "anime",
      "name": "Comedy",
      "url": "https:\/\/myanimelist.net\/anime\/genre\/4\/Comedy"
    },
    {
      "mal_id": 8,
      "type": "anime",
      "name": "Drama",
      "url": "https:\/\/myanimelist.net\/anime\/genre\/8\/Drama"
    },
    {
      "mal_id": 16,
      "type": "anime",
      "name": "Magic",
      "url": "https:\/\/myanimelist.net\/anime\/genre\/16\/Magic"
    },
    {
      "mal_id": 10,
      "type": "anime",
      "name": "Fantasy",
      "url": "https:\/\/myanimelist.net\/anime\/genre\/10\/Fantasy"
    },
    {
      "mal_id": 27,
      "type": "anime",
      "name": "Shounen",
      "url": "https:\/\/myanimelist.net\/anime\/genre\/27\/Shounen"
    }
  ],
  "opening_themes": [
    "\"again\" by YUI (eps 1-14)",
    "\"Hologram (ホログラム)\" by NICO Touches the Walls (eps 15-26)",
    "\"Golden Time Lover (ゴールデンタイムラバー)\" by Sukima Switch (eps 27-38)",
    "\"Period\" by Chemistry (eps 39-50)",
    "\"Rain (レイン)\" by SID (eps 51-62)"
  ],
  "ending_themes": [
    "\"Uso (嘘)\" by SID (eps 1-14)",
    "\"LET IT OUT\" by Miho Fukuhara (eps 15-26)",
    "\"Tsunaida Te (つないだ手)\" by Lil'B (eps 27-38)",
    "\"Shunkan Sentimental (瞬間センチメンタル)\" by SCANDAL (eps 39-50)",
    "\"RAY OF LIGHT\" by Nakagawa Shouko (eps 51-62)",
    "\"Rain (レイン)\" by SID (ep 63)",
    "\"Hologram (ホログラム)\" by NICO Touches the Walls (ep 64)"
  ]
}

getAnimes.mockImplementation(() => {
  return {
    type: get_animes,
    payload: {
      animes: response.top
    }
  }
})
getAnime.mockImplementation(() => {
  return {
    type: get_anime,
    payload: {
      anime: responseDetail
    }
  };
});
addFavorite.mockImplementation((anime) => {
  return {
    type: add_favorite,
    payload: {
      favorite: anime
    }
  };
});
unFavorite.mockImplementation(mal_id => {
  return {
    type: un_favorite,
    payload: {
      id: mal_id
    }
  };
});
function renderWithRedux(history, component) {
  return render(
    <Provider store={store}>
      <Router history={history}>{component}</Router>
    </Provider>
  );
}
// test navbar
describe("navbar Tests", () => {
  test("navbar title element should appear", () => {
    const history = createMemoryHistory();
    const { getByTestId } = renderWithRedux(history, <App />);
    const navbarTitle = getByTestId("navbar-title");
    expect(navbarTitle).toBeInTheDocument();
  });

  test("navbar title element should appear as 'React-Anime Top 50'", () => {
    const history = createMemoryHistory();
    const { getByTestId } = renderWithRedux(history, <App />);
    const navbarTitle = getByTestId("navbar-title");
    const navbarTitleText = navbarTitle.textContent;
    expect(navbarTitleText).toMatch(/React-Anime Top 50/i);
  });
  test("Sould Link to favorite", () => {
    const history = createMemoryHistory();
    const { getByTestId } = renderWithRedux(history, <NavbarComponent />);
    const viewFavoriteButton = getByTestId("favorite-button");
    fireEvent.click(viewFavoriteButton);
    expect(history.location.pathname).toBe(`/favorite`);
  });
  test("Sould Link to Home", () => {
    const history = createMemoryHistory();
    const { getByTestId } = renderWithRedux(history, <NavbarComponent />);
    const viewHomeButton = getByTestId("home-button");
    fireEvent.click(viewHomeButton);
    expect(history.location.pathname).toBe(`/`);
  });
});
// Test Home
describe("Home Tests", () => {
  test("Sould display correct home-page", () => {
    const history = createMemoryHistory();
    const { getByTestId } = renderWithRedux(history, <Home />);
    const homeTitle = getByTestId("home-title");
    expect(homeTitle).toBeInTheDocument();
  });
  test("Sould display correct card-component", () => {
    const history = createMemoryHistory();
    const anime = response.top[0]
    const { getByTestId } = renderWithRedux(
      history,
      <CardComponent anime={anime} key={anime.mal_id} />
    );
    const cardTitle = getByTestId("card-title");
    expect(cardTitle).toBeInTheDocument();
    const TitleText = cardTitle.textContent;
    expect(TitleText).toMatch(/Death/i);
  });
  test("Sould Link to detail", () => {
    const history = createMemoryHistory();
    const anime = response.top[0];
    const { getByTestId } = renderWithRedux(
      history,
      <CardComponent anime={anime} key={anime.mal_id} />
    );
    const viewDetailButton = getByTestId("detail-button");
    fireEvent.click(viewDetailButton);
    expect(history.location.pathname).toBe(`/detail/${anime.mal_id}`);
    
  });
  test("Sould display correct detail-component", () => {
    const history = createMemoryHistory();
    const { getByTestId } = renderWithRedux(
      history,
      <DetailComponent />
    );
    const detailTitle = getByTestId("detail-title");
    expect(detailTitle).toBeInTheDocument();
    const TitleText = detailTitle.textContent;
    expect(TitleText).toMatch(/Fullmetal/i);
  });
  test("Sould add the anime to the favorites state", () => {
    const history = createMemoryHistory();
    const anime = response.top[0];
    const { getByTestId } = renderWithRedux(
      history,
      <CardComponent anime={anime} key={anime.mal_id} />
    );
    const addFavoriteButton = getByTestId("add-favorite-button");
    fireEvent.click(addFavoriteButton);
    const favorites = store.getState().listFavorite.favorites;
    expect(favorites.length).toBe(1);
  });
  test("Sould remove the anime to the favorites state", () => {
    const history = createMemoryHistory();
    const anime = response.top[0];
    const { getByTestId } = renderWithRedux(
      history,
      <CardComponent anime={anime} key={anime.mal_id} />
    );
    const unFavoriteButton = getByTestId("un-favorite-button");
    fireEvent.click(unFavoriteButton);
    const favorites = store.getState().listFavorite.favorites;
    expect(favorites.length).toBe(0);
  });
})