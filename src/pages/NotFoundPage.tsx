import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname || '/[this-page]';

  return (
    <div className="min-h-screen flex items-center justify-center p-5 sm:p-8 bg-[#F3FAFD] dark:bg-[#0A171D] text-[#101820] dark:text-[#E6F4F8] transition-colors">
      <div className="w-full max-w-[880px] flex flex-col justify-center gap-5 p-8 sm:p-14 bg-white dark:bg-[#0E1F27] border border-[#D6E7EE] dark:border-[#1E3A47] rounded-2xl shadow-xl">
        <div className="font-mono font-bold text-[14px] text-[#00708C] dark:text-[#00ADD8]">
          404
        </div>

        <h1 className="m-0 font-mono text-[36px] sm:text-[44px] font-bold leading-tight tracking-tight text-[#101820] dark:text-white">
          undefined: page
        </h1>

        <p className="m-0 text-[17px] leading-relaxed text-[#3C4C57] dark:text-[#B9D3DC]">
          That page doesn't exist. Here's the compiler's opinion instead.
        </p>

        {/* Terminal Box with 8px 8px 0 #00ADD8 cyan shadow */}
        <div className="bg-[#0E1F27] rounded-[10px] p-5 sm:p-6 shadow-cyan-solid-8 overflow-x-auto border border-[#1E3A47]">
          <pre className="m-0 font-mono text-[14px] leading-relaxed text-[#E6F4F8]">
            <span className="text-[#8DB1BE]">$ go build ./...</span>{'\n'}
            <span className="text-[#8DB1BE]"># portfolio</span>{'\n'}
            ./router.go:42:15: <span className="text-[#FDDD00] font-bold">undefined: page</span>{'\n'}
            {'        '}no route for <span className="text-[#7FDCF3]">"{currentPath}"</span> in package portfolio{'\n'}
            <span className="text-red-400 font-bold">FAIL</span>    portfolio [build failed]
          </pre>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-2">
          <Link
            to="/"
            className="inline-flex items-center min-h-[48px] px-6 bg-[#FDDD00] hover:bg-[#ebd000] text-[#101820] border border-[#101820] rounded-md shadow-yellow-solid font-bold text-[16px] transition-transform active:translate-x-0.5 active:translate-y-0.5"
          >
            go home
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center min-h-[48px] px-6 bg-white dark:bg-[#0A171D] hover:bg-slate-50 dark:hover:bg-[#12242D] text-[#101820] dark:text-white border border-[#101820] dark:border-[#1E3A47] rounded-md font-semibold text-[16px] transition-colors"
          >
            View projects
          </Link>
        </div>
      </div>
    </div>
  );
};
