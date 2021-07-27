import { subcomponentAndOverlayElementIdsState } from '../subcomponentSelectMode/subcomponentAndOverlayElementIdsState';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../../consts/subcomponentOverlayClasses.enum';

export default class RemoveSubcomponentOverlay {

  private static getActiveSubcomponentOverlayElement(activeSubcomponentName: string): HTMLElement {
    const subcomponentOverlayElementId = subcomponentAndOverlayElementIdsState.getOverlayIdViaSubcomponentName(activeSubcomponentName);
    return document.getElementById(subcomponentOverlayElementId);
  }

  public static display(activeSubcomponentName: string): void {
    const subcomponentOverlayElement = RemoveSubcomponentOverlay.getActiveSubcomponentOverlayElement(activeSubcomponentName);
    subcomponentOverlayElement.classList.add(SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_REMOVE);
    subcomponentOverlayElement.style.display = 'block';
  }

  public static hide(activeSubcomponentName: string): void {
    const subcomponentOverlayElement = RemoveSubcomponentOverlay.getActiveSubcomponentOverlayElement(activeSubcomponentName);
    subcomponentOverlayElement.classList.remove(SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_REMOVE);
    setTimeout(() => { subcomponentOverlayElement.style.display = 'none' });
  }
}
