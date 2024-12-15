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

const Home = () => {
	const user = useSelector(selectUser);
	const { isModalOpen, setModalOpen, toggleModal } = useModal();

	const [isSlideActive, setIsSlideActive] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const toggleDrawer = (newOpen: boolean) => () => {
		setIsDrawerOpen(newOpen);
	};

	const onReserveButtonClick = () => {
		setIsSlideActive((prev) => !prev);
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
						<Button onClick={toggleModal}>Show Modal</Button>

						<CustomModal
							handleClose={() => setModalOpen(false)}
							isActive={isModalOpen}
						>
							<Typography id="modal-modal-title" variant="h6" component="h2">
								Just a modal!
							</Typography>
						</CustomModal>
					</>
				)}

				<SlideUp
					isActive={isSlideActive}
					onSlideClose={() => setIsSlideActive(false)}
				/>
				<Drawer
					open={isDrawerOpen}
					onClose={toggleDrawer(false)}
					PaperProps={{
						sx: {
							backgroundColor: Colors.accentGreen,
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
