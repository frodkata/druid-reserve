import { Box, Button, Modal, Theme, Typography } from "@mui/material";
import { style, SxProps } from "@mui/system";
import { Colors } from "../../constants";
import CustomModal from "./CustomModal";

interface Props {
	isActive: boolean;
	handleClose: () => void;
	children: React.ReactNode;
}

const SuccessModal = ({ isActive, handleClose, children }: Props) => {
	return (
		<CustomModal
			handleClose={handleClose}
			isActive={isActive}
			bgColor={Colors.accentGreen}
		>
			<Typography
				id="modal-modal-title"
				variant="h6"
				component="h2"
				color={"textPrimary"}
			>
				{children}
			</Typography>
		</CustomModal>
	);
};

export default SuccessModal;
