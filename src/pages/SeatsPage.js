import MovieInformation from "../components/MovieInformation";
import React from "react";
import SeatsForm from "../components/SeatsForm";

const SeatsPage = () => {


    return (
        <div className={"seats-page"}>
            <div className="movie-information">
                <MovieInformation/>
            </div>

            <div className="seats-display">
                <SeatsForm/>
            </div>

        </div>
        )
}

export default SeatsPage;