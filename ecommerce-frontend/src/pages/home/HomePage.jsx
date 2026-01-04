import "./HomePage.css";
import {Header} from "../../components/Header.jsx";
import axios from "axios";
import {useEffect, useState} from "react";
import {ProductsGrid} from "./ProductsGrid.jsx";
import {useNavigate, useSearchParams} from "react-router";

export function HomePage({cart, loadCart}) {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search");
    useEffect(() => {
        const getProducts = async () => {
            const response  = await axios.get("/api/products" + (search ? `?search=${search}` : ""));
            setProducts(response?.data);
        }
        getProducts().then(() => console.log("Products fetched successfully!"));
    }, [search]);

    return (

        <>
            <title>Home</title>
            <link rel="icon" href="/home-favicon.png"/>
            <Header cart={cart} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart}/>
            </div>
        </>
    );
}
