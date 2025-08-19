(function(){
  // Listen for data from parent
  function init(mind) {
    const options = {
      container: 'jsmind_container',
      editable: true,
      theme: 'primary',
      mode: 'full',
      support_html: true,
      view: {
        engine: 'canvas',
        hmargin: 100,
        vmargin: 80,
        line_width: 2,
        line_color: '#fff',
        line_style: 'curved',
        draggable: true,
        enable_device_pixel_ratio: true,
        zoom: { min: 0.5, max: 2.1, step: 0.1 },
      },
      layout: { hspace: 40, vspace: 20, pspace: 18, cousin_space: 10 },
      shortcut: { enable: true },
    };
    try {
      const JM = window.jsMind || jsMind;
      const jm = new JM(options);
      window.__jm = jm;
      window.__jm_mode = null; // null | 'edit' | 'delete'
      jm.show(mind);
      try { jm.expand_all(); } catch(_) {}
      try { applyLevelColors(jm); } catch(_){}
      try { if (JM.draggable_node) JM.draggable_node(jm); } catch(_){}
      // Wire toolbar
      wireToolbar(jm);
    } catch (e) {
      const c = document.getElementById('jsmind_container');
      if (c) c.innerHTML = '<div style="padding:16px">Failed to initialize jsMind. '+String(e)+'</div>';
    }

    // Click to navigate: send message to opener
    try {
      document.getElementById('jsmind_container').addEventListener('click', (e) => {
        const el = e.target.closest('jmnode');
        if (!el) return;
        const nodeId = el.getAttribute('nodeid');
        if (!nodeId) return;
        const mode = window.__jm_mode;
        if (mode === 'edit') {
          e.preventDefault(); e.stopPropagation();
          try { jm.enable_edit && jm.enable_edit(); } catch(_){ }
          jm.select_node(nodeId);
          setTimeout(()=>{ try { jm.begin_edit(nodeId); } catch(_){ } }, 0);
          // exit mode after entering edit
          setMode(null);
          return;
        }
        if (mode === 'delete') {
          e.preventDefault(); e.stopPropagation();
          const node = jm.get_node(nodeId);
          if (node && !node.isroot) {
            try { jm.enable_edit && jm.enable_edit(); } catch(_){ }
            jm.select_node(nodeId);
            try { jm.remove_node(node); } catch(_){ }
            try { applyLevelColors(jm); } catch(_){}
          }
          setMode(null);
          return;
        }
        // default behavior: notify opener for navigation
        if (window.opener) {
          window.opener.postMessage({ type: 'mindmap-navigate', messageId: nodeId }, '*');
        }
      });
    } catch(_){ }
  }

  function wireToolbar(jm){
    const container = document.getElementById('jsmind_container');
    const btnAdd = document.getElementById('btn-add');
    const btnEdit = null; // removed from UI, keep keyboard support
    const btnDelete = document.getElementById('btn-delete');
    const btnZoomIn = document.getElementById('btn-zoom-in');
    const btnZoomOut = document.getElementById('btn-zoom-out');
    const btnFs = document.getElementById('btn-fullscreen');
    const btnClose = document.getElementById('btn-close');
    const btnDownload = document.getElementById('btn-download');

    // Zoom helpers map to view.set_zoom
    function getZoom(){ return jm.view.zoom_current || 1; }
    function setZoom(z){ jm.view.set_zoom(z); }

    btnZoomIn?.addEventListener('click', ()=>{
      const step = jm.options.view.zoom?.step || 0.1;
      const max = jm.options.view.zoom?.max || 2.1;
      setZoom(Math.min(max, getZoom() + step));
    });
    btnZoomOut?.addEventListener('click', ()=>{
      const step = jm.options.view.zoom?.step || 0.1;
      const min = jm.options.view.zoom?.min || 0.5;
      setZoom(Math.max(min, getZoom() - step));
    });

    // Fullscreen toggle on the main container wrapper
    btnFs?.addEventListener('click', ()=>{
      const rootEl = document.documentElement;
      if (!document.fullscreenElement) {
        (rootEl.requestFullscreen && rootEl.requestFullscreen())
          || (rootEl.webkitRequestFullscreen && rootEl.webkitRequestFullscreen());
      } else {
        (document.exitFullscreen && document.exitFullscreen())
          || (document.webkitExitFullscreen && document.webkitExitFullscreen());
      }
    });

    // Close tab
    btnClose?.addEventListener('click', ()=>{ window.close(); });

    // Download PNG using screenshot plugin
    btnDownload?.addEventListener('click', ()=>{
      try {
        // Ensure plugin exists
        if (jm && jm.shoot) {
          jm.shoot();
        } else if (jm && jm.screenshot && typeof jm.screenshot.shoot === 'function') {
          jm.screenshot.shoot();
        } else {
          alert('Download not available.');
        }
      } catch (e) {
        console.error('Download failed', e);
        alert('Failed to download mind map.');
      }
    });

    // Add node: add as a child of selected or root
    btnAdd?.addEventListener('click', ()=> addNode(jm));
    // Edit/Delete modes
    function pulse(btn){ try{ btn?.classList.add('active'); setTimeout(()=>btn?.classList.remove('active'), 300); }catch(_){} }

    // Edit button removed; editing available via keyboard (E) or click mode
    btnDelete?.addEventListener('click', ()=>{
      const target = jm.get_selected_node();
      if (target && !target.isroot) {
        pulse(btnDelete);
        try { jm.enable_edit && jm.enable_edit(); } catch(_){ }
        try { jm.remove_node(target); } catch(_){ }
        setMode(null);
      } else {
        // if nothing selected or root selected, enter delete mode for pick
        setMode(window.__jm_mode === 'delete' ? null : 'delete');
      }
    });
    document.addEventListener('keydown', (e)=>{
      if (e.key === 'a' || e.key === 'A') { e.preventDefault(); addNode(jm); }
      if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        const target = jm.get_selected_node() || jm.get_root();
        if (target) {
          try { jm.enable_edit && jm.enable_edit(); } catch(_){ }
          jm.select_node(target.id);
          setTimeout(()=>{ try { jm.begin_edit(target.id); } catch(_){ } }, 0);
          setMode(null);
        } else {
          setMode(window.__jm_mode === 'edit' ? null : 'edit');
        }
      }
      if (e.key === 'Delete') {
        e.preventDefault();
        const target = jm.get_selected_node();
        if (target && !target.isroot) {
          try { jm.enable_edit && jm.enable_edit(); } catch(_){ }
          try { jm.remove_node(target); } catch(_){ }
          setMode(null);
        } else {
          setMode(window.__jm_mode === 'delete' ? null : 'delete');
        }
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === '+' || e.key === '=')) { e.preventDefault(); btnZoomIn?.click(); }
      if ((e.metaKey || e.ctrlKey) && (e.key === '-' )) { e.preventDefault(); btnZoomOut?.click(); }
      if (e.key === 'Escape') { e.preventDefault(); btnClose?.click(); }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'f') { e.preventDefault(); btnFs?.click(); }
    });

    function addNode(jm){
      try {
        const parent = jm.get_selected_node() || jm.get_root();
        if (!parent) return;
        const id = 'extra-' + Date.now();
        const topic = 'New node';
        // ensure editable true for add
        if (!jm.get_editable || !jm.get_editable()) { try { jm.enable_edit && jm.enable_edit(); } catch(_){}}
        jm.add_node(parent, id, topic);
        jm.select_node(id);
        try { applyLevelColors(jm); } catch(_){}
      } catch(_){ /* noop */ }
    }

    function setMode(mode){
      window.__jm_mode = mode;
      // visual states
      // No UI edit button anymore
      if (btnDelete) btnDelete.classList.toggle('active', mode === 'delete');
    }
  }

  function applyLevelColors(jm){
    // Repeat after fourth layer
    const palette = [
      { bg: '#10a37f', fg: '#ffffff' }, // depth 0 root - green
      { bg: '#2b6cb0', fg: '#ffffff' }, // depth 1 - blue
      { bg: '#fecaca', fg: '#3a0d0d' }, // depth 2 - light red
      { bg: '#fde047', fg: '#1f1500' }, // depth 3 - yellow
    ];
    const root = jm.get_root();
    if (!root) return;
    const queue = [{ node: root, depth: 0 }];
    while (queue.length) {
      const { node, depth } = queue.shift();
      const color = palette[depth % palette.length];
      try { jm.set_node_color(node.id, color.bg, color.fg); } catch(_){}
      const children = node.children || [];
      for (let i = 0; i < children.length; i++) {
        queue.push({ node: children[i], depth: depth + 1 });
      }
    }
  }

  // If opener posted data before we loaded
  window.addEventListener('message', (ev) => {
    if (ev?.data && ev.data.type === 'mindmap-data') {
      init(ev.data.payload);
    }
  });

  // If the window was opened with a hash payload (fallback)
  try {
    const hash = location.hash.slice(1);
    if (hash) {
      const data = JSON.parse(decodeURIComponent(hash));
      init(data);
    }
  } catch(_){}
})();

