'use client';

import { motion } from 'framer-motion';

interface ProjectProps {
  title: string;
  tag: string;
  role: string;
  awards: string[];
}

export default function ProjectCard({ title, tag, role, awards }: ProjectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // 电影感缓动曲线
      className="border-b border-zinc-800 py-16 flex flex-col md:flex-row justify-between items-start group hover:border-white transition-colors duration-300"
    >
      {/* 左侧：标题与标签 */}
      <div className="max-w-xl">
        <span className="text-xs uppercase tracking-widest text-zinc-500 mb-2 block">{tag}</span>
        <h3 className="text-4xl font-light tracking-tight text-zinc-100 group-hover:text-white transition-colors">
          {title}
        </h3>
      </div>

      {/* 中间：获得的奖项 */}
      <div className="flex flex-wrap gap-2 max-w-md my-4 md:my-0">
        {awards.map((award, index) => (
          <span key={index} className="text-xs border border-zinc-700 px-2 py-1 rounded-full text-zinc-400">
            {award}
          </span>
        ))}
      </div>

      {/* 右侧：角色职责 */}
      <div className="text-right">
        <span className="text-sm text-zinc-400">{role}</span>
      </div>
    </motion.div>
  );
}
