const host = document.querySelector('[data-hero-scene]');

if (host) {
  const loader = document.querySelector('.scene-loader');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = matchMedia('(max-width: 700px)').matches;
  let hasWebGL = false;
  try {
    const test = document.createElement('canvas');
    hasWebGL = !!(test.getContext('webgl2') || test.getContext('webgl'));
  } catch (_) {}

  if (!hasWebGL) {
    loader?.remove();
    host.innerHTML = '<div class="scene-fallback" role="img" aria-label="Abstract spherical form"></div>';
  } else {
    import('https://cdn.jsdelivr.net/npm/three@0.167.1/build/three.module.js').then((THREE) => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
      camera.position.set(0, 0, 7.4);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !mobile, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1 : 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      host.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);
      const geometry = new THREE.IcosahedronGeometry(2.15, mobile ? 2 : 4);
      const material = new THREE.MeshStandardMaterial({ color: 0x161616, roughness: .26, metalness: .84, flatShading: true });
      const object = new THREE.Mesh(geometry, material);
      object.rotation.set(.4, -.3, -.1);
      group.add(object);

      const wire = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.18, mobile ? 1 : 2), 18),
        new THREE.LineBasicMaterial({ color: 0x5f5f5f, transparent: true, opacity: .32 })
      );
      group.add(wire);

      const ringMaterial = new THREE.MeshStandardMaterial({ color: 0xf0f0f0, roughness: .34, metalness: .68 });
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.7, .035, 12, 128), ringMaterial);
      ring.rotation.set(1.05, .22, .4);
      group.add(ring);

      scene.add(new THREE.HemisphereLight(0xffffff, 0x000000, 1.4));
      const key = new THREE.DirectionalLight(0xffffff, 5.5);
      key.position.set(-4, 4, 6); scene.add(key);
      const rim = new THREE.PointLight(0xffffff, 20, 18);
      rim.position.set(4, -2, 3); scene.add(rim);

      const pointer = { x: 0, y: 0 };
      addEventListener('pointermove', (event) => {
        pointer.x = (event.clientX / innerWidth - .5) * .6;
        pointer.y = (event.clientY / innerHeight - .5) * .35;
      }, { passive: true });

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = host;
        camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h, false);
      };
      new ResizeObserver(resize).observe(host); resize();
      loader?.remove();

      let frame;
      const clock = new THREE.Clock();
      const render = () => {
        const t = clock.getElapsedTime();
        if (!reduced) {
          group.rotation.y += .0018;
          group.rotation.x += (pointer.y - group.rotation.x) * .018;
          group.position.x += (pointer.x - group.position.x) * .018;
          ring.rotation.z = .4 + Math.sin(t * .24) * .15;
          key.position.x = -4 + Math.sin(t * .3) * 1.2;
        }
        renderer.render(scene, camera);
        frame = requestAnimationFrame(render);
      };
      render();
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) cancelAnimationFrame(frame); else render();
      });
    }).catch(() => {
      loader?.remove();
      host.innerHTML = '<div class="scene-fallback" role="img" aria-label="Abstract spherical form"></div>';
    });
  }
}
