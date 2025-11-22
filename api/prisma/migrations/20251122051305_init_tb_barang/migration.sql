/*
  Warnings:

  - Added the required column `kategori` to the `tb_barang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kondisi` to the `tb_barang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `tb_barang` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_barang" ADD COLUMN     "foto" TEXT,
ADD COLUMN     "kategori" TEXT NOT NULL,
ADD COLUMN     "kondisi" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;
