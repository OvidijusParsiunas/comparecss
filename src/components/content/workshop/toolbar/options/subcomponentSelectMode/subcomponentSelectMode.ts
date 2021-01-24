import { WorkshopEventCallbackReturn } from '../../../../../../interfaces/workshopEventCallbackReturn';
import { SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER } from '../../../../../../consts/elementClassMarkers';
import { SUBCOMPONENT_PREVIEW_CLASSES } from '../../../../../../consts/subcomponentPreviewClasses';
import { subcomponentTypeToPreviewId } from '../componentOptions/subcomponentTypeToPreviewId';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopEventCallback } from '../../../../../../interfaces/workshopEventCallback';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SUB_COMPONENTS } from '../../../../../../consts/subcomponentModes.enum';
import JsUtils from '../../../../../../services/jsUtils/jsUtils';
import { subcomponentSelectModeState } from './state';

export default class SubcomponentSelectMode {
  
  private static activeButtonColor = '#3de342';
  private static defaultButtonColor = '';
  // blue - #00a1ff'

  private static mouseOverSubcomponentPreviewElementHandler(): void {
    const hoveredElement = event.target as HTMLElement;
    hoveredElement.classList.remove(SUBCOMPONENT_PREVIEW_CLASSES.SUBCOMPONENT_SELECT_MODE_IN_PROGRESS_HIDDEN);
    hoveredElement.classList.add(SUBCOMPONENT_PREVIEW_CLASSES.DEFAULT);
  }
  
  private static mouseLeaveSubcomponentPreviewElementHandler(): void {
    const blurredElement = event.target as HTMLElement;
    blurredElement.classList.remove(SUBCOMPONENT_PREVIEW_CLASSES.DEFAULT);
    blurredElement.classList.add(SUBCOMPONENT_PREVIEW_CLASSES.SUBCOMPONENT_SELECT_MODE_IN_PROGRESS_HIDDEN);
  }

  private static removeSubcomponentPreviewProprerties(previewElement: HTMLElement): void {
    previewElement.classList.remove(SUBCOMPONENT_PREVIEW_CLASSES.SUBCOMPONENT_SELECT_MODE_IN_PROGRESS_HIDDEN);
    previewElement.classList.add(SUBCOMPONENT_PREVIEW_CLASSES.DEFAULT);
    previewElement.style.display = 'none';
    previewElement.removeEventListener('mouseover', this.mouseOverSubcomponentPreviewElementHandler);
    previewElement.removeEventListener('mouseleave', this.mouseLeaveSubcomponentPreviewElementHandler);
  }

  private static prepareSubcomponentPreviewProperties(previewElement: HTMLElement): void {
    previewElement.classList.remove(SUBCOMPONENT_PREVIEW_CLASSES.DEFAULT);
    previewElement.classList.add(SUBCOMPONENT_PREVIEW_CLASSES.SUBCOMPONENT_SELECT_MODE_IN_PROGRESS_HIDDEN);
    previewElement.style.display = 'block';
    previewElement.addEventListener('mouseover', this.mouseOverSubcomponentPreviewElementHandler);
    previewElement.addEventListener('mouseleave', this.mouseLeaveSubcomponentPreviewElementHandler);
  }

  private static end(buttonElement: HTMLElement, component: WorkshopComponent, newSubcomponentsModeClickedFunc: (param1: SUB_COMPONENTS) => void): WorkshopEventCallbackReturn {
    const clickedElement = event.target as HTMLElement;
    if (clickedElement.classList.contains(SUBCOMPONENT_PREVIEW_CLASSES.DEFAULT)) {
      this.removeSubcomponentPreviewProprerties(clickedElement);
      component.subcomponentsActiveMode = JsUtils.getKeyByValue(subcomponentTypeToPreviewId, clickedElement.id) as SUB_COMPONENTS;
      newSubcomponentsModeClickedFunc(component.subcomponentsActiveMode);
    }
    const subcomponentPreviewElements = document.getElementsByClassName(SUBCOMPONENT_PREVIEW_CLASSES.SUBCOMPONENT_SELECT_MODE_IN_PROGRESS_HIDDEN);
    [...subcomponentPreviewElements].forEach((element: HTMLElement) => {
      this.removeSubcomponentPreviewProprerties(element);
    });
    buttonElement.style.color = this.defaultButtonColor;
    if (!clickedElement.classList.contains(SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER)) subcomponentSelectModeState.setIsSubcomponentSelectModeActiveState(false);
    return { shouldRepeat: false };
  }

  public static initiate(buttonElement: HTMLElement, component: WorkshopComponent, newSubcomponentsModeClickedFunc: (param1: SUB_COMPONENTS) => void): WorkshopEventCallback {
    const subcomponentPreviewElements = document.getElementsByClassName(SUBCOMPONENT_PREVIEW_CLASSES.DEFAULT);
    [...subcomponentPreviewElements].forEach((element: HTMLElement) => {
      this.prepareSubcomponentPreviewProperties(element);
    });
    buttonElement.style.color = this.activeButtonColor;
    const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_DOWN, DOM_EVENT_TRIGGER_KEYS.ESCAPE])
    const workshopEventCallback: WorkshopEventCallback = { keyTriggers, func: this.end.bind(this, buttonElement, component, newSubcomponentsModeClickedFunc)};
    return workshopEventCallback;
  }
}
