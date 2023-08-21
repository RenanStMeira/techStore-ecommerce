-- DropForeignKey
ALTER TABLE "_ProductUser" DROP CONSTRAINT "_ProductUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductUser" DROP CONSTRAINT "_ProductUser_B_fkey";

-- AddForeignKey
ALTER TABLE "_ProductUser" ADD CONSTRAINT "_ProductUser_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductUser" ADD CONSTRAINT "_ProductUser_B_fkey" FOREIGN KEY ("B") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
