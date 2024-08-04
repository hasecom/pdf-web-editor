import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import path from "path";
import { PDFDocument, PDFRef } from "pdf-lib";

const handle = async (req:NextApiRequest,res:NextApiResponse) => {
	if(req.method == 'POST'){
		const {filePath,edits} = req.body;

		const fileBuffer = await fs.readFile(path.join(process.cwd(),filePath));
		const pdfDoc = await PDFDocument.load(fileBuffer);
		const pdfBytes = await pdfDoc.save();
		const newFilePath = path.join(process.cwd(),'uploads','edited.pdf');
		await fs.writeFile(newFilePath,pdfBytes);

		return res.status(200).json({url:'/uploads/edited.pdf'});
	}else{
		res.setHeader('Allow',['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}

export default handle;