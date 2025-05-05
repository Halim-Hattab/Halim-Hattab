import React, { useRef, useEffect, useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Mail, Phone, Linkedin, ChevronDown } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface HeroSectionProps {
  onVisibilityChange: (isVisible: boolean) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onVisibilityChange }) => {
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const [typedName, setTypedName] = useState('');
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [isScrambling, setIsScrambling] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Updated job titles as requested
  const titles = [
    'Technical Advisor',
    'Legal Intern',
    'Content Moderator',
    'Legal counsel'
  ];
  const name = personalInfo.name;
  const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

  // Typing effect for name (slower, non-looping, more organic)
  useEffect(() => {
    let nameIndex = 0;
    let timeoutId: NodeJS.Timeout | null = null;

    const typeName = () => {
      if (nameIndex <= name.length) {
        setTypedName(name.slice(0, nameIndex));
        nameIndex++;
        // Slower speed with slight random variation
        const delay = 150 + Math.random() * 50; 
        timeoutId = setTimeout(typeName, delay);
      } 
      // Removed the else block to stop looping
    };

    // Start typing after a short delay for better effect
    const startTimeout = setTimeout(typeName, 500); 

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      clearTimeout(startTimeout);
    };
  }, [name]);

  // Letter-by-letter reveal effect for titles
  useEffect(() => {
    let currentTitleIndex = 0;
    let revealTimeoutId: NodeJS.Timeout | null = null;
    let nextTitleTimeoutId: NodeJS.Timeout | null = null;
    let animationFrameId: number | null = null;
    let revealedChars = '';
    let currentLetterIndex = 0;
    let scrambleCycles = 0;
    // Fastest practical animation speeds
    const maxScrambleCycles = 1; // Minimal scramble frames per letter
    const letterRevealDelay = 5; // Fastest practical reveal delay
    const scrambleCharDelay = 1;  // Fastest practical scramble delay
    const nextTitleDelay = 750;  // Fastest practical pause between titles

    const revealNextLetter = () => {
      setIsScrambling(true); // Keep scrambling class for visual effect during reveal
      const targetTitle = titles[currentTitleIndex];

      const animateScramble = () => {
        if (currentLetterIndex < targetTitle.length) {
          if (scrambleCycles < maxScrambleCycles) {
            // Generate random suffix for the part not yet revealed
            const randomSuffix = Array.from({ length: targetTitle.length - currentLetterIndex -1 }, () =>
              scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
            ).join('');
            // Display revealed part + current scrambling letter + random suffix
            const currentScrambleChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            setDisplayedTitle(revealedChars + currentScrambleChar + randomSuffix);
            scrambleCycles++;
            revealTimeoutId = setTimeout(animateScramble, scrambleCharDelay);
          } else {
            // Lock the correct letter
            revealedChars += targetTitle[currentLetterIndex];
            setDisplayedTitle(revealedChars + targetTitle.substring(currentLetterIndex + 1)); // Show revealed + rest of target
            currentLetterIndex++;
            scrambleCycles = 0; // Reset scramble cycles for the next letter
            // Move to the next letter after a delay
            revealTimeoutId = setTimeout(animateScramble, letterRevealDelay);
          }
        } else {
          // Title fully revealed
          // setIsScrambling(false); // Keep scrambling true for consistent color
          setDisplayedTitle(targetTitle); // Ensure final title is correct
          // Schedule next title
          nextTitleTimeoutId = setTimeout(() => {
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
            revealedChars = '';
            currentLetterIndex = 0;
            scrambleCycles = 0;
            revealNextLetter(); // Start revealing the next title
          }, nextTitleDelay);
        }
      };

      // Cancel previous frame if any
      if (revealTimeoutId) clearTimeout(revealTimeoutId);
      animateScramble();

    };

    // Start the first title reveal after a short delay
    const startDelayTimeout = setTimeout(() => {
      revealNextLetter();
    }, 100); // 100ms delay

    return () => {
      // Cleanup timeouts
      clearTimeout(startDelayTimeout); // Clear the initial delay timeout
      if (revealTimeoutId) clearTimeout(revealTimeoutId);
      if (nextTitleTimeoutId) clearTimeout(nextTitleTimeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId); // Keep canvas cleanup
    };
  }, []); // Empty dependency array ensures this runs once on mount


  // Interactive starfield with connected particles and mouse trails
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    const particles: {
      x: number;
      y: number;
      radius: number;
      baseRadius: number;
      speed: number;
      vx: number;
      vy: number;
      color: string;
      pulsePhase: number;
    }[] = [];
    const mouseTrail: { x: number; y: number; alpha: number }[] = [];
    let mouse = { x: 0, y: 0 };
    let isMouseActive = false;

    const colors = ['#00FFF5', '#FF00FF', '#FFFFFF'];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create initial particles
    for (let i = 0; i < 250; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        baseRadius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.5 + 0.2,
        vx: 0,
        vy: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isMouseActive = true;
      mouseTrail.push({ x: mouse.x, y: mouse.y, alpha: 0.8 });
      if (mouseTrail.length > 20) mouseTrail.shift();
    };

    // Mouse click handler (particle burst)
    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 3;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          radius: Math.random() * 2 + 1,
          baseRadius: Math.random() * 2 + 1,
          speed: Math.random() * 0.5 + 0.2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // // Draw mouse trail
      // ctx.beginPath();
      // ctx.strokeStyle = 'rgba(0, 255, 245, 0.3)';
      // ctx.lineWidth = 2;
      // for (let i = 0; i < mouseTrail.length; i++) {
      //   const trail = mouseTrail[i];
      //   trail.alpha -= 0.05;
      //   if (trail.alpha <= 0) {
      //     mouseTrail.splice(i, 1);
      //     i--;
      //     continue;
      //   }
      //   ctx.strokeStyle = `rgba(0, 255, 245, ${trail.alpha})`;
      //   if (i === 0) ctx.moveTo(trail.x, trail.y);
      //   else ctx.lineTo(trail.x, trail.y);
      // }
      // ctx.stroke();

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = 1 - distance / 120;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p, index) => {
        // Mouse attraction
        if (isMouseActive) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 200) {
            const force = (200 - distance) / 200;
            p.vx += (dx / distance) * force * 0.15;
            p.vy += (dy / distance) * force * 0.15;
            p.radius = p.baseRadius + force * 2;
          } else {
            p.radius = p.baseRadius;
          }
        }

        // Pulse effect
        p.pulsePhase += 0.06;
        p.radius = p.baseRadius + Math.sin(p.pulsePhase) * 0.4;

        // Update position
        p.x += p.vx;
        p.y += p.vy - p.speed;
        p.vx *= 0.9;
        p.vy *= 0.9;

        // Reset off-screen particles
        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0 || p.x > canvas.width || p.y > canvas.height) {
          particles.splice(index, 1);
          particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            baseRadius: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 0.5 + 0.2,
            vx: 0,
            vy: 0,
            color: colors[Math.floor(Math.random() * colors.length)],
            pulsePhase: Math.random() * Math.PI * 2
          });
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    onVisibilityChange(isVisible);
  }, [isVisible, onVisibilityChange]);

  const scrollToNext = () => {
    const nextSection = document.getElementById('experience');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatedSection ref={sectionRef} id="hero" className="min-h-screen px-4 sm:px-6 flex flex-col justify-center relative">
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/50 z-10" />
      <div className="max-w-4xl mx-auto w-full relative z-20 bg-black/30 backdrop-blur-lg rounded-2xl p-8 sm:p-12 border border-white/10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
          <span className="block text-gray-400 font-light animate-slide-in-left">Hi, I'm</span>
          <span className="block modern-text typing-container">
            {typedName}
            <span className="typing-cursor">|</span>
          </span>
        </h1>

        {/* Apply teal color to match the button */}
        <p className={`text-lg sm:text-xl mb-8 font-mono animate-slide-in-right text-teal-400`}>
          {/* Use a non-breaking space or min-height if needed to prevent layout shifts */}
          {displayedTitle || '\u00A0'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up">
          <a 
            href={`mailto:${personalInfo.email}`}
            className="modern-button flex items-center px-4 py-2 bg-teal-500/20 border-2 border-teal-500 text-teal-400 rounded-lg hover:bg-teal-500 hover:text-white hover:scale-105 transition-all duration-300 ease-out"
          >
            <Mail className="w-5 h-5 mr-2" />
            Contact Me
          </a>
          
          <div className="modern-button flex items-center px-4 py-2 text-gray-300 border-2 border-gray-600 rounded-lg hover:border-teal-500 hover:text-teal-400 hover:scale-105 transition-all duration-300 ease-out">
            <Phone className="w-5 h-5 mr-2" />
            <span>{personalInfo.phone}</span>
          </div>
          
          <a 
            href={personalInfo.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="modern-button flex items-center px-4 py-2 text-gray-300 border-2 border-gray-600 rounded-lg hover:border-teal-500 hover:text-teal-400 hover:scale-105 transition-all duration-300 ease-out"
          >
            <Linkedin className="w-5 h-5 mr-2" />
            <span>{personalInfo.name}</span>
          </a>
        </div>
        
        <div className="border-t border-gray-600 pt-6 animate-slide-in-left">
          <p className="text-gray-400 mb-6 italic font-light text-lg">
            "just as my title says, I can do it all"
          </p>
        </div>
      </div>
      
      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-2 bg-black/30 border-2 border-gray-600 rounded-full animate-pulse hover:border-teal-500 hover:text-teal-400 hover:scale-110 focus:outline-none z-20 transition-all duration-300"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6 text-gray-300 hover:text-teal-400" />
      </button>
    </AnimatedSection>
  );
};

export default HeroSection;
