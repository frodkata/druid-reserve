import SlideUp from "../../components/SlideUp";
import { Colors } from "../../constants";
import { useState } from "react";
import BottomNavBar from "../../components/UI/BottomNavBar";
import { selectUser } from "../../store/reducer-slices";
import { useSelector } from "react-redux";
import BackgroundContainer from "../../components/UI/BackgroundContainer";
import GreyGridboxContainer from "../../components/UI/GreyGridboxContainer";
import { Box, Typography } from "@mui/material";

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

				<SlideUp checked={checked} />
			</BackgroundContainer>

			<BottomNavBar onBookClick={handleChange} />
		</>
	);
};

export default Home;
