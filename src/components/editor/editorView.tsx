import { Box, List, ListSubheader, Typography } from "@mui/material";
import EditorSelectionMenu from "../menu/editorSelectionMenu";
import FontSizeController from '../util/fontSizeController';
import { usePdfObjectContext } from "@/provider/pdfObjectProvider";
const EditorView = () => {
	const { selectedPdfObjectId, objectSettingStatus, setObjectSettingStatus } = usePdfObjectContext();
	const currentObject = objectSettingStatus.find(item => item.fieldId === selectedPdfObjectId);
	return (
		<Box style={{ backgroundColor: '#333639', color: 'white', padding: '20px' }}>
			<List
				sx={{ width: '100%', backgroundColor: 'white' }}
				subheader={<ListSubheader>Typography Settings</ListSubheader>}>
				<EditorSelectionMenu currentObject={currentObject} selectedPdfObjectId={selectedPdfObjectId} setObjectSettingStatus={setObjectSettingStatus} />
			</List>
			<List
				sx={{ width: '100%', backgroundColor: 'white' }}
				subheader={<ListSubheader>Font Size</ListSubheader>}>
				<FontSizeController currentObject={currentObject} selectedPdfObjectId={selectedPdfObjectId} setObjectSettingStatus={setObjectSettingStatus} />
			</List>
		</Box>
	)
}
export default EditorView;