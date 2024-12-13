import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { auth } from "../../firebaseConfig";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, TextField, Box, Typography } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import BackgroundContainer from "../../components/UI/BackgroundContainer";
import GreyGridboxContainer from "../../components/UI/GreyGridboxContainer";
import SendIcon from "@mui/icons-material/Send";
import { Colors } from "../../constants";

const Signup = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordMatch, setPasswordMatch] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const onSubmit = async (e: any) => {
		e.preventDefault();

		passwordMatch &&
			(await createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					console.log(user);
					navigate("/login");
				})
				.catch((error) => {
					const errorMessage = error.message;
					setErrorMessage(errorMessage);
				}));
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
						id="outlined-basic"
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
				<GreyGridboxContainer sx={{ width: "35vh", justifyContent: "center" }}>
					<TextField
						id="outlined-basic"
						label="Confirm Password"
						color="warning"
						variant="standard"
						type="password"
						focused
						fullWidth
						onChange={(e) => setPasswordMatch(e.target.value === password)}
					/>
					<Typography variant="caption" color="error">
						{!passwordMatch && <p>Passwords do not match</p>}
					</Typography>
				</GreyGridboxContainer>
				<Button
					variant="text"
					onClick={onSubmit}
					endIcon={<SendIcon />}
					sx={{ color: Colors.orange }}
				>
					Sign Up
				</Button>
				<Box>
					<Typography variant="caption" fontWeight="500" color="white">
						Already have an account?{" "}
						<NavLink
							to="/login"
							style={{ textDecoration: "none", color: Colors.orange }}
						>
							Sign in
						</NavLink>
					</Typography>
				</Box>
				<Typography color="error">{errorMessage}</Typography>
			</Grid>
		</BackgroundContainer>
	);
};

export default Signup;
