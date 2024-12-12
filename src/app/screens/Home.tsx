import { Colors } from "../../constants";
import { useState } from "react";
import BottomNavBar from "../../components/UI/BottomNavBar";
import { selectUser } from "../../store/reducer-slices";
import { useSelector } from "react-redux";
import BackgroundContainer from "../../components/UI/BackgroundContainer";
import GreyGridboxContainer from "../../components/UI/GreyGridboxContainer";
import { Box, Slide, Typography } from "@mui/material";

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
					<GreyGridboxContainer>
						<Box>
							<Typography sx={{ fontSize: 20 }} color="white">
								Slots today:
							</Typography>
							<Typography sx={{ fontSize: 20 }} color="white">
								16
							</Typography>
						</Box>
					</GreyGridboxContainer>
				)}

				<Slide direction="up" in={checked} mountOnEnter unmountOnExit>
					<Box
						sx={{
							background: Colors.accentPurple500,
							height: "100vh",
						}}
						justifyItems="center"
					>
						<Typography sx={{ fontSize: 40 }} color="white">
							Booking slot:
						</Typography>
					</Box>
				</Slide>
			</BackgroundContainer>

			<BottomNavBar onBookClick={handleChange} />
		</>
	);
};

export default Home;
