import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { auth } from "../../firebaseConfig";
import { setUser } from "../../store/reducer-slices/authSlice";
import { AuthUser } from "../../types";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Box, Button, TextField, Typography } from "@mui/material";
import BackgroundContainer from "../../components/UI/BackgroundContainer";

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
		<BackgroundContainer backgroundColor="white">
			<Grid justifyItems="center">
				<Box>
					<TextField
						id="outlined-basic"
						label="email"
						variant="standard"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Box>

				<Box>
					<TextField
						id="outlined-basic"
						label="password"
						variant="standard"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Box>

				<Box>
					<Button variant="contained" onClick={onLogin}>
						Login
					</Button>
				</Box>

				<Box>
					<Typography>
						No account yet? <NavLink to="/signup">Sign up</NavLink>
					</Typography>
				</Box>
			</Grid>
		</BackgroundContainer>
	);
};

export default Login;
