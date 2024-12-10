import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { LineChart } from "@mui/x-charts/LineChart";
import PropTypes from "prop-types";
import * as React from "react";

function AreaGradient({ color, id }) {
	return (
		<defs>
			<linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
				<stop offset="0%" stopColor={color} stopOpacity={0.5} />
				<stop offset="100%" stopColor={color} stopOpacity={0} />
			</linearGradient>
		</defs>
	);
}

const formatRevenueData = (dailyRevenue) => {
	return dailyRevenue.map((item) => ({
		revenue: item.dailyRevenue,
	}));
};

AreaGradient.propTypes = {
	color: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
};

function getDaysInMonth(month, year) {
	const date = new Date(year, month, 0);
	const monthName = date.toLocaleDateString("en-US", {
		month: "short",
	});
	const daysInMonth = date.getDate();
	const days = [];
	let i = 1;
	while (days.length < daysInMonth) {
		days.push(`${monthName} ${i}`);
		i += 1;
	}
	return days;
}

export default function RevenueChart({ total, trend }) {
	const theme = useTheme();
	const data = getDaysInMonth(4, 2024);
	const formattedData = formatRevenueData(trend);

	const colorPalette = [
		theme.palette.primary.light,
		theme.palette.primary.main,
		theme.palette.primary.dark,
	];
	console.log(total);

	return (
		<Card variant="outlined" sx={{ width: "100%" }}>
			<CardContent>
				<Typography component="h2" variant="subtitle2" gutterBottom>
					Revenue
				</Typography>
				<Stack sx={{ justifyContent: "space-between" }}>
					<Stack
						direction="row"
						sx={{
							alignContent: { xs: "center", sm: "flex-start" },
							alignItems: "center",
							gap: 1,
						}}
					>
						<Typography variant="h4" component="p">
							{new Intl.NumberFormat("vi-VI", {
								style: "currency",
								currency: "VND",
							}).format(total)}
						</Typography>
						{/* <Chip size="small" color="success" label="+15%" /> */}
					</Stack>
					<Typography variant="caption" sx={{ color: "text.secondary" }}>
						Daily revenue for the last 30 days
					</Typography>
				</Stack>
				<LineChart
					colors={colorPalette}
					xAxis={[
						{
							scaleType: "point",
							data: formattedData.map((item) => item.date),
							tickInterval: (_index, i) => (i + 1) % 5 === 0,
						},
					]}
					series={[
						{
							id: "revenue",
							label: "Revenue",
							showMark: false,
							curve: "linear",
							stack: "total",
							area: true,
							stackOrder: "ascending",
							data: formattedData.map((item) => item.revenue),
						},
					]}
					height={250}
					margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
					grid={{ horizontal: true }}
					sx={{
						"& .MuiAreaElement-series-revenue": {
							fill: "url('#revenue')",
						},
					}}
					slotProps={{
						legend: {
							hidden: true,
						},
					}}
				>
					<AreaGradient color={theme.palette.primary.dark} id="revenue" />
				</LineChart>
			</CardContent>
		</Card>
	);
}
