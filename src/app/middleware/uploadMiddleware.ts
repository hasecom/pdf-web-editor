import formidable from 'formidable';
import { NextRequest } from 'next/server';
import { IncomingMessage } from 'http';

export async function parseForm(req: NextRequest) {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: true, uploadDir: './uploads', keepExtensions: true });

    form.parse(req as unknown as IncomingMessage, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
}