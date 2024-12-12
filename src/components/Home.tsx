import Grid from "@mui/material/Grid2";
import Logout from "./Logout";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../store/reducer-slices";

const Home = () => {
	const user = useSelector(selectUser);

	return (
		<Grid container spacing={5} direction="column" alignItems="center">
			<Typography variant="h3">Welcome home! </Typography>
			<Typography>{user.email}</Typography>
			<Logout />
		</Grid>
	);
};

export default Home;
