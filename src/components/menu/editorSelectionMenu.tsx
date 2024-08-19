import { useState } from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box } from '@mui/material';
import { usePdfObjectContext } from '@/provider/pdfObjectProvider';
import { Bold, Italic, Underlined } from '../editor/editorComponent';
import ColorPickerButton from '../util/colorPicker';
const EditorSelectionMenu = () => {
	const { selectedPdfObjectId, objectSettingStatus, setObjectSettingStatus } = usePdfObjectContext();
	const currentObject = objectSettingStatus.find(item => item.fieldId === selectedPdfObjectId);
	const [formats, setFormats] = useState(() => ['']);

	const handleFormat = (
		event: React.MouseEvent<HTMLElement>,
		newFormats: string[],
	) => {
		setFormats(newFormats);
	};

	return (
		<Box style={{
			display: 'flex',
			justifyContent: 'center'
		}}>
			<ToggleButtonGroup
				value={formats}
				onChange={handleFormat}
				aria-label="text formatting"
			>
				<Bold currentObject={currentObject} selectedPdfObjectId={selectedPdfObjectId} setObjectSettingStatus={setObjectSettingStatus} />
				<Italic currentObject={currentObject} selectedPdfObjectId={selectedPdfObjectId} setObjectSettingStatus={setObjectSettingStatus} />
				<Underlined currentObject={currentObject} selectedPdfObjectId={selectedPdfObjectId} setObjectSettingStatus={setObjectSettingStatus} />
				<ColorPickerButton currentObject={currentObject} selectedPdfObjectId={selectedPdfObjectId} setObjectSettingStatus={setObjectSettingStatus} />
			</ToggleButtonGroup>
			
		</Box>
	);
}
export default EditorSelectionMenu;