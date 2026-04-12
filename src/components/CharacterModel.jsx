import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

export default function CharacterModel() {
  const containerRef = useRef(null);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2d1b4e);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0x8866ff, 0.3);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // Character group
    const character = new THREE.Group();
    scene.add(character);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xf4c2a0,
      roughness: 0.6,
      metalness: 0.1,
    });
    const head = new THREE.Mesh(headGeometry, skinMaterial);
    head.position.y = 1.5;
    head.castShadow = true;
    head.receiveShadow = true;
    character.add(head);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const eyeWhiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
    });
    const pupilMaterial = new THREE.MeshStandardMaterial({ color: 0x2d1b4e });

    const leftEye = new THREE.Group();
    const leftEyeWhite = new THREE.Mesh(eyeGeometry, eyeWhiteMaterial);
    leftEye.add(leftEyeWhite);

    const leftPupilGeometry = new THREE.SphereGeometry(0.04, 16, 16);
    const leftPupil = new THREE.Mesh(leftPupilGeometry, pupilMaterial);
    leftPupil.position.z = 0.06;
    leftEye.add(leftPupil);

    leftEye.position.set(-0.15, 1.6, 0.4);
    character.add(leftEye);

    const rightEye = leftEye.clone();
    rightEye.position.set(0.15, 1.6, 0.4);
    character.add(rightEye);

    // Eyebrows
    const eyebrowGeometry = new THREE.BoxGeometry(0.2, 0.05, 0.05);
    const eyebrowMaterial = new THREE.MeshStandardMaterial({ color: 0x3d2817 });

    const leftEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
    leftEyebrow.position.set(-0.15, 1.75, 0.45);
    leftEyebrow.rotation.z = 0.1;
    character.add(leftEyebrow);

    const rightEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
    rightEyebrow.position.set(0.15, 1.75, 0.45);
    rightEyebrow.rotation.z = -0.1;
    character.add(rightEyebrow);

    // Mouth
    const mouthGeometry = new THREE.TorusGeometry(0.12, 0.02, 8, 16, Math.PI);
    const mouthMaterial = new THREE.MeshStandardMaterial({ color: 0xd4896a });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(0, 1.35, 0.48);
    mouth.rotation.x = Math.PI;
    character.add(mouth);

    // Hair
    const hairGeometry = new THREE.SphereGeometry(
      0.52,
      32,
      32,
      0,
      Math.PI * 2,
      0,
      Math.PI / 1.5
    );
    const hairMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.8,
      metalness: 0.1,
    });
    const hair = new THREE.Mesh(hairGeometry, hairMaterial);
    hair.position.y = 1.65;
    hair.castShadow = true;
    character.add(hair);

    // Top hair detail (pompadour style)
    const topHairGeometry = new THREE.SphereGeometry(0.35, 16, 16);
    const topHair = new THREE.Mesh(topHairGeometry, hairMaterial);
    topHair.position.set(0, 1.95, -0.1);
    topHair.scale.set(0.8, 1.2, 0.7);
    topHair.castShadow = true;
    character.add(topHair);

    // Neck
    const neckGeometry = new THREE.CylinderGeometry(0.15, 0.18, 0.3, 16);
    const neck = new THREE.Mesh(neckGeometry, skinMaterial);
    neck.position.y = 1.05;
    neck.castShadow = true;
    character.add(neck);

    // Body (torso)
    const torsoGeometry = new THREE.CylinderGeometry(0.35, 0.4, 0.8, 16);
    const shirtMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a90e2,
      roughness: 0.7,
      metalness: 0.1,
    });
    const torso = new THREE.Mesh(torsoGeometry, shirtMaterial);
    torso.position.y = 0.5;
    torso.castShadow = true;
    character.add(torso);

    // Arms
    const armGeometry = new THREE.CapsuleGeometry(0.1, 0.6, 8, 16);

    const leftArm = new THREE.Mesh(armGeometry, shirtMaterial);
    leftArm.position.set(-0.45, 0.6, 0);
    leftArm.rotation.z = 0.3;
    leftArm.castShadow = true;
    character.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, shirtMaterial);
    rightArm.position.set(0.45, 0.6, 0);
    rightArm.rotation.z = -0.3;
    rightArm.castShadow = true;
    character.add(rightArm);

    // Hands
    const handGeometry = new THREE.SphereGeometry(0.12, 16, 16);

    const leftHand = new THREE.Mesh(handGeometry, skinMaterial);
    leftHand.position.set(-0.6, 0.25, 0.1);
    leftHand.castShadow = true;
    character.add(leftHand);

    const rightHand = new THREE.Mesh(handGeometry, skinMaterial);
    rightHand.position.set(0.6, 0.25, 0.1);
    rightHand.castShadow = true;
    character.add(rightHand);

    // Laptop
    const laptop = new THREE.Group();

    // Laptop base
    const laptopBaseGeometry = new THREE.BoxGeometry(1.2, 0.05, 0.8);
    const laptopMaterial = new THREE.MeshStandardMaterial({
      color: 0xc0c0c0,
      roughness: 0.3,
      metalness: 0.7,
    });
    const laptopBase = new THREE.Mesh(laptopBaseGeometry, laptopMaterial);
    laptopBase.castShadow = true;
    laptopBase.receiveShadow = true;
    laptop.add(laptopBase);

    // Laptop screen
    const laptopScreenGeometry = new THREE.BoxGeometry(1.2, 0.02, 0.75);
    const laptopScreen = new THREE.Mesh(laptopScreenGeometry, laptopMaterial);
    laptopScreen.position.set(0, 0.4, -0.375);
    laptopScreen.rotation.x = Math.PI / 6;
    laptopScreen.castShadow = true;
    laptop.add(laptopScreen);

    // Screen display
    const screenDisplayGeometry = new THREE.PlaneGeometry(1.1, 0.65);
    const screenDisplayMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      emissive: 0x3366cc,
      emissiveIntensity: 0.3,
      roughness: 0.1,
      metalness: 0.2,
    });
    const screenDisplay = new THREE.Mesh(
      screenDisplayGeometry,
      screenDisplayMaterial
    );
    screenDisplay.position.set(0, 0.4, -0.36);
    screenDisplay.rotation.x = Math.PI / 6;
    laptop.add(screenDisplay);

    // Apple logo
    const logoGeometry = new THREE.CircleGeometry(0.08, 32);
    const logoMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.5,
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 0.55, -0.75);
    logo.rotation.x = Math.PI / 6;
    laptop.add(logo);

    laptop.position.set(0, 0.3, 0.5);
    laptop.rotation.y = Math.PI;
    character.add(laptop);

    // Floor
    const floorGeometry = new THREE.CircleGeometry(5, 32);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d2a5f,
      roughness: 0.9,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.5;
    floor.receiveShadow = true;
    scene.add(floor);

    // Animation
    let animationId;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      if (isRotating) {
        character.rotation.y = Math.sin(time * 0.5) * 0.3;
      }

      // Subtle breathing animation
      character.scale.y = 1 + Math.sin(time * 2) * 0.02;

      // Eye blink
      if (Math.sin(time * 3) > 0.98) {
        leftEye.scale.y = 0.1;
        rightEye.scale.y = 0.1;
      } else {
        leftEye.scale.y = 1;
        rightEye.scale.y = 1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Eyes follow cursor
      leftPupil.position.x = mouseX * 0.03;
      leftPupil.position.y = mouseY * 0.03;
      rightPupil.position.x = mouseX * 0.03;
      rightPupil.position.y = mouseY * 0.03;

      // Head slightly follows cursor
      head.rotation.y = mouseX * 0.3;
      head.rotation.x = mouseY * 0.2;
    };

    containerRef.current.addEventListener("mousemove", handleMouseMove);
    const currentContainer = containerRef.current;

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (currentContainer) {
        currentContainer.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (currentContainer && currentContainer.contains(renderer.domElement)) {
        currentContainer.removeChild(renderer.domElement);
      }
    };
  }, [isRotating]);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-violet-900 flex items-center justify-center">
      <div className="relative w-full max-w-4xl h-[600px] rounded-3xl overflow-hidden shadow-2xl">
        <div ref={containerRef} className="w-full h-full" />

        <div className="absolute top-6 left-6 space-y-2">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            3D Character Model
          </h1>
          <p className="text-purple-200 text-sm">
            Interactive • Move your mouse to interact
          </p>
        </div>

        <div className="absolute bottom-6 right-6 flex gap-3">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium hover:bg-white/20 transition-all duration-300 shadow-lg"
          >
            {isRotating ? "⏸ Pause" : "▶ Rotate"}
          </button>
        </div>

        <div className="absolute top-6 right-6 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <p className="text-white text-xs font-mono">Three.js + React</p>
        </div>
      </div>
    </div>
  );
}
