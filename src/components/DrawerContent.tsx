import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Divider,
	Typography,
	Button,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import Grid from "@mui/material/Grid2";
import { Colors } from "../constants";

interface Props {
	closeDrawer: () => void;
}

const DrawerContent = ({ closeDrawer }: Props) => {
	return (
		<Box sx={{ p: 1 }} role="presentation" onClick={closeDrawer}>
			<Box
				onClick={() => console.log("Profile")}
				sx={{ display: "flex", mt: 2 }}
			>
				<Button
					variant="text"
					endIcon={<AccountBoxIcon />}
					sx={{ color: Colors.orange }}
				>
					My Profile
				</Button>
			</Box>
			<Box
				onClick={() => console.log("My Bookings")}
				sx={{ display: "flex", mt: 2 }}
			>
				<Button
					variant="text"
					endIcon={<BookmarksIcon />}
					sx={{ color: Colors.orange }}
				>
					My Bookings
				</Button>
			</Box>

			{/* <List>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<MenuIcon />
						</ListItemIcon>
						<ListItemText primary={"afsfasfasfasf"} />
					</ListItemButton>
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<MenuIcon />
						</ListItemIcon>
						<ListItemText primary={"adsdasda"} />
					</ListItemButton>
				</ListItem>
			</List> */}
		</Box>
	);
};
export default DrawerContent;
