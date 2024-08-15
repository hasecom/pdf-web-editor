import { Box, List, ListSubheader, Typography } from "@mui/material";
import EditorSelectionMenu from "../menu/editorSelectionMenu";
const EditorView = () => {
	return (
		<Box style={{ backgroundColor: '#333639', color: 'white', padding: '20px' }}>
			<List
				sx={{ width: '100%', backgroundColor: 'white' }}
				subheader={<ListSubheader>Typography Settings</ListSubheader>}>
				<EditorSelectionMenu />
			</List>
		</Box>
	)
}
export default EditorView;