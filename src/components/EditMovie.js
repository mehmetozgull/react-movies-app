import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditMovie = ({onUpdateMovie}) => {
    const [movie, setMovie] = useState({
        name: "",
        rating: "",
        overview: "",
        imageURL: ""
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovie = async () => {
            const response = await axios.get(`http://localhost:3002/movies/${id}`);
            setMovie(response.data);
        };
        fetchMovie();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovie({
            ...movie,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const updatedMovie = {
            id,
            name: movie.name,
            rating: movie.rating,
            overview: movie.overview,
            imageURL: movie.imageURL
        };

        await axios.put(`http://localhost:3002/movies/${id}`, updatedMovie);

        // onUpdateMovie callback fonksiyonunu çağırarak ana bileşene güncellenen filmi iletin
        onUpdateMovie(updatedMovie);

        // Yönlendirme işlemi
        navigate('/');
    };

    return (
        <div className="container">
            <form className="mt-5" onSubmit={handleFormSubmit}>
                <input className="form-control" id="disabledInput" type="text" placeholder="Edit The Form To Update A Movie.." disabled />
                <div className="row mt-3">
                    <div className="form-group col-md-10">
                        <label htmlFor="inputName">Name</label>
                        <input type="text"
                            className="form-control"
                            name="name"
                            value={movie.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputRating">Rating</label>
                        <input
                            type="text"
                            className="form-control"
                            name="rating"
                            value={movie.rating}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputImage">Image URL</label>
                        <input
                            type="text"
                            className="form-control"
                            name="imageURL"
                            value={movie.imageURL}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="form-group col-md-12">
                        <label htmlFor="overviewTextarea">Overview</label>
                        <textarea
                            className="form-control"
                            name="overview"
                            rows="5"
                            value={movie.overview}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                </div>
                <input type="submit" className="btn btn-danger btn-block mt-3" value="Update Movie" />
            </form>
        </div>
    );
}

export default EditMovie;
