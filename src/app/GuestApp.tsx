import Login from "./screens/Login";
import Signup from "./screens/SignUp";
import { Routes, Route } from "react-router";
import CssBaseline from "@mui/material/CssBaseline";

const GuestApp = () => {
	return (
		<>
			<CssBaseline />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="*" element={<Login />} /> //TODO: 404 page
			</Routes>
		</>
	);
};

export default GuestApp;
