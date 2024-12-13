import { Box } from "@mui/material";
import { Colors } from "../../constants";

interface Props {
	children: React.ReactNode;
	backgroundColor?: string;
}

const BackgroundContainer = ({ children, backgroundColor }: Props) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "100vh",
				backgroundColor: backgroundColor || Colors.primary900,
				overflow: "hidden",
			}}
		>
			{children}
		</Box>
	);
};

export default BackgroundContainer;
