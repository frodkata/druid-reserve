import { CircularProgress, SxProps, Theme } from "@mui/material";
import { Colors } from "../../constants";

interface Props {
	sx?: SxProps<Theme>;
}
const CustomLoader = ({ sx }: Props) => {
	return (
		<CircularProgress
			sx={{
				color: Colors.accentGreen,
				position: "absolute",
				zIndex: 1,
				top: "50%",
				left: "50%",
				...sx,
			}}
		/>
	);
};

export default CustomLoader;
