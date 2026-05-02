'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SortType } from '@/types/sort';
import { ArrowDownAZ, ArrowUpAZ, Clock, Filter, TrendingDown, TrendingUp } from 'lucide-react';
import { useState } from 'react';
interface ModalFitterProductProps {
  sort: SortType;
  onSortChange: (value: SortType) => void;
}

const sortOptions = [
  {
    value: 'newest',
    label: 'Mới nhất',
    description: 'Sản phẩm được thêm gần đây nhất',
    icon: Clock,
    color: 'text-blue-500',
  },
  {
    value: 'oldest',
    label: 'Cũ nhất',
    description: 'Sản phẩm được thêm lâu nhất',
    icon: Clock,
    color: 'text-gray-500',
  },
  {
    value: 'price_asc',
    label: 'Giá tăng dần',
    description: 'Từ thấp đến cao',
    icon: TrendingUp,
    color: 'text-green-500',
  },
  {
    value: 'price_desc',
    label: 'Giá giảm dần',
    description: 'Từ cao xuống thấp',
    icon: TrendingDown,
    color: 'text-red-500',
  },
  {
    value: 'name_asc',
    label: 'Tên A → Z',
    description: 'Sắp xếp theo bảng chữ cái',
    icon: ArrowUpAZ,
    color: 'text-purple-500',
  },
  {
    value: 'name_desc',
    label: 'Tên Z → A',
    description: 'Sắp xếp ngược bảng chữ cái',
    icon: ArrowDownAZ,
    color: 'text-purple-500',
  },
];

export default function ModalFitterProduct({ sort, onSortChange }: ModalFitterProductProps) {
  const [selected, setSelected] = useState<SortType>(sort);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="relative text-white hover:text-white bg-primary hover:bg-primary/100 rounded-full transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl px-4 py-2 group"
        >
          <Filter className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
          <span className="hidden sm:inline">Bộ lọc</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-2xl border-0 shadow-2xl bg-border backdrop-blur-3xl h-[90%] overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-hide">
        <AlertDialogHeader className="text-center space-y-3">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <Filter className="w-8 h-8 text-white" />
          </div>
          <AlertDialogTitle className="text-2xl font-bold text-foreground">
            Bộ lọc sản phẩm
          </AlertDialogTitle>
          <AlertDialogDescription className="text-foreground text-base">
            Chọn cách sắp xếp để tìm sản phẩm phù hợp nhất với bạn
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-6">
          <RadioGroup
            value={selected}
            onValueChange={(val) => setSelected(val as SortType)}
            className="space-y-3"
          >
            {sortOptions.map((option) => {
              const IconComponent = option.icon;
              const isSelected = selected === option.value;

              return (
                <div key={option.value} className="relative">
                  <div
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'border-blue shadow-md transform scale-[1.02]'
                        : 'border-primary hover:border-primary/100 hover:shadow-sm'
                    }`}
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className={`mr-4 ${isSelected ? 'border-blue-500' : ''}`}
                    />
                    <div className="flex items-center flex-1">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg'
                            : 'bg-gray-100'
                        }`}
                      >
                        <IconComponent
                          className={`w-5 h-5 ${isSelected ? 'text-white' : option.color}`}
                        />
                      </div>
                      <div className="flex-1">
                        <Label
                          htmlFor={option.value}
                          className={`
                            text-base font-medium cursor-pointer transition-colors
                            ${isSelected ? 'text-foreground' : 'text-gray dark:text-white'}
                          `}
                        >
                          {option.label}
                        </Label>
                        <p
                          className={`text-sm mt-1 transition-colors ${isSelected ? 'text-foreground' : 'text-foreground'}`}
                        >
                          {option.description}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <div className="w-2 h-2 bg-blue rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </RadioGroup>
        </div>

        <AlertDialogFooter className="gap-3 pt-6 border-t border-primary">
          <AlertDialogCancel className="flex-1 rounded-xl transition-all duration-200 py-3 h-12">
            Đóng
          </AlertDialogCancel>
          <AlertDialogAction
            className="flex-1 rounded-xl bg-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 py-3 h-12"
            onClick={() => onSortChange(selected)}
          >
            Xác nhận
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
