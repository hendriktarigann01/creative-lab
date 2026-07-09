/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export interface AnimatedBeamProps {
  containerRef: React.RefObject<any>;
  fromRef: React.RefObject<any>;
  toRef: React.RefObject<any>;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
  lineType?: 'curved' | 'orthogonal';
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  duration = 4,
  delay = 0,
  pathColor = '#ffffff',
  pathWidth = 2,
  gradientStartColor = '#7c3aed',
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
  lineType = 'curved',
}) => {
  const [pathD, setPathD] = useState('');
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const cRect = containerRef.current.getBoundingClientRect();
        const from = fromRef.current.getBoundingClientRect();
        const to = toRef.current.getBoundingClientRect();

        setSvgDimensions({ width: cRect.width, height: cRect.height });

        // Card center
        const fromCX = from.left - cRect.left + from.width / 2;
        const fromCY = from.top - cRect.top + from.height / 2;
        // Logo center
        const toCX = to.left - cRect.left + to.width / 2;
        const toCY = to.top - cRect.top + to.height / 2;

        // Logo edges
        const toTop = to.top - cRect.top;
        const _toBottom = to.bottom - cRect.top;
        const toLeft = to.left - cRect.left;
        const toRight = to.right - cRect.left;

        // Card edges
        const fromTop = from.top - cRect.top;
        const fromBottom = from.bottom - cRect.top;
        const fromRight = from.right - cRect.left;
        const fromLeft = from.left - cRect.left;

        let sx: number, sy: number, ex: number, ey: number;
        let d: string;

        const centerA_X = from.left - cRect.left + from.width / 2;
        const centerA_Y = from.top - cRect.top + from.height / 2;
        const centerB_X = to.left - cRect.left + to.width / 2;
        const centerB_Y = to.top - cRect.top + to.height / 2;

        const _isLeft = centerA_X < centerB_X - 50;
        const isAbove = centerA_Y < centerB_Y - 50;
        const isBelow = centerA_Y > centerB_Y + 50;

        if (lineType === 'orthogonal') {
          if (isAbove) {
            // Top cards: line goes down vertically from the EXACT center of the card's bottom edge
            sx = from.left - cRect.left + from.width / 2 + startXOffset;
            sy = fromBottom + startYOffset;
            ey = toTop + to.height * 0.25 + endYOffset;
            ex = fromCX < toCX ? toLeft + endXOffset : toRight + endXOffset;
            d = `M ${sx},${sy} L ${sx},${ey} L ${ex},${ey}`;
          } else if (isBelow) {
            // Bottom cards: line goes up vertically from the EXACT center of the card's top edge
            sx = from.left - cRect.left + from.width / 2 + startXOffset;
            sy = fromTop + startYOffset;
            ey = toTop + to.height * 0.75 + endYOffset;
            ex = fromCX < toCX ? toLeft + endXOffset : toRight + endXOffset;
            d = `M ${sx},${sy} L ${sx},${ey} L ${ex},${ey}`;
          } else {
            // Mid cards: straight horizontal line into logo LEFT or RIGHT edge (50% height)
            sy = fromCY + startYOffset;
            ey = toTop + to.height * 0.5 + endYOffset;
            if (fromCX < toCX) {
              sx = fromRight + startXOffset;
              ex = toLeft + endXOffset;
            } else {
              sx = fromLeft + startXOffset;
              ex = toRight + endXOffset;
            }
            d = `M ${sx},${sy} L ${ex},${ey}`;
          }

          setPathD(d);
        } else {
          // Curved path
          const s_x = fromCX + startXOffset;
          const s_y = fromCY + startYOffset;
          const e_x = toCX + endXOffset;
          const e_y = toCY + endYOffset;
          const controlY = s_y - curvature;
          setPathD(`M ${s_x},${s_y} Q ${(s_x + e_x) / 2},${controlY} ${e_x},${e_y}`);
        }
      }
    };

    const resizeObserver = new ResizeObserver(() => updatePath());
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    updatePath();

    return () => resizeObserver.disconnect();
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
    lineType,
  ]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute left-0 top-0 transform-gpu"
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      {/* Background static line - always visible */}
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeLinecap="round"
        fill="none"
      />
      {/* Animated beam: a short glowing segment traveling along the path from card → logo */}
      <motion.path
        d={pathD}
        stroke={gradientStartColor}
        strokeWidth={pathWidth + 1}
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0.12, pathOffset: 0 }}
        animate={{ pathOffset: [0, 0.98] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          delay,
        }}
      />
    </svg>
  );
};
