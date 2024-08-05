import { NextRequest, NextResponse } from 'next/server';
import formidable, { Files, Fields } from 'formidable';
import { IncomingMessage } from 'http';
import path from 'path';
import fs from "node:fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = (req: IncomingMessage): Promise<{ fields: Fields, files: Files }> => {
  const form = formidable({ multiples: true, uploadDir: './uploads', keepExtensions: true });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

export async function POST(request: NextRequest) {
  try {
		console.error('Invalid fileーーーーーーーーーーーーーーーーーーーー');
		//console.log(request);
		const formData = await request.formData();
		console.log(formData)
		const file = formData.get('file') as File;
		const arrayBuffer = await file.arrayBuffer();
		const buffer = new Uint8Array(arrayBuffer);
		await fs.writeFile(`./public/uploads/${file.name}`, buffer);
		console.log(arrayBuffer);
    return new NextResponse(JSON.stringify({ url: `/uploads/${file.name}` }), { status: 200 });
  //   const req = request as unknown as IncomingMessage;
  //   const { fields, files } = await parseForm(req);
    
  //   if (!files.file) {
  //     return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  //   }

  //   const file = Array.isArray(files.file) ? files.file[0] : files.file;
  //   if (!file) {
  //     return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
  //   }

  //   const filePath = path.join(process.cwd(), 'uploads', file.newFilename);
  //   fs.renameSync(file.filepath, filePath);

  //   return NextResponse.json({ url: `/uploads/${file.newFilename}` }, { status: 200 });
   } catch (e) {
		return NextResponse.json({ status: "fail", error: e });
  }
}
