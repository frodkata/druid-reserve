import Home from "./screens/Home";
import { Routes, Route } from "react-router";
import MyBookings from "./screens/MyBookings";
import BookingHistory from "./screens/BookingHistory";

const AuthenticatedApp = () => {
	return (
		<>
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/myBookings" element={<MyBookings />} />
				<Route path="/bookingHistory" element={<BookingHistory />} />
			</Routes>
		</>
	);
};

export default AuthenticatedApp;
