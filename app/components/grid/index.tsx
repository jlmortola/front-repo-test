import Link from 'next/link';
import { GridProps } from './types';

export function BackButton() {
  return (
    <Link href="/posts">
      <button type="button" className="mb-6"> Go Back </button>
    </Link>
  );
}

export default function Grid({ left, right, hideBackButton }: GridProps) {
  return (
    <section className="grid grid-cols-12 gap-4">
      <aside className="col-span-3 pl-4">
        {hideBackButton ? null : <BackButton />}
        {left}
      </aside>
      <section className="col-span-9">
        {right}
      </section>
    </section>
  );
}
