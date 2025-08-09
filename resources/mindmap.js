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
        hmargin: 160,
        vmargin: 120,
        line_width: 2,
        line_color: '#6a7a85',
        line_style: 'curved',
        draggable: true,
        enable_device_pixel_ratio: true,
        zoom: { min: 0.5, max: 2.1, step: 0.1 },
      },
      layout: { hspace: 80, vspace: 36, pspace: 22, cousin_space: 24 },
      shortcut: { enable: true },
    };
    try {
      const JM = window.jsMind || jsMind;
      // Custom line renderer: smooth curves with arrowheads for clarity
      options.view.custom_line_render = function(payload){
        try {
          const { ctx, start_point: s, end_point: e } = payload;
          const color = options.view.line_color || '#6a7a85';
          ctx.save();
          ctx.strokeStyle = color;
          ctx.fillStyle = color;
          ctx.lineWidth = options.view.line_width || 2;
          // Bezier control points for a pleasant curve
          const dx = e.x - s.x;
          const cp1x = s.x + dx * 0.3;
          const cp1y = s.y;
          const cp2x = s.x + dx * 0.7;
          const cp2y = e.y;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, e.x, e.y);
          ctx.stroke();
          // Arrowhead at end
          const angle = Math.atan2(e.y - s.y, e.x - s.x);
          const len = 10; const spread = Math.PI / 8;
          ctx.beginPath();
          ctx.moveTo(e.x, e.y);
          ctx.lineTo(e.x - len * Math.cos(angle - spread), e.y - len * Math.sin(angle - spread));
          ctx.lineTo(e.x - len * Math.cos(angle + spread), e.y - len * Math.sin(angle + spread));
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        } catch(_) {}
      };

      // Inject 3-dot kebab menu into each node without disrupting layout
      options.view.custom_node_render = function(jmObj, el, nodeData){
        try {
          // Render topic content (mirror default behavior)
          if (jmObj?.options?.support_html) {
            el.innerHTML = nodeData.topic || '';
          } else {
            el.textContent = nodeData.topic || '';
          }

          // Avoid duplicate elements on re-render
          if (!el.querySelector('.jm-kebab')) {
            el.style.position = 'relative';

            // Reserve small space on the left so the dots don't cover text
            try {
              const cs = getComputedStyle(el);
              const pl = parseInt(cs.paddingLeft || '0', 10) || 0;
              if (pl < 26) el.style.paddingLeft = (pl + 20) + 'px';
            } catch(_){}

            const dot = document.createElement('button');
            dot.className = 'jm-kebab';
            dot.type = 'button';
            dot.textContent = '⋮';
            Object.assign(dot.style, {
              position: 'absolute', left: '6px', top: '6px', width: '18px', height: '18px',
              lineHeight: '16px', border: '0', background: 'transparent', color: '#aab0b6',
              cursor: 'pointer', padding: '0', userSelect: 'none', fontWeight: '700', zIndex: '21'
            });

            const menu = document.createElement('div');
            menu.className = 'jm-menu';
            Object.assign(menu.style, {
              position: 'absolute', left: '-2px', top: '28px', minWidth: '180px',
              background: '#121518', border: '1px solid #2a3136', borderRadius: '10px',
              boxShadow: '0 10px 30px rgba(0,0,0,.5)', padding: '6px', display: 'none', zIndex: '22'
            });

            function addBtn(label, onClick){
              const b = document.createElement('button');
              b.type = 'button';
              b.textContent = label;
              Object.assign(b.style, {
                width: '100%', textAlign: 'left', border: '1px solid #2b3238',
                background: '#171b1f', color: '#e6e8ea', borderRadius: '8px',
                padding: '9px 10px', margin: '4px 0', cursor: 'pointer',
                font: '600 12px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif'
              });
              b.addEventListener('mouseover', ()=>{ b.style.background = '#1e2428'; });
              b.addEventListener('mouseout', ()=>{ b.style.background = '#171b1f'; });
              b.addEventListener('click', (ev)=>{ ev.stopPropagation(); ev.preventDefault(); onClick(); hide(); });
              menu.appendChild(b);
              return b;
            }

            function show(){ menu.style.display = 'block'; document.addEventListener('click', onDoc, true); }
            function hide(){ menu.style.display = 'none'; document.removeEventListener('click', onDoc, true); }
            function onDoc(e){ if (!menu.contains(e.target) && e.target !== dot) hide(); }

            const nodeId = nodeData.id;
            addBtn('Edit Node', ()=>{
              try { jmObj.enable_edit && jmObj.enable_edit(); } catch(_){ }
              jmObj.select_node(nodeId);
              try { jmObj.begin_edit(nodeId); } catch(_){ }
            });
            addBtn('Add Child Node', ()=>{
              const id = 'extra-' + Date.now();
              try { jmObj.enable_edit && jmObj.enable_edit(); } catch(_){ }
              const parent = jmObj.get_node(nodeId);
              jmObj.add_node(parent, id, 'New node');
              jmObj.select_node(id);
            });
            addBtn('Delete Node', ()=>{
              const node = jmObj.get_node(nodeId);
              if (node && !node.isroot) {
                try { jmObj.enable_edit && jmObj.enable_edit(); } catch(_){ }
                jmObj.select_node(nodeId);
                jmObj.remove_node(node);
              }
            });

            dot.addEventListener('click', (ev)=>{ ev.stopPropagation(); ev.preventDefault(); menu.style.display === 'none' ? show() : hide(); });
            dot.addEventListener('mouseenter', ()=>{ dot.style.color = '#d2d7dc'; });
            dot.addEventListener('mouseleave', ()=>{ dot.style.color = '#aab0b6'; });

            el.appendChild(dot);
            el.appendChild(menu);
          }
        } catch(_){ }
        return true; // handled
      };
      const jm = new JM(options);
      window.__jm = jm;
      jm.show(mind);
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
        if (nodeId && window.opener) {
          window.opener.postMessage({ type: 'mindmap-navigate', messageId: nodeId }, '*');
        }
      });
    } catch(_){}
  }

  function wireToolbar(jm){
    const container = document.getElementById('jsmind_container');
    const btnAdd = document.getElementById('btn-add');
    const btnZoomIn = document.getElementById('btn-zoom-in');
    const btnZoomOut = document.getElementById('btn-zoom-out');
    const btnFs = document.getElementById('btn-fullscreen');
    const btnClose = document.getElementById('btn-close');

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

    // Add node: add as a child of selected or root
    btnAdd?.addEventListener('click', ()=> addNode(jm));
    document.addEventListener('keydown', (e)=>{
      if (e.key === 'a' || e.key === 'A') { e.preventDefault(); addNode(jm); }
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
      } catch(_){ /* noop */ }
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

