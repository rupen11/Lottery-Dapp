import React, { useEffect, useState } from "react";
import "./Player.css";

const Player = ({ web3Api, address }) => {
    const [account, setAccount] = useState("");
    const [registerPlayers, setRegisterPlayers] = useState([]);
    const [reload, shouldReload] = useState(false);

    const reloadEffect = () => shouldReload(!reload);

    useEffect(() => {
        const getAccount = async () => {
            const { web3 } = web3Api;
            const accounts = await web3.eth.getAccounts();
            if (accounts.length !== 0) setAccount(accounts[0]);
            else setAccount("0x000000000000000000");
        };

        web3Api.web3 && getAccount();
    }, [web3Api, web3Api.web3]);

    useEffect(() => {
        const getPlayers = async () => {
            const { contract } = web3Api;
            const players = await contract.methods.allPlayers().call();
            // console.log(players);
            setRegisterPlayers(players);
            reloadEffect();
        };

        web3Api.web3 && getPlayers();
    }, [web3Api, web3Api.web3, reload]);

    return (
        <>
            <div className="container">
                <h3>{account}</h3>
                <h5>Contract Address: {address}</h5>
                {registerPlayers.length !== 0 ? (
                    registerPlayers?.map((value) => (
                        <h5 key={value}>{value}</h5>
                    ))
                ) : (
                    <h5>No players</h5>
                )}
            </div>
        </>
    );
};

export default Player;
