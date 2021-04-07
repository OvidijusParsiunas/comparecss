import { subcomponentAndOverlayElementIdsState } from '../subcomponentSelectMode/subcomponentAndOverlayElementIdsState';
import { OptionalSubcomponent, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../../consts/subcomponentOverlayClasses.enum';
import { SUB_COMPONENTS } from '../../../../../../consts/subcomponentModes.enum';

export default class SubcomponentSelectModeService {

  private static getActiveSubcomponentOverlayElement(activeSubcomponentMode: string): HTMLElement {
    const subcomponentOverlayElementId = subcomponentAndOverlayElementIdsState.getOverlayIdViaSubcomponentType(activeSubcomponentMode);
    return document.getElementById(subcomponentOverlayElementId);
  }

  private static displaySubcomponentOverlayBySelectModeStatus(activeSubcomponentMode: string, overlayClassToBeAdded: SUBCOMPONENT_OVERLAY_CLASSES): void {
    const subcomponentOverlayElementId = SubcomponentSelectModeService.getActiveSubcomponentOverlayElement(activeSubcomponentMode);
    subcomponentOverlayElementId.classList.add(overlayClassToBeAdded);
    subcomponentOverlayElementId.style.display = 'block';
  }

  public static hideSubcomponentOverlayBySelectModeStatus(activeSubcomponentMode: string, overlayClassToBeRemoved: SUBCOMPONENT_OVERLAY_CLASSES): void {
    const subcomponentOverlayElement = SubcomponentSelectModeService.getActiveSubcomponentOverlayElement(activeSubcomponentMode);
    subcomponentOverlayElement.classList.remove(overlayClassToBeRemoved);
    subcomponentOverlayElement.style.display = 'none';
  }

  public static displaySubcomponentOverlay(component: WorkshopComponent): void {
    const { optionalSubcomponent } = component.subcomponents[component.activeSubcomponentMode];
    if (!optionalSubcomponent.currentlyDisplaying) {
      optionalSubcomponent.displayOverlayOnly = true;
      setTimeout(() => {
        SubcomponentSelectModeService.displaySubcomponentOverlayBySelectModeStatus(component.activeSubcomponentMode, SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_ADD);
      });
    } else {
      SubcomponentSelectModeService.displaySubcomponentOverlayBySelectModeStatus(component.activeSubcomponentMode, SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_REMOVE);
    }
  }

  public static hideSubcomponentOverlay(component: WorkshopComponent): void {
    const { optionalSubcomponent } = component.subcomponents[component.activeSubcomponentMode];
    optionalSubcomponent.displayOverlayOnly = false;
    SubcomponentSelectModeService.hideSubcomponentOverlayBySelectModeStatus(component.activeSubcomponentMode,
      optionalSubcomponent.currentlyDisplaying ? SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_REMOVE : SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_ADD);
  }

  public static changeSubcomponentOverlayClass(optionalSubcomponent: OptionalSubcomponent, activeSubcomponentMode: SUB_COMPONENTS, displayOverlayOnlyState: boolean,
      classToBeReplaced: SUBCOMPONENT_OVERLAY_CLASSES, newClass: SUBCOMPONENT_OVERLAY_CLASSES): void {
    optionalSubcomponent.displayOverlayOnly = displayOverlayOnlyState;
    const subcomponentOverlayElement = SubcomponentSelectModeService.getActiveSubcomponentOverlayElement(activeSubcomponentMode);
    subcomponentOverlayElement.classList.replace(classToBeReplaced, newClass);
    setTimeout(() => { subcomponentOverlayElement.style.display = 'block'; });
  }
}
