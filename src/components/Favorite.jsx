import React from 'react'
import { useSelector } from 'react-redux'
// import { Card } from 'react-bootstrap'
import CardComponent from "../components/Card";


export default () => {
  const favoritesList = useSelector(state => state.listFavorite.favorites);
  const searchQuery = useSelector((state) => state.inputSearch.searchQuery);

  let favorites = favoritesList.filter(
    (anime) =>
      anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anime.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>  
      <div className="text-center mx-2 mt-5 row justify-content-center">
        {/* <h1 data-testid="favorite-component">favorite-component</h1> */}
        {favorites.length > 0 ? (
          favorites.map(favorite => {
            return (
              <CardComponent
                anime={favorite}
                favorite={"none"}
                key={favorite.mal_id}
              />
            );
          })
        ) : (
          <div className="mx-5 mb-4">
            <h1 className="text-light">No Data</h1>
          </div>
        )}
      </div>
    </>
  );
}