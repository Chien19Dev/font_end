'use client';

import { format } from 'date-fns';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import {
  Cake,
  CalendarIcon,
  Camera,
  Check,
  CircleUserRoundIcon,
  ImageIcon,
  Mail,
  MapPin,
  Phone,
  User,
  Users,
  XIcon,
} from 'lucide-react';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

import { useUser } from '@/contexts/UserContext';
import {
  updateProfile,
  UpdateProfileResponse,
} from '@/services/profileApi';
import { uploadImage } from '@/services/uploadApi';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFileUpload } from '@/hooks/use-file-upload';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { DropdownNavProps, DropdownProps } from 'react-day-picker';

export interface PersonalInfoPageRef {
  handleUpdate: () => Promise<UpdateProfileResponse>;
}

const PersonalInfoPage = forwardRef<PersonalInfoPageRef>((_, ref) => {
  const { user } = useUser();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [birthDate, setBirthDate] = useState<Date | undefined>(
    undefined,
  );
  const [gender, setGender] = useState<'0' | '1' | '2'>('0');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(
    null,
  );
  const [isUploading, setIsUploading] = useState(false);

  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({ accept: 'image/*' });

  useEffect(() => {
    if (files.length > 0) {
      setIsUploading(true);
      uploadImage(files[0].file).then((url) => {
        if (url) setAvatar(url);
        setIsUploading(false);
      });
    }
  }, [files]);

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
      setBirthDate(
        user.birth_date ? new Date(user.birth_date) : undefined,
      );
      setGender(String(user.gender ?? 0) as '0' | '1' | '2');
      setAvatar(user.avatar || null);
    }
  }, [user]);

  useImperativeHandle(ref, () => ({
    handleUpdate: async () => {
      return await updateProfile({
        full_name: user?.full_name ?? '',
        phone,
        address,
        birth_date: birthDate
          ? dayjs(birthDate).format('YYYY-MM-DD')
          : null,
        gender: Number(gender) as 0 | 1 | 2,
        avatar,
      });
    },
  }));

  const previewUrl =
    files[0]?.preview || avatar || user?.avatar || null;
  const fileName = files[0]?.file.name || null;

  const handleCalendarChange = (
    _value: string | number,
    _e: React.ChangeEventHandler<HTMLSelectElement>,
  ) => {
    const _event = {
      target: {
        value: String(_value),
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    _e(_event);
  };

  const genderOptions = [
    { value: '0', label: 'Nam' },
    { value: '1', label: 'Nữ' },
    { value: '2', label: 'Khác' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-3xl font-bold text-foreground">
          Thông tin cá nhân
        </h1>
        <p className="text-muted-foreground">
          Cập nhật thông tin để có trải nghiệm tốt nhất
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-2 border-dashed border-muted hover:border-primary/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-6">
              <div className="relative group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Button
                    variant="outline"
                    className="relative size-32 overflow-hidden p-0 rounded-full border-4 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={openFileDialog}
                    disabled={isUploading}
                    aria-label={
                      previewUrl ? 'Change image' : 'Upload image'
                    }
                  >
                    {previewUrl ? (
                      <Image
                        className="size-full object-cover rounded-full"
                        src={previewUrl}
                        alt="Avatar preview"
                        width={128}
                        height={128}
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <CircleUserRoundIcon className="size-12" />
                        <span className="text-xs">Chọn ảnh</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                      <Camera className="size-6 text-white" />
                    </div>
                    {isUploading && (
                      <div className="absolute inset-0 bg-primary/90 rounded-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
                      </div>
                    )}
                  </Button>

                  {files.length > 0 && (
                    <Button
                      onClick={() => removeFile(files[0]?.id)}
                      size="icon"
                      className="absolute -top-1 -right-1 size-8 rounded-full bg-destructive hover:bg-destructive/90 shadow-lg border-2 border-background"
                      aria-label="Remove image"
                    >
                      <XIcon className="size-4" />
                    </Button>
                  )}
                </motion.div>

                <input
                  {...getInputProps()}
                  className="sr-only"
                  aria-label="Upload image"
                  tabIndex={-1}
                />
              </div>

              <div className="text-center space-y-2">
                {fullName && (
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl font-semibold text-foreground"
                  >
                    {fullName}
                  </motion.h2>
                )}
                {fileName && (
                  <Badge variant="secondary" className="gap-2">
                    <ImageIcon className="size-3" />
                    {fileName}
                  </Badge>
                )}
                <p className="text-sm text-muted-foreground max-w-xs">
                  Nhấn vào avatar để thay đổi ảnh đại diện. Định dạng:
                  JPG, PNG (tối đa 5MB)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <Label
                  htmlFor="full_name"
                  className="text-sm font-semibold flex items-center gap-2"
                >
                  <User className="size-4 text-primary" />
                  Họ và tên
                </Label>
                <div className="relative">
                  <Input
                    id="full_name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onFocus={() => setFocusedField('full_name')}
                    onBlur={() => setFocusedField(null)}
                    className={cn(
                      'h-12 border-2 rounded-xl bg-background transition-all duration-200',
                      focusedField === 'full_name'
                        ? 'border-primary shadow-lg ring-4 ring-primary/10'
                        : 'border-border hover:border-muted-foreground/50',
                    )}
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <Label
                  htmlFor="address"
                  className="text-sm font-semibold flex items-center gap-2"
                >
                  <MapPin className="size-4 text-primary" />
                  Địa chỉ thường trú
                </Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onFocus={() => setFocusedField('address')}
                  onBlur={() => setFocusedField(null)}
                  className={cn(
                    'h-12 border-2 rounded-xl bg-background transition-all duration-200',
                    focusedField === 'address'
                      ? 'border-primary shadow-lg ring-4 ring-primary/10'
                      : 'border-border hover:border-muted-foreground/50',
                  )}
                  placeholder="Nhập địa chỉ của bạn"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold flex items-center gap-2"
                >
                  <Mail className="size-4 text-muted-foreground" />
                  Email
                  <Badge variant="secondary" className="text-xs">
                    Không thể thay đổi
                  </Badge>
                </Label>
                <Input
                  id="email"
                  value={email}
                  disabled
                  className="h-12 border-2 rounded-xl bg-muted/50 cursor-not-allowed"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <Label
                  htmlFor="phone"
                  className="text-sm font-semibold flex items-center gap-2"
                >
                  <Phone className="size-4 text-primary" />
                  Số điện thoại
                </Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  className={cn(
                    'h-12 border-2 rounded-xl bg-background transition-all duration-200',
                    focusedField === 'phone'
                      ? 'border-primary shadow-lg ring-4 ring-primary/10'
                      : 'border-border hover:border-muted-foreground/50',
                  )}
                  placeholder="Nhập số điện thoại"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-2"
              >
                <Label
                  htmlFor="birthDate"
                  className="text-sm font-semibold flex items-center gap-2"
                >
                  <Cake className="size-4 text-primary" />
                  Ngày sinh
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'h-12 w-full justify-start text-left font-normal border-2 rounded-xl transition-all duration-200 hover:border-muted-foreground/50',
                        !birthDate && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {birthDate
                        ? format(birthDate, 'dd/MM/yyyy')
                        : 'Chọn ngày sinh'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-background border-2 shadow-xl rounded-xl"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={birthDate}
                      onSelect={setBirthDate}
                      captionLayout="dropdown"
                      defaultMonth={birthDate || new Date(2000, 0)}
                      startMonth={new Date(1900, 0)}
                      className="rounded-xl border-0 p-3"
                      classNames={{
                        month_caption: 'mx-0',
                        day_selected:
                          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                      }}
                      components={{
                        DropdownNav: (props: DropdownNavProps) => (
                          <div className="flex w-full items-center gap-2">
                            {props.children}
                          </div>
                        ),
                        Dropdown: (props: DropdownProps) => (
                          <Select
                            value={String(props.value)}
                            onValueChange={(value) => {
                              if (props.onChange) {
                                handleCalendarChange(
                                  value,
                                  props.onChange,
                                );
                              }
                            }}
                          >
                            <SelectTrigger className="h-8 w-fit font-medium first:grow rounded-lg">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="max-h-[min(26rem,var(--radix-select-content-available-height))] rounded-xl">
                              {props.options?.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={String(option.value)}
                                  disabled={option.disabled}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ),
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-3"
              >
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <Users className="size-4 text-primary" />
                  Giới tính
                </Label>
                <RadioGroup
                  defaultValue={gender}
                  onValueChange={(val) =>
                    setGender(val as '0' | '1' | '2')
                  }
                  className="flex gap-6"
                >
                  {genderOptions.map((option) => (
                    <motion.div
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center space-x-3"
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={`gender-${option.value}`}
                        className="h-5 w-5 border-2"
                      />
                      <Label
                        htmlFor={`gender-${option.value}`}
                        className="cursor-pointer font-medium flex items-center gap-2"
                      >
                        {option.label}
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card className="bg-muted/50 border-dashed">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Check className="size-5 text-green-500" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  Lưu ý quan trọng
                </p>
                <p className="text-xs text-muted-foreground">
                  Thông tin cá nhân của bạn được mã hóa và bảo vệ theo
                  tiêu chuẩn bảo mật cao nhất. Chúng tôi chỉ sử dụng
                  thông tin này để cải thiện trải nghiệm của bạn.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
});
PersonalInfoPage.displayName = 'PersonalInfoPage';

export default PersonalInfoPage;
