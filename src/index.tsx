import GlobalRouter from "./app/GlobalRouter";
import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./store/redux-setup";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/styled-engine";
import "./index.css";
import { responsiveFontSizes, ThemeProvider } from "@mui/material";
import { theme } from "./theme";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<StyledEngineProvider injectFirst>
		<ThemeProvider theme={responsiveFontSizes(theme)}>
			<Provider store={store}>
				<BrowserRouter>
					<GlobalRouter />
				</BrowserRouter>
			</Provider>
		</ThemeProvider>
	</StyledEngineProvider>
);
