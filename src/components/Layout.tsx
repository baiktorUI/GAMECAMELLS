import React from 'react';
import { gradients } from '../styles/gradients';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div 
      className="min-h-screen flex flex-col items-center pt-[20px] p-6 gap-[10px]"
      style={{ background: gradients.background }}
    >
      <div className="my-[10px]">
        <img 
          src="/logo.svg" 
          alt="Quina Camell" 
          className="w-[350px] h-[200px] object-contain"
        />
      </div>
      <div className="bg-white/15 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-fit mx-auto">
        {children}
      </div>
    </div>
  );
}