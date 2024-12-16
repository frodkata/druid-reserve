import { Slide, Box, Typography, Button, Badge } from "@mui/material";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useState } from "react";
import { Colors } from "../constants";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import GreyGridboxContainer from "./UI/GreyGridboxContainer";
import { BookingRequest, Booking } from "../types";
import { useSelector } from "react-redux";
import { selectUser } from "../store/reducer-slices";
import { addDoc, doc, getDocs, setDoc, arrayUnion } from "firebase/firestore";
import { db, parkingDateCollection } from "../firebaseConfig";
import { FirebaseError } from "@firebase/util";

interface Props {
	isActive: boolean;
	onBookSubmit: (bookingRequest: BookingRequest) => void;
}

const SlideUp = ({ isActive, onBookSubmit }: Props) => {
	const user = useSelector(selectUser);

	const [selectedDate, setSelectedDate] = useState(moment().toDate());

	const persistDate = async () => {
		const slotBookings: Booking = {
			email: user.email!,
			userId: user.uid,
			timestamp: moment(new Date()).toDate(),
		};

		const parkingDateDocRef = doc(
			parkingDateCollection,
			moment(selectedDate).format("MM-DD-YYYY")
		);

		setDoc(
			parkingDateDocRef,
			{
				slotBookings: arrayUnion(slotBookings),
			},
			{ merge: true }
		)
			.then(() => {
				onBookSubmit({
					hasAnyErrors: false,
				});
			})
			.catch((error: FirebaseError) => {
				console.error("Error adding document: ", error);
				onBookSubmit({
					hasAnyErrors: true,
					errorMessage: error.message,
				});
			});
	};

	return (
		<Slide direction="up" in={isActive} mountOnEnter unmountOnExit>
			<Box
				sx={{
					background: Colors.accentGreen,
					borderRadius: 3,
					overflowX: "hidden",
					overflowY: "scroll",
					m: 1,
					p: 1,
				}}
				justifyItems="center"
			>
				<GreyGridboxContainer sx={{ justifyContent: "center", px: 10 }}>
					<Typography sx={{ fontSize: 30 }} color={Colors.orange}>
						Slot booking
					</Typography>
				</GreyGridboxContainer>

				<LocalizationProvider dateAdapter={AdapterMoment}>
					<DateCalendar
						defaultValue={moment()}
						views={["day"]}
						disablePast={true}
						sx={{}}
						onChange={(date: any) => setSelectedDate(moment(date).toDate())}
					/>
				</LocalizationProvider>

				<GreyGridboxContainer sx={{ justifyContent: "center", px: 10 }}>
					<Button
						variant="text"
						endIcon={<BookmarkAddedIcon />}
						sx={{ color: Colors.orange, fontSize: 20 }}
						onClick={persistDate}
					>
						Book
					</Button>
				</GreyGridboxContainer>
			</Box>
		</Slide>
	);
};

export default SlideUp;
