import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <Link to="/manager">
                <button>Manager</button>
            </Link>
            <Link to="/players">
                <button>Player</button>
            </Link>
        </>
    );
};

export default Home;
