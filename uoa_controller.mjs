import { projectForUoa, uoaCounts, uoaMatches } from "./dag_uoa.mjs?v=e0be7beaa1a32f1e";
import * as workflow from "./dag_workflow.mjs?v=e0be7beaa1a32f1e";
import { createUoaPresenter } from "./uoa_presenter.mjs?v=e0be7beaa1a32f1e";

export function createUoaController({ state, elements, visibleVariables, groupById, clusterRep, truncate, renderAll }) {
  const matches = (variableUoa, selected) => uoaMatches(variableUoa, selected);
  const getAllParts = () => uoaCounts(visibleVariables());

  function supportedByAnchors(uoa) {
    if (state.interfaceMode !== "dag2") return true;
    return [state.project?.iv_group_id, state.project?.dv_group_id].every(groupId => {
      const group = groupById(groupId);
      return group?.variable_ids?.some(variableId => matches(state.variableById.get(variableId)?.uoa, uoa));
    });
  }

  function select(uoa) {
    if (!supportedByAnchors(uoa)) return;
    Object.assign(state, workflow.transition(state, {
      type: "uoa", uoa, nextPhase: state.interfaceMode === "dag2" ? "build" : undefined,
    }));
    renderAll();
  }

  function removeSeed(side, variableId) {
    state.seeds[side].delete(variableId);
    renderAll();
  }

  const presenter = createUoaPresenter({ state, elements, visibleVariables, matches, getAllParts,
    supportedByAnchors, truncate, onSelect: select, onRemoveSeed: removeSeed });

  const projectView = () => projectForUoa(
    state.project, state.variableById, state.selectedUoa, state.uoaFilterEnabled,
  );

  return { matches, getAllParts, supportedByAnchors, renderStep: presenter.renderStep, select,
    renderFilterBar: presenter.renderFilterBar, renderSeeds: presenter.renderSeeds, projectView };
}
