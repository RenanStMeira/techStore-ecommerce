-- CreateTable
CREATE TABLE "Sales" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DECIMAL(65,30),

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToSales" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToSales_AB_unique" ON "_ProductToSales"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToSales_B_index" ON "_ProductToSales"("B");

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSales" ADD CONSTRAINT "_ProductToSales_A_fkey" FOREIGN KEY ("A") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSales" ADD CONSTRAINT "_ProductToSales_B_fkey" FOREIGN KEY ("B") REFERENCES "Sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;
