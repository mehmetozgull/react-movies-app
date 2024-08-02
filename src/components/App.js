import React, { Component } from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


class App extends Component {

    state = {
        "movies": [],
        searchQuery: ""
    }


    async componentDidMount() {
        const response = await axios.get("http://localhost:3002/movies")
        this.setState(state => ({ movies: response.data }))
    }


    deleteMovie = async (movie) => {

        await axios.delete(`http://localhost:3002/movies/${movie.id}`);
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );
        this.setState(state => ({ movies: newMovieList }));

    }

    searchMovie = (event) => {
        console.log(event.target.value);
        this.setState({
            searchQuery: event.target.value
        })
    }

    updateMovie = (updatedMovie) => {
        const updatedMovieList = this.state.movies.map((movie) =>
            movie.id === updatedMovie.id ? updatedMovie : movie
        );
        this.setState({ movies: updatedMovieList });
    }

    addMovie = async (movie) => {
        await axios.post(`http://localhost:3002/movies/`, movie);
        this.setState( state => ({
            movies: state.movies.concat([movie])
        }))
    }

    render() {

        let filteredMovies = this.state.movies.filter(
            (movie) => {
                return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLocaleLowerCase()) !== -1
            }
        ).sort((a, b) => {
            return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
        })

        return (
            <Router>
                <Routes>
                    <Route path="/" element={
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <SearchBar searchMovieProp={this.searchMovie} />
                                </div>
                                <div className="col-lg-12">
                                    <MovieList movies={filteredMovies} deleteMovie={this.deleteMovie} />
                                </div>
                            </div>
                        </div>
                    } />
                    <Route path="/add" element={<AddMovie onAddMovie={(movie) => {this.addMovie(movie)}} />} />
                    <Route path="/edit/:id"  element={<EditMovie onUpdateMovie={this.updateMovie} />} />
                </Routes>
            </Router>
        );
    }

}

export default App;