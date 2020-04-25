import React, {useEffect} from 'react'
import NavbarComponent from '../components/Navbar'
import CardComponent from '../components/Card'
import Favorite from "../components/Favorite";
import Detail from "../components/Detail";
import { Spinner } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import { getAnimes } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import Page1 from './Page1'
import Page2 from './Page2'
function Home() {
  const searchQuery = useSelector(state => state.inputSearch.searchQuery);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAnimes("https://api.jikan.moe/v3/top/anime/1/bypopularity"));
  }, [dispatch])
  // filter by search
  const animesList2 = useSelector(state => state.listAnime.animes);
  const [animesList, setAnimesList] = useState(animesList2);
  let animes = animesList.filter(anime =>
    anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    anime.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Sort Rank
  // const [sort, setSort] = useState(false)
  // useEffect(() => {
  //   setAnimesList(animesList2)
  //   return () => {
  //     if (!sort) {
  //       setAnimesList(animesList.sort((a, b) => a.rank - b.rank))
  //     } else {
  //       setAnimesList(animesList.sort((a, b) => b.rank - a.rank))
  //     }
  //     console.log(sort)
  //     console.log(animes);
  //   }
  // }, [sort, animes, animesList2])

  // Sort Name
    const [sortName, setSortName] = useState('');
    useEffect(() => {
      setAnimesList(animesList2);
      return () => {
        if (!sortName) {
          setAnimesList(animesList.sort((a, b) => a.title < b.title));
        } else {
          setAnimesList(animesList.sort((a, b) => b.title < a.title));
        }
        // console.log(sortName);
        // console.log(animes);
      };
    }, [sortName, animes, animesList, animesList2]);
  return (
    <>
      <NavbarComponent />
      <div data-testid="home-title" style={{ marginTop: "60px" }}>
        <div className="bg-light d-flex justify-content-start">
          {/* <div className="my-2 mr-4" style={{ width: "200px" }}>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setSort(!sort)}
            >
              Rank
              {sort ? (
                <span className="ml-2">
                  <svg
                    className="bi bi-caret-down-fill"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z" />
                  </svg>
                </span>
              ) : (
                <span className="ml-2">
                  <svg
                    className="bi bi-caret-up-fill"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z" />
                  </svg>
                </span>
              )}
            </button>
          </div> */}
          <div className="my-2 mr-4" style={{ width: "200px" }}>
            <span className="mr-2">Sort by: </span>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setSortName(!sortName)}
            >
              Name
              {sortName ? (
                <span className="ml-2">
                  <svg
                    className="bi bi-caret-down-fill"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z" />
                  </svg>
                </span>
              ) : (
                <span className="ml-2">
                  <svg
                    className="bi bi-caret-up-fill"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z" />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </div>
        <Route path="/" exact>
          <div className="mx-2 mt-1 row justify-content-center">
            {animes.length > 0 ? (
              animes.map((anime) => {
                return <CardComponent anime={anime} key={anime.mal_id} />;
              })
            ) : (
              <div>
                <h1 className="text-center text-light d-flex align-items-center">
                  <em> Loading </em> <Spinner animation="grow" variant="info" />
                </h1>
              </div>
            )}
          </div>
        </Route>
        <Route path="/favorite" exact component={Favorite} />
        <Route path="/detail/:id" exact component={Detail} />
        <Route path="/page1" exact component={Page1} />
        <Route path="/page2" exact component={Page2} />
      </div>
    </>
  );
}

export default Home