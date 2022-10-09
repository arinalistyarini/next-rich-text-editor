import { TextEditor } from '@/components/TextEditor/TextEditor';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Editor = () => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <TextEditor />
    <p>This is Editsor</p>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
      recusandae quidem. Quaerat molestiae blanditiis doloremque possimus labore
      voluptatibus distinctio recusandae autem esse explicabo molestias officia
      placeat, accusamus aut saepe.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
      recusandae quidem. Quaerat molestiae blanditiis doloremque possimus labore
      voluptatibus distinctio recusandae autem esse explicabo molestias officia
      placeat, accusamus aut saepe.
    </p>
  </Main>
);

export default Editor;
