import { Transforms } from "slate";

const removeImage = (editor, path) => {
  return Transforms.removeNodes(editor, { at: path });
};

export { removeImage };
