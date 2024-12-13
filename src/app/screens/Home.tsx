import { Colors } from "../../constants";
import { useState } from "react";
import BottomNavBar from "../../components/UI/BottomNavBar";
import { selectUser } from "../../store/reducer-slices";
import { useSelector } from "react-redux";
import BackgroundContainer from "../../components/UI/BackgroundContainer";
import GreyGridboxContainer from "../../components/UI/GreyGridboxContainer";
import { Box, Button, Slide, Typography } from "@mui/material";
import moment from "moment";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Grid from "@mui/material/Grid2";

const Home = () => {
	const user = useSelector(selectUser);

	const [checked, setChecked] = useState(false);

	const handleChange = () => {
		setChecked((prev) => !prev);
	};

	return (
		<>
			<BackgroundContainer>
				{!checked && (
					<>
						<GreyGridboxContainer>
							<Box
								flexDirection="column"
								display="flex"
								sx={{
									backgroundColor: Colors.accentGreen,
									borderRadius: 3,
									padding: 1,
									width: "100%",
									overflow: "hidden",
								}}
							>
								<Typography variant="h2" fontWeight="500">
									Green Zone haters:
								</Typography>
								<Typography variant="caption" fontWeight="500">
									ivan.backrachev@abx.com:
								</Typography>
								<Typography variant="caption" fontWeight="500">
									ivan.backrachev@abx.com:
								</Typography>
							</Box>
						</GreyGridboxContainer>
						<GreyGridboxContainer>
							<Box
								flexDirection="column"
								display="flex"
								sx={{
									borderRadius: 3,
									padding: 1,
									width: "100%",
									overflow: "hidden",
								}}
							>
								<Typography
									variant="h2"
									fontWeight="500"
									sx={{ color: Colors.orange }}
								>
									Availiable spots:
								</Typography>
								<Typography
									variant="body1"
									fontWeight="900"
									sx={{ color: Colors.orange }}
								>
									2
								</Typography>
							</Box>
						</GreyGridboxContainer>
					</>
				)}

				<Slide direction="up" in={checked} mountOnEnter unmountOnExit>
					<Box
						sx={{
							background: Colors.accentGreen,
							borderRadius: 3,
							overflowX: "hidden",
							overflowY: "scroll",
							m: 1,
							p: 1,
						}}
						justifyItems="center"
					>
						<Typography sx={{ fontSize: 40 }} color="black">
							Book a day
						</Typography>
						<LocalizationProvider dateAdapter={AdapterMoment}>
							<DateCalendar
								defaultValue={moment()}
								views={["day"]}
								disablePast={true}
								sx={{
									width: "80%",
								}}
							/>
						</LocalizationProvider>
						<Typography sx={{ fontSize: 30 }} color="black">
							Available Spots:
						</Typography>
						<Typography sx={{ fontSize: 10 }} color="black">
							1
						</Typography>
						<Button variant="text" sx={{ color: Colors.orange }}>
							Book Now!
						</Button>
					</Box>
				</Slide>
			</BackgroundContainer>

			<BottomNavBar onBookClick={handleChange} />
		</>
	);
};

export default Home;
