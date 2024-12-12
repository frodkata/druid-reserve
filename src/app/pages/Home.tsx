import Grid from "@mui/material/Grid2";
import Logout from "../../components/Logout";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/reducer-slices";
import PrimaryButton from "../../components/UI/PrimaryButton";
import { Colors } from "../../constants";

const Home = () => {
	const user = useSelector(selectUser);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "100vh",
				backgroundColor: Colors.primary900,
				overflow: "auto",
			}}
		>
			<Grid container spacing={2} direction={"column"} alignItems={"center"}>
				<Box>
					<Typography sx={{ fontSize: 40 }} color="white">
						Welcome home!
					</Typography>
				</Box>
				<Box>
					<PrimaryButton label="Book Now" />
				</Box>
			</Grid>
		</Box>
	);
};

export default Home;
