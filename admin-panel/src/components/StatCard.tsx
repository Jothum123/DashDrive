import React from 'react';
import { cn } from '../utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
  trend?: string;
}

export const StatCard = ({ title, value, icon, color = "bg-primary", trend }: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-[20px] shadow-soft border border-slate-50 flex flex-col justify-between relative overflow-hidden group hover:border-primary/20 transition-all duration-300">
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
      </div>
      
      <div className={cn(
        "absolute top-4 right-4 w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
        color.includes('bg-') ? color : `bg-${color}/10`
      )}>
        {icon}
      </div>
      
      <div className="mt-4 flex items-center gap-2">
        {trend ? (
          <span className="text-[10px] text-slate-400 font-medium">{trend}</span>
        ) : (
          <>
            <span className="text-xs font-medium text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">+12.5%</span>
            <span className="text-[10px] text-slate-400">from last week</span>
          </>
        )}
      </div>
    </div>
  );
};
