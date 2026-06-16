import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBatCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
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

    const batMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5deb3,
      roughness: 0.85,
      metalness: 0.05,
    });

    const gripMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.9,
      metalness: 0.1,
    });

    // Handle
    const handleGeo = new THREE.CylinderGeometry(0.35, 0.4, 4, 32);
    const handle = new THREE.Mesh(handleGeo, gripMaterial);
    handle.position.y = 5.5;
    batGroup.add(handle);

    // Splice
    const spliceGeo = new THREE.CylinderGeometry(0.4, 0.8, 1.5, 32);
    const splice = new THREE.Mesh(spliceGeo, batMaterial);
    splice.position.y = 2.75;
    batGroup.add(splice);

    // Blade
    const bladeGeo = new THREE.BoxGeometry(2.8, 8, 1.4, 16, 16, 16);
    const posAttribute = bladeGeo.attributes.position;
    for (let i = 0; i < posAttribute.count; i++) {
      const x = posAttribute.getX(i);
      const y = posAttribute.getY(i);
      let z = posAttribute.getZ(i);

      // Front face curve
      if (z > 0) {
        z += 0.05 * (1 - (x * x) / (1.4 * 1.4));
        posAttribute.setZ(i, z);
      }
      // Back face spine
      if (z < 0) {
        let yFactor = 1;
        if (y > 2) yFactor = 1 - (y - 2) / 2;
        if (y < -3) yFactor = 1 - Math.abs(y + 3);
        yFactor = Math.max(0.1, yFactor);

        const xFactor = 1 - Math.abs(x) / 1.4;
        posAttribute.setZ(i, z - xFactor * 1.0 * yFactor);
      }
    }
    bladeGeo.computeVertexNormals();
    const blade = new THREE.Mesh(bladeGeo, batMaterial);
    blade.position.y = -2;
    batGroup.add(blade);

    // Decal
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 256, 1024);
      ctx.fillStyle = "#111111";
      ctx.font = '900 120px "Arial", sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.save();
      ctx.translate(128, 512);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText("MR WILLOW", 0, 0);
      ctx.restore();
    }

    const decalTexture = new THREE.CanvasTexture(canvas);
    decalTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const decalMat = new THREE.MeshStandardMaterial({
      map: decalTexture,
      transparent: true,
      roughness: 0.8,
      metalness: 0.1,
    });
    const decalGeo = new THREE.PlaneGeometry(2.7, 7.8);
    const decalPlane = new THREE.Mesh(decalGeo, decalMat);
    decalPlane.position.set(0, -2, 0.73);
    batGroup.add(decalPlane);

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
        targetRotationY += 0.005;
      }

      batGroup.rotation.y += (targetRotationY - batGroup.rotation.y) * 0.05;
      batGroup.rotation.x += (targetRotationX - batGroup.rotation.x) * 0.05;
      batGroup.position.y = Math.sin(time) * 0.2;

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
