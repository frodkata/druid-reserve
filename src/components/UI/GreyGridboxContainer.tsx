import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import { Colors } from "../../constants";

interface Props {
	children: React.ReactNode;
	backgroundColor?: string;
}

const GreyGridboxContainer = ({ children, backgroundColor }: Props) => {
	return (
		<Grid
			container
			spacing={2}
			direction="column"
			alignItems="center"
			textAlign="center"
			sx={{
				m: 1,
				backgroundColor: Colors.primary500,
				borderRadius: 3,
				height: "85vh",
			}}
		>
			{children}
		</Grid>
	);
};

export default GreyGridboxContainer;
