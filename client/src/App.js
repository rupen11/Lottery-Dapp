import { useEffect, useState } from "react";
import "./App.css";
import Manager from "./components/Manager";
import GetWeb3 from "./GetWeb3";
import Lottery from "./contracts/Lottery.json";
import Player from "./components/Player";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";

function App() {
    const [web3Api, setWeb3Api] = useState({
        web3: null,
        contract: null,
    });

    const [address, setAddress] = useState(null);

    useEffect(() => {
        const fetchWeb3 = async () => {
            try {
                const web3 = await GetWeb3();
                const networkId = await web3.eth.net.getId();
                const deployedNetwork = Lottery.networks[networkId];
                // console.log("Contract Address:", deployedNetwork.address);
                const contract = new web3.eth.Contract(
                    Lottery.abi,
                    deployedNetwork?.address
                );

                setAddress(deployedNetwork.address);
                setWeb3Api({
                    web3,
                    contract,
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchWeb3();
    }, []);
    return (
        <>
            <div className="main_container">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route
                        exact
                        path="/manager"
                        element={<Manager web3Api={web3Api} />}
                    />
                    <Route
                        exact
                        path="/players"
                        element={<Player web3Api={web3Api} address={address} />}
                    />
                </Routes>
            </div>
        </>
    );
}

export default App;
