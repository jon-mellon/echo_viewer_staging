import { createToolbarPresenter } from "./toolbar_presenter.mjs?v=6893083a1d3d49bf";

export function createToolbarController({ state, elements, dagGroups, groupById, visibleVariables,
  uoaMatches, clusterRep, rejectedVariableIdSet }) {
  const presenter = createToolbarPresenter({ state, elements, groupById, visibleVariables,
    uoaMatches, clusterRep, rejectedVariableIdSet });

  function render(options) {
    const visibleGroupIds = new Set(dagGroups().map(group => group.group_id));
    const anchorsReady = visibleGroupIds.has(state.project?.iv_group_id)
      && visibleGroupIds.has(state.project?.dv_group_id);
    presenter.render(anchorsReady, options);
  }

  return { render, assignmentCoverage: presenter.assignmentCoverage,
    renderAssignmentCoverage: presenter.renderAssignmentCoverage };
}
