import Home from "./pages/Home";
import BottomNavBar from "../components/UI/BottomNavBar";
import { Routes, Route } from "react-router";

const AuthenticatedApp = () => {
	return (
		<>
			<BottomNavBar />
			<Routes>
				<Route path="/home" element={<Home />} />
			</Routes>
		</>
	);
};

export default AuthenticatedApp;
