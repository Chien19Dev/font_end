'use client';

import dynamic from 'next/dynamic';
import React, { useRef } from 'react';

const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
});

type EditorProps = {
  content: string;
  setContent: (content: string) => void;
};

const Editor: React.FC<EditorProps> = React.memo(
  ({ content, setContent }) => {
    const editor = useRef(null);

    const config = {
      readonly: false,
      uploader: { insertImageAsBase64URI: true },
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: 'insert_clear_html' as const,
      buttons: [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'fontsize',
        'paragraph',
        '|',
        'ul',
        'ol',
        '|',
        'align',
        '|',
        'link',
        'image',
        'video',
        '|',
        'foreColor',
        'backColor',
        '|',
        'undo',
        'redo',
      ],
    };

    return (
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={(newContent) => setContent(newContent)}
      />
    );
  },
);

export default Editor;
