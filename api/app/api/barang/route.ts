import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: Ambil semua barang
export async function GET(request: Request) {
  try {
    const data = await prisma.tb_barang.findMany({
      select: {
        id: true,
        userId: true,
        nama: true,
        kategori: true,
        kondisi: true,
        harga: true,
        foto: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// POST: Tambah barang baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await prisma.tb_barang.create({
      data: {
        userId: body.userId,
        nama: body.nama,
        kategori: body.kategori,
        kondisi: body.kondisi,
        harga: body.harga,
        foto: body.foto,
      },
    });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// PUT: Update barang
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body.id) throw new Error("Id is required for update");

    const data = await prisma.tb_barang.update({
      where: { id: body.id },
      data: {
        nama: body.nama,
        kategori: body.kategori,
        kondisi: body.kondisi,
        harga: body.harga,
        foto: body.foto,
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// DELETE: Hapus barang
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    if (!body.id) throw new Error("Id is required for delete");

    const data = await prisma.tb_barang.delete({
      where: { id: body.id },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
