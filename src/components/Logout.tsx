import React from "react";
import Grid from "@mui/material/Grid2";
import { auth } from "../firebaseConfig";
import { Button } from "@mui/material";
import { clearUser } from "../store/reducer-slices/authSlice";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";

const Logout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				navigate("/");
				dispatch(clearUser());
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return <LogoutIcon onClick={handleLogout} />;
};

export default Logout;
