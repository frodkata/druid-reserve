import { AuthUser } from "../../types/AuthUser";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * 	modifies `state`. A good approach.
	state.foo = bar

	this reassigns `state`/changes the reference. this is not supported!
	state = bar

	this returns a new object. A good approach
	return bar
 */

const initialState: AuthUser = {
	uid: "",
	email: "",
	isAuthenticated: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<AuthUser>) => {
			return { ...action.payload };
		},
		clearUser: () => {
			return initialState;
		},
	},
	selectors: {
		selectUser: (state) => state,
	},
});

// Action creators are generated for each case reducer function
export const { selectUser } = authSlice.selectors;
export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
