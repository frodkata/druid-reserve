import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../store/reducer-slices";
import AuthenticatedApp from "./AuthenticatedApp";
import GuestApp from "./GuestApp";

function GlobalRouter() {
	const user = useSelector(selectUser);
	return (
		<>
			<CssBaseline />
			{user.isAuthenticated ? <AuthenticatedApp /> : <GuestApp />}
		</>
	);
}

export default GlobalRouter;
