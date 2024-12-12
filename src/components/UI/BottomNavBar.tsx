import {
	AppBar,
	Box,
	Fab,
	IconButton,
	Slide,
	styled,
	Toolbar,
	Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Colors } from "../../constants";
import Logout from "../Logout";
import LocalParkingIcon from "@mui/icons-material/LocalParking";

interface Props {
	onBookClick: () => void;
}

const StyledFab = styled(Fab)({
	position: "absolute",
	backgroundColor: Colors.accentGreen,
	zIndex: 1,
	top: -30,
	left: 0,
	right: 0,
	margin: "0 auto",
	"&:hover": {
		background: Colors.accentPurple500,
	},
});

const BottomNavBar = ({ onBookClick }: Props) => {
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
					<IconButton color="inherit" aria-label="open drawer">
						<MenuIcon />
					</IconButton>
					<StyledFab color="secondary" aria-label="add" onClick={onBookClick}>
						<LocalParkingIcon />
					</StyledFab>
					<Box sx={{ flexGrow: 1 }} />
					<IconButton color="inherit">
						<MoreIcon />
					</IconButton>
					<Logout />
				</Toolbar>
			</AppBar>
		</>
	);
};

export default BottomNavBar;
