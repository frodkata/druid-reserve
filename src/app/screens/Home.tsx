import SlideUp from "../../components/SlideUp";
import { AVAILABLE_SLOTS, Colors } from "../../constants";
import { useEffect, useState } from "react";
import BottomNavBar from "../../components/UI/BottomNavBar";
import BackgroundContainer from "../../components/UI/BackgroundContainer";
import GreyGridboxContainer from "../../components/UI/GreyGridboxContainer";
import { Box, Drawer, Typography } from "@mui/material";
import { useModal } from "../../hooks/useModal";
import DrawerContent from "../../components/DrawerContent";
import ErrorModal from "../../components/UI/ErrorModal";
import SuccessModal from "../../components/UI/SuccessModal";
import { Booking, BookingRequest } from "../../types";
import { doc, getDoc } from "firebase/firestore";
import moment from "moment";
import { parkingDateCollection } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const { isModalOpen, setModalOpen, toggleModal } = useModal();

	const [isSlideActive, setIsSlideActive] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [bookingRequest, setBookingRequest] = useState<
		BookingRequest | undefined
	>(undefined);
	const [bookingsForDate, setBookingsForDate] = useState<Booking[]>([]);

	const toggleDrawer = (newOpen: boolean) => () => {
		setIsDrawerOpen(newOpen);
	};

	const onReserveButtonClick = () => {
		setIsSlideActive((prev) => !prev);
	};

	const onBookSubmit = (bookingRequest: BookingRequest) => {
		setBookingRequest(bookingRequest);
		setIsSlideActive(false);
		toggleModal();
	};

	const getBookingsForDate = async (date: Date) => {
		const parkingDateDocRef = doc(
			parkingDateCollection,
			moment(date).format("MM-DD-YYYY")
		);

		const parkingDateDocSnap = await getDoc(parkingDateDocRef);

		return parkingDateDocSnap.data()?.slotBookings;
	};

	const calculateAvailiableSpaces = () => {
		return AVAILABLE_SLOTS - bookingsForDate.length;
	};

	useEffect(() => {
		(async () => {
			const bookings = await getBookingsForDate(moment(new Date()).toDate());
			setBookingsForDate(bookings || []);
		})();
	}, [isSlideActive]);

	return (
		<>
			<BackgroundContainer>
				{!isSlideActive && (
					<>
						<GreyGridboxContainer>
							<Box
								flexDirection="column"
								display="flex"
								sx={{
									backgroundColor: Colors.accentGreen,
									borderRadius: 3,
									padding: 1,
									width: "100%",
									overflow: "hidden",
								}}
							>
								<Typography variant="h2" fontWeight="500">
									Bookings today:
								</Typography>
								<Typography variant="body1" fontWeight="500">
									{moment(new Date()).format("DD MMMM y")}
								</Typography>
								{bookingsForDate &&
									bookingsForDate.map((booking, index) => (
										<Typography key={index} variant="caption" fontWeight="500">
											{booking.email}
										</Typography>
									))}
							</Box>
						</GreyGridboxContainer>
						<GreyGridboxContainer>
							<Box
								flexDirection="column"
								display="flex"
								sx={{
									borderRadius: 3,
									padding: 1,
									width: "100%",
									overflow: "hidden",
								}}
							>
								<Typography
									variant="h2"
									fontWeight="500"
									sx={{ color: Colors.orange }}
								>
									Availiable spots:
								</Typography>
								<Typography
									variant="body1"
									fontWeight="900"
									sx={{ color: Colors.orange }}
								>
									{calculateAvailiableSpaces()}
								</Typography>
							</Box>
						</GreyGridboxContainer>

						{bookingRequest?.hasAnyErrors ? (
							<ErrorModal
								isActive={isModalOpen}
								handleClose={() => setModalOpen(false)}
							>
								{bookingRequest.errorMessage}
							</ErrorModal>
						) : (
							<SuccessModal
								isActive={isModalOpen}
								handleClose={() => setModalOpen(false)}
							>
								Booking Sucessful!
							</SuccessModal>
						)}
					</>
				)}

				<SlideUp isActive={isSlideActive} onBookSubmit={onBookSubmit} />
				<Drawer
					open={isDrawerOpen}
					onClose={toggleDrawer(false)}
					PaperProps={{
						sx: {
							backgroundColor: Colors.primary700,
							borderTopRightRadius: 5,
							borderBottomRightRadius: 5,
						},
					}}
				>
					<DrawerContent closeDrawer={() => setIsDrawerOpen(false)} />
				</Drawer>
			</BackgroundContainer>

			<BottomNavBar
				onBookClick={onReserveButtonClick}
				onMenuClick={() => setIsDrawerOpen(true)}
			/>
		</>
	);
};

export default Home;
