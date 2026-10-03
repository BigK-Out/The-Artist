import { useEffect, useRef } from "react"
import * as THREE from "three"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const AMBER = new THREE.Color(0xffb300)
const ROSE = new THREE.Color(0xff4d6d)
const WHITE = new THREE.Color(0xffffff)

// soft round sprite so particles read as glowing dots instead of squares
const makeDotTexture = () => {
  const c = document.createElement("canvas")
  c.width = c.height = 64
  const g = c.getContext("2d")
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  grad.addColorStop(0, "rgba(255,255,255,1)")
  grad.addColorStop(0.4, "rgba(255,255,255,0.35)")
  grad.addColorStop(1, "rgba(255,255,255,0)")
  g.fillStyle = grad
  g.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

// points scattered in a spherical shell
const makeShell = (count, rMin, rMax) => {
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r = rMin + Math.random() * (rMax - rMin)
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    pos[i * 3 + 2] = r * Math.cos(phi)
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
  return geo
}

const HeroScene = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x000000, 0.035)
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.z = 9

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    // lights: the glowing core plus a point light that chases the cursor
    scene.add(new THREE.AmbientLight(0xffffff, 0.25))
    const coreLight = new THREE.PointLight(AMBER, 60, 20)
    const cursorLight = new THREE.PointLight(0xffffff, 40, 18)
    cursorLight.position.set(0, 0, 5)
    scene.add(coreLight, cursorLight)

    const group = new THREE.Group()
    scene.add(group)

    // materials whose colour shifts with scroll
    const tint = new THREE.Color().copy(AMBER)
    const wireMat = new THREE.MeshBasicMaterial({ color: tint, wireframe: true, transparent: true, opacity: 0.55 })
    const ringMat = new THREE.MeshBasicMaterial({ color: tint, transparent: true, opacity: 0.8 })
    const knotMat = new THREE.MeshBasicMaterial({ color: WHITE, wireframe: true, transparent: true, opacity: 0.16 })

    // core: solid faceted gem that pulses inside a wireframe shell
    const coreMat = new THREE.MeshStandardMaterial({
      color: tint,
      emissive: tint,
      emissiveIntensity: 0.9,
      metalness: 0.6,
      roughness: 0.25,
      flatShading: true,
    })
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.1, 0), coreMat)
    const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(2.4, 1), wireMat)
    const cage = new THREE.Mesh(new THREE.IcosahedronGeometry(1.7, 0), knotMat)
    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(3.6, 0.35, 160, 16), knotMat)
    group.add(core, shell, cage, knot)

    // gyroscope: three thin rings spinning on different axes
    const gyro = new THREE.Group()
    const rings = [3.1, 3.5, 3.9].map((radius, i) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.012, 8, 160), ringMat)
      ring.rotation.set(i * 1.1, i * 0.7, 0)
      gyro.add(ring)
      return ring
    })
    group.add(gyro)

    // shards orbiting the centre, each with its own spin and bob
    const shardGeo = new THREE.OctahedronGeometry(0.22)
    const shardMat = new THREE.MeshStandardMaterial({
      color: tint,
      emissive: tint,
      emissiveIntensity: 0.6,
      metalness: 0.7,
      roughness: 0.3,
      flatShading: true,
    })
    const shards = new THREE.Group()
    const shardData = []
    for (let i = 0; i < 48; i++) {
      const shard = new THREE.Mesh(shardGeo, shardMat)
      const a = (i / 48) * Math.PI * 2
      const r = 5 + Math.sin(i * 1.7) * 0.9
      const y = Math.sin(i * 2.3) * 1.8
      shard.position.set(Math.cos(a) * r, y, Math.sin(a) * r)
      shard.scale.setScalar(0.6 + (i % 5) * 0.25)
      shards.add(shard)
      shardData.push({ shard, y, speed: 0.4 + (i % 7) * 0.12, phase: i })
    }
    group.add(shards)

    // depth: a dim starfield and a brighter amber dust
    const dot = makeDotTexture()
    const starMat = new THREE.PointsMaterial({
      map: dot, color: WHITE, size: 0.12, transparent: true, opacity: 0.7,
      depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
    })
    const dustMat = new THREE.PointsMaterial({
      map: dot, color: tint, size: 0.28, transparent: true, opacity: 0.9,
      depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
    })
    const stars = new THREE.Points(makeShell(1600, 9, 30), starMat)
    const dust = new THREE.Points(makeShell(260, 4.5, 14), dustMat)
    scene.add(stars, dust)

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(mount)

    // mouse: tilt the group, drift the camera, drag the light
    const rotX = gsap.quickTo(group.rotation, "x", { duration: 1.2, ease: "power3.out" })
    const rotY = gsap.quickTo(group.rotation, "y", { duration: 1.2, ease: "power3.out" })
    const camX = gsap.quickTo(camera.position, "x", { duration: 1.6, ease: "power3.out" })
    const camY = gsap.quickTo(camera.position, "y", { duration: 1.6, ease: "power3.out" })
    const lightX = gsap.quickTo(cursorLight.position, "x", { duration: 0.6, ease: "power2.out" })
    const lightY = gsap.quickTo(cursorLight.position, "y", { duration: 0.6, ease: "power2.out" })
    const onPointer = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      rotY(nx * 1.2)
      rotX(ny * 0.8)
      camX(nx * 1.4)
      camY(-ny * 1.0)
      lightX(nx * 14)
      lightY(-ny * 10)
    }

    // click: shockwave through the core and rings
    const onPointerDown = () => {
      gsap.fromTo(core.scale, { x: 1.8, y: 1.8, z: 1.8 }, { x: 1, y: 1, z: 1, duration: 1.2, ease: "elastic.out(1, 0.4)" })
      gsap.fromTo(gyro.scale, { x: 1.25, y: 1.25, z: 1.25 }, { x: 1, y: 1, z: 1, duration: 1.4, ease: "elastic.out(1, 0.5)" })
      gsap.fromTo(coreMat, { emissiveIntensity: 3 }, { emissiveIntensity: 0.9, duration: 1.2, ease: "power2.out" })
    }
    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointer)
      window.addEventListener("pointerdown", onPointerDown)
    }

    // scroll: pull back, spin the shards and drift colour from amber to rose
    const scrollCfg = { trigger: mount.parentElement, start: "top top", end: "bottom top", scrub: 1 }
    // with reduced motion only the colour drift stays, nothing moves
    const scrollTweens = [
      ...(reduceMotion ? [] : [
        gsap.to(shards.rotation, { y: Math.PI, ease: "none", scrollTrigger: scrollCfg }),
        gsap.to(camera.position, { z: 14, ease: "none", scrollTrigger: scrollCfg }),
        gsap.to(stars.rotation, { y: 0.8, ease: "none", scrollTrigger: scrollCfg }),
      ]),
      gsap.to({ t: 0 }, {
        t: 1,
        ease: "none",
        scrollTrigger: scrollCfg,
        onUpdate() {
          // materials copy colours on creation, so push the new tint into each one
          tint.lerpColors(AMBER, ROSE, this.targets()[0].t)
          ;[wireMat, ringMat, dustMat].forEach((m) => m.color.copy(tint))
          ;[coreMat, shardMat].forEach((m) => { m.color.copy(tint); m.emissive.copy(tint) })
          coreLight.color.copy(tint)
        },
      }),
    ]

    // entrance
    if (!reduceMotion) {
      gsap.from(group.scale, { x: 0.2, y: 0.2, z: 0.2, duration: 1.8, ease: "expo.out" })
      gsap.from([starMat, dustMat], { opacity: 0, duration: 2.5, ease: "power1.out" })
    }

    // only render while the hero is on screen
    let visible = true
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    io.observe(mount)

    let frame
    const clock = new THREE.Clock()
    const tick = () => {
      frame = requestAnimationFrame(tick)
      if (!visible) return
      const t = clock.getElapsedTime()
      if (!reduceMotion) {
        shell.rotation.set(t * 0.15, t * 0.2, 0)
        cage.rotation.set(-t * 0.25, t * 0.18, t * 0.1)
        core.rotation.set(t * 0.4, t * 0.3, 0)
        knot.rotation.set(-t * 0.06, 0, t * 0.05)
        rings.forEach((ring, i) => {
          ring.rotation.x += 0.002 * (i + 1)
          ring.rotation.y += 0.003 * (3 - i)
        })
        shardData.forEach(({ shard, y, speed, phase }) => {
          shard.rotation.x += 0.01 * speed
          shard.rotation.y += 0.015 * speed
          shard.position.y = y + Math.sin(t * speed + phase) * 0.35
        })
        stars.rotation.x = t * 0.01
        dust.rotation.y = -t * 0.04
        // heartbeat
        const pulse = 1 + Math.sin(t * 2) * 0.06
        if (!gsap.isTweening(core.scale)) core.scale.setScalar(pulse)
        coreLight.intensity = 50 + Math.sin(t * 2) * 12
      }
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onPointer)
      window.removeEventListener("pointerdown", onPointerDown)
      ro.disconnect()
      io.disconnect()
      scrollTweens.forEach((tw) => { tw.scrollTrigger?.kill(); tw.kill() })
      gsap.killTweensOf([group.scale, core.scale, gyro.scale, coreMat, starMat, dustMat])
      // shards share one geometry, so collect unique ones before disposing
      const geometries = new Set()
      scene.traverse((obj) => { if (obj.geometry) geometries.add(obj.geometry) })
      geometries.forEach((g) => g.dispose())
      ;[wireMat, ringMat, knotMat, coreMat, shardMat, starMat, dustMat].forEach((m) => m.dispose())
      dot.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
}

export default HeroScene
