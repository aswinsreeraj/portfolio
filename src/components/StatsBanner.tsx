import React from 'react';
import { profile } from '../data/profile';

export const StatsBanner: React.FC = () => {
  return (
    <section className="w-full py-20 bg-[#0E1F27] text-[#E6F4F8] border-y border-[#1E3A47]">
      <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-16 flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <div className="font-mono font-medium text-[13px] tracking-wide text-[#FDDD00]">
            // runtime.metrics()
          </div>
          <h2 className="m-0 text-[36px] sm:text-[40px] font-bold tracking-tight text-white leading-tight">
            Numbers I can point to
          </h2>
        </div>

        <div className="flex flex-wrap gap-6">
          {profile.stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex-1 min-w-[220px] flex flex-col gap-2 p-6 border border-[#1E3A47] rounded-xl bg-[#0A171D] transition-transform hover:-translate-y-1"
            >
              <div className="text-[44px] sm:text-[48px] font-bold tracking-tight text-white leading-none">
                {stat.value}
              </div>
              <div className="font-mono text-[12px] tracking-wider text-[#8DB1BE] uppercase mt-1">
                {stat.label}
              </div>
              <div className="text-[13px] text-[#B9D3DC] font-sans mt-2 pt-2 border-t border-[#1E3A47]/60 leading-relaxed">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
