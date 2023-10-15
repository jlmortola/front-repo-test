'use-client';

import { useDeletePost } from '@/posts/hooks';

export default function DeleteButton({ id }:{ id: string }) {
  const mutation = useDeletePost();

  const handleDelete = () => {
    if (window?.confirm('Are you sure you want to delete the post?')) {
      mutation.mutate({ id });
    }
  };
  return <button onClick={handleDelete} type="button">Delete</button>;
}
