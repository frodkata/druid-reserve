import {
	Box,
	CircularProgress,
	SxProps,
	Theme,
	Typography,
} from "@mui/material";
import { Colors } from "../../constants";

interface Props {
	sx?: SxProps<Theme>;
}
const CustomLoader = ({ sx }: Props) => {
	return (
		<CircularProgress
			sx={{
				color: Colors.accentGreen,
				zIndex: 1,
				...sx,
			}}
		/>
	);
};

export default CustomLoader;
