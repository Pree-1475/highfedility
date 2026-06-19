import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import batGlb from "../../assets/cricket_batsports.glb?url";

export default function ThreeBatCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    const scene = new THREE.Scene();

    const isMobileInit = window.innerWidth < 768;
    const camera = new THREE.PerspectiveCamera(
      isMobileInit ? 60 : 45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xfff5e6, 2.5);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xccddff, 1.2);
    fillLight.position.set(-5, -2, -5);
    scene.add(fillLight);

    const batGroup = new THREE.Group();
    scene.add(batGroup);

    // Load GLB model
    const loader = new GLTFLoader();
    loader.load(
      batGlb,
      (gltf) => {
        const model = gltf.scene;

        // Compute bounding box to normalize size and center
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        // Make the bat slightly smaller on mobile screens
        const isMobile = window.innerWidth < 768;
        // The camera's FOV is 60 on mobile (limit ~17.3 units) and 45 on desktop (limit ~12.4 units).
        const targetSize = isMobile ? 10.5 : 10.5;
        const scale = targetSize / maxDim;

        // 1. Scale the model first
        model.scale.set(scale, scale, scale);

        // 2. Recompute bounding box after scale to get correct world-space center
        const boxScaled = new THREE.Box3().setFromObject(model);
        const scaledCenter = boxScaled.getCenter(new THREE.Vector3());

        // 3. Center the model based on the scaled center
        model.position.x -= scaledCenter.x;
        model.position.y -= scaledCenter.y;
        model.position.z -= scaledCenter.z;

        console.log("Bat centered at:", scaledCenter);

        // Add to a centering group so batGroup can still be rotated properly
        const centeringGroup = new THREE.Group();
        centeringGroup.add(model);

        // The GLB has the bat lying horizontally (handle pointing right along X axis).
        // Rotate it -90 degrees around Z to stand upright (handle up).
        centeringGroup.rotation.z = -Math.PI / 2;
        // The face of the bat might be pointing sideways. If we want it to face the camera, 
        // we can rotate it along its local Y axis. Let's tilt it slightly so the face is visible.
        centeringGroup.rotation.x = -Math.PI / 8;

        batGroup.add(centeringGroup);
      },
      undefined,
      (error) => {
        console.error("An error happened loading GLB:", error);
      }
    );

    // Shift the entire bat group to the right on desktop so it doesn't overlap left headings
    // On mobile, the layout stacks, so we keep it centered (x = 0).
    batGroup.position.x = window.innerWidth < 1024 ? 0 : 2;

    batGroup.rotation.z = Math.PI / 15;
    batGroup.rotation.x = Math.PI / 8;

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationY = -Math.PI / 4;
    let targetRotationX = Math.PI / 12;
    batGroup.rotation.y = targetRotationY;

    container.style.cursor = "grab";

    const getClientPos = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      return { x: e.clientX, y: e.clientY };
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      container.style.cursor = "grabbing";
      previousMousePosition = getClientPos(e);
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const currentPos = getClientPos(e);
      const deltaMove = {
        x: currentPos.x - previousMousePosition.x,
        y: currentPos.y - previousMousePosition.y,
      };
      targetRotationY += deltaMove.x * 0.01;
      targetRotationX += deltaMove.y * 0.01;
      targetRotationX = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, targetRotationX));
      previousMousePosition = currentPos;
    };

    const onPointerUp = () => {
      isDragging = false;
      container.style.cursor = "grab";
    };

    container.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    container.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.fov = window.innerWidth < 768 ? 60 : 45;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let time = 0;
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.05;

      if (!isDragging) {
        // Reduced rotation speed
        targetRotationY += 0.002;
      }

      batGroup.rotation.y += (targetRotationY - batGroup.rotation.y) * 0.05;
      batGroup.rotation.x += (targetRotationX - batGroup.rotation.x) * 0.05;

      // Subtle levitation
      batGroup.position.y = Math.sin(time * 0.5) * 0.015;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
      container.removeEventListener("mousedown", onPointerDown);
      container.removeEventListener("touchstart", onPointerDown);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div id="three-bat-container" ref={mountRef} className="absolute inset-0 w-full h-full" />
  );
}
