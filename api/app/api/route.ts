import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: { bodyParser: false }, // penting supaya formidable bisa jalan
};

export async function POST(req: Request) {
  const form = formidable({ uploadDir: "public/uploads", keepExtensions: true });

  return new Promise((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) reject(err);

      const file = files.file?.[0];
      if (!file) {
        resolve(NextResponse.json({ error: "No file uploaded" }, { status: 400 }));
        return;
      }

      // path relatif untuk disimpan di DB
      const filePath = `/uploads/${file.newFilename}`;
      resolve(NextResponse.json({ url: filePath }, { status: 200 }));
    });
  });
}