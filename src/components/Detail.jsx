import React, { useEffect} from 'react'
// import useFetch from "../hooks/useFetch";
import { Card, Image, Spinner, Table } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getAnime } from "../store/actions";

export default () => {
  const dispatch = useDispatch();
  const { id } = useParams()
  useEffect(() => {
    dispatch(getAnime(`https://api.jikan.moe/v3/anime/${id}`));
  }, [id, dispatch]);
  const anime = useSelector(state => state.detailAnime.anime);
  return (
    <>
      {anime ? (
        <div className="px-5 mb-4">
          <Card className="p-2">
            <div className="text-left">
              <Link to="/">
                <button className="btn btn-dark">Back</button>
              </Link>
            </div>
            <Card className="">
              <h1 data-testid="detail-title">{anime.title}</h1>
              <h4>({anime.title_japanese})</h4>
            </Card>
            <h5>Information</h5>
            <Card className="p-4 my-2">
              <div className="row">
                <div className="col text-center">
                  {anime.image_url ? (
                    <Image src={anime.image_url} thumbnail className="shadow" />
                  ) : (
                    <h1
                      className="text-center d-flex align-items-center"
                      style={{ zIndex: 1 }}
                    >
                      <Spinner animation="grow" variant="info" />
                    </h1>
                  )}
                </div>
                <div className="col">
                  <Table size="sm" bordered className="shadow">
                    <thead></thead>
                    <tbody>
                      <tr>
                        <td>Type</td>
                        <td>{anime.type}</td>
                      </tr>
                      <tr>
                        <td>source</td>
                        <td>{anime.source}</td>
                      </tr>
                      <tr>
                        <td>episodes</td>
                        <td>{anime.episodes}</td>
                      </tr>
                      <tr>
                        <td>status</td>
                        <td>{anime.status}</td>
                      </tr>
                      <tr>
                        <td>aired</td>
                        <td>{anime.aired ? anime.aired.string : "-"} </td>
                      </tr>
                      <tr>
                        <td>rating</td>
                        <td>{anime.rating}</td>
                      </tr>
                      <tr>
                        <td>score</td>
                        <td>
                          {anime.score} from {anime.scored_by} votes
                        </td>
                      </tr>
                      <tr>
                        <td>premiered</td>
                        <td>{anime.premiered}</td>
                      </tr>
                      <tr>
                        <td>broadcast</td>
                        <td>{anime.broadcast}</td>
                      </tr>
                      <tr>
                        <td>members</td>
                        <td>{anime.members}</td>
                      </tr>
                      <tr>
                        <td>favorites</td>
                        <td>{anime.favorites}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </Card>
          </Card>
          <Card className="p-2 my-2">
            <h5>Trailer</h5>
            <Card className="p-1 pb-5 w-100 h-100 position-relative text-center">
              <div style={{ height: "50vw" }}>
                <iframe
                  title={id}
                  className="position-relative top-0 left-0 w-100 h-100"
                  src={anime.trailer_url}
                  frameBorder="0"
                  // allow="encrypted-media; gyroscope; picture-in-picture"
                  // allowFullScreen
                ></iframe>
              </div>
            </Card>
          </Card>
          <Card className="p-2 my-2">
            <h5>Synopsis</h5>
            <Card className="p-4">
              <p className="text-justify">{anime.synopsis}</p>
            </Card>
          </Card>
          <Card className="p-2 my-2">
            <h5>Background</h5>
            <Card className="p-4">
              <p className="text-justify">{anime.background}</p>
            </Card>
          </Card>
        </div>
      ) : (
        <h1 className="text-center text-light d-flex align-items-center">
          <em> Loading </em> <Spinner animation="grow" variant="info" />
        </h1>
      )}
    </>
  );
} 