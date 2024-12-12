import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { auth } from "../../firebaseConfig";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, TextField, Box, Typography } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";

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
		<Grid container spacing={5} direction="column" alignItems="center">
			<Box>
				<TextField
					id="outlined-basic"
					label="Email"
					variant="standard"
					onChange={(e) => setEmail(e.target.value)}
				/>
			</Box>
			<Box>
				<TextField
					id="outlined-basic"
					label="Password"
					variant="standard"
					type="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</Box>
			<Box textAlign={"center"}>
				<TextField
					id="outlined-basic"
					label="Confirm Password"
					variant="standard"
					type="password"
					onChange={(e) => setPasswordMatch(e.target.value === password)}
				/>
				<Typography variant="caption" color="error">
					{!passwordMatch && <p>Passwords do not match</p>}
				</Typography>
			</Box>
			<Button type="submit" onClick={onSubmit}>
				Sign up
			</Button>
			<Typography>
				Already have an account? <NavLink to="/login">Sign in</NavLink>
			</Typography>
			<Typography color="error">{errorMessage}</Typography>
		</Grid>
	);
};

export default Signup;
