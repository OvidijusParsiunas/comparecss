import { CONFIRM_SUBCOMPONENT_TO_IMPORT_MARKER, EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER, OPTION_MENU_BUTTON_MARKER } from '../../../../../../consts/elementClassMarkers';
import { TOOLBAR_FADE_TRANSITION_DURATION_MILLISECONDS } from '../../../componentPreview/utils/expandedModalPreviewMode/consts/sharedConsts';
import { SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ToggleImportSubcomponentModeEvent } from '../../../../../../interfaces/toggleImportSubcomponentModeEvent';
import { WorkshopEventCallbackReturn } from '../../../../../../interfaces/workshopEventCallbackReturn';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopEventCallback } from '../../../../../../interfaces/workshopEventCallback';
import JSONManipulation from './../../../../../../services/workshop/jsonManipulation';
import { ComponentOptions } from 'vue';

export default class ImportSubcomponentToggleUtils {

  private static dereferenceImportedComponentCustomProperties(activeComponent: WorkshopComponent, importedComponentBase: SubcomponentProperties): void {
    const activeComponentSubcomponentNames = importedComponentBase.importedComponent.componentRef.subcomponentNames;
    Object.keys(activeComponentSubcomponentNames).forEach((subcomponentName: string) => {
      const importedSubcomponent = activeComponent.subcomponents[activeComponentSubcomponentNames[subcomponentName]];
      importedSubcomponent.customCss = JSONManipulation.deepCopy(importedSubcomponent.customCss);
      importedSubcomponent.customFeatures = JSONManipulation.deepCopy(importedSubcomponent.customFeatures);
    });
  }

  public static toggleSubcomponentInSync(activeComponent: WorkshopComponent, callback?: () => void): void {
    const activeSubcomponent = activeComponent.subcomponents[activeComponent.activeSubcomponentName];
    const importedComponentBase = activeSubcomponent.baseSubcomponentRef || activeSubcomponent;
    if (importedComponentBase.importedComponent.inSync) {
      ImportSubcomponentToggleUtils.dereferenceImportedComponentCustomProperties(activeComponent, importedComponentBase);
    }
    importedComponentBase.importedComponent.inSync = !importedComponentBase.importedComponent.inSync;
    if (callback) callback();
  }

  private static displayOptionSettings(optionsComponent: ComponentOptions): void {
    const { subcomponents, activeSubcomponentName } = optionsComponent.component;
    if (optionsComponent.activeOption.buttonName && subcomponents[activeSubcomponentName].subcomponentDisplayStatus.isDisplayed) {
      const defaultOption = optionsComponent.getDefaultOption();
      // timeout used for the inSync button animation to work
      setTimeout(() => { optionsComponent.selectOption(defaultOption);})
    }
  }

  private static removeTempCustomProperties(activeComponent: WorkshopComponent): void {
    const activeComponentSubcomponentNamesObj = activeComponent.subcomponents
      [activeComponent.activeSubcomponentName].importedComponent.componentRef.subcomponentNames;
    const activeComponentSubcomponentNamesArr = Object.keys(activeComponentSubcomponentNamesObj);
    for (let i = 0; i < activeComponentSubcomponentNamesArr.length; i += 1) {
      // if already removed through moveTempPropertiesToCustomProperties, do not traverse further
      if (!activeComponent.subcomponents[activeComponentSubcomponentNamesObj[activeComponentSubcomponentNamesArr[i]]].tempCustomProperties) break;
      delete activeComponent.subcomponents[activeComponentSubcomponentNamesObj[activeComponentSubcomponentNamesArr[i]]].tempCustomProperties;
    }
  }

  private static removeTemporaryProperties(optionsComponent: ComponentOptions): void {
    const { subcomponents, activeSubcomponentName } = optionsComponent.component;
    ImportSubcomponentToggleUtils.removeTempCustomProperties(optionsComponent.component);
    delete subcomponents[activeSubcomponentName].importedComponent.lastSelectectedSubcomponentToImport;
  }

  private static toggleOff(optionsComponent: ComponentOptions): WorkshopEventCallbackReturn {
    optionsComponent.isImportSubcomponentModeActive = !optionsComponent.isImportSubcomponentModeActive;
    ImportSubcomponentToggleUtils.displayOptionSettings(optionsComponent);
    if (optionsComponent.hasImportSubcomponentModeClosedExpandedModal) {
      optionsComponent.toggleModalExpandMode();
      optionsComponent.hasImportSubcomponentModeClosedExpandedModal = false;
      setTimeout(() => {
        optionsComponent.$emit('toggle-import-subcomponent-mode', [false] as ToggleImportSubcomponentModeEvent);
      }, TOOLBAR_FADE_TRANSITION_DURATION_MILLISECONDS);
    } else {
      optionsComponent.$emit('toggle-import-subcomponent-mode', [false] as ToggleImportSubcomponentModeEvent);
    }
    ImportSubcomponentToggleUtils.removeTemporaryProperties(optionsComponent);
    return { shouldRepeat: false };
  }

  private static getButtonElement(clickedElement: HTMLElement): HTMLElement {
    if (clickedElement.tagName === 'path') {
      clickedElement = clickedElement.parentElement;
    }
    if (clickedElement.tagName === 'svg') {
      clickedElement = clickedElement.parentElement;
    }
    return clickedElement;
  }

  private static setImportedSubcomponentProperties(optionsComponent: ComponentOptions): void {
    const { subcomponents, activeSubcomponentName } = optionsComponent.component;
    if (subcomponents[activeSubcomponentName].importedComponent.lastSelectectedSubcomponentToImport) {
      subcomponents[activeSubcomponentName].importedComponent.componentRef.componentStatus = subcomponents[activeSubcomponentName]
        .importedComponent.lastSelectectedSubcomponentToImport.componentStatus;
      subcomponents[activeSubcomponentName].importedComponent.inSync = true;
      subcomponents[activeSubcomponentName].subcomponentDisplayStatus.isDisplayed = true;
    }
    ImportSubcomponentToggleUtils.toggleOff(optionsComponent);
  }

