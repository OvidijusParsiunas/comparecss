import { OptionalSubcomponent, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_PREVIEW_CLASSES } from '../../../../../../consts/subcomponentPreviewClasses';
import { subcomponentTypeToPreviewId } from '../componentOptions/subcomponentTypeToPreviewId';
import { SUB_COMPONENTS } from '../../../../../../consts/subcomponentModes.enum';

export default class SubcomponentSelectModeService {

  private static getActiveSubcomponentPreviewElement(subcomponentsActiveMode: SUB_COMPONENTS): HTMLElement {
    const subcomponentPreviewElementId = subcomponentTypeToPreviewId[subcomponentsActiveMode];
    return document.getElementById(subcomponentPreviewElementId);
  }

  private static displaySubcomponentPreviewBySelectModeStatus(isSelectModeActive: boolean, subcomponentsActiveMode: SUB_COMPONENTS, previewClassToBeAdded: SUBCOMPONENT_PREVIEW_CLASSES): void {
    const subcomponentPreviewElement = this.getActiveSubcomponentPreviewElement(subcomponentsActiveMode);
    if (isSelectModeActive) {
      subcomponentPreviewElement.classList.remove(SUBCOMPONENT_PREVIEW_CLASSES.SELECT_MODE_HIDDEN);
    }
    subcomponentPreviewElement.classList.add(SUBCOMPONENT_PREVIEW_CLASSES.DEFAULT, previewClassToBeAdded);
    subcomponentPreviewElement.style.display = 'block';
  }

  public static hideSubcomponentPreviewBySelectModeStatus(isSelectModeActive: boolean, subcomponentsActiveMode: SUB_COMPONENTS, previewClassToBeRemoved: SUBCOMPONENT_PREVIEW_CLASSES): void {
    const subcomponentPreviewElement = this.getActiveSubcomponentPreviewElement(subcomponentsActiveMode);
    if (isSelectModeActive) {
      subcomponentPreviewElement.classList.remove(SUBCOMPONENT_PREVIEW_CLASSES.DEFAULT, previewClassToBeRemoved);
      subcomponentPreviewElement.classList.add(SUBCOMPONENT_PREVIEW_CLASSES.SELECT_MODE_HIDDEN);
    } else {
      subcomponentPreviewElement.classList.remove(previewClassToBeRemoved);
      subcomponentPreviewElement.style.display = 'none';
    }
  }

  public static displaySubcomponentPreview(component: WorkshopComponent, isSelectModeActive: boolean): void {
    const { optionalSubcomponent } = component.subcomponents[component.subcomponentsActiveMode];
    if (!optionalSubcomponent.currentlyDisplaying) {
      optionalSubcomponent.displayPreviewOnly = true;
      setTimeout(() => {
        this.displaySubcomponentPreviewBySelectModeStatus(isSelectModeActive, component.subcomponentsActiveMode, SUBCOMPONENT_PREVIEW_CLASSES.SUBCOMPONENT_TOGGLE_ADD);
      });
    } else {
      this.displaySubcomponentPreviewBySelectModeStatus(isSelectModeActive, component.subcomponentsActiveMode, SUBCOMPONENT_PREVIEW_CLASSES.SUBCOMPONENT_TOGGLE_REMOVE);
    }
  }

  public static hideSubcomponentPreview(component: WorkshopComponent, isSelectModeActive: boolean): void {
    const { optionalSubcomponent } = component.subcomponents[component.subcomponentsActiveMode];
    optionalSubcomponent.displayPreviewOnly = false;
    this.hideSubcomponentPreviewBySelectModeStatus(isSelectModeActive, component.subcomponentsActiveMode,
      optionalSubcomponent.currentlyDisplaying ? SUBCOMPONENT_PREVIEW_CLASSES.SUBCOMPONENT_TOGGLE_REMOVE : SUBCOMPONENT_PREVIEW_CLASSES.SUBCOMPONENT_TOGGLE_ADD);
  }

  public static changeSubcomponentPreviewClass(optionalSubcomponent: OptionalSubcomponent, subcomponentsActiveMode: SUB_COMPONENTS, displayPreviewOnlyState: boolean,
      classToBeReplaced: SUBCOMPONENT_PREVIEW_CLASSES, newClass: SUBCOMPONENT_PREVIEW_CLASSES): void {
    optionalSubcomponent.displayPreviewOnly = displayPreviewOnlyState;
    const subcomponentPreviewElement = this.getActiveSubcomponentPreviewElement(subcomponentsActiveMode);
    subcomponentPreviewElement.classList.replace(classToBeReplaced, newClass);
    setTimeout(() => { subcomponentPreviewElement.style.display = 'block'; });
  }
}
