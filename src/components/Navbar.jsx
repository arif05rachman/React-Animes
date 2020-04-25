import React from "react";
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { setSearchQuery} from '../store/actions'

export default function NavbarComponent(props) {
  const dispatch = useDispatch()
  const searchQuery = useSelector(
    state => state.inputSearch.searchQuery
  );
  // console.log(searchQuery, "ini search query")
  const handleSearch = e => {
    dispatch(setSearchQuery(e.target.value))
  }
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <div data-testid="navbar-title" className="navbar-brand">
        React-Anime Top 50
      </div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link
            data-testid="home-button"
            to="/"
            className="nav-link"
          >
            Home
          </Link>
          <Link
            data-testid="favorite-button"
            to="/favorite"
            className="nav-link nav-fill"
          >
            Favorite
          </Link>
          {/* Home</Nav.Link> */}
        </Nav>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            value={searchQuery}
            onChange={handleSearch}
          />
          {/* <Button variant="primary">Search</Button> */}
        </Form>
      </Navbar.Collapse>
    </Navbar>
  ); 
}

// }

// export default NavbarComponent