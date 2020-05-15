import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@material-ui/core";

const WithoutAvatar = ({ message, isMine }) => {
	return (
		<Box my={2} alignSelf={isMine ? "flex-end" : ""} style={{ width: "70%" }}>
			<Card elevation={2}>
				<CardContent>
					<Grid container>
						<Grid item xs={11}>
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

export default WithoutAvatar;
