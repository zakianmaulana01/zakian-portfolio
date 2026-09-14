import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export function mountHeroScene(host: HTMLDivElement) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("webgl2", { alpha: true, antialias: true });
  if (!context) throw new Error("WebGL unavailable");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    context,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0xffffff, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
  camera.position.set(0, 0.15, 10.5);
  const environment = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environmentMap = pmrem.fromScene(environment, 0.04);
  scene.environment = environmentMap.texture;
  environment.dispose();
  pmrem.dispose();
  const key = new THREE.DirectionalLight(0xffffff, 5);
  key.position.set(-3, 4, 5);
  scene.add(key, new THREE.HemisphereLight(0xe9f2ff, 0x6870ad, 3));
  const rim = new THREE.DirectionalLight(0x8ebdff, 4);
  rim.position.set(4, -1, 2);
  scene.add(rim);

  const sculpture = new THREE.Group();
  scene.add(sculpture);
  const blue = new THREE.MeshPhysicalMaterial({
    color: 0x1649df,
    metalness: 0.7,
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.14,
  });
  const silver = new THREE.MeshPhysicalMaterial({
    color: 0xdbe8ff,
    metalness: 0.94,
    roughness: 0.15,
    clearcoat: 1,
  });
  const porcelain = new THREE.MeshPhysicalMaterial({
    color: 0xf0f4ff,
    metalness: 0.25,
    roughness: 0.22,
  });
  const bracketShape = new THREE.Shape();
  bracketShape.moveTo(0.46, 1.08);
  bracketShape.lineTo(-0.55, 0.12);
  bracketShape.quadraticCurveTo(-0.68, 0, -0.55, -0.12);
  bracketShape.lineTo(0.46, -1.08);
  bracketShape.lineTo(0.72, -0.79);
  bracketShape.lineTo(-0.08, 0);
  bracketShape.lineTo(0.72, 0.79);
  bracketShape.closePath();
  const bracketGeometry = new THREE.ExtrudeGeometry(bracketShape, {
    depth: 0.42,
    bevelEnabled: true,
    bevelThickness: 0.11,
    bevelSize: 0.11,
    bevelSegments: 5,
    steps: 1,
    curveSegments: 16,
  });
  bracketGeometry.center();
  const left = new THREE.Mesh(bracketGeometry, blue);
  left.position.set(-1.42, 0.05, 0);
  left.rotation.y = -0.17;
  const right = new THREE.Mesh(bracketGeometry, blue);
  right.rotation.set(0, 0.17, Math.PI);
  right.position.set(1.42, -0.05, 0);
  const slashGeometry = new THREE.CapsuleGeometry(0.18, 2.2, 8, 20);
  const slash = new THREE.Mesh(slashGeometry, silver);
  slash.rotation.z = -0.28;
  slash.position.z = 0.35;
  sculpture.add(left, right, slash);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.52, 0.017, 8, 100),
    silver,
  );
  ring.rotation.set(0.72, -0.18, -0.4);
  sculpture.add(ring);
  const beadGeometry = new THREE.SphereGeometry(0.13, 20, 12);
  const beads = [blue, porcelain, silver].map((material) => {
    const mesh = new THREE.Mesh(beadGeometry, material);
    ring.add(mesh);
    return mesh;
  });
  sculpture.rotation.set(-0.12, -0.28, -0.13);

  let visible = true;
  let lost = false;
  let disposed = false;
  let dragging = false;
  let pointerX = 0;
  let pointerY = 0;
  let dragX = 0;
  let dragY = 0;
  let lastX = 0;
  let lastY = 0;
  let elapsed = 0;
  let lastTime = 0;
  let frameCount = 0;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const motionAllowed = () =>
    !reduced.matches && document.documentElement.dataset.motion !== "off";
  function pose(time: number) {
    const moving = motionAllowed();
    const followX = moving ? pointerX * 0.22 : 0;
    const followY = moving ? pointerY * 0.14 : 0;
    sculpture.rotation.y +=
      (-0.28 +
        dragX +
        followX +
        (moving ? Math.sin(time * 0.35) * 0.13 : 0) -
        sculpture.rotation.y) *
      0.08;
    sculpture.rotation.x +=
      (-0.12 + dragY + followY - sculpture.rotation.x) * 0.08;
    sculpture.position.y = moving ? Math.sin(time * 0.7) * 0.075 : 0;
    left.position.y = 0.05 + (moving ? Math.sin(time * 0.7) * 0.07 : 0);
    right.position.y = -0.05 - (moving ? Math.sin(time * 0.7) * 0.07 : 0);
    beads.forEach((bead, index) => {
      const angle = time * 0.22 + (index * Math.PI * 2) / 3;
      bead.position.set(Math.cos(angle) * 2.52, Math.sin(angle) * 2.52, 0);
    });
  }
  function draw() {
    if (disposed || lost) return;
    renderer.render(scene, camera);
    canvas.dataset.frame = String(++frameCount);
  }
  function animate(time: number) {
    if (time - lastTime < 1000 / 30) return;
    elapsed += Math.min((time - lastTime) / 1000, 0.05);
    lastTime = time;
    pose(elapsed);
    draw();
  }
  function sync() {
    const playing =
      motionAllowed() && visible && !document.hidden && !lost && !disposed;
    canvas.dataset.motion = playing ? "running" : "paused";
    renderer.setAnimationLoop(playing ? animate : null);
    lastTime = performance.now();
    if (!playing) {
      pose(elapsed);
      draw();
    }
  }
  const resize = new ResizeObserver(() => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.position.z = camera.aspect < 1 ? 11.8 : 10.5;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    draw();
  });
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  const preferences = new MutationObserver(sync);
  preferences.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-motion"],
  });
  function down(event: PointerEvent) {
    if (event.button !== 0) return;
    dragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
    canvas.setPointerCapture(event.pointerId);
  }
  function move(event: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    pointerX = (event.clientX - rect.left) / rect.width - 0.5;
    pointerY = (event.clientY - rect.top) / rect.height - 0.5;
    if (dragging) {
      dragX += (event.clientX - lastX) * 0.008;
      dragY = THREE.MathUtils.clamp(
        dragY + (event.clientY - lastY) * 0.005,
        -0.7,
        0.7,
      );
      lastX = event.clientX;
      lastY = event.clientY;
      if (!motionAllowed()) {
        sculpture.rotation.set(-0.12 + dragY, -0.28 + dragX, -0.13);
        draw();
      }
    }
  }
  function up() {
    dragging = false;
  }
  function leave() {
    pointerX = 0;
    pointerY = 0;
  }
  function contextLost(event: Event) {
    event.preventDefault();
    lost = true;
    sync();
    host.dataset.lost = "true";
  }
  function contextRestored() {
    lost = false;
    delete host.dataset.lost;
    sync();
  }
  canvas.addEventListener("pointerdown", down);
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerup", up);
  canvas.addEventListener("pointercancel", up);
  canvas.addEventListener("lostpointercapture", up);
  canvas.addEventListener("pointerleave", leave);
  canvas.addEventListener("webglcontextlost", contextLost);
  canvas.addEventListener("webglcontextrestored", contextRestored);
  reduced.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  canvas.setAttribute("aria-hidden", "true");
  host.appendChild(canvas);
  resize.observe(host);
  intersection.observe(host);
  pose(0);
  sync();

  return {
    rotate(direction: number) {
      dragX += direction * 0.35;
      sculpture.rotation.y = -0.28 + dragX;
      draw();
    },
    reset() {
      dragX = 0;
      dragY = 0;
      sculpture.rotation.set(-0.12, -0.28, -0.13);
      draw();
    },
    dispose() {
      disposed = true;
      renderer.setAnimationLoop(null);
      resize.disconnect();
      intersection.disconnect();
      preferences.disconnect();
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      canvas.remove();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) object.geometry.dispose();
      });
      blue.dispose();
      silver.dispose();
      porcelain.dispose();
      environmentMap.dispose();
      renderer.dispose();
    },
  };
}
