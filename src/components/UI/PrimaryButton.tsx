import { Button } from "@mui/material";
import { Colors } from "../../constants";

interface Props {
	label: string;
	color?: string;
	onClick?: () => void;
}

const PrimaryButton = ({ onClick, label, color }: Props) => {
	return (
		<Button
			onClick={onClick}
			sx={{
				color: "black",
				paddingX: 4,
				borderRadius: 1,
				fontSize: 20,
				backgroundColor: color || Colors.accentGreen,
				textTransform: "none",
				fontWeight: "400",
			}}
		>
			{label}
		</Button>
	);
};

export default PrimaryButton;
