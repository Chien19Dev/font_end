'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Alert from '@/components/views/Alert';
import {
  Category,
  createCategory,
  getAllCategories,
} from '@/services/categoryApi';
import { createSubcategory } from '@/services/subcategoryApi';
import { useEffect, useMemo, useState } from 'react';

type AlertType = 'success' | 'error' | 'info';

type CategoryForm = {
  name: string;
  slug_category: string;
  category_type: string;
  image: string;
  description: string;
};

type SubcategoryForm = {
  name: string;
  slug: string;
  categoryId: string;
};

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export default function CreateCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [isCreatingSubcategory, setIsCreatingSubcategory] =
    useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<AlertType>('info');

  const [categoryForm, setCategoryForm] = useState<CategoryForm>({
    name: '',
    slug_category: '',
    category_type: '',
    image: '',
    description: '',
  });

  const [subcategoryForm, setSubcategoryForm] = useState<SubcategoryForm>(
    {
      name: '',
      slug: '',
      categoryId: '',
    },
  );

  const isCategorySubmitDisabled = useMemo(
    () =>
      isCreatingCategory ||
      !categoryForm.name.trim() ||
      !categoryForm.slug_category.trim() ||
      !categoryForm.category_type.trim(),
    [categoryForm, isCreatingCategory],
  );

  const isSubcategorySubmitDisabled = useMemo(
    () =>
      isCreatingSubcategory ||
      !subcategoryForm.name.trim() ||
      !subcategoryForm.slug.trim() ||
      !subcategoryForm.categoryId,
    [subcategoryForm, isCreatingSubcategory],
  );

  const loadCategories = async () => {
    setIsLoadingCategories(true);
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Không thể tải danh sách danh mục:', error);
      setAlertType('error');
      setAlertMessage('Không thể tải danh sách danh mục cha');
    } finally {
      setIsLoadingCategories(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreateCategory = async () => {
    if (isCategorySubmitDisabled) return;

    setIsCreatingCategory(true);
    try {
      await createCategory({
        name: categoryForm.name.trim(),
        slug_category: categoryForm.slug_category.trim(),
        category_type: categoryForm.category_type.trim(),
        image: categoryForm.image.trim(),
        description: categoryForm.description.trim(),
      });

      setAlertType('success');
      setAlertMessage('Tạo danh mục cha thành công');
      setCategoryForm({
        name: '',
        slug_category: '',
        category_type: '',
        image: '',
        description: '',
      });
      await loadCategories();
    } catch (error) {
      console.error('Tạo danh mục cha thất bại:', error);
      setAlertType('error');
      setAlertMessage('Tạo danh mục cha thất bại');
    } finally {
      setIsCreatingCategory(false);
    }
  };

  const handleCreateSubcategory = async () => {
    if (isSubcategorySubmitDisabled) return;

    setIsCreatingSubcategory(true);
    try {
      await createSubcategory({
        name: subcategoryForm.name.trim(),
        slug: subcategoryForm.slug.trim(),
        categoryId: subcategoryForm.categoryId,
      });

      setAlertType('success');
      setAlertMessage('Tạo danh mục con thành công');
      setSubcategoryForm({
        name: '',
        slug: '',
        categoryId: '',
      });
    } catch (error) {
      console.error('Tạo danh mục con thất bại:', error);
      setAlertType('error');
      setAlertMessage('Tạo danh mục con thất bại');
    } finally {
      setIsCreatingSubcategory(false);
    }
  };

  return (
    <div className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full h-full py-8">
      <div className="text-2xl font-semibold mb-6">
        Tạo danh mục cha và danh mục con
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="dark:bg-gray">
          <CardHeader>
            <CardTitle>Tạo danh mục cha</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Tên danh mục cha *"
              value={categoryForm.name}
              onChange={(e) => {
                const name = e.target.value;
                setCategoryForm((prev) => ({
                  ...prev,
                  name,
                  slug_category: createSlug(name),
                }));
              }}
            />
            <Input
              placeholder="Slug danh mục *"
              value={categoryForm.slug_category}
              onChange={(e) =>
                setCategoryForm((prev) => ({
                  ...prev,
                  slug_category: createSlug(e.target.value),
                }))
              }
            />
            <Input
              placeholder="Loại danh mục (category_type) *"
              value={categoryForm.category_type}
              onChange={(e) =>
                setCategoryForm((prev) => ({
                  ...prev,
                  category_type: e.target.value,
                }))
              }
            />
            <Input
              placeholder="Link hình ảnh"
              value={categoryForm.image}
              onChange={(e) =>
                setCategoryForm((prev) => ({
                  ...prev,
                  image: e.target.value,
                }))
              }
            />
            <Input
              placeholder="Mô tả"
              value={categoryForm.description}
              onChange={(e) =>
                setCategoryForm((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />

            <Button
              onClick={handleCreateCategory}
              disabled={isCategorySubmitDisabled}
              className="w-full dark:text-white"
            >
              {isCreatingCategory
                ? 'Đang tạo danh mục cha...'
                : 'Tạo danh mục cha'}
            </Button>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray">
          <CardHeader>
            <CardTitle>Tạo danh mục con</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Tên danh mục con *"
              value={subcategoryForm.name}
              onChange={(e) => {
                const name = e.target.value;
                setSubcategoryForm((prev) => ({
                  ...prev,
                  name,
                  slug: createSlug(name),
                }));
              }}
            />
            <Input
              placeholder="Slug danh mục con *"
              value={subcategoryForm.slug}
              onChange={(e) =>
                setSubcategoryForm((prev) => ({
                  ...prev,
                  slug: createSlug(e.target.value),
                }))
              }
            />

            <Select
              value={subcategoryForm.categoryId}
              onValueChange={(value) =>
                setSubcategoryForm((prev) => ({
                  ...prev,
                  categoryId: value,
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn danh mục cha *" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {isLoadingCategories && (
              <p className="text-sm text-gray-500">
                Đang tải danh mục cha...
              </p>
            )}

            <Button
              onClick={handleCreateSubcategory}
              disabled={
                isSubcategorySubmitDisabled || isLoadingCategories
              }
              className="w-full dark:text-white"
            >
              {isCreatingSubcategory
                ? 'Đang tạo danh mục con...'
                : 'Tạo danh mục con'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Alert
        type={alertType}
        message={alertMessage}
        duration={3000}
        onClose={() => setAlertMessage('')}
      />
    </div>
  );
}
