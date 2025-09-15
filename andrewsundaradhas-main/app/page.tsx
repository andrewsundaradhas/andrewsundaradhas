"use client"

import { useState, useEffect, useMemo } from "react"
import { useMediaQuery } from "react-responsive"
import dynamic from 'next/dynamic'
import HelloAnimation from "@/components/hello-animation"
import BootAnimation from "@/components/boot-animation"
import MenuBar from "@/components/menu-bar"
import Dock from "@/components/dock"
import WindowManager from "@/components/window-manager"
import { AppWindow } from "@/types"

// Disable SSR for components that use browser APIs
const FaultyTerminal = dynamic(
  () => import('@/components/ui/FaultyTerminal').then(mod => {
    // Add error boundary
    try {
      return mod.default;
    } catch (e) {
      console.error('Failed to load FaultyTerminal:', e);
      return () => <div className="absolute inset-0 bg-black" />;
    }
  }),
  { 
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black" />
  }
);

interface MainContentProps {
  windows: AppWindow[];
  nextZIndex: number;
  onOpenWindow: (windowData: AppWindow) => void;
  onCloseWindow: (windowId: string) => void;
  onUpdateWindowPosition: (windowId: string, position: { x: number; y: number }) => void;
  onBringToFront: (windowId: string) => void;
}

function MainContent({ 
  windows, 
  nextZIndex,
  onOpenWindow,
  onCloseWindow,
  onUpdateWindowPosition,
  onBringToFront 
}: MainContentProps) {
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient after mount
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Handle mobile layout
  useMediaQuery(
    { maxWidth: 768 },
    undefined,
    (matches) => {
      if (matches && windows.length === 0) {
        onOpenWindow({
          id: "about",
          title: "About",
          type: "about",
          icon: "👤",
          position: { x: 50, y: 50 },
          zIndex: nextZIndex,
        });
      }
    }
  );

  return (
    <>
      {/* Desktop/Tablet Layout */}
      <div className="desktop-layout">
        <div className="h-screen w-full overflow-hidden relative">
          <div className="absolute inset-0 bg-black" />
          {isClient && (
            <>
              <div className="absolute inset-0">
                <FaultyTerminal 
                  scale={1.5}
                  gridMul={[2, 1]}
                  digitSize={1.2}
                  timeScale={0.3}
                  scanlineIntensity={0.3}
                  glitchAmount={1}
                  flickerAmount={0.5}
                  noiseAmp={0.5}
                  chromaticAberration={0.2}
                  dither={true}
                  curvature={0.1}
                  tint="#00ff00"
                  mouseReact={true}
                  mouseStrength={0.2}
                  pageLoadAnimation={true}
                  brightness={0.8}
                  className="w-full h-full"
                />
              </div>
              <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
            </>
          )}
          <MenuBar onOpenWindow={onOpenWindow} />
          <WindowManager
            windows={windows}
            onClose={onCloseWindow}
            onUpdatePosition={onUpdateWindowPosition}
            onBringToFront={onBringToFront}
          />
          <Dock onOpenWindow={onOpenWindow} />
        </div>
      </div>
    </>
  )
}

export default function MacOSPortfolio() {
  const [showHello, setShowHello] = useState(true);
  const [isBooting, setIsBooting] = useState(false);
  const [windows, setWindows] = useState<AppWindow[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1000);
  
  useEffect(() => {
    const helloTimer = setTimeout(() => {
      setShowHello(false);
      setIsBooting(true);
    }, 3000);

    const bootTimer = setTimeout(() => {
      setIsBooting(false);
    }, 5000);

    return () => {
      clearTimeout(helloTimer);
      clearTimeout(bootTimer);
    };
  }, []);

  const openWindow = useCallback((windowData: AppWindow) => {
    setWindows(prevWindows => {
      const existingWindow = prevWindows.find((w) => w.id === windowData.id);
      if (existingWindow) {
        return prevWindows.map((w) => 
          w.id === windowData.id ? { ...w, zIndex: nextZIndex } : w
        );
      }

      const newWindow = {
        ...windowData,
        zIndex: nextZIndex,
        position: { 
          x: 100 + prevWindows.length * 30, 
          y: 100 + prevWindows.length * 30 
        },
      };
      return [...prevWindows, newWindow];
    });
    
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  const closeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.filter((w) => w.id !== windowId));
  }, []);

  const updateWindowPosition = useCallback((windowId: string, position: { x: number; y: number }) => {
    setWindows(prev => 
      prev.map((w) => (w.id === windowId ? { ...w, position } : w))
    );
  }, []);

  const bringToFront = useCallback((windowId: string) => {
    setWindows(prev => 
      prev.map((w) => 
        w.id === windowId ? { ...w, zIndex: nextZIndex } : w
      )
    );
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  if (showHello) {
    return <HelloAnimation onComplete={() => setShowHello(false)} />;
  }

  if (isBooting) {
    return <BootAnimation onComplete={() => setIsBooting(false)} />;
  }

  return (
    <MainContent 
      windows={windows}
      nextZIndex={nextZIndex}
      onOpenWindow={openWindow}
      onCloseWindow={closeWindow}
      onUpdateWindowPosition={updateWindowPosition}
      onBringToFront={bringToFront}
    />
  );
}
