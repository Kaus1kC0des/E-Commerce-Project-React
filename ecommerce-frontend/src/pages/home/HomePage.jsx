import "./HomePage.css";
import {Header} from "../../components/Header.jsx";
import axios from "axios";
import {useEffect, useState} from "react";
import {ProductsGrid} from "./ProductsGrid.jsx";

export function HomePage({cart}) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
            const response  = await axios.get("/api/products")
            setProducts(response?.data);
        }
        getProducts().then(() => console.log("Products fetched successfully!"));
    }, []);

    return (

        <>
            <title>Home</title>
            <link rel="icon" href="/home-favicon.png"/>
            <Header cart={cart}/>
            <div className="home-page">
                <ProductsGrid products={products}/>
            </div>
        </>
    );
}
