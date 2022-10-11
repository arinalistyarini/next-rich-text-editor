import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { TextEditor } from '@/components/TextEditor/TextEditor';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { deserialize } from '@/components/TextEditor/helpers/deserialize';
import { ImSpinner2 } from 'react-icons/im';
import { CommonModal } from '@/components/CommonModal';

const Editor = () => {
  const router = useRouter();
  const { title } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [itemDetail, setItemDetail] = useState([]);
  const [editorValue, setEditorValue] = useState([]);
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios({
          method: 'get',  
          // https://stackoverflow.com/questions/33614492/wikipedia-api-get-random-pages
          url: 'https://en.wikipedia.org/w/api.php',
          // detail - html
          params: {
            origin: '*',
            action: 'parse',
            page: title,
            prop: 'text',
            formatversion: '2',
            format: 'json',
          },
        });

        if (data.error) throw data.error;

        setItemDetail(deserialize(data.parse.text));
        setEditorValue(deserialize(data.parse.text));
      } catch (error) {
        setModalText(error.info || 'Page load error');
        handleModal(true);
        setItemDetail([]);
        setEditorValue([]);
      }
      finally {
        setIsLoading(false);
      }
    };
    if (title) {
      fetchDetail();
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleEditorValue = (value) => {
    setEditorValue(value);
  };

  const [modal, setModal] = useState(false);
  const handleModal = (value) => {
    setModal(value);
  };

  return (
    <Main meta={<Meta title="Editor" description="Rich text editor" />}>
      {isLoading &&
        <div className="flex w-full justify-center p-3">
          <ImSpinner2 className="animate-spin text-gray-400" />
        </div>
      }
      {!isLoading &&
        <TextEditor value={itemDetail} isEdit={!!title} onChange={handleEditorValue} />
      }
      <div className="flex justify-end w-full mt-2">
        <button
          className="w-full mt-3 text-white enabled:bg-blue-700 enabled:hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded text-sm px-2 py-1 text-center"
          onClick={() => { setModalText(JSON.stringify(editorValue)); handleModal(true); }}
        >
          Get nodes
        </button>
      </div>
      <CommonModal modal={modal} setModal={handleModal}>
        { modalText }
      </CommonModal>
    </Main>
  );
};

Editor.getInitialProps = ({ query }) => {
  return {query};
}

export default Editor;
