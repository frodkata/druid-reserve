import { Box, Button, Modal, Theme, Typography } from "@mui/material";
import { style, SxProps } from "@mui/system";
import { Colors } from "../../constants";

interface Props {
	children: React.ReactNode;
	isActive: boolean;
	handleClose: () => void;
	bgColor?: string;
}

const CustomModal = ({ children, bgColor, isActive, handleClose }: Props) => {
	return (
		<div>
			<Modal
				open={isActive}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						bgcolor: bgColor || Colors.primary700,
						borderRadius: 3,
						width: "90%",
						boxShadow: 14,
						overflow: "hidden",
						justifyItems: "center",
						p: 4,
						color: Colors.orange,
					}}
				>
					{children}
				</Box>
			</Modal>
		</div>
	);
};

export default CustomModal;
