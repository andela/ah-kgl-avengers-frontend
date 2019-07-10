import axios from 'axios';

class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return new Promise((resolve, reject) => {
      this.loader.file
        .then((file) => {
          const data = new FormData();
          data.append('file', file, file.name);
          data.append('upload_preset', 'qmnnrrnhhaven');
          data.append('tags', 'browser_upload');
          axios
            .post('https://api.cloudinary.com/v1_1/avpaul/upload', data, {
              headers: { 'content-type': 'multipart/form-data' },
            })
            .then((response) => {
              const { url } = response.data;
              const formatedURL = url.search(/\/$/g) >= 0 ? url.slice(0, -1) : url;
              resolve({ default: formatedURL });
            })
            .catch(error => reject(error || "Couldn't upload the image"));
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
