import { useCallback, useEffect, useRef, useState } from 'react'
import { landingContent } from '../../data/landing'
import { Hero } from './sections/hero'
import { Navbar } from './sections/navbar'
import { PageIntro } from './ui/page-intro'
import { readServiceRoute, servicesPath, subcategoryPath } from '../../data/service-routes'

export function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [route, setRoute] = useState(readServiceRoute);
  const servicesActive = route.active;
  const homeTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(homeTimer.current), []);
  const goHome = useCallback(() => {
    window.clearTimeout(homeTimer.current);
    if (window.location.pathname !== import.meta.env.BASE_URL || window.location.hash) {
      window.history.pushState(null, '', import.meta.env.BASE_URL);
    }
    setRoute((current) => ({ ...current, active: false }));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    homeTimer.current = window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' });
    }, servicesActive && !reducedMotion ? 1200 : 0);
  }, [servicesActive]);
  const selectCategory = useCallback((category: string) => {
    const path = servicesPath(category);
    if (window.location.pathname !== path || window.location.hash) window.history.pushState(null, '', path);
    setRoute({ active: true, category, nail: '' });
  }, []);
  const selectNail = useCallback((nail: string) => {
    const path = subcategoryPath(route.category, nail);
    if (window.location.pathname !== path || window.location.hash) window.history.pushState(null, '', path);
    setRoute({ active: true, category: route.category, nail });
  }, [route.category]);
  const setServicesActive = useCallback((active: boolean) => {
    if (active) selectCategory(route.category);
    else {
      window.history.pushState(null, '', import.meta.env.BASE_URL);
      setRoute((current) => ({ ...current, active: false }));
    }
  }, [selectCategory, route.category]);
  useEffect(() => {
    const sync = () => setRoute(readServiceRoute());
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);
  const finishIntro = useCallback(() => setIntroComplete(true), []);
  const revealHero = useCallback(() => setHeroVisible(true), []);

  useEffect(() => {
    if (!heroVisible) return;
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 400;
    const timer = window.setTimeout(() => setNavbarVisible(true), delay);
    return () => window.clearTimeout(timer);
  }, [heroVisible]);

  return (
    <>
      {!introComplete && <PageIntro onComplete={finishIntro} onReveal={revealHero} />}
      {navbarVisible && <div className="after-tear-navigation relative z-30"><Navbar servicesActive={servicesActive} onServicesChange={setServicesActive} selectedCategory={route.category} onCategoryChange={selectCategory} onHome={goHome} selectedNail={route.nail} onNailChange={selectNail} /></div>}
      <main aria-label={landingContent.businessName}>
        {heroVisible && <Hero paused={servicesActive} onCategorySelect={selectCategory} />}
      </main>
    </>
  )
}
