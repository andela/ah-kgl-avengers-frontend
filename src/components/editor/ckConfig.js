import axios from 'axios';
import uploadHelper from '../../helpers/imageUpLoader';

class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return new Promise((resolve, reject) => {
      this.loader.file
        .then((file) => {
          resolve(uploadHelper(file));
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

const UploadAdapterPlugin = (editor) => {
  editor.plugins.get('FileRepository').createUploadAdapter = loader => new UploadAdapter(loader);
};

const editorConfigs = {
  toolbar: ['bold', 'italic', 'link', 'blockQuote', 'imageUpload'],
  blockToolbar: ['heading', 'blockQuote', 'imageUpload'],
  removePlugins: ['List', 'Table', 'TableToolbar', 'MediaEmbed'],
  extraPlugins: [UploadAdapterPlugin],
  placeholder: 'Your story here...',
  heading: {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      {
        model: 'heading1',
        view: 'h1',
        title: 'Heading 1',
        class: 'ck-heading_heading1',
      },
    ],
  },
};

export default editorConfigs;
