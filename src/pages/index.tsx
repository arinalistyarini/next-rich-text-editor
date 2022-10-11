import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { ImSpinner2 } from 'react-icons/im';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      setIsLoading(true);
      const { data } = await axios({
        method: 'get',
        // url: 'https://testimonialapi.toolcarton.com/api',
  
        // https://stackoverflow.com/questions/33614492/wikipedia-api-get-random-pages
        url: 'https://en.wikipedia.org/w/api.php',
        // list
        params: {
          origin: '*',
          action: 'query',
          format: 'json',
          list: 'random',
          generator: 'random',
          rnlimit: '20',
          prop: 'revisions',
          rvprop: 'content',
        },
      });
      setItemList([...data.query.random]);
      setIsLoading(false);
    };
    fetchList();
  }, []);

  return (
    <Main
      meta={
        <Meta
          title="Rich text editor"
          description="Rich text editor using SlateJS"
        />
      }
    >
      {isLoading &&
        <div className="flex w-full justify-center p-3">
          <ImSpinner2 className="animate-spin text-gray-400" />
        </div>
      }
      {(!isLoading && itemList.length) &&
        <ul className={'list-outside list-disc pl-3 text-base'}>
          {itemList.map((item = {}) => (
            <li key={item.id}>
              <Link href={{ pathname: '/editor', query: { title: item.title } }}>{item.title}</Link>
            </li>
          ))}
        </ul>
      }
    </Main>
  );
};

export default Index;
