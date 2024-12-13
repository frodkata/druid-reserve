import Grid from "@mui/material/Grid2";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { Colors } from "../../constants";

interface Props {
	children: React.ReactNode;
	sx?: SxProps<Theme>;
}

const GreyGridboxContainer = ({ children, sx }: Props) => {
	return (
		<Grid
			container
			spacing={2}
			textAlign="center"
			sx={{
				m: 1,
				p: 1,
				backgroundColor: Colors.primary700,
				borderRadius: 3,
				overflow: "hidden",
				...sx,
			}}
		>
			{children}
		</Grid>
	);
};

export default GreyGridboxContainer;
