(function () {
  function applyDarkMode() {
    // Background
    document.querySelectorAll(".page").forEach(page => {
      page.style.background = "#000";
    });

    // Text layer
    document.querySelectorAll(".textLayer span").forEach(span => {
      span.style.color = "#fff";
      span.style.background = "transparent";
    });

    // Canvas fallback (invert only if needed)
    document.querySelectorAll("canvas").forEach(canvas => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.globalCompositeOperation = "difference";
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";
    });
  }

  if (window.PDFViewerApplication) {
    applyDarkMode();
  } else {
    const observer = new MutationObserver(() => {
      if (window.PDFViewerApplication) {
        applyDarkMode();
        observer.disconnect();
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }
})();
