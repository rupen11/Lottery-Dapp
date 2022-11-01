import React, { useEffect, useState } from "react";
import "./Manager.css";

const Manager = ({ web3Api }) => {
    const [account, setAccout] = useState("");
    const [contractbalance, setContractbalance] = useState(0);
    const [lotterywinner, setLotterywinner] = useState("No winner yet!");

    const contractBalance = async () => {
        try {
            const { web3, contract } = web3Api;
            const balance = await web3.eth.getBalance(contract._address);
            setContractbalance(web3.utils.fromWei(balance, "ether"));
        } catch (error) {
            setContractbalance("You can not access");
        }
    };

    const winner = async () => {
        try {
            const { contract } = web3Api;
            await contract.methods.pickWinner().send({ from: account });
            const winner = await contract.methods.winner().call();
            setLotterywinner(winner);
        } catch (e) {
            if (e.message.includes("You are not the manager")) {
                setLotterywinner("You are not the manager");
            } else if (e.message.includes("Players are less than 3")) {
                setLotterywinner("There are less than 3 players");
            } else {
                setLotterywinner("No winner yet");
            }
        }
    };

    useEffect(() => {
        const getAccount = async () => {
            const { web3 } = web3Api;
            const accounts = await web3.eth.getAccounts();
            setAccout(accounts[0]);
        };

        web3Api.web3 && getAccount();
    }, [web3Api, web3Api.web3]);

    return (
        <>
            <h5>{account}</h5>
            <h5>{contractbalance}</h5>
            <button onClick={contractBalance}>Check Balance</button>
            <h5>{lotterywinner}</h5>
            <button onClick={winner}>Winner</button>
        </>
    );
};

export default Manager;
