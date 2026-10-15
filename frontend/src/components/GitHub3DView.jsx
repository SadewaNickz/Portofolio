// frontend/src/components/GitHub3DView.jsx
import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

const DAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

function formatDateDisplay(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDate();
  const month = MONTH_NAMES[d.getMonth()];
  const year = d.getFullYear();
  const dayName = DAY_NAMES[d.getDay()];
  return `${dayName}, ${day} ${month} ${year}`;
}

// Silky smooth easing curves
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

export default function GitHub3DView({ data, maxCount }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const triggerExtrudeRef = useRef(null);

  const [hoveredData, setHoveredData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Setup Three.js Scene
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current || !data) return;

    const container = containerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight || (width < 640 ? 300 : 420);

    const isMobile = width < 640;

    // --- Scene, Camera & Renderer ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.012);

    // Dynamic FOV and position to ensure full view on both mobile and desktop
    const cameraFov = isMobile ? 54 : 38;
    const camera = new THREE.PerspectiveCamera(cameraFov, width / height, 0.1, 1000);

    // Pure Isometric coordinates
    const startCamPos = isMobile
      ? new THREE.Vector3(0, 78, 0.01)
      : new THREE.Vector3(0, 60, 0.01);

    const endCamPos = isMobile
      ? new THREE.Vector3(34, 42, 54)
      : new THREE.Vector3(28, 30, 40);

    const startTarget = new THREE.Vector3(0, 0, 0);
    const endTarget = new THREE.Vector3(0, 1.2, 0);

    camera.position.copy(startCamPos);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // --- Orbit Controls ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2.08; // don't go below ground
    controls.minDistance = 14;
    controls.maxDistance = 120;
    controls.target.copy(startTarget);
    controls.enablePan = false;
    controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
    controlsRef.current = controls;

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff2f2, 1.9);
    dirLight.position.set(30, 45, 25);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // Persona 5 Crimson Light
    const crimsonLight = new THREE.PointLight(0xe60012, 3.5, 65);
    crimsonLight.position.set(0, 8, 0);
    scene.add(crimsonLight);

    // Rim Light
    const rimLight = new THREE.DirectionalLight(0x990011, 1.1);
    rimLight.position.set(-30, 15, -20);
    scene.add(rimLight);

    // --- Grid Setup ---
    const totalWeeks = data.weeks.length;
    const cellWidth = 1.0;
    const gap = 0.22;
    const step = cellWidth + gap;

    const gridWidth = totalWeeks * step;
    const gridDepth = 7 * step;
    const startX = -gridWidth / 2 + step / 2;
    const startZ = -gridDepth / 2 + step / 2;

    // Base Platform
    const platformGeo = new THREE.BoxGeometry(gridWidth + 3, 0.5, gridDepth + 3);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x121212,
      roughness: 0.85,
      metalness: 0.2,
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.set(0, -0.26, 0);
    platform.receiveShadow = true;
    scene.add(platform);

    // Platform Crimson Border Edge
    const platformBorderGeo = new THREE.EdgesGeometry(platformGeo);
    const platformBorderMat = new THREE.LineBasicMaterial({
      color: 0xe60012,
      transparent: true,
      opacity: 0.65,
    });
    const platformBorder = new THREE.LineSegments(platformBorderGeo, platformBorderMat);
    platformBorder.position.copy(platform.position);
    scene.add(platformBorder);

    // Floor Grid Wireframe
    const gridHelper = new THREE.GridHelper(
      Math.max(gridWidth, gridDepth) + 4,
      Math.round(totalWeeks / 2),
      0x2a2a2a,
      0x181818
    );
    gridHelper.position.set(0, -0.01, 0);
    scene.add(gridHelper);

    // --- Meshes and Materials ---
    const boxGeo = new THREE.BoxGeometry(cellWidth, 1, cellWidth);
    boxGeo.translate(0, 0.5, 0);

    const blockMeshes = [];
    const interactiveMeshes = [];
    const effectiveMax = Math.max(maxCount, 1);

    data.weeks.forEach((week, wi) => {
      week.contributionDays.forEach((day, di) => {
        const x = startX + wi * step;
        const z = startZ + di * step;

        const count = day.contributionCount;
        const ratio = count / effectiveMax;

        let targetH = 0.18;
        let colorHex = 0x1e1e1e;
        let emissiveHex = 0x0a0a0a;
        let emissiveIntensity = 0.2;

        if (count > 0) {
          targetH = 0.75 + Math.pow(ratio, 0.65) * 6.2;

          if (ratio <= 0.25) {
            colorHex = 0x5a0c10;
            emissiveHex = 0x220205;
            emissiveIntensity = 0.4;
          } else if (ratio <= 0.5) {
            colorHex = 0x9e1018;
            emissiveHex = 0x55050a;
            emissiveIntensity = 0.7;
          } else if (ratio <= 0.75) {
            colorHex = 0xd40d18;
            emissiveHex = 0x88000b;
            emissiveIntensity = 1.0;
          } else {
            colorHex = 0xff2432;
            emissiveHex = 0xcc0010;
            emissiveIntensity = 1.4;
          }
        }

        const mat = new THREE.MeshStandardMaterial({
          color: colorHex,
          emissive: emissiveHex,
          emissiveIntensity: emissiveIntensity,
          roughness: count > 0 ? 0.25 : 0.75,
          metalness: count > 0 ? 0.45 : 0.1,
        });

        const mesh = new THREE.Mesh(boxGeo, mat);
        mesh.position.set(x, 0, z);
        mesh.scale.set(1, 0.18, 1); // Start flat
        mesh.castShadow = count > 0;
        mesh.receiveShadow = true;

        mesh.userData = {
          date: day.date,
          count: day.contributionCount,
          weekday: day.weekday,
          weekIndex: wi,
          dayIndex: di,
          targetHeight: targetH,
          baseColor: colorHex,
          baseEmissive: emissiveHex,
          baseEmissiveIntensity: emissiveIntensity,
        };

        if (count > 0) {
          const edgeGeo = new THREE.EdgesGeometry(boxGeo);
          const edgeMat = new THREE.LineBasicMaterial({
            color: ratio > 0.5 ? 0xff7777 : 0xb32424,
            transparent: true,
            opacity: 0.55,
          });
          const wire = new THREE.LineSegments(edgeGeo, edgeMat);
          mesh.add(wire);
        }

        scene.add(mesh);
        blockMeshes.push(mesh);
        interactiveMeshes.push(mesh);
      });
    });

    // --- Floating Ambient Embers ---
    const emberCount = 80;
    const emberGeo = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);
    const emberSpeeds = new Float32Array(emberCount);

    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3 + 0] = (Math.random() - 0.5) * (gridWidth + 10);
      emberPositions[i * 3 + 1] = Math.random() * 10;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * (gridDepth + 10);
      emberSpeeds[i] = 0.01 + Math.random() * 0.02;
    }
    emberGeo.setAttribute("position", new THREE.BufferAttribute(emberPositions, 3));

    const emberMat = new THREE.PointsMaterial({
      color: 0xff3b30,
      size: 0.28,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const embers = new THREE.Points(emberGeo, emberMat);
    scene.add(embers);

    // --- Raycasting & Hover Tooltip ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let hoveredMesh = null;

    const handlePointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handlePointerLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
      if (hoveredMesh) {
        resetMeshHighlight(hoveredMesh);
        hoveredMesh = null;
      }
      setHoveredData(null);
    };

    const resetMeshHighlight = (m) => {
      if (!m || !m.material) return;
      m.material.emissive.setHex(m.userData.baseEmissive);
      m.material.emissiveIntensity = m.userData.baseEmissiveIntensity;
      m.scale.x = 1;
      m.scale.z = 1;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener("pointermove", handlePointerMove);
    domEl.addEventListener("pointerleave", handlePointerLeave);

    const handleUserInteraction = () => {
      animatingTransition = false;
    };
    domEl.addEventListener("pointerdown", handleUserInteraction);

    // --- Smooth Extrusion (Memanjang) Animation ---
    let animStartTime = performance.now();
    let animatingTransition = true;
    const transitionDuration = 1.4;

    const triggerExtrude = () => {
      animStartTime = performance.now();
      animatingTransition = true;

      camera.position.copy(startCamPos);
      controls.target.copy(startTarget);
      controls.update();

      blockMeshes.forEach((m) => {
        m.scale.y = 0.18;
      });
    };
    triggerExtrudeRef.current = triggerExtrude;

    // --- Animation & Render Loop ---
    let animationFrameId;

    const animate = (currentTime) => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = (currentTime - animStartTime) / 1000;

      // 1. Camera swoop into Isometric angle
      if (animatingTransition) {
        const camT = Math.min(1, Math.max(0, elapsed / transitionDuration));
        const camEase = easeInOutCubic(camT);

        camera.position.lerpVectors(startCamPos, endCamPos, camEase);
        controls.target.lerpVectors(startTarget, endTarget, camEase);

        if (camT >= 1) {
          animatingTransition = false;
        }
      }

      // 2. Extrusion Wave ("Memanjang")
      for (let i = 0; i < blockMeshes.length; i++) {
        const m = blockMeshes[i];
        const targetH = m.userData.targetHeight;

        const delay = 0.08 + (m.userData.weekIndex / totalWeeks) * 0.48 + (m.userData.dayIndex / 7) * 0.08;
        const t = Math.max(0, elapsed - delay);
        const extrudeDuration = 0.58;

        if (t < extrudeDuration) {
          const p = Math.min(1, t / extrudeDuration);
          const ease = easeOutQuart(p);
          m.scale.y = 0.18 + (targetH - 0.18) * ease;
        } else {
          m.scale.y = targetH;
        }
      }

      // 3. Embers
      const positions = emberGeo.attributes.position.array;
      for (let i = 0; i < emberCount; i++) {
        positions[i * 3 + 1] += emberSpeeds[i];
        if (positions[i * 3 + 1] > 11) {
          positions[i * 3 + 1] = 0.1;
        }
      }
      emberGeo.attributes.position.needsUpdate = true;

      // 4. Raycasting
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hoveredMesh !== hit) {
          if (hoveredMesh) resetMeshHighlight(hoveredMesh);
          hoveredMesh = hit;

          hit.material.emissive.setHex(0xffffff);
          hit.material.emissiveIntensity = 1.3;
          hit.scale.x = 1.15;
          hit.scale.z = 1.15;

          setHoveredData({
            date: hit.userData.date,
            count: hit.userData.count,
            weekday: hit.userData.weekday,
          });
        }
      } else {
        if (hoveredMesh) {
          resetMeshHighlight(hoveredMesh);
          hoveredMesh = null;
          setHoveredData(null);
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate(performance.now());

    // Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || (newW < 640 ? 300 : 420);
      const mobile = newW < 640;

      camera.fov = mobile ? 54 : 38;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      domEl.removeEventListener("pointermove", handlePointerMove);
      domEl.removeEventListener("pointerleave", handlePointerLeave);
      domEl.removeEventListener("pointerdown", handleUserInteraction);

      controls.dispose();
      renderer.dispose();

      blockMeshes.forEach((m) => {
        if (m.material) m.material.dispose();
      });
      boxGeo.dispose();
      platformGeo.dispose();
      platformMat.dispose();
      platformBorderGeo.dispose();
      platformBorderMat.dispose();
      emberGeo.dispose();
      emberMat.dispose();
    };
  }, [data, maxCount]);

  const handleReplayExtrude = useCallback(() => {
    if (triggerExtrudeRef.current) {
      triggerExtrudeRef.current();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300px] sm:h-[390px] md:h-[450px] bg-[#0a0a0a] rounded-lg overflow-hidden border border-line select-none transition-all duration-300 shadow-xl"
    >
      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing touch-none" />

      {/* Cyber Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-base/80 via-transparent to-base/20" />

      {/* Replay Refresh Icon Button (Top Right Only) */}
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={handleReplayExtrude}
          className="p-2 sm:p-2.5 rounded-md bg-surface/85 border border-line hover:border-accent hover:bg-accent text-muted hover:text-white transition-all shadow-[2px_2px_0px_#000] active:scale-90 flex items-center justify-center"
          title="Ulangi Animasi Memanjang"
          aria-label="Ulangi Animasi"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      {/* Interactive Tooltip */}
      {hoveredData && (
        <div
          className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-full transition-all duration-75"
          style={{
            left: `${Math.max(75, Math.min(tooltipPos.x, (containerRef.current?.clientWidth || 300) - 75))}px`,
            top: `${Math.max(40, tooltipPos.y - 12)}px`,
          }}
        >
          <div className="relative bg-[#0d0d0d]/95 border-2 border-accent text-fg px-3 py-1.5 sm:px-3.5 sm:py-2 rounded shadow-[3px_3px_0px_0px_#e60012] backdrop-blur-md min-w-[135px] sm:min-w-[150px]">
            <div className="flex items-center justify-between gap-2 border-b border-line/60 pb-1 mb-1">
              <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-accent uppercase font-bold">
                COMMIT DATA
              </span>
              <span className="text-[9px] sm:text-[10px] text-muted font-mono">
                {hoveredData.count > 0 ? "AKTIF" : "LIBUR"}
              </span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-fg font-display tracking-wide">
              {hoveredData.count} {hoveredData.count === 1 ? "Commit" : "Commits"}
            </div>
            <div className="text-[10px] sm:text-[11px] text-muted font-sans mt-0.5">
              {formatDateDisplay(hoveredData.date)}
            </div>
          </div>
          <div className="w-2 h-2 bg-accent rotate-45 mx-auto -mt-1" />
        </div>
      )}

      {/* Bottom Controls Bar & Legend (Mobile Responsive) */}
      <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex flex-wrap items-center justify-between gap-1.5 pointer-events-none">
        <div className="bg-surface/85 border border-line/70 backdrop-blur-sm px-2 py-1 rounded text-[9px] sm:text-[10px] text-muted font-mono pointer-events-auto">
          🖱️ <span className="text-fg font-medium">Drag</span> putar •{" "}
          <span className="text-fg font-medium">Pinch/Scroll</span> zoom
        </div>

        <div className="bg-surface/85 border border-line/70 backdrop-blur-sm px-2.5 py-1 rounded flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-muted pointer-events-auto">
          <span>Rendah</span>
          <div className="flex items-center gap-0.5 sm:gap-1">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm bg-[#1e1e1e] border border-line inline-block" />
            <span className="w-2 h-3 sm:w-2.5 sm:h-3.5 rounded-sm bg-[#5a0c10] inline-block" />
            <span className="w-2 h-4 sm:w-2.5 sm:h-4.5 rounded-sm bg-[#9e1018] inline-block" />
            <span className="w-2 h-5 sm:w-2.5 sm:h-6 rounded-sm bg-[#d40d18] inline-block" />
            <span className="w-2 h-6 sm:w-2.5 sm:h-7 rounded-sm bg-[#ff2432] shadow-[0_0_6px_#ff2432] inline-block" />
          </div>
          <span className="text-accent font-bold">Tinggi</span>
        </div>
      </div>
    </div>
  );
}
