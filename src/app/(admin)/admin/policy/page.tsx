'use client';

import Editor from '@/components/editor/Editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Alert from '@/components/views/Alert';
import { createPrivacyPolicy } from '@/services/policyApi';
import { useState } from 'react';

const sanitizePolicyHtml = (rawHtml: string) => {
  if (!rawHtml?.trim()) return '';

  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml, 'text/html');

  doc.querySelectorAll('script, style, meta, link, iframe, object, embed').forEach((node) => {
    node.remove();
  });

  doc.body.querySelectorAll('*').forEach((el) => {
    [...el.attributes].forEach((attr) => {
      const name = attr.name.toLowerCase();
      const keep =
        name === 'href' ||
        name === 'src' ||
        name === 'alt' ||
        name === 'title' ||
        name === 'target' ||
        name === 'rel';
      if (!keep) {
        el.removeAttribute(attr.name);
      }
    });
  });

  return doc.body.innerHTML.trim();
};

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [typePolicy, setTypePolicy] = useState<'information' | 'faq'>(
    'information',
  );
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<
    'info' | 'error' | 'success'
  >('info');

  const showAlert = (
    message: string,
    type: 'info' | 'error' | 'success' = 'info',
  ) => {
    setAlertMessage(message);
    setAlertType(type);
  };

  const handleSubmit = async () => {
    const cleanedContent = sanitizePolicyHtml(content);

    if (!title.trim() || !cleanedContent.trim()) {
      showAlert('Vui lòng nhập đầy đủ tiêu đề và nội dung!', 'error');
      return;
    }

    setLoading(true);
    try {
      await createPrivacyPolicy({
        title,
        content: cleanedContent,
        type_policy: typePolicy,
      });
      showAlert('Tạo chính sách thành công!', 'success');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error(error);
      showAlert('Có lỗi xảy ra khi tạo chính sách!', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-4 px-4">
      <h1 className="text-3xl font-bold mb-6">Chính sách bảo mật</h1>

      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="title">Tiêu đề</Label>
          <Input
            id="title"
            placeholder="Nhập tiêu đề bài viết..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Label>Loại chính sách</Label>
          <Select
            value={typePolicy}
            onValueChange={(val) =>
              setTypePolicy(val as 'information' | 'faq')
            }
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Chọn loại chính sách" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="information">Thông tin</SelectItem>
              <SelectItem value="faq">Câu hỏi thường gặp</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-2 admin-policy">
          <Label>Nội dung</Label>
          <Editor content={content} setContent={setContent} />
        </div>

        <div className="pt-4">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="text-white"
          >
            {loading ? 'Đang tạo chính sách' : 'Tạo chính sách'}
          </Button>
        </div>
      </div>

      <Alert
        type={alertType}
        message={alertMessage}
        onClose={() => setAlertMessage('')}
        duration={3000}
      />
    </div>
  );
}
