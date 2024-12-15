import { AppBar, Box, Fab, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Colors } from "../../constants";
import Logout from "../Logout";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import { useState } from "react";

interface Props {
	onBookClick: () => void;
	onMenuClick: () => void;
}

const BottomNavBar = ({ onBookClick, onMenuClick }: Props) => {
	const [isSelected, setIsSelected] = useState(false);

	const handleChange = () => {
		onBookClick();
		setIsSelected((prev) => !prev);
	};

	return (
		<>
			<AppBar
				position="fixed"
				sx={{
					top: "auto",
					bottom: 0,
					backgroundColor: "#141519",
					borderTopLeftRadius: 10,
					borderTopRightRadius: 10,
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={onMenuClick}
					>
						<MenuIcon />
					</IconButton>
					<Fab
						color="secondary"
						aria-label="add"
						onClick={handleChange}
						sx={{
							position: "absolute",
							backgroundColor: isSelected ? Colors.orange : Colors.accentGreen,
							zIndex: 1,
							top: -30,
							left: 0,
							right: 0,
							margin: "0 auto",
							"&:hover": {
								background: Colors.orange,
							},
						}}
					>
						<LocalParkingIcon />
					</Fab>
					<Box sx={{ flexGrow: 1 }} />
					<IconButton color="inherit">
						<Logout />
					</IconButton>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default BottomNavBar;
