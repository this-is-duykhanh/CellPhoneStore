import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Copyright from "../../internals/components/Copyright";
import OrdersTable from "./OrdersTable";

export default function MainGridOrders() {
	return (
		<Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
			{/* cards */}
			<Typography component="h2" variant="h6" sx={{ mb: 2 }}>
				All orders
			</Typography>
			<Grid container spacing={2} columns={12}>
				<Grid size={{ xs: 12, lg: 12 }}>
					<OrdersTable />
				</Grid>
				<Grid size={{ xs: 12, lg: 3 }}>
					<Stack
						gap={2}
						direction={{ xs: "column", sm: "row", lg: "column" }}
					/>
				</Grid>
			</Grid>
			<Copyright sx={{ my: 4 }} />
		</Box>
	);
}