import { Box, Button } from "@mui/material";
import { Colors } from "../constants";
import { useNavigate } from "react-router-dom";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ExploreIcon from "@mui/icons-material/Explore";
interface Props {
	closeDrawer: () => void;
}

const DrawerContent = ({ closeDrawer }: Props) => {
	const navigate = useNavigate();

	return (
		<Box sx={{ p: 1 }} role="presentation" onClick={closeDrawer}>
			<Box
				onClick={() => navigate("/myBookings")}
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

			<Box
				onClick={() => navigate("/bookingHistory")}
				sx={{ display: "flex", mt: 2 }}
			>
				<Button
					variant="text"
					endIcon={<ExploreIcon />}
					sx={{ color: Colors.orange }}
				>
					Booking Explorer
				</Button>
			</Box>
		</Box>
	);
};
export default DrawerContent;
