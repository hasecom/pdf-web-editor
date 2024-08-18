import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import ToggleButton from '@mui/material/ToggleButton';
import { settingStatusObject } from '@/constant/pdfObjectConstant';
import { NextPage } from 'next';
type edtitorProps = {
	currentObject: settingStatusObject | undefined,
	selectedPdfObjectId: number
	setObjectSettingStatus: React.Dispatch<React.SetStateAction<settingStatusObject[]>>
}

/**
 * PDFオブジェクトの太さを管理します。
 *
 * @param {{ currentObject: any; selectedPdfObjectId: any; setObjectSettingStatus: any; }} param0
 * @param {*} param0.currentObject
 * @param {*} param0.selectedPdfObjectId
 * @param {*} param0.setObjectSettingStatus
 * @returns {*}
 */
export const Bold: NextPage<edtitorProps> = ({ currentObject, selectedPdfObjectId, setObjectSettingStatus }) => {
	const Click = () => {
		if (!currentObject) return;
		setObjectSettingStatus(prevState =>
			prevState.map(item =>
				item.fieldId === selectedPdfObjectId
					? { ...item, fontBold: item.fontBold === false ? true : false }
					: item
			)
		);
	}
	return (
		<ToggleButton value="bold" aria-label="bold" onClick={Click} selected={currentObject?.fontBold}>
			<FormatBoldIcon />
		</ToggleButton>
	)
}

/**
 * PDFオブジェクトのイタリックを管理します。
 *
 * @param {{ currentObject: any; selectedPdfObjectId: any; setObjectSettingStatus: any; }} param0
 * @param {*} param0.currentObject
 * @param {*} param0.selectedPdfObjectId
 * @param {*} param0.setObjectSettingStatus
 * @returns {*}
 */
export const Italic: NextPage<edtitorProps> = ({ currentObject, selectedPdfObjectId, setObjectSettingStatus }) => {
	const Click = () => {
		if (!currentObject) return;
		setObjectSettingStatus(prevState =>
			prevState.map(item =>
				item.fieldId === selectedPdfObjectId
					? { ...item, fontItalic: item.fontItalic === false ? true : false }
					: item
			)
		);
	}
	return (
		<ToggleButton value="italic" aria-label="italic" onClick={Click} selected={currentObject?.fontItalic}>
			<FormatItalicIcon />
		</ToggleButton>
	)
}
/**
 * PDFオブジェクトのアンダーバーを管理します。
 *
 * @param {{ currentObject: any; selectedPdfObjectId: any; setObjectSettingStatus: any; }} param0
 * @param {*} param0.currentObject
 * @param {*} param0.selectedPdfObjectId
 * @param {*} param0.setObjectSettingStatus
 * @returns {*}
 */
export const Underlined: NextPage<edtitorProps> = ({ currentObject, selectedPdfObjectId, setObjectSettingStatus }) => {
	const Click = () => {
		if (!currentObject) return;
		setObjectSettingStatus(prevState =>
			prevState.map(item =>
				item.fieldId === selectedPdfObjectId
					? { ...item, fontUnderlined: item.fontUnderlined === false ? true : false }
					: item
			)
		);
	}
	return (
		<ToggleButton value="underlined" aria-label="underlined" onClick={Click} selected={currentObject?.fontUnderlined}>
			<FormatUnderlinedIcon />
		</ToggleButton>
	)
}