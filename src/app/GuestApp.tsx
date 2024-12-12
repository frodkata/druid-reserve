import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { Routes, Route } from "react-router";

const GuestApp = () => {
	return (
		<>
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
