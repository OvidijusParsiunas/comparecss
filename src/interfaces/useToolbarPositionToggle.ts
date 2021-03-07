import { ComponentOptions } from 'vue';

export interface UseToolbarPositionToggle {
  toolbarPositionToggleMouseEnter: (event: MouseEvent) => void;
  toolbarPositionToggleMouseLeave: (event: MouseEvent) => void;
  toolbarPositionToggleMouseClick: (optionsComponent: ComponentOptions) => void;
}
