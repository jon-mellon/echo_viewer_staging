"use strict";

import { computeDagRender } from "./dag_render_compute.mjs?v=0f5b38f29a1a33a7";

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
