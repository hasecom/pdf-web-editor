import { AppBar,Typography } from "@mui/material"

const Header = () => {
	return (
		<>
			<AppBar position="static" color="inherit" elevation={0}>
				<Typography variant="h4" sx={{fontWeight:'bold'}}>PDF WEB EDITOR</Typography>
			</AppBar>
		</>
	)
}
				export default Header;