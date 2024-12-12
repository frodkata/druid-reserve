import Home from "./screens/Home";
import BottomNavBar from "../components/UI/BottomNavBar";
import { Routes, Route } from "react-router";

const AuthenticatedApp = () => {
	return (
		<>
			<Routes>
				<Route path="/home" element={<Home />} />
			</Routes>
		</>
	);
};

export default AuthenticatedApp;