  private static moveTempPropertiesToCustomProperties(activeComponentSubcomponents: Subcomponents, activeComponentSubcomponentName: string): void {
    if (activeComponentSubcomponents[activeComponentSubcomponentName].tempCustomProperties) {
      activeComponentSubcomponents[activeComponentSubcomponentName].customCss = activeComponentSubcomponents[activeComponentSubcomponentName].tempCustomProperties.customCss;
      activeComponentSubcomponents[activeComponentSubcomponentName].customFeatures = activeComponentSubcomponents[activeComponentSubcomponentName].tempCustomProperties.customFeatures;
      delete activeComponentSubcomponents[activeComponentSubcomponentName].tempCustomProperties;
    }
  }

  private static resetImportedComponent(activeComponent: WorkshopComponent): void {
    const activeComponentSubcomponentNames = activeComponent.subcomponents
      [activeComponent.activeSubcomponentName].importedComponent.componentRef.subcomponentNames;
    Object.keys(activeComponentSubcomponentNames).forEach((subcomponentName: string) => {
      ImportSubcomponentToggleUtils.moveTempPropertiesToCustomProperties(activeComponent.subcomponents, activeComponentSubcomponentNames[subcomponentName]);
    });
  }

  private static toggleImportSubcomponentModeOff(optionsComponent: ComponentOptions, event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
    if (event instanceof KeyboardEvent) {
      if (event.key === DOM_EVENT_TRIGGER_KEYS.ESCAPE) {
        ImportSubcomponentToggleUtils.resetImportedComponent(optionsComponent.component);
        return ImportSubcomponentToggleUtils.toggleOff(optionsComponent);
      } else if (event.key === DOM_EVENT_TRIGGER_KEYS.ENTER) {
        optionsComponent.temporarilyAllowOptionAnimations(ImportSubcomponentToggleUtils.setImportedSubcomponentProperties.bind(this, optionsComponent), true, true);
        return { shouldRepeat: false };
      }
      return { shouldRepeat: true };
    }
    const buttonElement = ImportSubcomponentToggleUtils.getButtonElement(event.target as HTMLElement);
    if (buttonElement === optionsComponent.$refs.importSubcomponentToggle) {
      ImportSubcomponentToggleUtils.resetImportedComponent(optionsComponent.component);
      ImportSubcomponentToggleUtils.removeTemporaryProperties(optionsComponent);
      return { shouldRepeat: false };
    }
    if (buttonElement.classList.contains(CONFIRM_SUBCOMPONENT_TO_IMPORT_MARKER)) {
      optionsComponent.temporarilyAllowOptionAnimations(ImportSubcomponentToggleUtils.setImportedSubcomponentProperties.bind(this, optionsComponent), true, true);
      return { shouldRepeat: false };
    } 
    if (buttonElement.classList.contains(EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER)) {
      optionsComponent.hasImportSubcomponentModeClosedExpandedModal = false;
      return ImportSubcomponentToggleUtils.toggleOff(optionsComponent);
    } 
    if (buttonElement.classList.contains(OPTION_MENU_BUTTON_MARKER)
      || buttonElement.classList.contains(optionsComponent.SUBCOMPONENTS_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER)
      || buttonElement.classList.contains(optionsComponent.CSS_PSEUDO_CLASSES_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER)) {
        return ImportSubcomponentToggleUtils.toggleOff(optionsComponent);
    }
    return { shouldRepeat: true };
  }

  private static toggleImportSubcomponentModeOn(optionsComponent: ComponentOptions): void {
    const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_UP, DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE])
    const workshopEventCallback: WorkshopEventCallback = { keyTriggers, func: this.toggleImportSubcomponentModeOff.bind(this, optionsComponent) };
    optionsComponent.$emit('toggle-import-subcomponent-mode', [optionsComponent.isImportSubcomponentModeActive, workshopEventCallback] as ToggleImportSubcomponentModeEvent);
  }

  private static toggleDuringExpandedModalMode(optionsComponent: ComponentOptions): boolean {
    if (optionsComponent.isExpandedModalPreviewModeActive) {
      optionsComponent.toggleModalExpandMode();
      optionsComponent.hasImportSubcomponentModeClosedExpandedModal = true;
    } else if (optionsComponent.hasImportSubcomponentModeClosedExpandedModal) {
      setTimeout(() => {
        ImportSubcomponentToggleUtils.toggleImportSubcomponentModeOn(optionsComponent);
      }, TOOLBAR_FADE_TRANSITION_DURATION_MILLISECONDS);
      optionsComponent.toggleModalExpandMode();
      optionsComponent.hasImportSubcomponentModeClosedExpandedModal = false;
      return true;
    }
    return false;
  }

  public static toggleSubcomponentImport(optionsComponent: ComponentOptions): void {
    optionsComponent.isImportSubcomponentModeActive = !optionsComponent.isImportSubcomponentModeActive;
    const hasBeenToggled = ImportSubcomponentToggleUtils.toggleDuringExpandedModalMode(optionsComponent);
    if (optionsComponent.isImportSubcomponentModeActive) {
      optionsComponent.hideSettings();
    } else {
      ImportSubcomponentToggleUtils.displayOptionSettings(optionsComponent);
    }
    if (!hasBeenToggled) ImportSubcomponentToggleUtils.toggleImportSubcomponentModeOn(optionsComponent);
  }
}
