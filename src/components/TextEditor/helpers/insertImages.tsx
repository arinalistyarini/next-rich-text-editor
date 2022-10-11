import { Transforms } from "slate";

const insertImages = (editor, files) => {
  for (const file of files) {
    const reader = new FileReader();
    const [mime] = file.type.split('/');
    if (mime === 'image') {
      reader.onload = (e) => {
        const src = e.target.result;
        insertNode(editor, src);
      }
      reader.readAsDataURL(file);
    }
  }
};

const insertNode = (editor, url) => {
  const text = { text: '' };
  const image = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image);
};

export { insertImages };
