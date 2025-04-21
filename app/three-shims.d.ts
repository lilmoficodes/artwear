// three-shims.d.ts

declare module 'three/examples/jsm/postprocessing/ShaderPass' {
    import { ShaderMaterial } from 'three'
    import { Pass } from 'three/examples/jsm/postprocessing/Pass'
  
    export class ShaderPass extends Pass {
      constructor(shader: any)
      material: ShaderMaterial
      uniforms: any
    }
  }
  