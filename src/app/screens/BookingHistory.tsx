import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BackgroundContainer from "../../components/UI/BackgroundContainer";
import GreyGridboxContainer from "../../components/UI/GreyGridboxContainer";
import { Colors } from "../../constants";
import HomeIcon from "@mui/icons-material/Home";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { doc, getDoc } from "firebase/firestore";
import { parkingDateCollection } from "../../firebaseConfig";
import { useState } from "react";
import { Booking } from "../../types";

const BookingHistory = () => {
	const navigate = useNavigate();

	const [bookings, setSlotBookings] = useState<Booking[]>([]);

	const loadBookingsForDate = async (date: Date) => {
		const parkingDateDocRef = doc(
			parkingDateCollection,
			moment(date).format("MM-DD-YYYY")
		);

		const parkingDateDocSnap = await getDoc(parkingDateDocRef);

		setSlotBookings(parkingDateDocSnap.data()?.slotBookings || []);
	};

	return (
		<BackgroundContainer>
			<Box
				onClick={() => navigate("/home")}
				sx={{ display: "flex", mt: 2, ml: 2 }}
			>
				<Button
					variant="text"
					endIcon={<HomeIcon />}
					sx={{ color: Colors.orange }}
				>
					Home
				</Button>
			</Box>

			<Box sx={{ display: "flex", mt: 2, justifyContent: "center" }}>
				<GreyGridboxContainer>
					<Box
						flexDirection="column"
						display="flex"
						alignItems="center"
						sx={{
							borderRadius: 3,
							px: 5,
							width: "100%",
							overflow: "hidden",
							backgroundColor: Colors.accentGreen,
						}}
					>
						<Typography
							variant="h2"
							fontWeight="500"
							sx={{
								color: Colors.primary700,
								mt: 2,
								backgroundColor: Colors.accentGreen,
							}}
						>
							Booking Explorer:
						</Typography>

						<LocalizationProvider dateAdapter={AdapterMoment}>
							<DateCalendar
								//defaultValue={moment(selectedDate)}
								views={["day"]}
								sx={{}}
								onChange={(date: any) => loadBookingsForDate(date)}
							/>
						</LocalizationProvider>

						<Box
							flexDirection="column"
							display="flex"
							alignItems="center"
							sx={{
								borderRadius: 3,
								overflow: "hidden",
								mb: 2,
							}}
						>
							{bookings.length > 0 && (
								<Typography variant="body1" sx={{ fontWeight: "900" }}>
									Past bookings:
								</Typography>
							)}
							{bookings.map((booking, index) => (
								<Typography variant="body1" key={index}>
									{booking.email}
								</Typography>
							))}
						</Box>
					</Box>
				</GreyGridboxContainer>
			</Box>
		</BackgroundContainer>
	);
};

export default BookingHistory;
