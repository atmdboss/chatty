import React from "react";
import {
	Card,
	CardContent,
	Typography,
	Grid,
	Avatar,
	Box,
	Hidden,
} from "@material-ui/core";

const WithAvatar = ({ message }) => {
	return (
		<Box my={2} style={{ width: "70%" }}>
			<Card elevation={2}>
				<CardContent>
					<Grid container spacing={1}>
						<Hidden smDown>
							<Grid item xs={1} style={{ alignSelf: "center" }}>
								<Avatar aria-label='profile picture'>
									{message.from.initials}
								</Avatar>
							</Grid>
						</Hidden>
						<Grid item xs={11}>
							<Typography variant='body2' color='textSecondary' component='p'>
								{message.from.name}
							</Typography>
							<Typography variant='h6' component='p'>
								{message.content}
							</Typography>
							<Typography
								align='right'
								variant='subtitle2'
								color='textSecondary'
								component='p'>
								{message.createdAt.toDate().toLocaleDateString([], {
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Box>
	);
};

export default WithAvatar;
