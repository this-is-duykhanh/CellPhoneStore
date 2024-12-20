import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { Package as OrderIcon } from "@phosphor-icons/react/dist/ssr/Package";
import { TreasureChest as ProductIcon } from "@phosphor-icons/react/dist/ssr/TreasureChest";
import { Truck as DeliveryIcon } from "@phosphor-icons/react/dist/ssr/Truck";
import { Users as UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import * as React from "react";
import { useCookies } from "react-cookie";
import Copyright from "../../internals/components/Copyright";
import SessionsChart from "./SessionsChart";
import { Summary } from "./summary";

export default function MainGrid() {
    const [users, setUsers] = React.useState([]);
    const [product, setProduct] = React.useState([]);
    const [orders, setOrders] = React.useState([]);
    const [deliveries, setDeliveries] = React.useState([]);
    const [_revenue, setRevenue] = React.useState([]);
    const [cookies] = useCookies([]);
    const [totalRevenue, setTotalRevenue] = React.useState(0);
    const [trendRevenue, setTrendRevenue] = React.useState([]);
    // const [visits, setVisits] = React.useState([]);
    // const [products, setProducts] = React.useState([]);
    // const [sales, setSales] = React.useState([]);

    const fetchUsers = React.useCallback(async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/users`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${cookies.accessToken}`,
                    },
                },
            );
            const data = await response.json();
            const users = data.users;
            setUsers(users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }, [cookies]);

    const fetchProducts = React.useCallback(async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/products`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${cookies.accessToken}`,
                    },
                },
            );
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }, [cookies]);

    const fetchOrders = React.useCallback(async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/orders`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${cookies.accessToken}`,
                    },
                },
            );
            const data = await response.json();
            const orders = data.message;
            const shippingOrderCount = orders.filter(
                (order) => order.status === "shipping",
            ).length;

            setDeliveries(shippingOrderCount);
            setOrders(orders);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }, [cookies]);

    const fetchRevenue = React.useCallback(async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/orders/revenue`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${cookies.accessToken}`,
                    },
                },
            );
            const data = await response.json();

            setRevenue(data);
            setTotalRevenue(data.totalRevenue);
            setTrendRevenue(data.dailyRevenue);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }, [cookies]);

    React.useEffect(() => {
        fetchUsers();
        fetchProducts();
        fetchOrders();
        fetchRevenue();
    }, [fetchUsers, fetchProducts, fetchOrders, fetchRevenue]);

    return (
        <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "105em" } }}>
            <Box sx={{ flex: "1 1 auto", mb: 2 }}>
                <Typography variant="h4">Overview</Typography>
            </Box>

            <Grid
                container
                spacing={2}
                columns={12}
                sx={{ mb: (theme) => theme.spacing(2) }}
            >
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        lg: 3,
                    }}
                >
                    <Summary
                        amount={users.length}
                        icon={UsersIcon}
                        title="Users"
                    />
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        lg: 3,
                    }}
                >
                    <Summary
                        amount={product.length}
                        icon={ProductIcon}
                        title="Products"
                    />
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        lg: 3,
                    }}
                >
                    <Summary
                        amount={orders.length}
                        icon={OrderIcon}
                        title="Orders"
                    />
                </Grid>
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        lg: 3,
                    }}
                >
                    <Summary
                        amount={deliveries}
                        icon={DeliveryIcon}
                        title="Deliveries"
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 12 }}>
                    <SessionsChart total={totalRevenue} trend={trendRevenue} />
                </Grid>
                {/* <Grid size={{ xs: 12, md: 6 }}>
					<StatCard />
				</Grid> */}
            </Grid>

            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}
