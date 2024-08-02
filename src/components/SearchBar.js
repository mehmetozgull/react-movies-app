import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchBar extends Component{


    handleFormSubmit = (event) => {
        event.preventDefault();
    }

    render(){
        return(
            <form onSubmit={this.handleFormSubmit}>
                <div className="row mb-5">
                    <div className="col-lg-10">
                        <input type="text" 
                        onChange={this.props.searchMovieProp} 
                        className="form-control" 
                        placeholder="Search a movie" 
                        />
                    </div>
                    <div className="col-lg-2">
                        <Link to={"/add"} type="button" className="btn btn-md btn-danger" style={{float: "right"}}>Add Movie</Link>
                    </div>
                </div>
            </form>
        )
    }

}

export default SearchBar;