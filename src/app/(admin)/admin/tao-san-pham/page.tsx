'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { Typography } from '@/components/ui/typography';
import { showError, showSuccess } from '@/lib/swal';
import { Category, getAllCategories } from '@/services/categoryApi';
import { createProduct, CreateProductData, importProductsByExcel } from '@/services/productsApi';
import { getAllSubcategories, Subcategory } from '@/services/subcategoryApi';

interface ProductForm {
  name: string;
  description: string;
  price: string;
  discount_percent: string;
  image_url: string[];
  image_hover_url: string;
  category_id: string;
  subcategory_id: string;
}

interface Variant {
  color: string;
  size: string;
  quantity: number;
}

export default function CreateProductPage() {
  const [product, setProduct] = useState<ProductForm>({
    name: '',
    description: '',
    price: '',
    discount_percent: '',
    image_url: [''],
    image_hover_url: '',
    category_id: '',
    subcategory_id: '',
  });

  const [variants, setVariants] = useState<Variant[]>([{ color: '', size: '', quantity: 1 }]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [importingExcel, setImportingExcel] = useState(false);

  useEffect(() => {
    getAllCategories().then(setCategories).catch(console.error);
    getAllSubcategories().then(setSubcategories).catch(console.error);
  }, []);

  const filteredSubcategories = useMemo(
    () => subcategories.filter((sc) => sc.categoryId === product.category_id),
    [subcategories, product.category_id],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'category_id' ? { subcategory_id: '' } : {}),
    }));
  };

  const handleSelectChange = (name: keyof ProductForm, value: string) => {
    setProduct((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'category_id' ? { subcategory_id: '' } : {}),
    }));
  };

  const handleVariantChange = (index: number, field: keyof Variant, value: string) => {
    setVariants((prev) =>
      prev.map((v, i) =>
        i === index
          ? {
              ...v,
              [field]: field === 'quantity' ? (value === '' ? 0 : Number(value)) : value,
            }
          : v,
      ),
    );
  };

  const addVariant = () => {
    setVariants((prev) => [...prev, { color: '', size: '', quantity: 1 }]);
  };

  const removeVariant = (index: number) => {
    if (variants.length <= 1) return;
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };
  const handleImageUrlChange = (index: number, value: string) => {
    setProduct((prev) => {
      const newImages = [...prev.image_url];
      newImages[index] = value;
      return { ...prev, image_url: newImages };
    });
  };

  const addImageUrl = () => {
    setProduct((prev) => ({
      ...prev,
      image_url: [...prev.image_url, ''],
    }));
  };

  const removeImageUrl = (index: number) => {
    if (product.image_url.length <= 1) return;
    setProduct((prev) => ({
      ...prev,
      image_url: prev.image_url.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (!product.name || !product.price || !product.category_id) {
      showError('Vui lòng điền đầy đủ tên, giá và danh mục.');
      return;
    }

    for (const v of variants) {
      if (!v.color || !v.size) {
        showError('Vui lòng điền đầy đủ thông tin biến thể (màu, kích cỡ).');
        return;
      }
    }
    const filteredImages = product.image_url.filter((url) => url.trim() !== '');

    if (filteredImages.length === 0) {
      showError('Vui lòng nhập ít nhất một ảnh chính hợp lệ.');
      return;
    }

    const payload: CreateProductData = {
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      discount_percent: product.discount_percent ? parseFloat(product.discount_percent) : undefined,
      image_url: filteredImages,
      image_hover_url: product.image_hover_url,
      category_id: product.category_id,
      subcategory_id: product.subcategory_id || undefined,
      variants,
    };

    try {
      await createProduct(payload);
      showSuccess('Tạo sản phẩm thành công!');
      setProduct({
        name: '',
        description: '',
        price: '',
        discount_percent: '',
        image_url: [''],
        image_hover_url: '',
        category_id: '',
        subcategory_id: '',
      });
      setVariants([{ color: '', size: '', quantity: 1 }]);
    } catch {
      showError('Tạo sản phẩm thất bại!');
    }
  };

  const handleImportExcel = async () => {
    if (!excelFile) {
      showError('Vui lòng chọn file Excel trước khi import.');
      return;
    }

    setImportingExcel(true);
    try {
      const result = await importProductsByExcel(excelFile);
      const failedRows = result.errors
        .slice(0, 5)
        .map((e) => `Dòng ${e.row}: ${e.message}`)
        .join('\n');

      if (result.summary.failed > 0) {
        showSuccess(
          `Import xong: tạo ${result.summary.created}/${result.summary.totalRows} sản phẩm.\n${failedRows}`,
        );
      } else {
        showSuccess(
          `Import thành công ${result.summary.created}/${result.summary.totalRows} sản phẩm.`,
        );
      }
      setExcelFile(null);
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Import Excel thất bại!');
    } finally {
      setImportingExcel(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 dark:bg-gray">
      <Typography variant="h1" className="text-2xl font-bold mb-6">
        Tạo sản phẩm mới
      </Typography>

      <Card className="mb-6 dark:bg-gray">
        <CardHeader>
          <h2 className="text-lg font-semibold">Import hàng loạt bằng Excel</h2>
          <p className="text-sm text-muted-foreground">
            Cột hỗ trợ: name, description, price, discount_percent, image_url, image_hover_url,
            category/category_slug/category_id, subcategory/subcategory_slug/subcategory_id,
            variants (JSON) hoặc variant_colors + variant_sizes + variant_quantities.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => setExcelFile(e.target.files?.[0] || null)}
          />
          {excelFile && <p className="text-sm text-muted-foreground">Đã chọn: {excelFile.name}</p>}
        </CardContent>
        <CardFooter>
          <Button
            type="button"
            onClick={handleImportExcel}
            disabled={importingExcel}
            className="text-white"
          >
            {importingExcel ? 'Đang import...' : 'Import từ Excel'}
          </Button>
        </CardFooter>
      </Card>

      <Card className="mb-6 dark:bg-gray">
        <CardHeader className="grid gap-4">
          <Input
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Tên sản phẩm"
          />
          <Textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Mô tả"
            rows={5}
          />
          <Input
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Giá gốc"
            type="number"
            min={0}
            step="0.01"
          />
          <Input
            name="discount_percent"
            value={product.discount_percent}
            onChange={handleChange}
            placeholder="Phần trăm giảm giá (nếu có)"
            type="number"
            min={0}
            max={100}
            step="0.01"
          />

          <div>
            <label className="block mb-1 font-medium">Ảnh chính</label>
            {product.image_url.map((url, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <Input
                  placeholder="URL ảnh"
                  value={url}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeImageUrl(index)}
                  disabled={product.image_url.length === 1}
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addImageUrl} className="mt-2">
              Thêm ảnh
            </Button>
          </div>

          <Input
            name="image_hover_url"
            value={product.image_hover_url}
            onChange={handleChange}
            placeholder="Ảnh hover"
          />
          <div className="flex lg:flex-row flex-col justify-between items-center space-y-3 lg:space-y-0 lg:space-x-3">
            <Select
              value={product.category_id}
              onValueChange={(val) => handleSelectChange('category_id', val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={product.subcategory_id}
              onValueChange={(val) => handleSelectChange('subcategory_id', val)}
              disabled={!product.category_id}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn danh mục con" />
              </SelectTrigger>
              <SelectContent>
                {filteredSubcategories.map((sc) => (
                  <SelectItem key={sc.id} value={sc.id}>
                    {sc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      <Card className="mb-6 dark:bg-gray">
        <CardHeader>
          <h2 className="text-lg font-semibold">Biến thể sản phẩm</h2>
        </CardHeader>
        <CardContent className="grid gap-4">
          {variants.map((variant, index) => (
            <div key={index} className="grid grid-cols-4 gap-2 items-end">
              <Input
                placeholder="Màu"
                value={variant.color}
                onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
              />
              <Input
                placeholder="Kích cỡ"
                value={variant.size}
                onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
              />
              <Input
                type="number"
                placeholder="Số lượng"
                value={variant.quantity.toString()}
                onChange={(e) => handleVariantChange(index, 'quantity', e.target.value)}
                min={0}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeVariant(index)}
                disabled={variants.length === 1}
              >
                <Trash2 className="w-4 h-4 mr-2" /> Xoá
              </Button>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button type="button" onClick={addVariant} variant="outline">
            <Plus className="w-4 h-4 mr-2" /> Thêm biến thể
          </Button>
        </CardFooter>
      </Card>

      <div className="text-right">
        <Button onClick={handleSubmit} className="px-6 text-white">
          Tạo sản phẩm
        </Button>
      </div>
    </div>
  );
}
