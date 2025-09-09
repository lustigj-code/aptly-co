'use client';

import { motion } from 'framer-motion';
import type { SuccessStory } from '@/lib/data/success-stories';

type TestimonialCardProps = {
  story: SuccessStory;
  index: number;
};

export function TestimonialCard({ story, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[#21A8B0]/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-[#21A8B0] to-[#0A004A] rounded-full flex items-center justify-center">
            <span className="text-white font-bold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {story.initials}
            </span>
          </div>
          <div className="ml-4">
            <div className="text-[#21A8B0] text-sm font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {story.completionTime}
            </div>
            <div className="text-white font-bold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {story.certificateCompleted}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-[#DEF2F2] text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            <span className="text-[#69BCC1]">From:</span> {story.previousRole}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-[#DEF2F2] text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            <span className="text-[#21A8B0]">To:</span> {story.currentRole}
          </div>
        </div>
      </div>

      <blockquote className="text-[#DEF2F2] italic mb-6 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
        &ldquo;{story.quote}&rdquo;
      </blockquote>

      <div className="pt-6 border-t border-white/10">
        <div className="text-[#21A8B0] font-medium text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Key Outcome
        </div>
        <div className="text-white mt-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          {story.keyOutcome}
        </div>
      </div>
    </motion.div>
  );
}