import { GridProps } from './types';

export default function Grid({ left, right }: GridProps) {
  return (
    <section className="grid grid-cols-12 gap-4">
      <aside className="col-span-3">
        <h2>Sidebar</h2>
        {left}
      </aside>
      <section className="col-span-9">
        {right}
      </section>
    </section>
  );
}
