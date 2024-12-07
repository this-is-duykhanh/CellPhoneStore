// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Navigation from "./components/navigation/Navigation";
import HomePage from "./pages/HomePage";
import OrderManagementPage from "./pages/OrderManagementPage";
import CartPage from "./pages/CartPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import "bootstrap-icons/font/bootstrap-icons.css";
import SearchPage from "./pages/SearchPage";
import Error404 from "./pages/Error404";
import Error403 from "./pages/Error403";
import Profile from "./pages/UserProfilePage";
import OtpPage from "./pages/OTPPage";
import AdminRoutes from "./admin/AdminRoutes";
import BuyPage from "./pages/BuyPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import CategoryPage from "./pages/CategoryPage";
import PaymentGuide from "./pages/PaymentGuidePage";
import InvoicePage from "./pages/InvoicePage";
import ProductRatingPage from "./pages/ProductRatingPage";
import CouponPage from "./pages/CouponPage";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Routes for the user */}
                    <Route
                        path="/*"
                        element={
                            <>
                                <Header />
                                <Navigation />
                                <main>
                                    <Routes>
                                        <Route
                                            path="/"
                                            element={<HomePage />}
                                        />
                                        <Route
                                            path="/login"
                                            element={<LoginPage />}
                                        />
                                        <Route
                                            path="/orderManagement"
                                            element={<OrderManagementPage />}
                                        />
                                        <Route
                                            path="/cart"
                                            element={<CartPage />}
                                        />
                                        <Route
                                            path="/register"
                                            element={<RegisterPage />}
                                        />
                                        <Route
                                            path="/product/:id"
                                            element={<ProductDetailPage />}
                                        />
                                        <Route
                                            path="/success"
                                            element={<OrderSuccessPage />}
                                        />
                                        <Route
                                            path="/search"
                                            element={<SearchPage />}
                                        />
                                        <Route
                                            path="/profile"
                                            element={<Profile />}
                                        />
                                        <Route
                                            path="/verify"
                                            element={<OtpPage />}
                                        />
                                        <Route
                                            path="/buy-now"
                                            element={<BuyPage />}
                                        />
                                        <Route
                                            path="/forgot-password"
                                            element={<ForgotPasswordPage />}
                                        />
                                        <Route
                                            path="/payment-guide"
                                            element={<PaymentGuide />}
                                        />
                                        <Route
                                            path="/invoice"
                                            element={<InvoicePage />}
                                        />
                                        <Route
                                            path="rating"
                                            element={<ProductRatingPage />}
                                        />
                                        <Route
                                            path="/coupon"
                                            element={<CouponPage />}
                                        />
                                        <Route 
                                            path="/forgot-password/:token" 
                                            element={<ForgotPasswordPage />} 
                                        />
                                        <Route
                                            path="/catagory/:category"
                                            element={<CategoryPage />}
                                        />
                                        <Route
                                            path="/*"
                                            element={<Error404 />}
                                        />
                                        <Route
                                            path="/403"
                                            element={<Error403 />}
                                        />
                                    </Routes>
                                </main>
                                <Footer />
                            </>
                        }
                    />

                    <Route path="/admin/*" element={<AdminRoutes />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
