'use client';

import { useQuery, useMutation, useQueryClient, QueryClient } from 'react-query';
import { redirect } from 'next/navigation';
import client from './client';


import { Post, CreatePostRequest, DeletePostRequest, UpdatePostRequest } from './types';

const loadingPost = {
  title: 'Loading...',
  content: 'loading...',
  lat: 'Loading...',
  long: 'Loading...',
  image_url: 'Loading...',
};

function setQueryDataForPost(post: Post, queryClient: QueryClient) {
  queryClient.setQueryData(['post', { post: post.id }], post);
}

export function usePosts(initialData: Post[]) {
  const queryClient = useQueryClient();
  const result = useQuery<Post[]>({
    queryKey: 'posts',
    queryFn: () => client('posts').then((posts) => posts),
    initialData,
  });

  const { data } = result;

  if (data?.length) data.forEach((post) => setQueryDataForPost(post, queryClient));
  return { ...result, data: result.data ?? [] };
}

export function usePost(postId: string) {
  const result = useQuery<Post>({
    queryKey: ['post', { postId }],
    queryFn: () => client(`posts/${postId}`).then((post) => post),
  });
  return { ...result, data: result.data ?? [] };
}

// const [update, {error, isError}] = useUpdatePost()

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: UpdatePostRequest) => client(`posts/${updates.id}`, {
      method: 'PUT',
      data: updates,
    }),
    onMutate: async (updatedPost: Post) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ['post', updatedPost.id] });
      const previousPost = queryClient.getQueryData<Post>(['post', updatedPost.id]);
      queryClient.setQueryData(['post', updatedPost.id], updatedPost);
      return { previousPost, updatedPost };
    },
    onError: (err, newPost, context) => {
      // On error return the old value of the post
      if (!context) return;
      queryClient.setQueryData(
        ['post', context.updatedPost.id],
        context.previousPost,
      );
    },
    onSettled: (newPost) => {
      // If everything went well get the values from server
      queryClient.invalidateQueries({ queryKey: ['post', newPost.id] });
    },
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPost: CreatePostRequest) => client('posts', {
      method: 'POST',
      data: newPost,
    }),
    onMutate: async (newPost: Post) => {
      await queryClient.cancelQueries('posts');
      const previousPosts = queryClient.getQueryData<Post[]>('posts') || [];
      queryClient.setQueryData('posts', [...previousPosts, newPost]);
      return { previousPosts };
    },
    onError: (err, newPost, context) => {
      if (!context) return;
      queryClient.setQueryData('posts', context.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries('posts');
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postToDelete: DeletePostRequest) => client(`posts/${postToDelete.id}`, {
      method: 'DELETE',
    }),
    onMutate: async (postToDelete: DeletePostRequest) => {
      // Optimistic update
      await queryClient.cancelQueries('posts');
      const previousPosts = queryClient.getQueryData<Post[]>('posts') || [];
      queryClient.setQueryData('posts', previousPosts.filter((post) => post.id !== postToDelete.id));
      return { previousPosts };
    },
    onError: (err, postToDelete, context) => {
      if (!context) return;
      queryClient.setQueryData('posts', context.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries('posts');
    },
  });
}
