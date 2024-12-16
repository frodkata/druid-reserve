import { Slide, Box, Typography, Button, Badge } from "@mui/material";
import {
	LocalizationProvider,
	DateCalendar,
	PickersDay,
	PickersDayProps,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import { useState } from "react";
import { Colors } from "../constants";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import GreyGridboxContainer from "./UI/GreyGridboxContainer";
import { BookingRequest } from "../types";

interface Props {
	isActive: boolean;
	onBookSubmit: (bookingRequest: BookingRequest) => void;
}

const SlideUp = ({ isActive, onBookSubmit }: Props) => {
	const [highlightedDays, setHighlightedDays] = useState([1, 20, 30]);

	const getDaySpots = (
		props: PickersDayProps<Moment> & { highlightedDays?: number[] }
	) => {
		const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

		const isSelected =
			!props.outsideCurrentMonth &&
			highlightedDays.indexOf(props.day.date()) >= 0;

		return (
			<Badge
				key={props.day.toString()}
				overlap="circular"
				badgeContent={isSelected ? "✅" : undefined}
			>
				<PickersDay
					{...other}
					outsideCurrentMonth={outsideCurrentMonth}
					day={day}
				/>
			</Badge>
		);
	};

	return (
		<Slide direction="up" in={isActive} mountOnEnter unmountOnExit>
			<Box
				sx={{
					background: Colors.accentGreen,
					borderRadius: 3,
					overflowX: "hidden",
					overflowY: "scroll",
					m: 1,
					p: 1,
				}}
				justifyItems="center"
			>
				<GreyGridboxContainer sx={{ justifyContent: "center", px: 10 }}>
					<Typography sx={{ fontSize: 30 }} color={Colors.orange}>
						Slot booking
					</Typography>
				</GreyGridboxContainer>

				<LocalizationProvider dateAdapter={AdapterMoment}>
					<DateCalendar
						defaultValue={moment()}
						views={["day"]}
						disablePast={true}
						sx={{}}
						slots={{
							day: getDaySpots,
						}}
						slotProps={{
							day: {
								highlightedDays,
							} as any,
						}}
					/>
				</LocalizationProvider>

				<GreyGridboxContainer sx={{ justifyContent: "center", px: 10 }}>
					<Button
						variant="text"
						endIcon={<BookmarkAddedIcon />}
						sx={{ color: Colors.orange, fontSize: 20 }}
						onClick={() =>
							onBookSubmit({
								hasAnyErrors: true,
								errorMessage: "Error saving ",
							})
						}
					>
						Book
					</Button>
				</GreyGridboxContainer>
			</Box>
		</Slide>
	);
};

export default SlideUp;
