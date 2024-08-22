'use client'
import { useState, useEffect, ChangeEvent } from "react";

import styles from './search.module.css'

type Joke = {
  id: string;
  value: string;
  url: string;
  created_at: string;
}

type JokesData = {
  total: number;
  result: Joke[];
}
const Search = () => {
  const [query, setQuery] = useState<string>('');
  const [data, setData] = useState<JokesData | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (query && query.length >= 4) {
        const response = await fetch(`https://api.chucknorris.io/jokes/search?query=${query}`);
        const jokesData: JokesData = await response.json();

        if (isMounted) {
          setData(jokesData);
        }
      } else {
        setData(null);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [query]);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  return (
    <main className={styles.mainBlock}>
      <div className={styles.form__group}>
        <input type="text" className={styles.form__input} id="name" placeholder="Find the joke"  value={query} onChange={handleInputChange} />
        <span>{data ? 'total: ' + data.total : ''}</span>
      </div>
      <section className={styles.resultBlock}>
        {query && data && data.result ? (
          <ul className={styles.resultBlock}>
            {data.result.map((item: Joke) => (
              <a href={item.url} target="_blank" key={item.id} className={styles.itemBlock}>
                <p className={styles.item__value}>
                  {item.value.length > 130 ? item.value.slice(0, 130) + '...' : item.value}</p>
                <p className={styles.item__info}>
                  <span>{item.id}</span>
                  <span>{item.created_at}</span>
                </p>
              </a>
            ))}
          </ul>
        ) : (
          null
        )}
      </section>
    </main >
  );
}

export default Search;