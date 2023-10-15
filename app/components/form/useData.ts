'use client';

import { Post } from '@/posts/types';
import { useReducer, useRef, useLayoutEffect, useCallback, Dispatch, SetStateAction } from 'react';

function useDispatch<T>(dispatch: Dispatch<SetStateAction<T>>) {
  const mounted = useRef(false);
  useLayoutEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);
  return useCallback(
    (...args: Parameters<Dispatch<SetStateAction<T>>>) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch],
  );
}

function reducer<T>(state: Post, action: T) {
  return ({ ...state, ...action });
}

export default function useData(initialState: Post) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setState = useDispatch(dispatch);
  const setData = useCallback((data: any) => setState(data), [setState]);
  return { state, setData };
}
