'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from '@/components/products/product-card';
import type { ProductContent } from '@/lib/content/schemas';
import { Icon } from '@/components/ui/icons';
import '@/styles/product-carousel.css';

export function ProductCarousel({ products }: { products: ProductContent[] }) {
  const slides = products;
  const trackSlides = slides.length ? [slides[slides.length - 1], ...slides, slides[0]] : [];
  const [position, setPosition] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const motionChanged = () => setReducedMotion(media.matches);
    const visibilityChanged = () => setPageHidden(document.hidden);
    motionChanged();
    visibilityChanged();
    media.addEventListener('change', motionChanged);
    document.addEventListener('visibilitychange', visibilityChanged);
    return () => {
      media.removeEventListener('change', motionChanged);
      document.removeEventListener('visibilitychange', visibilityChanged);
    };
  }, []);

  const automatic = !hovered && !focused && !reducedMotion && !pageHidden;
  useEffect(() => {
    if (!automatic || slides.length < 2) return;
    const timer = window.setTimeout(() => setPosition(index => index + 1), 8000);
    return () => window.clearTimeout(timer);
  }, [position, automatic, slides.length]);

  useEffect(() => {
    if (transitionEnabled) return;
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setTransitionEnabled(true));
    });
    return () => cancelAnimationFrame(frame);
  }, [transitionEnabled]);

  function move(direction: number) {
    setPosition(index => reducedMotion
      ? ((index - 1 + direction + slides.length) % slides.length) + 1
      : Math.max(0, Math.min(slides.length + 1, index + direction)));
  }

  function resetLoop() {
    if (position !== 0 && position !== slides.length + 1) return;
    setTransitionEnabled(false);
    setPosition(position === 0 ? slides.length : 1);
  }

  if (!slides.length) return null;
  return <div className="home-product-carousel" role="region" aria-roledescription="carousel" aria-label="Our products"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)}
    onBlurCapture={event => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
    }}>
    <div className="home-product-slides" id="home-product-slides" aria-live={automatic ? 'off' : 'polite'}>
      <div className="home-product-track" style={{
        transform: `translateX(-${position * 100}%)`,
        transition: transitionEnabled && !reducedMotion ? undefined : 'none',
      }} onTransitionEnd={event => {
        if (event.target === event.currentTarget && event.propertyName === 'transform') resetLoop();
      }}>
      {trackSlides.map((product, index) => <ProductCard product={product} variant="compact" key={`${product.slug}-${index}`}
        className={`home-product-slide${index === position ? ' is-active' : ''}`}
        role="group" aria-roledescription="slide" aria-label={product.name}
        aria-hidden={index !== position} inert={index !== position} />)}
      </div>
    </div>
    {slides.length > 1 && <div className="home-product-controls">
      <button type="button" className="home-product-arrow home-product-previous" aria-label="Previous product" aria-controls="home-product-slides" onClick={() => move(-1)}><Icon name="arrow" /></button>
      <div className="home-product-dots">
        {slides.map((product, index) => <button key={product.name} type="button"
          className="home-product-dot" aria-label={`Show ${product.name}`}
          aria-current={(position - 1 + slides.length) % slides.length === index ? 'true' : undefined}
          aria-controls="home-product-slides" onClick={() => setPosition(index + 1)} />)}
      </div>
      <button type="button" className="home-product-arrow home-product-next" aria-label="Next product" aria-controls="home-product-slides" onClick={() => move(1)}><Icon name="arrow" /></button>
    </div>}
  </div>;
}
