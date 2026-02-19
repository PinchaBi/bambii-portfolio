// Shared mutable state so FallingItem / ItemContent / ModelContent
// can coordinate hover behaviour during a 3D-model drag.

export const modelDragState = {
  active: false,
  pendingLeave: null as (() => void) | null,
};
