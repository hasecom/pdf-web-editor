import { useEffect, useState } from "react"
import { pdfTextLinkType, settingStatusObject,settingStatusObjectInit } from "@/constant/pdfObjectConstant";

/**
 * 各種PDFオブジェクトのエディットステートを管理します。
 *
 * @returns {{ objectSettingStatus: any; editSettingStatus: (settingStatusObject: settingStatusObject) => void; addSettingStatus: (newSettingStatus: settingStatusObject) => void; }}
 */
const useObjectSettingStatus = (pdfObject: pdfTextLinkType[]) => {
	const [objectSettingStatus, setObjectSettingStatus] = useState<settingStatusObject[]>([]);
	const addSettingStatus = (newSettingStatus: settingStatusObject) => {
		setObjectSettingStatus(prevState => [...prevState, newSettingStatus]);
	};
	useEffect(() => {
		if (pdfObject) {
			pdfObject.forEach(obj => {
				const exists = objectSettingStatus.some(setting => setting.fieldId === obj.id);
				if(!exists){
					addSettingStatus({
            ...settingStatusObjectInit,
            fieldId: obj.id,
          });
				}
			});
		}
	}, [pdfObject]);
	return { objectSettingStatus, setObjectSettingStatus, addSettingStatus }
}
export default useObjectSettingStatus;

