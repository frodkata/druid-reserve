import { Slide, Box, Typography, Button, Badge } from "@mui/material";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useEffect, useState } from "react";
import { AVAILABLE_SLOTS, Colors } from "../constants";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import GreyGridboxContainer from "./UI/GreyGridboxContainer";
import { BookingRequest, Booking } from "../types";
import { useSelector } from "react-redux";
import { selectUser } from "../store/reducer-slices";
import {
	addDoc,
	doc,
	getDocs,
	setDoc,
	arrayUnion,
	increment,
	getDoc,
} from "firebase/firestore";
import { db, parkingDateCollection } from "../firebaseConfig";
import { FirebaseError } from "@firebase/util";

interface Props {
	isActive: boolean;
	onBookSubmit: (bookingRequest: BookingRequest) => void;
}

const SlideUp = ({ isActive, onBookSubmit }: Props) => {
	const user = useSelector(selectUser);

	const [selectedDate, setSelectedDate] = useState<Date | undefined>();
	const [bookingsForDate, setBookingsForDate] = useState<Booking[]>([]);

	const presistBooking = async () => {
		const slotBookings: Booking = {
			email: user.email!,
			userId: user.uid,
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

	const getBookingsForDate = async (date: Date) => {
		const parkingDateDocRef = doc(
			parkingDateCollection,
			moment(date).format("MM-DD-YYYY")
		);

		const parkingDateDocSnap = await getDoc(parkingDateDocRef);

		return parkingDateDocSnap.data()?.slotBookings;
	};

	const onBookClick = async () => {
		if (!!bookingsForDate && bookingsForDate.length > AVAILABLE_SLOTS) {
			return onBookSubmit({
				hasAnyErrors: true,
				errorMessage: "All slots are reserved!",
			});
		}

		if (
			!!bookingsForDate &&
			bookingsForDate.find((booking) => booking.userId === user.uid)
		) {
			return onBookSubmit({
				hasAnyErrors: true,
				errorMessage: "You`ve already reserved this slot!",
			});
		}

		await presistBooking();
		return;
	};

	const calculateAvailiableSpaces = () => {
		if (bookingsForDate) {
			return AVAILABLE_SLOTS - bookingsForDate.length;
		}

		return AVAILABLE_SLOTS;
	};

	useEffect(() => {
		(async () => {
			const bookings = await getBookingsForDate(selectedDate!);
			setBookingsForDate(bookings || []);
		})();
	}, [selectedDate]);

	useEffect(() => {
		setSelectedDate(undefined);
		setBookingsForDate([]);
	}, [isActive]);

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
						//defaultValue={moment(selectedDate)}
						views={["day"]}
						disablePast={true}
						sx={{}}
						onChange={(date: any) => setSelectedDate(moment(date).toDate())}
					/>
				</LocalizationProvider>

				{!!selectedDate && (
					<Typography variant="caption" color={Colors.primary900}>
						Availiable: {calculateAvailiableSpaces()}
					</Typography>
				)}

				{/* {!!bookingsForDate && (
					<>
						<Typography sx={{ fontSize: 30 }} color={Colors.orange}>
							Booked spaces:
						</Typography>
						{bookingsForDate.map((booking, index) => (
							<Typography key={index} color={Colors.primary900}>
								{booking.email}
							</Typography>
						))}
					</>
				)} */}

				<GreyGridboxContainer sx={{ justifyContent: "center", px: 10 }}>
					<Button
						variant="text"
						endIcon={<BookmarkAddedIcon />}
						sx={{ color: Colors.orange, fontSize: 20 }}
						onClick={onBookClick}
						disabled={!selectedDate}
					>
						Book
					</Button>
				</GreyGridboxContainer>
			</Box>
		</Slide>
	);
};

export default SlideUp;
