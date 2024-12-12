import GlobalRouter from "./app/GlobalRouter";
import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./store/redux-setup";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/styled-engine";
import "./index.css";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<React.StrictMode>
		<StyledEngineProvider injectFirst>
			<Provider store={store}>
				<BrowserRouter>
					<GlobalRouter />
				</BrowserRouter>
			</Provider>
		</StyledEngineProvider>
	</React.StrictMode>
);
