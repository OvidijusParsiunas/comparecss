import { subcomponentAndOverlayElementIdsState } from '../subcomponentSelectMode/subcomponentAndOverlayElementIdsState';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../../consts/subcomponentOverlayClasses.enum';
import { SubcomponentDisplayStatus, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

export default class SubcomponentSelectModeService {

  private static getActiveSubcomponentOverlayElement(activeSubcomponentName: string): HTMLElement {
    const subcomponentOverlayElementId = subcomponentAndOverlayElementIdsState.getOverlayIdViaSubcomponentType(activeSubcomponentName);
    return document.getElementById(subcomponentOverlayElementId);
  }

  private static displaySubcomponentOverlayBySelectModeStatus(activeSubcomponentName: string, overlayClassToBeAdded: SUBCOMPONENT_OVERLAY_CLASSES): void {
    const subcomponentOverlayElement = SubcomponentSelectModeService.getActiveSubcomponentOverlayElement(activeSubcomponentName);
    subcomponentOverlayElement.classList.add(overlayClassToBeAdded);
    subcomponentOverlayElement.style.display = 'block';
  }

  public static hideSubcomponentOverlayBySelectModeStatus(activeSubcomponentName: string, overlayClassToBeRemoved: SUBCOMPONENT_OVERLAY_CLASSES): void {
    const subcomponentOverlayElement = SubcomponentSelectModeService.getActiveSubcomponentOverlayElement(activeSubcomponentName);
    subcomponentOverlayElement.classList.remove(overlayClassToBeRemoved);
    subcomponentOverlayElement.style.display = 'none';
  }

  public static displaySubcomponentOverlay(component: WorkshopComponent): void {
    const { subcomponentDisplayStatus } = component.subcomponents[component.activeSubcomponentName];
    if (!subcomponentDisplayStatus.isDisplayed) {
      subcomponentDisplayStatus.displayOverlayOnly = true;
      setTimeout(() => {
        SubcomponentSelectModeService.displaySubcomponentOverlayBySelectModeStatus(component.activeSubcomponentName, SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_ADD);
      });
    } else {
      SubcomponentSelectModeService.displaySubcomponentOverlayBySelectModeStatus(component.activeSubcomponentName, SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_REMOVE);
    }
  }

  public static hideSubcomponentOverlay(component: WorkshopComponent): void {
    const { subcomponentDisplayStatus } = component.subcomponents[component.activeSubcomponentName];
    subcomponentDisplayStatus.displayOverlayOnly = false;
    SubcomponentSelectModeService.hideSubcomponentOverlayBySelectModeStatus(component.activeSubcomponentName,
      subcomponentDisplayStatus.isDisplayed ? SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_REMOVE : SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_ADD);
  }

  public static changeSubcomponentOverlayClass(subcomponentDisplayStatus: SubcomponentDisplayStatus, activeSubcomponentName: string, displayOverlayOnlyState: boolean,
      classToBeReplaced: SUBCOMPONENT_OVERLAY_CLASSES, newClass: SUBCOMPONENT_OVERLAY_CLASSES): void {
    subcomponentDisplayStatus.displayOverlayOnly = displayOverlayOnlyState;
    const subcomponentOverlayElement = SubcomponentSelectModeService.getActiveSubcomponentOverlayElement(activeSubcomponentName);
    subcomponentOverlayElement.classList.replace(classToBeReplaced, newClass);
    setTimeout(() => { subcomponentOverlayElement.style.display = 'block'; });
  }
}
