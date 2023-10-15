import client from './client';
import Content from './content';

export default async function Dashboard() {
  // Prefetch initial data serverside
  const initialPostData = await client('/posts');
  return <Content initialPostData={initialPostData} />;
}
