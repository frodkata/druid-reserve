import { Button, SxProps, Theme } from "@mui/material";
import { Colors } from "../../constants";

interface Props {
	label: string;
	sx?: SxProps<Theme>;
	onClick?: () => void;
}

const PrimaryButton = ({ onClick, label, sx }: Props) => {
	return (
		<Button
			onClick={onClick}
			sx={{
				color: "black",
				paddingX: 4,
				borderRadius: 1,
				fontSize: 20,
				backgroundColor: Colors.accentGreen,
				textTransform: "none",
				fontWeight: "400",
				...sx,
			}}
		>
			{label}
		</Button>
	);
};

export default PrimaryButton;
