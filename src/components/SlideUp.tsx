import { Slide, Box, Typography, Button, Badge } from "@mui/material";
import {
	LocalizationProvider,
	DateCalendar,
	PickersDay,
	PickersDayProps,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { Colors, FirestoreDocumentName } from "../constants";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import GreyGridboxContainer from "./UI/GreyGridboxContainer";
import { Booking, BookingRequest } from "../types";
import { useSelector } from "react-redux";
import { selectUser } from "../store/reducer-slices";
import { addDoc, getDocs } from "firebase/firestore";
import { bookingsCollection, db } from "../firebaseConfig";
import { FirebaseError } from "@firebase/util";

interface Props {
	isActive: boolean;
	onBookSubmit: (bookingRequest: BookingRequest) => void;
}

const SlideUp = ({ isActive, onBookSubmit }: Props) => {
	const user = useSelector(selectUser);

	const [selectedDate, setSelectedDate] = useState("");
	const [bookingsForDate, setBookingsForDate] = useState<Booking[]>([]);

	const fetchBookingsForDate = async (date: string) => {
		const bookings: Booking[] = [];
		await getDocs(bookingsCollection).then((querySnapshot) => {
			querySnapshot.docs.forEach((booking) => {
				booking.data().date === date && bookings.push(booking.data());
			});
		});

		return bookings;
	};

	const persistBooking = async () => {
		await addDoc(bookingsCollection, {
			userId: user.uid,
			date: selectedDate,
		})
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

	const runBookingValidation = async (date: string, userId: string) => {
		const bookingsForSelectedDate = await fetchBookingsForDate(date);

		if (bookingsForSelectedDate.length > 8) {
			throw new Error("Date is fully booked!");
		}

		if (
			bookingsForSelectedDate.find(
				(booking: Booking) => booking.userId === userId
			)
		) {
			throw new Error("You cannot book twice for a given day!");
		}
	};

	const onBookButtonClick = async () => {
		try {
			await runBookingValidation(selectedDate, user.uid);
			return persistBooking();
		} catch (error: any) {
			onBookSubmit({
				hasAnyErrors: true,
				errorMessage: error.message,
			});
		}
	};

	useEffect(() => {
		(async () => {
			const bookings = await fetchBookingsForDate(selectedDate);
			setBookingsForDate(bookings);
		})();

		return () => {
			// this now gets called when the component unmounts
		};
	}, [selectedDate]);

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
						onChange={(date: any) =>
							setSelectedDate(moment(date).format("MM/DD/YYYY"))
						}
					/>
				</LocalizationProvider>

				<GreyGridboxContainer sx={{ justifyContent: "center", px: 10 }}>
					{bookingsForDate.map((booking, index) => (
						<Typography sx={{ fontSize: 10 }} color={Colors.orange} key={index}>
							{booking.userId}
						</Typography>
					))}
				</GreyGridboxContainer>

				<GreyGridboxContainer sx={{ justifyContent: "center", px: 10 }}>
					<Button
						variant="text"
						endIcon={<BookmarkAddedIcon />}
						sx={{ color: Colors.orange, fontSize: 20 }}
						onClick={onBookButtonClick}
					>
						Book
					</Button>
				</GreyGridboxContainer>
			</Box>
		</Slide>
	);
};

export default SlideUp;
