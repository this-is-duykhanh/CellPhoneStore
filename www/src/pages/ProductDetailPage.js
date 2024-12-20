import {
    Box,
    Button,
    Divider,
    Grid,
    MenuItem,
    Rating,
    TextField,
    Typography,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import CommentsSection from "../components/product/CommentSection";
import ProductNotFound from "../components/product/ProductNotFound";
import ToastNoti from "../components/toast-noti/ToastNoti";

const ProductDetailPage = () => {
    const [product, setProduct] = useState(null);

    const [selectedColor, setSelectedColor] = useState(null); // Default color

    const [loading, setLoading] = useState(true);
    // This should be at the top, outside of any conditional or function
    const [showToast, setShowToast] = useState(false);

    const [score, setScore] = useState(0);
    const [reviews, setReviews] = useState(0);

    const [error, setError] = useState(false);

    const { id } = useParams();

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    const [cookies] = useCookies(["accessToken"]);

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_BACKEND_URL}/api/v1/products/${id}/rating`
                );
                if (res.status !== 200) {
                    setError(true);
                    return;
                }
                const data = await res.json();

                console.log(data);
                setScore(data.score);
                setReviews(data.reviews);
            } catch (err) {
                console.error("Error fetching rating:", err);
                setError(true);
            }
        };
        fetchRating();
    }, [id]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `${process.env.REACT_APP_BACKEND_URL}/api/v1/products/${id}`
                );

                if (res.status !== 200) {
                    setError(true);
                    setLoading(false);
                    return;
                }

                const data = await res.json();

                setProduct(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError(true);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleColorChange = (event) => {
        const color = product.variants.find(
            (c) => c.name === event.target.value
        );
        setSelectedColor(color);
    };

    const handleAddToCart = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/cart`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies.accessToken}`,
            },
            body: JSON.stringify({
                productId: product.productId,
                quantity: 1,
                variantId: selectedColor?._id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 3000);
                } else alert(JSON.stringify(data));
                // alert("Vui long chon mau san pham");
            });

        // Hide toast after 3 seconds
    };

    const handleSubmitComment = (_newComment) => {
        // You can handle this to notify parent or log, or any other purpose
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error || !product) {
        return <ProductNotFound />;
    }

    return (
        <Box sx={{ padding: "1.25em", marginTop: "4em" }}>
            {/* Product Detail */}
            <Box
                sx={{ minHeight: "70vh", width: "80%", margin: "1.25em auto" }}
            >
                <Grid container spacing={4} alignItems="center">
                    {/* Image Section */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                display: "flex",
                                justifyContent: "center",
                                overflow: "hidden",
                                height: "400px",
                                backgroundColor: "#f9f9f9",
                            }}
                        >
                            <img
                                style={{
                                    maxWidth: "90%",
                                    maxHeight: "100%",
                                    objectFit: "contain",
                                }}
                                src={`${
                                    process.env.REACT_APP_BACKEND_URL
                                }/images/${
                                    selectedColor?.image || product.image
                                }`}
                                alt={`${product?.name} - ${
                                    selectedColor?.name || ""
                                }`}
                            />
                        </Box>
                    </Grid>

                    {/* Content Section */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ paddingLeft: 2 }}>
                            <Typography
                                variant="h4"
                                color="textPrimary"
                                gutterBottom
                            >
                                {product.name}
                            </Typography>
                            <Typography
                                variant="h5"
                                color={product.stock > 0 ? "" : "red"}
                                sx={{ mb: 1 }}
                            >
                                {product.stock > 0 ? "" : "Out of stock"}
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{ color: "green", mb: 2 }}
                            >
                                {formatPrice(product.price)}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {product.description}
                            </Typography>

                            <Box sx={{ mb: 2 }}>
                                <Rating
                                    name="product-rating"
                                    value={score || 0}
                                    precision={0.5}
                                    readOnly
                                />
                                <Typography
                                    variant="body2"
                                    sx={{ color: "gray" }}
                                >
                                    ({reviews || 0} reviews)
                                </Typography>
                            </Box>

                            {product?.variants &&
                            Array.isArray(product.variants) &&
                            product.variants.length > 0 ? (
                                <Box sx={{ my: 2 }}>
                                    <Typography variant="body1" mb={1}>
                                        Color
                                    </Typography>
                                    <TextField
                                        select
                                        variant="outlined"
                                        fullWidth
                                        value={selectedColor?.name}
                                        onChange={handleColorChange}
                                        sx={{
                                            maxWidth: "150px",
                                            height: "35px",
                                            "& .MuiOutlinedInput-root": {
                                                height: "35px",
                                            },
                                        }}
                                    >
                                        {product.variants.map((color) => (
                                            <MenuItem
                                                key={color.name}
                                                value={color.name}
                                            >
                                                {color.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                            ) : null}

                            <Button
                                variant="contained"
                                color="success"
                                sx={{ mr: 2 }}
                                disabled={product.stock === 0} // Disable 'Buy now' if out of stock
                            >
                                Buy now
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddToCart}
                                disabled={product.stock === 0} // Disable 'Buy now' if out of stock
                            >
                                Add to cart
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Divider sx={{ maxWidth: "80%", margin: "1.25em auto" }} />

            {/* Comments Section */}
            <Box sx={{ marginTop: 5, maxWidth: "70%", margin: "1.25em auto" }}>
                <CommentsSection
                    initialComments={product.comments}
                    id={id}
                    onSubmitComment={handleSubmitComment}
                />
            </Box>

            {/* Toast Notification */}
            {showToast && (
                <ToastNoti
                    message="The product has been added to the cart!"
                    type="success"
                    position="top-right"
                    autoClose={3000}
                />
            )}
        </Box>
    );
};

export default ProductDetailPage;
