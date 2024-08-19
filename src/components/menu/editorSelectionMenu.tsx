import { useState } from 'react';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box } from '@mui/material';
import { usePdfObjectContext } from '@/provider/pdfObjectProvider';
import { Bold, Italic, Underlined } from '../editor/editorComponent';
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
				<ToggleButton value="color" aria-label="color">
					<FormatColorFillIcon />
					<ArrowDropDownIcon />
				</ToggleButton>
			</ToggleButtonGroup>
		</Box>
	);
}
export default EditorSelectionMenu;