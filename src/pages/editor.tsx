import { TextEditor } from '@/components/TextEditor/TextEditor';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Editor = () => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <TextEditor />
  </Main>
);

export default Editor;
