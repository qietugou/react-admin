import React, { useCallback, useState } from 'react';
import SimpleMdeReact from 'react-simplemde-editor';
import marked from 'marked';
import Prism from 'prismjs';
import 'easymde/dist/easymde.min.css';
import type { Options } from 'easymde';
import styles from './index.less';
import { upload } from '@/services/my/api';

type EditorProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const getDefaultMarkedOptions = () => {
  const renderer = new marked.Renderer();
  return {
    renderer,
    headerIds: false,
    gfm: true,
    breaks: true,
    highlight(code: string, lang: string) {
      if (lang) {
        const language = lang.toLowerCase();
        const grammar = Prism.languages[language];
        if (grammar) {
          return Prism.highlight(code, grammar, language);
        }
      }
      return code;
    },
  };
};

const outputMarkDown = (content: string): string => {
  const { renderer, ...otherOptions } = getDefaultMarkedOptions();
  marked.setOptions({ renderer, ...otherOptions });
  return marked(content).replace(
    /<pre>(\s*)<code class="([\w-]+)">/g,
    '<pre class="$2 line-numbers">$1<code class="$2">',
  );
};

const Editor: React.FC<EditorProps> = (props) => {
  const [options] = useState<Options>({
    maxHeight: '500px',
    previewRender: (markdownPlaintext: string) => outputMarkDown(markdownPlaintext),
    uploadImage: true,
    imageMaxSize: 1024 * 1024 * 10,
    imageUploadFunction: async (file, onSuccess) => {
      const result = await upload(file);
      onSuccess(`${result.data.url}`);
    },
    toolbar: [
      // 所有工具栏
      'bold', // 黑体
      'italic', // 斜体
      'strikethrough', // 删除线
      'heading', // 标题
      'heading-smaller', // 缩小标题
      'heading-bigger', // 增大标题
      'heading-1', // 小标题
      'heading-2', // 中标题
      'heading-3', // 大标题
      '|', // 分割线
      'code', // 代码块
      'quote', // 引用
      'unordered-list', // 无序列表
      'ordered-list', // 有序列表
      'clean-block', // 清除块样式
      '|', // 分割线
      'link', // 添加超链接
      'image', // 添加图片
      'table', // 添加表格
      'horizontal-rule', // 水平线
      '|',
      'preview', // 全屏预览
      'side-by-side', // 分屏预览
      'fullscreen', // 全屏
      '|', // 分割线
      'undo', // 清空
      'redo', // 重做
      'guide', // 说明
    ],
  });

  const onChange = useCallback(
    (val: string) => {
      if (props.onChange) {
        props.onChange(val);
      }
    },
    [props],
  );

  return (
    <SimpleMdeReact
      className={styles.markBody}
      options={options}
      value={props.value}
      onChange={onChange}
    />
  );
};

export default React.memo(Editor);
