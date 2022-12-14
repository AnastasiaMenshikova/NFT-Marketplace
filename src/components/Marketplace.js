import Navbar from "./Navbar"
import NFTTile from "./NFTTile"
import MarketplaceJSON from "../Marketplace.json"
import axios from "axios"
import { useState } from "react"

export default function Marketplace() {
    const sampleData = [
        {
            name: "NFT#1",
            description: "Alchemy's First NFT",
            website: "http://axieinfinity.io",
            image: "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
            price: "0.03ETH",
            currentlySelling: "True",
            address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
        },
    ]
    const [data, updateData] = useState([sampleData])
    const [dataFetched, updatedataFetched] = useState(false)

    async function getAllNFTs() {
        const ethers = require("ethers")

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            console.log("contract")
            let contract = new ethers.Contract(
                MarketplaceJSON.address,
                MarketplaceJSON.abi,
                signer
            )

            console.log("contract", contract)
            let transaction = await contract.getAllNfts()
            console.log("transation called", transaction)
            const items = await Promise.all(
                transaction.map(async (i) => {
                    const tokenURI = await contract.tokenURI(i.tokenId)

                    let meta = await axios.get(tokenURI)

                    meta = meta.data

                    console.log("meta", meta)

                    let price = ethers.utils.formatUnits(i.price.toString(), "ether")
                    return {
                        price,
                        tokenId: i.tokenId.toNumber(),
                        seller: i.seller,
                        owner: i.owner,
                        image: meta.image,
                        name: meta.name,
                        description: meta.description,
                    }
                })
            )

            updatedataFetched(true)
            updateData(items)
        } catch (error) {
            console.log(error)
        }
    }

    if (!dataFetched) {
        getAllNFTs()
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="flex flex-col place-items-center mt-20">
                <div className="md:text-xl font-bold text-white">Top NFTs</div>
                <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
                    {data.map((value, index) => {
                        return <NFTTile data={value} key={index}></NFTTile>
                    })}
                </div>
            </div>
        </div>
    )
}
