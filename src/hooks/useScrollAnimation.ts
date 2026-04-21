import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(
  animationType: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scaleUp' = 'fadeUp',
  stagger = 0.1,
  delay = 0
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.children;
    if (elements.length === 0) return;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger,
      delay,
    };

    switch (animationType) {
      case 'fadeUp':
        fromVars.y = 40;
        break;
      case 'fadeLeft':
        fromVars.x = -30;
        break;
      case 'fadeRight':
        fromVars.x = 30;
        break;
      case 'scaleUp':
        fromVars.scale = 0.8;
        break;
    }

    const tween = gsap.from(elements, {
      ...fromVars,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        once: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === ref.current) t.kill();
      });
    };
  }, [animationType, stagger, delay]);

  return ref;
}
