import Home from "./screens/Home";
import { Routes, Route } from "react-router";
import MyBookings from "./screens/MyBookings";

const AuthenticatedApp = () => {
	return (
		<>
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/myBookings" element={<MyBookings />} />
			</Routes>
		</>
	);
};

export default AuthenticatedApp;
