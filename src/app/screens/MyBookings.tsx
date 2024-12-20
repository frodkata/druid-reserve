import BackgroundContainer from "../../components/UI/BackgroundContainer";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Button, Typography } from "@mui/material";
import { Colors } from "../../constants";
import { useNavigate } from "react-router-dom";
import GreyGridboxContainer from "../../components/UI/GreyGridboxContainer";
import { arrayRemove, doc, getDocs, updateDoc } from "firebase/firestore";
import moment from "moment";
import { parkingDateCollection } from "../../firebaseConfig";
import { Suspense, useEffect, useRef, useState } from "react";
import { selectUser } from "../../store/reducer-slices";
import { useSelector } from "react-redux";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { Booking } from "../../types";
import { useModal } from "../../hooks/useModal";
import SuccessModal from "../../components/UI/SuccessModal";
import { useLoader } from "../../hooks/useLoader";
import CustomLoader from "../../components/UI/CustomLoader";

const MyBookings = () => {
	const navigate = useNavigate();
	const user = useSelector(selectUser);

	const { isModalOpen, setModalOpen, toggleModal } = useModal();
	const { loading, setLoading } = useLoader();

	const [bookingDates, setBookingDates] = useState<Date[]>([]);

	const loadBookings = async () => {
		let bookingDates: Date[] = [];

		const querySnapshot = await getDocs(parkingDateCollection);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			const { slotBookings } = doc.data();

			const bookingRelatedToUser = slotBookings.find(
				(booking) => booking.userId === user.uid
			);

			if (
				moment(doc.id).format("DD-MM-YYYY") >=
					moment(new Date()).format("DD-MM-YYYY") &&
				bookingRelatedToUser
			) {
				bookingDates.push(moment(doc.id).toDate());
			}
		});

		return bookingDates;
	};

	const removeBooking = (date: Date) => {
		const parkingDateDocRef = doc(
			parkingDateCollection,
			moment(date).format("MM-DD-YYYY")
		);

		updateDoc(parkingDateDocRef, {
			slotBookings: arrayRemove({
				email: user.email,
				userId: user.uid,
			} as Booking),
		}).then(() => {
			setLoading(true);

			setTimeout(async () => {
				toggleModal();
				setBookingDates(await loadBookings());
				setLoading(false);
			}, 1000);
		});
	};

	useEffect(() => {
		(async () => {
			const bookingDates = await loadBookings();

			setLoading(true);
			setTimeout(() => {
				setBookingDates((oldUserBookings) => [
					...oldUserBookings,
					...bookingDates,
				]);
				setLoading(false);
			}, 1000);
		})();
	}, []);

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
						<Box>
							<Typography
								variant="h2"
								fontWeight="500"
								sx={{
									color: Colors.primary700,
									my: 2,
									backgroundColor: Colors.accentGreen,
								}}
							>
								Active Bookings:
							</Typography>

							{loading && (
								<CustomLoader
									sx={{
										color: Colors.orange,
									}}
								/>
							)}
						</Box>

						{bookingDates.map((date, index) => (
							<Box sx={{ mt: 1 }}>
								<Button
									variant="text"
									endIcon={<BookmarkRemoveIcon />}
									sx={{ color: Colors.orange }}
									onClick={() => removeBooking(date)}
								>
									<Typography
										key={index}
										variant="body1"
										sx={{ color: Colors.primary700 }}
									>
										{moment(date).format("DD MMMM")}
									</Typography>
								</Button>
							</Box>
						))}
					</Box>
				</GreyGridboxContainer>
			</Box>
			<SuccessModal
				isActive={isModalOpen}
				handleClose={() => setModalOpen(false)}
			>
				Reservation deleted!
			</SuccessModal>
		</BackgroundContainer>
	);
};

export default MyBookings;
