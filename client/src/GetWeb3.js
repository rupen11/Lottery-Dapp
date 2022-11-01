import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

const GetWeb3 = () =>
    new Promise((resolve, reject) => {
        window.addEventListener("load", async () => {
            try {
                // Modern dapp browsers...
                let provider = await detectEthereumProvider();
                if (provider) {
                    const web3 = new Web3(provider);
                    resolve(web3);
                }
                // Legacy dapp browsers...
                else if (window.web3) {
                    const web3 = window.web3;
                    resolve(web3);
                }
                // Fallback to localhost; use dev console port by default...here default is ganache
                else {
                    const provider = new Web3.providers.HttpProvider(
                        "http://127.0.0.1:7545"
                    );
                    const web3 = new Web3(provider);
                    resolve(web3);
                }
            } catch (error) {
                reject(error);
            }
        });
    });

export default GetWeb3;
