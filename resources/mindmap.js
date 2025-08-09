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
        line_color: '#555',
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
      // Inject custom node renderer to add 3-dot menu
      options.view.custom_node_render = function(jmObj, el, nodeData){
        try {
          // let jsMind render default first
        } catch(_){ }
        // Add action anchor container
        try {
          el.style.position = 'relative';
          const dot = document.createElement('button');
          dot.className = 'jm-kebab';
          dot.type = 'button';
          dot.textContent = '⋮';
          dot.style.position = 'absolute';
          dot.style.left = '-18px';
          dot.style.top = '8px';
          dot.style.width = '16px';
          dot.style.height = '20px';
          dot.style.lineHeight = '16px';
          dot.style.border = '0';
          dot.style.background = 'transparent';
          dot.style.color = '#aab0b6';
          dot.style.cursor = 'pointer';
          dot.style.padding = '0';
          dot.style.userSelect = 'none';
          dot.addEventListener('mouseenter', ()=>{ dot.style.color = '#d2d7dc'; });
          dot.addEventListener('mouseleave', ()=>{ dot.style.color = '#aab0b6'; });

          // Popup menu
          const menu = document.createElement('div');
          menu.className = 'jm-menu';
          menu.style.position = 'absolute';
          menu.style.left = '-6px';
          menu.style.top = '28px';
          menu.style.minWidth = '160px';
          menu.style.background = '#121518';
          menu.style.border = '1px solid #2a3136';
          menu.style.borderRadius = '10px';
          menu.style.boxShadow = '0 10px 30px rgba(0,0,0,.5)';
          menu.style.padding = '6px';
          menu.style.display = 'none';
          menu.style.zIndex = '20';

          function addBtn(label, handler){
            const b = document.createElement('button');
            b.type = 'button';
            b.textContent = label;
            b.style.width = '100%';
            b.style.textAlign = 'left';
            b.style.border = '1px solid #2b3238';
            b.style.background = '#171b1f';
            b.style.color = '#e6e8ea';
            b.style.borderRadius = '8px';
            b.style.padding = '8px 10px';
            b.style.margin = '4px 0';
            b.style.cursor = 'pointer';
            b.style.font = '600 12px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif';
            b.addEventListener('mouseover', ()=>{ b.style.background = '#1e2428'; });
            b.addEventListener('mouseout', ()=>{ b.style.background = '#171b1f'; });
            b.addEventListener('click', (ev)=>{ ev.stopPropagation(); ev.preventDefault(); handler(); hide(); });
            menu.appendChild(b);
            return b;
          }

          function show(){ menu.style.display = 'block'; document.addEventListener('click', onDoc, true); }
          function hide(){ menu.style.display = 'none'; document.removeEventListener('click', onDoc, true); }
          function onDoc(e){ if (!menu.contains(e.target) && e.target !== dot) hide(); }

          // Button actions
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
          el.appendChild(dot);
          el.appendChild(menu);
        } catch(_){ }
        return true; // mark as handled
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

