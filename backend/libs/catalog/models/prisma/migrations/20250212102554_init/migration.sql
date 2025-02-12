-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "added_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image_path" TEXT NOT NULL,
    "guitar_type" TEXT NOT NULL,
    "article" TEXT NOT NULL,
    "strings_сount" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "products_added_date_idx" ON "products"("added_date");

-- CreateIndex
CREATE INDEX "products_guitar_type_idx" ON "products"("guitar_type");

-- CreateIndex
CREATE INDEX "products_strings_сount_idx" ON "products"("strings_сount");

-- CreateIndex
CREATE INDEX "products_price_idx" ON "products"("price");

-- CreateIndex
CREATE INDEX "products_created_at_idx" ON "products"("created_at");
