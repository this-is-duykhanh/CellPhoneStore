import React from "react";
import ProductList from "../components/ProductList";

const HomePage = () => {
    // Dữ liệu mẫu cho các sản phẩm
    const products = [
        {
            id: 1,
            name: "Product 1",
            price: 29.99,
            image: "/image/ip16.jpg",
        },
        {
            id: 2,
            name: "Product 2",
            price: 39.99,
            image: "/image/ip16.jpg",
        },
        {
            id: 3,
            name: "Product 3",
            price: 19.99,
            image: "/image/ip16.jpg",
        },
        {
            id: 4,
            name: "Product 4",
            price: 19.99,
            image: "/image/ip16.jpg",
        },
    ];

    return (
        <div>
            <ProductList title="SALE PRODUCTS" products={products} />
            <ProductList title="HOT PRODUCTS" products={products} />
            <ProductList title="NEW PRODUCTS" products={products} />
        </div>
    );
};

export default HomePage;
