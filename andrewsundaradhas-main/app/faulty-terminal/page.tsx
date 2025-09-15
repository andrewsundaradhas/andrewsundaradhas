'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Dynamically import the FaultyTerminal component with no SSR
const FaultyTerminal = dynamic(
  () => import('@/components/ui/FaultyTerminal'),
  { ssr: false }
);

export default function FaultyTerminalPage() {
  const [isMounted, setIsMounted] = useState(false);
  
  // This ensures the component is only rendered on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-black/10 rounded-lg">
        <div className="text-center p-8">
          <div className="animate-pulse text-2xl font-mono text-green-400">
            INITIALIZING TERMINAL...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">Faulty Terminal</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-green-400">Interactive Terminal</h2>
            <p className="text-gray-300 mb-4">
              Experience the retro-futuristic terminal with interactive effects. Move your cursor around to see the distortion effect.
            </p>
          </div>
          
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-3 text-green-400">Features</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Real-time cursor interaction</li>
              <li>• Responsive design for all devices</li>
              <li>• Smooth animations and effects</li>
              <li>• Customizable appearance</li>
            </ul>
          </div>
        </div>
        
        <div className="h-[400px] md:h-[500px] lg:h-full bg-black rounded-lg overflow-hidden border border-green-500/30 shadow-lg shadow-green-500/10">
          <FaultyTerminal 
            scale={1.5}
            gridMul={[2, 1]}
            digitSize={1.2}
            timeScale={0.5}
            scanlineIntensity={0.5}
            glitchAmount={1.2}
            flickerAmount={0.8}
            noiseAmp={0.5}
            chromaticAberration={0.5}
            dither={true}
            curvature={0.2}
            tint="#00ff00"
            mouseReact={true}
            mouseStrength={0.3}
            pageLoadAnimation={true}
            brightness={1.2}
            className="w-full h-full"
          />
        </div>
      </div>
      
      <div className="mt-12 bg-gray-900/50 p-6 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-green-400">How to Use</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-medium mb-2 text-green-300">Installation</h3>
            <pre className="bg-black/50 p-4 rounded overflow-x-auto text-sm">
              <code className="text-green-400">
                npm install ogl
              </code>
            </pre>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2 text-green-300">Basic Usage</h3>
            <pre className="bg-black/50 p-4 rounded overflow-x-auto text-sm">
              <code className="text-green-400">
                {`import { FaultyTerminal } from '@/components/ui/FaultyTerminal';

function MyComponent() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <FaultyTerminal 
        scale={1.5}
        gridMul={[2, 1]}
        digitSize={1.2}
        timeScale={0.5}
      />
    </div>
  );
}`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
