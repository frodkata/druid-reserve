import Home from "./screens/Home";
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
