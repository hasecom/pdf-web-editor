import { settingStatusObject } from "@/constant/pdfObjectConstant"

export type edtitorProps = {
	currentObject: settingStatusObject | undefined,
	selectedPdfObjectId: number
	setObjectSettingStatus: React.Dispatch<React.SetStateAction<settingStatusObject[]>>
}