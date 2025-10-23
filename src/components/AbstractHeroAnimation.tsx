import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
}

interface Node {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
}

export default function AbstractHeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const particlesRef = useRef<Particle[]>([]);
  const nodesRef = useRef<Node[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const updateDimensions = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Initialize particles
    particlesRef.current = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      hue: Math.random() * 60 + 180, // Blue to purple range
    }));

    // Initialize nodes
    const colors = [
      'rgba(56, 189, 248, 0.8)', // cyan
      'rgba(147, 51, 234, 0.8)', // purple
      'rgba(236, 72, 153, 0.8)', // pink
      'rgba(59, 130, 246, 0.8)', // blue
    ];

    nodesRef.current = Array.from({ length: 6 }, (_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      const radius = Math.min(dimensions.width, dimensions.height) * 0.25;
      return {
        id: i,
        x: dimensions.width / 2 + Math.cos(angle) * radius,
        y: dimensions.height / 2 + Math.sin(angle) * radius,
        targetX: dimensions.width / 2 + Math.cos(angle) * radius,
        targetY: dimensions.height / 2 + Math.sin(angle) * radius,
        size: Math.random() * 20 + 30,
        color: colors[i % colors.length],
      };
    });

    let animationFrameId: number;

    const animate = () => {
      frameRef.current += 1;
      const time = frameRef.current * 0.01;

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = dimensions.width;
        if (particle.x > dimensions.width) particle.x = 0;
        if (particle.y < 0) particle.y = dimensions.height;
        if (particle.y > dimensions.height) particle.y = 0;

        // Draw particle
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, 0.8)`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 60%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections between nearby particles
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.4;
            ctx.strokeStyle = `rgba(147, 51, 234, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      // Update and draw nodes
      nodesRef.current.forEach((node, i) => {
        const angle = (i / nodesRef.current.length) * Math.PI * 2 + time * 0.2;
        const radius = Math.min(dimensions.width, dimensions.height) * 0.25;
        const orbitRadius = Math.sin(time + i) * 30;
        
        node.targetX = dimensions.width / 2 + Math.cos(angle) * (radius + orbitRadius);
        node.targetY = dimensions.height / 2 + Math.sin(angle) * (radius + orbitRadius);

        // Smooth movement
        node.x += (node.targetX - node.x) * 0.05;
        node.y += (node.targetY - node.y) * 0.05;

        // Pulsing size
        const pulseSize = node.size + Math.sin(time * 2 + i) * 5;

        // Draw node glow
        const glowGradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          pulseSize * 2
        );
        glowGradient.addColorStop(0, node.color);
        glowGradient.addColorStop(0.5, node.color.replace('0.8', '0.3'));
        glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw node core
        const coreGradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          pulseSize
        );
        coreGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        coreGradient.addColorStop(0.3, node.color);
        coreGradient.addColorStop(1, node.color.replace('0.8', '0.4'));

        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections between nodes
      nodesRef.current.forEach((n1, i) => {
        nodesRef.current.slice(i + 1).forEach((n2) => {
          const gradient = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
          gradient.addColorStop(0, n1.color.replace('0.8', '0.2'));
          gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
          gradient.addColorStop(1, n2.color.replace('0.8', '0.2'));

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80">
      {/* Canvas for particle animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-80"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Floating morphing blobs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.2))',
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4), rgba(59, 130, 246, 0.2))',
        }}
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 50, -100, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4), rgba(236, 72, 153, 0.2))',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Flowing light streams */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
          style={{
            width: '200%',
            left: '-50%',
            top: `${20 + i * 15}%`,
            opacity: 0.3,
          }}
          animate={{
            x: ['0%', '50%'],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: 'linear',
          }}
        />
      ))}

      {/* Geometric grid overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Corner accent elements */}
      <motion.div
        className="absolute top-0 right-0 w-64 h-64"
        style={{
          background: 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.2), transparent)',
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-64 h-64"
        style={{
          background: 'radial-gradient(circle at bottom left, rgba(236, 72, 153, 0.2), transparent)',
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </div>
  );
}
