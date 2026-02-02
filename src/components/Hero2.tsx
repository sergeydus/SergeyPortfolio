"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boxes = useRef<THREE.Mesh[]>([]);
  const boxesCloneStorage = useRef<THREE.Mesh<THREE.BoxGeometry, THREE.MeshPhongMaterial, THREE.Object3DEventMap>[]>([]);
  useEffect(() => {
    const currentCanvas = canvasRef.current;
    if (!currentCanvas || typeof window === "undefined") {
      return
    };
    const scene = new THREE.Scene();
    // fov, aspect, near, far (how close it needs to be to be visible 0.1-1000 otherwise invis)
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: currentCanvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // console.log(scene)
    // console.log(camera)
    // console.log(renderer)

    function getDistance(x1: number, y1: number, x2: number, y2: number) {
      const xDiff = x2 - x1;
      const yDiff = y2 - y1;
      return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    }
    // const ambientLight = new THREE.AmbientLight(0x404040, 2);
    // scene.add(ambientLight);
    for (let i = 0; i < 40; i++) {
      for (let j = 0; j < 20; j++) {
        const boxgeometry = new THREE.BoxGeometry(1, 2, 1);
        // const boxmaterial = new THREE.MeshPhongMaterial({ color: Math.random() * 0xffffff });
        const boxmaterial = new THREE.MeshPhongMaterial({ color: 0x121928 });
        const boxmesh = new THREE.Mesh(boxgeometry, boxmaterial);
        // boxmesh.position.set(i - 5, dist*2, j)
        boxmesh.position.set(i - 20, 0, j)
        boxes.current.push(boxmesh);
        const clone = boxmesh.clone()
        boxesCloneStorage.current.push(clone);
        scene.add(boxmesh);
      }
    }

    camera.position.z = 20;
    camera.position.y = 5;
    camera.rotateX(-Math.PI / 6);
    // camera.lookAt(boxes.current[Math.floor(boxes.current.length / 2)].position);
    const light = new THREE.PointLight(0xffffff, 400, 30);
    light.position.set(camera.position.x, camera.position.y, camera.position.z + 5);
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.001);
    scene.add(ambientLight);
    renderer.render(scene, camera);
    const raycaster = new THREE.Raycaster();

    // Add OrbitControls
    // const controls = new OrbitControls(camera, renderer.domElement);


    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      // Get canvas bounding rect to account for scrolling
      const rect = currentCanvas.getBoundingClientRect();

      // Only process if mouse is over the canvas
      if (event.clientY < rect.top || event.clientY > rect.bottom) {
        return;
      }

      // Calculate mouse position relative to canvas
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Convert to normalized device coordinates (-1 to 1)
      mouse.x = (x / rect.width) * 2 - 1;
      mouse.y = -(y / rect.height) * 2 + 1;
    }
    window.addEventListener('mousemove', handleMouseMove);
    let tick = 0;
    let animationId: number;
    const darkColor = new THREE.Color(0x000000)
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      // 3. Handle the results
      if (intersects.length > 0) {
        // console.log('Intersected object:', intersects);
        // intersects[0].object.scale.set(1.5, 1.5, 1.5);
        const intersectedObject = intersects[0].object as THREE.Mesh;
        (intersectedObject.material as THREE.MeshPhongMaterial).emissive.setHex(0x121928);
      }
      tick += 0.01;
      boxes.current.forEach((box, index) => {
        const i = index % 20;  // column (0-39)
        const j = Math.floor(index / 20);  // row (0-19)
        const distance = getDistance(i, j, 0, 0)

        box.position.y = boxesCloneStorage.current[index].position.y + Math.sin(distance / 2 + tick / 3);
        (box.material as THREE.MeshPhongMaterial).emissive.lerp(darkColor, 0.01);
      })
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      cancelAnimationFrame(animationId);
    }
  }, [])

  return (
    <div className="w-full h-screen">
      <canvas ref={canvasRef} />
    </div>
  );
}
