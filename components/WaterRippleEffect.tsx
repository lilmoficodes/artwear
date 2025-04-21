'use client'

import { useRef, useEffect, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { EffectComposer } from '@react-three/postprocessing'
import * as THREE from 'three'

export default function WaterRippleEffect() {
  const shaderRef = useRef(null)
  const [clickPosition, setClickPosition] = useState([0.5, 0.5])
  const [rippleTime, setRippleTime] = useState(0)

  // Create the shader pass
  const shaderPass = useMemo(() => {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0.0 },
        uRippleOrigin: { value: new THREE.Vector2(0.5, 0.5) },
        uRippleTime: { value: -1.0 },
        uIntensity: { value: 0.04 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uTime;
        uniform float uRippleTime;
        uniform vec2 uRippleOrigin;
        uniform float uIntensity;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          vec2 dir = uv - uRippleOrigin;
          float dist = length(dir);

          float ripple = sin(40.0 * dist - uRippleTime * 5.0) * exp(-10.0 * dist);
          if (uRippleTime < 0.0) ripple = 0.0;

          uv += normalize(dir) * ripple * uIntensity;

          gl_FragColor = texture2D(tDiffuse, uv);
        }
      `
    })

    return new ShaderPass(material)
  }, [])

  // Animate ripple over time
  useFrame(({ clock }) => {
    if (shaderPass.uniforms) {
      const elapsed = clock.getElapsedTime()
      shaderPass.uniforms.uTime.value = elapsed

      if (shaderPass.uniforms.uRippleTime.value >= 0) {
        shaderPass.uniforms.uRippleTime.value += 0.016 // ~60fps
      }
    }
  })

  // Listen for mouse clicks and update ripple origin
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = 1.0 - e.clientY / window.innerHeight // flip Y for GL space
      shaderPass.uniforms.uRippleOrigin.value.set(x, y)
      shaderPass.uniforms.uRippleTime.value = 0.0
      console.log('Ripple triggered at:', x, y)  // Debug the ripple trigger
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [shaderPass])

  return (
    <EffectComposer>
      <primitive object={shaderPass} />
    </EffectComposer>
  )
}
