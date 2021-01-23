import { WorkshopEventCallbackReturn } from '../../../../../../interfaces/workshopEventCallbackReturn';
import { SUBCOMPONENT_PREVIEW_CLASSES } from '../../../../../../consts/subcomponentPreviewClasses';
import { subcomponentTypeToPreviewId } from '../componentOptions/subcomponentTypeToPreviewId';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopEventCallback } from '../../../../../../interfaces/workshopEventCallback';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SUB_COMPONENTS } from '../../../../../../consts/subcomponentModes.enum';

export default class SubcomponentSelectMode {
  
  private static getKeyByValue(object: unknown, value: unknown): string {
    return Object.keys(object).find(key => object[key] === value);
  }
  
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

  private static end(component: WorkshopComponent): WorkshopEventCallbackReturn {
    const previewElement = event.target as HTMLElement;
    if (previewElement.classList.contains(SUBCOMPONENT_PREVIEW_CLASSES.DEFAULT)) {
      this.removeSubcomponentPreviewProprerties(previewElement);
      component.subcomponentsActiveMode = this.getKeyByValue(subcomponentTypeToPreviewId, previewElement.id) as SUB_COMPONENTS;
      const subcomponentPreviewElements = document.getElementsByClassName(SUBCOMPONENT_PREVIEW_CLASSES.SUBCOMPONENT_SELECT_MODE_IN_PROGRESS_HIDDEN);
      [...subcomponentPreviewElements].forEach((element: HTMLElement) => {
        this.removeSubcomponentPreviewProprerties(element);
      });
    }
    return { shouldRepeat: false };
  }

  public static initiate(component: WorkshopComponent): WorkshopEventCallback {
    const subcomponentPreviewElements = document.getElementsByClassName(SUBCOMPONENT_PREVIEW_CLASSES.DEFAULT);
    [...subcomponentPreviewElements].forEach((element: HTMLElement) => {
      this.prepareSubcomponentPreviewProperties(element);
    });
    const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_DOWN, DOM_EVENT_TRIGGER_KEYS.ESCAPE])
    const workshopEventCallback: WorkshopEventCallback = { keyTriggers, func: this.end.bind(this, component)};
    return workshopEventCallback;
  }
}
