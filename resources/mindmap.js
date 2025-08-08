(function(){
  // Listen for data from parent
  function init(mind) {
    const options = {
      container: 'jsmind_container',
      editable: false,
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
    const JM = window.jsMind || jsMind;
    const jm = new JM(options);
    jm.show(mind);

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

