import  { useState, useEffect } from 'react';


const usePdfObjectStatus = () => {
	const [pdfObject, setPdfObject] = useState([]);
	useEffect(() => {
		const changeData = () =>  {
		}
		changeData();
	}, [pdfObject]);
	return { pdfObject };
};

export default usePdfObjectStatus;