'use client'

import { Canvas } from '@react-three/fiber'
import WaterRippleEffect from './WaterRippleEffect'

export default function RippleCanvas() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,  // Ensure this is on top
      }}
    >
      <WaterRippleEffect />
    </Canvas>
  )
}
