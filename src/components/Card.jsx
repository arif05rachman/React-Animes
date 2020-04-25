import React from "react";
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { addFavorite, unFavorite } from '../store/actions'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux";

function CardComponent(props) {
  const favorites = useSelector(state => state.listFavorite.favorites);
  
  const dispatch = useDispatch()
  const {
      mal_id,
      rank,
      title,
      url,
      image_url,
      type,
    score } = props.anime
  let favorited = false
  // console.log(favorites)
  favorites.forEach(favorite => {
    if (favorite.mal_id === mal_id) {
      favorited = true
    }
  })
  return (
    <div className="col my-2 d-flex justify-content-center">
      <Card style={{ width: "14rem" }} className="rounded-lg shadow">
        <Card.Img variant="top" src={image_url} height="300px" />
        <Card.Body>
          <Card.Header className="rounded-lg">
            <h5>Rank: {rank}</h5>
          </Card.Header>
          <Card.Title data-testid="card-title">{title}</Card.Title>
          <ul className="text-left">
            <li>Score: {score}</li>
            <li>Type: {type}</li>
            <li>
              Url:{" "}
              <a href={url} target="_blank" rel="noopener noreferrer">
                Link
              </a>
            </li>
          </ul>
          <div className="d-flex justify-content-around">
            <Link className="disabled" to={{ pathname: `/detail/${mal_id}` }}>
              <button
                data-testid="detail-button"
                type="button"
                className="btn btn-info"
              >
                <em>Detail</em>
              </button>
            </Link>
            {!favorited ? (
              <button
                data-testid="add-favorite-button"
                type="button"
                className="btn btn-secondary"
                onClick={() => dispatch(addFavorite(props.anime))}
              >
                <em>Add Fav</em>
              </button>
            ) : (
              <button
                data-testid="un-favorite-button"
                type="button"
                className="btn btn-warning"
                onClick={() => dispatch(unFavorite(props.anime.mal_id))}
              >
                <em>Un-Fav</em>
              </button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardComponent