import * as React from "react";
import { AuthUser } from "../types";
import { Navigate } from "react-router-dom";

interface Props {
	children: React.ReactNode;
	user: AuthUser;
}

const AuthRoute = ({ children, user }: Props) => {
	return user.isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthRoute;
