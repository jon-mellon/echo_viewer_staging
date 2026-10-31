"use strict";

import { computeDagRender } from "./dag_render_compute.mjs?v=2990673de4e547bb";

self.addEventListener("message", (event) => {
  const { requestId, input } = event.data;
  const timings = {};
  const { layout, routes } = computeDagRender(input, (phase, duration) => { timings[phase] = duration; });
  self.postMessage({
    requestId,
    timings,
    layout: {
      ...layout,
      positions: [...layout.positions],
      boxes: [...layout.boxes],
    },
    routes,
  });
});
