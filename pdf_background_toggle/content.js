(function () {
  function isPDFJS() {
    return (
      document.contentType === "application/pdf" ||
      window.PDFViewerApplication
    );
  }

  if (!isPDFJS()) return;

  chrome.storage.sync.get({ enabled: true }, ({ enabled }) => {
    if (!enabled) return;

    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("inject.js");
    script.onload = () => script.remove();
    document.documentElement.appendChild(script);
  });
})();
