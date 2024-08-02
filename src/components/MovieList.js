import React, { Component, Children } from "react";
import { Link } from "react-router-dom";


const MovieList = (props) => {

    const truncateOverview = (string, maxLength) => {
        if(!string) return null;
        if(string.length <= maxLength) return string;
        return `${string.substring(0, maxLength)} ...`
    }

    return (
        <div className="row">
            {
                props.movies.map((movie, i) => (
                    <div className="col-lg-4" key={i}>
                        <div className="card mb-4 shadow-sm">
                            <img src={movie.imageURL} className="card-img-top" alt="Sample Movie" />
                            <div className="card-body">
                                <h4 className="card-title">{movie.name}</h4>
                                <p className="card-text">
                                    {truncateOverview(movie.overview, 100)}
                                </p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button type="button" onClick={(event) => props.deleteMovie(movie)} className="btn btn-md btn-outline-danger">Delete</button>
                                    <Link type="button" className="btn btn-md btn-outline-warning" to={`/edit/${movie.id}`} >Edit</Link>
                                    <h2><span className="badge bg-secondary">{movie.rating}</span></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )




}


export default MovieList;