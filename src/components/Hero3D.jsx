import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero3D() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/Nhk4dWoYLj83rV44/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-end px-6 pb-10 text-white">
        <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
          Interactive Sales Intelligence Dashboard
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
          Explore performance by month, channel, and product. 3D hero powered by Spline with a futuristic, data-driven vibe.
        </p>
      </div>
    </section>
  );
}
