import { subcomponentAndOverlayElementIdsState } from '../../../toolbar/options/subcomponentSelectMode/subcomponentAndOverlayElementIdsState';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../../consts/subcomponentOverlayClasses.enum';

// WORK 2 - rename
export default class RemoveSubcomponentOverlay {

  private static getElementOverlays(activeSubcomponentName: string): HTMLElement[] {
    const elementIds = subcomponentAndOverlayElementIdsState.getPaddingComponentOverlayIdsViaSubcomponentName(activeSubcomponentName)
      || [subcomponentAndOverlayElementIdsState.getOverlayIdViaSubcomponentName(activeSubcomponentName)];
    return elementIds.map((elementId) => document.getElementById(elementId));
  }

  public static display(activeSubcomponentName: string): void {
    RemoveSubcomponentOverlay.getElementOverlays(activeSubcomponentName).forEach((element) => {
      element.classList.add(SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_REMOVE);
      element.style.display = 'block';
    });
  }

  public static hide(activeSubcomponentName: string): void {
    RemoveSubcomponentOverlay.getElementOverlays(activeSubcomponentName).forEach((element) => {
      element.classList.remove(SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_REMOVE);
      setTimeout(() => { element.style.display = 'none' });
    });
  }
}
