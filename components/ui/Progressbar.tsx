"use client";

import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full">
      <Progress value={progress} className="h-3 bg-gray-200" />
    </div>
  );
}
