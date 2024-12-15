import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Divider,
	Typography,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import Grid from "@mui/material/Grid2";

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
				<AccountBoxIcon />
				<Typography variant="h6" component="h2" sx={{ ml: 1 }}>
					Profile
				</Typography>
			</Box>
			<Box
				onClick={() => console.log("My Bookings")}
				sx={{ display: "flex", mt: 2 }}
			>
				<BookmarksIcon />
				<Typography variant="h6" component="h2" sx={{ ml: 1 }}>
					My Bookings
				</Typography>
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
