import type { Metadata } from 'next';
import { OrbitGrid } from '@/components/orbit-showcase';

export const metadata: Metadata = {
  title: 'Interactive Primitives | Valoria',
  description: 'Explore Valoria’s interactive motion and interface primitives.',
};

export default function PrimitivesPage() {
  return (
    <main className="min-h-screen w-full bg-black pb-20">
      <OrbitGrid />
    </main>
  );
}
