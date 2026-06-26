/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import globeData from '@/data/map/globe.json';

interface RotatingEarthProps {
  width?: number;
  height?: number;
  className?: string;
  isDark?: boolean;
  color?: string;
}

interface DotData {
  lng: number;
  lat: number;
  visible: boolean;
}

const cachedDots: DotData[] = [];

export default function RotatingEarth({
  width = 800,
  height = 600,
  className = '',
  isDark = true,
  color,
}: RotatingEarthProps) {
  const resolvedColor = color || (isDark ? '#540ee1' : '#ab7feb');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const containerWidth = Math.min(width, window.innerWidth - 40);
    const containerHeight = Math.min(height, window.innerHeight - 100);
    const radius = Math.min(containerWidth, containerHeight) / 2.5;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    context.scale(dpr, dpr);

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point;
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
      return inside;
    };

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry;
      if (geometry.type === 'Polygon') {
        const coordinates = geometry.coordinates;
        if (!pointInPolygon(point, coordinates[0])) {
          return false;
        }
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) {
            return false;
          }
        }
        return true;
      } else if (geometry.type === 'MultiPolygon') {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false;
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true;
                break;
              }
            }
            if (!inHole) {
              return true;
            }
          }
        }
        return false;
      }
      return false;
    };

    const generateDotsInPolygon = (feature: any, dotSpacing = 16) => {
      const dots: [number, number][] = [];
      const bounds = d3.geoBounds(feature);
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;
      const stepSize = dotSpacing * 0.08;
      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat];
          if (pointInFeature(point, feature)) {
            dots.push(point);
          }
        }
      }
      return dots;
    };

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight);

      const currentScale = projection.scale();
      const scaleFactor = currentScale / radius;

      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI);
      context.fillStyle = isDark ? '#020204' : '#f8fafc';
      context.fill();

      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI);
      context.strokeStyle = resolvedColor;
      context.globalAlpha = 0.25;
      context.lineWidth = 2 * scaleFactor;
      context.stroke();
      context.globalAlpha = 1.0;

      const graticule = d3.geoGraticule();
      context.beginPath();
      path(graticule());
      context.strokeStyle = resolvedColor;
      context.lineWidth = 1 * scaleFactor;
      context.globalAlpha = 0.08;
      context.stroke();
      context.globalAlpha = 1.0;

      context.beginPath();
      globeData.features.forEach((feature: any) => {
        path(feature);
      });
      context.strokeStyle = resolvedColor;
      context.lineWidth = 1 * scaleFactor;
      context.globalAlpha = 0.35;
      context.stroke();
      context.globalAlpha = 1.0;

      cachedDots.forEach((dot) => {
        const projected = projection([dot.lng, dot.lat]);
        if (
          projected &&
          projected[0] >= 0 &&
          projected[0] <= containerWidth &&
          projected[1] >= 0 &&
          projected[1] <= containerHeight
        ) {
          context.beginPath();
          context.arc(projected[0], projected[1], 1.2 * scaleFactor, 0, 2 * Math.PI);
          context.fillStyle = resolvedColor;
          context.globalAlpha = isDark ? 0.3 : 0.4;
          context.fill();
          context.globalAlpha = 1.0;
        }
      });
    };

    if (cachedDots.length === 0) {
      globeData.features.forEach((feature: any) => {
        const dots = generateDotsInPolygon(feature, 16);
        dots.forEach(([lng, lat]) => {
          cachedDots.push({ lng, lat, visible: true });
        });
      });
    }

    render();
    setIsLoaded(true);

    const rotation: [number, number] = [0, 0];
    let autoRotate = true;
    const rotationSpeed = 0.3;

    const rotate = () => {
      if (autoRotate) {
        rotation[0] += rotationSpeed;
        projection.rotate(rotation);
        render();
      }
    };

    const rotationTimer = d3.timer(rotate);

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false;
      const startX = event.clientX;
      const startY = event.clientY;
      const startRotation: [number, number] = [rotation[0], rotation[1]];

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.5;
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;

        rotation[0] = startRotation[0] + dx * sensitivity;
        rotation[1] = startRotation[1] - dy * sensitivity;
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]));

        projection.rotate(rotation);
        render();
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        setTimeout(() => {
          autoRotate = true;
        }, 10);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    canvas.addEventListener('mousedown', handleMouseDown);

    return () => {
      rotationTimer.stop();
      canvas.removeEventListener('mousedown', handleMouseDown);
    };
  }, [width, height, isDark, resolvedColor]);

  return (
    <div className={`relative ${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-2xl bg-background"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
}
