import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { auth } from "../../firebaseConfig";
import { setUser } from "../../store/reducer-slices/authSlice";
import { AuthUser } from "../../types";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import BackgroundContainer from "../../components/UI/BackgroundContainer";
import GreyGridboxContainer from "../../components/UI/GreyGridboxContainer";
import SendIcon from "@mui/icons-material/Send";
import { Colors } from "../../constants";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onLogin = (e: any) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user: AuthUser = {
					isAuthenticated: true,
					email: userCredential.user.email,
					uid: userCredential.user.uid,
				};
				dispatch(setUser(user));
				navigate("/home");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	};

	return (
		<BackgroundContainer>
			<Grid
				justifyItems="center"
				alignContent="center"
				sx={{ height: "100vh" }}
			>
				<GreyGridboxContainer sx={{ width: "35vh" }}>
					<TextField
						label="Email"
						color="warning"
						variant="standard"
						focused
						fullWidth
						onChange={(e) => setEmail(e.target.value)}
					/>
				</GreyGridboxContainer>

				<GreyGridboxContainer sx={{ width: "35vh" }}>
					<TextField
						id="outlined-basic"
						label="Password"
						color="warning"
						variant="standard"
						type="password"
						focused
						fullWidth
						onChange={(e) => setPassword(e.target.value)}
					/>
				</GreyGridboxContainer>

				<Box>
					<Button
						variant="text"
						onClick={onLogin}
						endIcon={<SendIcon />}
						sx={{ color: Colors.orange }}
					>
						Login
					</Button>
				</Box>

				<Box>
					<Typography variant="caption" fontWeight="500" color="white">
						No account yet?{" "}
						<NavLink
							to="/signup"
							style={{ textDecoration: "none", color: Colors.orange }}
						>
							Sign up
						</NavLink>
					</Typography>
				</Box>
			</Grid>
		</BackgroundContainer>
	);
};

export default Login;
