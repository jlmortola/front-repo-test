'use client';

import React, { useReducer, useRef, useLayoutEffect, useCallback, Dispatch } from 'react';

function useDispatch<T>(dispatch: Dispatch<Partial<T>>) {
  const mounted = useRef(false);
  useLayoutEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);
  return useCallback(
    (...args: Parameters<Dispatch<Partial<T>>>) => (mounted.current ? dispatch(...args) : undefined),
    [dispatch],
  );
}

function reducer<T>(state: T, action: Partial<T>) {
  return ({ ...state, ...action });
}

export default function useData<T extends {}>(initialState: T) {
  const [state, dispatch] = useReducer<React.Reducer<T, Partial<T>>>(reducer, initialState);
  const setState = useDispatch(dispatch);
  const setData = useCallback((data: Partial<T>) => setState(data), [setState]);
  return { state, setData };
}
