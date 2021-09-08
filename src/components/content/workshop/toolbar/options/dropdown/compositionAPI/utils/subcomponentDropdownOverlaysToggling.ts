import { subcomponentAndOverlayElementIdsState } from '../../../subcomponentSelectMode/subcomponentAndOverlayElementIdsState';
import { SUBCOMPONENT_OVERLAY_BACKGROUND_COLOR } from '../../../../../../../../consts/subcomponentOverlayBackgroundColor';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../../../../consts/subcomponentOverlayClasses.enum';
import { subcomponentSelectModeState } from '../../../subcomponentSelectMode/subcomponentSelectModeState';

type DisplayValues = 'block'|'none';

export class SubcomponentDropdownOverlaysToggling {

  private static toggleSubcomponentOverlayContainerDisplay(subcomponentOverlayElement: HTMLElement, displayValue: DisplayValues): void {
    if (!subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState() || displayValue === 'block') {
      subcomponentOverlayElement.style.backgroundColor = SUBCOMPONENT_OVERLAY_BACKGROUND_COLOR;
      subcomponentOverlayElement.style.display = displayValue;
    } else {
      subcomponentOverlayElement.style.backgroundColor = '';
    }
  }

  private static toggleSubcomponentOverlay(subcomponentOverlayElementId: string, displayValue: DisplayValues): void {
    const subcomponentOverlayElement = document.getElementById(subcomponentOverlayElementId);
    if (subcomponentOverlayElement.classList.contains(SUBCOMPONENT_OVERLAY_CLASSES.SUB_CONTAINER)) {
      SubcomponentDropdownOverlaysToggling.toggleSubcomponentOverlayContainerDisplay(subcomponentOverlayElement, displayValue);
    } else {
      subcomponentOverlayElement.style.display = displayValue;
    }
  }

  // these are padding component's children subcomponent overlays
  private static togglePaddingComponentSubcomponentOverlays(paddingComponentOverlayIds: string[], displayValue: DisplayValues): void {
    paddingComponentOverlayIds.forEach((paddingOverlayId) => {
      SubcomponentDropdownOverlaysToggling.toggleSubcomponentOverlay(paddingOverlayId, displayValue);
    });
  }

  public static toggle(subcomponentName: string, displayValue: DisplayValues): void {
    const paddingComponentOverlayIds = subcomponentAndOverlayElementIdsState.getPaddingComponentOverlayIdsViaSubcomponentName(subcomponentName);
    if (paddingComponentOverlayIds) {
      SubcomponentDropdownOverlaysToggling.togglePaddingComponentSubcomponentOverlays(paddingComponentOverlayIds, displayValue)
    } else {
      const subcomponentOverlayElementId = subcomponentAndOverlayElementIdsState.getOverlayIdViaSubcomponentName(subcomponentName);
      SubcomponentDropdownOverlaysToggling.toggleSubcomponentOverlay(subcomponentOverlayElementId, displayValue);
    }
  }
}
