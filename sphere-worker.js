"use strict";

importScripts("sphere-engine.js");

self.addEventListener("message", (event) => {
  const { jobId, input } = event.data || {};
  try {
    const calculation = self.WWRSphereEngine.calculate(input);
    self.postMessage({ jobId, calculation });
  } catch (error) {
    self.postMessage({ jobId, error: error?.message || String(error) });
  }
});
