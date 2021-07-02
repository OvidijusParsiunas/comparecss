import { subcomponentAndOverlayElementIdsState } from '../subcomponentSelectMode/subcomponentAndOverlayElementIdsState';
import { SubcomponentDisplayStatus, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../../consts/subcomponentOverlayClasses.enum';

export default class SubcomponentOverlayToggleUtils {

  private static getActiveSubcomponentOverlayElement(activeSubcomponentName: string): HTMLElement {
    const subcomponentOverlayElementId = subcomponentAndOverlayElementIdsState.getOverlayIdViaSubcomponentName(activeSubcomponentName);
    return document.getElementById(subcomponentOverlayElementId);
  }

  private static displaySubcomponentOverlayBySelectModeStatus(activeSubcomponentName: string, overlayClassToBeAdded: SUBCOMPONENT_OVERLAY_CLASSES): void {
    const subcomponentOverlayElement = SubcomponentOverlayToggleUtils.getActiveSubcomponentOverlayElement(activeSubcomponentName);
    subcomponentOverlayElement.classList.add(overlayClassToBeAdded);
    subcomponentOverlayElement.style.display = 'block';
  }

  public static hideSubcomponentOverlayBySelectModeStatus(activeSubcomponentName: string, overlayClassToBeRemoved: SUBCOMPONENT_OVERLAY_CLASSES): void {
    const subcomponentOverlayElement = SubcomponentOverlayToggleUtils.getActiveSubcomponentOverlayElement(activeSubcomponentName);
    subcomponentOverlayElement.classList.remove(overlayClassToBeRemoved);
    setTimeout(() => { subcomponentOverlayElement.style.display = 'none' });
  }

  public static displaySubcomponentOverlay(component: WorkshopComponent): void {
    const { subcomponentDisplayStatus } = component.subcomponents[component.activeSubcomponentName];
    if (!subcomponentDisplayStatus.isDisplayed) {
      subcomponentDisplayStatus.isDisplayedTemporarily = true;
      setTimeout(() => {
        SubcomponentOverlayToggleUtils.displaySubcomponentOverlayBySelectModeStatus(component.activeSubcomponentName, SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_ADD);
      });
    } else {
      SubcomponentOverlayToggleUtils.displaySubcomponentOverlayBySelectModeStatus(component.activeSubcomponentName, SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_REMOVE);
    }
  }

  public static hideSubcomponentOverlay(component: WorkshopComponent): void {
    const { subcomponentDisplayStatus } = component.subcomponents[component.activeSubcomponentName];
    subcomponentDisplayStatus.isDisplayedTemporarily = false;
    SubcomponentOverlayToggleUtils.hideSubcomponentOverlayBySelectModeStatus(component.activeSubcomponentName,
      subcomponentDisplayStatus.isDisplayed ? SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_REMOVE : SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_ADD);
  }

  public static changeSubcomponentOverlayClass(subcomponentDisplayStatus: SubcomponentDisplayStatus, activeSubcomponentName: string, displayOverlayOnlyState: boolean,
      classToBeReplaced: SUBCOMPONENT_OVERLAY_CLASSES, newClass: SUBCOMPONENT_OVERLAY_CLASSES): void {
    subcomponentDisplayStatus.isDisplayedTemporarily = displayOverlayOnlyState;
    const subcomponentOverlayElement = SubcomponentOverlayToggleUtils.getActiveSubcomponentOverlayElement(activeSubcomponentName);
    // will return null when the import component mode is on and the user clicks the add button
    if (subcomponentOverlayElement) {
      subcomponentOverlayElement.classList.replace(classToBeReplaced, newClass);
      setTimeout(() => { subcomponentOverlayElement.style.display = 'block'; });
    }
  }
}
