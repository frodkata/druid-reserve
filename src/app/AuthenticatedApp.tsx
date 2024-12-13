import Home from "./screens/Home";
import BottomNavBar from "../components/UI/BottomNavBar";
import { Routes, Route } from "react-router";
import { CssBaseline } from "@mui/material";

const AuthenticatedApp = () => {
	return (
		<>
			<CssBaseline />
			<Routes>
				<Route path="/home" element={<Home />} />
			</Routes>
		</>
	);
};

export default AuthenticatedApp;
