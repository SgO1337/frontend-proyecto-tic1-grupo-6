import MovieInformation from "../components/MovieInformation";
import React from "react";
import SeatsForm from "../components/SeatsForm";
import Navbar from "../components/Navbar";

const SeatsPage = () => {


    return (
        <div>
            <div>
                <Navbar/>
            </div>

            <div className="seats-page">
                <div className="movie-information">
                    <MovieInformation/>
                </div>

                <div className="seats-display">
                    <SeatsForm/>
                </div>
            </div>
        </div>
    );
}

export default SeatsPage;