import axios from 'axios';

const upLoader = file => new Promise((resolve, reject) => {
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
});

export default upLoader;
