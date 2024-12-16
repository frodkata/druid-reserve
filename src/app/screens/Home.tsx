import SlideUp from "../../components/SlideUp";
import { Colors } from "../../constants";
import { useState } from "react";
import BottomNavBar from "../../components/UI/BottomNavBar";
import { selectUser } from "../../store/reducer-slices";
import { useSelector } from "react-redux";
import BackgroundContainer from "../../components/UI/BackgroundContainer";
import GreyGridboxContainer from "../../components/UI/GreyGridboxContainer";
import { Box, Button, Drawer, Typography } from "@mui/material";
import CustomModal from "../../components/UI/CustomModal";
import { useModal } from "../../hooks/useModal";
import DrawerContent from "../../components/DrawerContent";
import ErrorModal from "../../components/UI/ErrorModal";
import SuccessModal from "../../components/UI/SuccessModal";
import { BookingRequest } from "../../types";

const Home = () => {
	const user = useSelector(selectUser);
	const { isModalOpen, setModalOpen, toggleModal } = useModal();

	const [isSlideActive, setIsSlideActive] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [bookingRequest, setBookingRequest] = useState<
		BookingRequest | undefined
	>(undefined);

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
									Green Zone haters:
								</Typography>
								<Typography variant="caption" fontWeight="500">
									ivan.backrachev@abx.com:
								</Typography>
								<Typography variant="caption" fontWeight="500">
									ivan.backrachev@abx.com:
								</Typography>
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
									2
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
								No Error
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
