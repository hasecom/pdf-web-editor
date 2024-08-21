import { useState } from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box } from '@mui/material';

import { Bold, Italic, Underlined } from '../editor/editorComponent';
import ColorPickerButton from '../util/colorPicker';
import { edtitorProps } from '@/types/common';
import { NextPage } from 'next';
import { FormatColorFill as FormatColorFillIcon } from '@mui/icons-material';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
const EditorSelectionMenu: NextPage<edtitorProps> = ({ currentObject, selectedPdfObjectId, setObjectSettingStatus }) => {

	const [formats, setFormats] = useState(() => ['']);
	const handleFormat = (
		event: React.MouseEvent<HTMLElement>,
		newFormats: string[],
	) => {
		setFormats(newFormats);
	};

	return (
		<>
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
					<ColorPickerButton Icon={FormatColorTextIcon} targetStyle={"fontColor"} initColor={'#000000'} target={currentObject?.fontColor} selectedPdfObjectId={selectedPdfObjectId} setObjectSettingStatus={setObjectSettingStatus} />
					<ColorPickerButton Icon={FormatColorFillIcon} targetStyle={"backgroundColor"} initColor={'transparent'} target={currentObject?.backgroundColor} selectedPdfObjectId={selectedPdfObjectId} setObjectSettingStatus={setObjectSettingStatus} />
				</ToggleButtonGroup>
			</Box>
		</>
	);
}
export default EditorSelectionMenu;