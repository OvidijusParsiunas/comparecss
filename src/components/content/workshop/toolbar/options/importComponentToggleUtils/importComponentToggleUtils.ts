import { CONFIRM_SUBCOMPONENT_TO_IMPORT_MARKER, EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER, OPTION_MENU_BUTTON_MARKER, OPTION_MENU_SETTING_OPTION_BUTTON_MARKER } from '../../../../../../consts/elementClassMarkers';
import { TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS } from '../../../componentPreview/utils/expandedModalPreviewMode/consts/sharedConsts';
import { SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ToggleImportComponentModeEvent } from '../../../../../../interfaces/toggleImportComponentModeEvent';
import { WorkshopEventCallbackReturn } from '../../../../../../interfaces/workshopEventCallbackReturn';
import { WorkshopEventCallbackUtils } from '../workshopEventCallbackUtils/workshopEventCallbackUtils';
import { CustomSubcomponentNames } from '../../../../../../interfaces/customSubcomponentNames';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopEventCallback } from '../../../../../../interfaces/workshopEventCallback';
import JSONManipulation from '../../../../../../services/workshop/jsonManipulation';
import { ComponentOptions } from 'vue';

export default class ImportComponentToggleUtils {

  private static dereferenceImportedComponentCustomProperties(activeComponent: WorkshopComponent, importedComponentBase: SubcomponentProperties): void {
    const { subcomponentNames, referenceSharingExecutables } = importedComponentBase.importedComponent.componentRef;
    Object.keys(subcomponentNames).forEach((subcomponentName: string) => {
      const importedComponent = activeComponent.subcomponents[subcomponentNames[subcomponentName]];
      importedComponent.customCss = JSONManipulation.deepCopy(importedComponent.customCss);
      importedComponent.customFeatures = JSONManipulation.deepCopy(importedComponent.customFeatures);
    });
    referenceSharingExecutables.forEach((executable: (param1: Subcomponents, param2: CustomSubcomponentNames) => void) => {
      executable(activeComponent.subcomponents, subcomponentNames);
    });
  }

  public static toggleSubcomponentInSync(activeComponent: WorkshopComponent, callback?: () => void): void {
    const activeSubcomponent = activeComponent.subcomponents[activeComponent.activeSubcomponentName];
    // use base subcomponent reference if the activeComponent is a child of base or activeSubcomponent if it is the base
    const importedComponentBase = activeSubcomponent.baseSubcomponentRef || activeSubcomponent;
    if (importedComponentBase.importedComponent.inSync) {
      ImportComponentToggleUtils.dereferenceImportedComponentCustomProperties(activeComponent, importedComponentBase);
    }
    importedComponentBase.importedComponent.inSync = !importedComponentBase.importedComponent.inSync;
    if (callback) callback();
  }

  private static displayOptionSettings(optionsComponent: ComponentOptions): void {
    const { subcomponents, activeSubcomponentName } = optionsComponent.component;
    if (optionsComponent.activeOption.buttonName && subcomponents[activeSubcomponentName].subcomponentDisplayStatus.isDisplayed) {
      const defaultOption = optionsComponent.getDefaultOption();
      // timeout used for the inSync button animation to work
      setTimeout(() => {
        optionsComponent.selectOption(defaultOption);
      }, optionsComponent.hasImportComponentModeClosedExpandedModal ? TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS : 0);
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
    ImportComponentToggleUtils.removeTempCustomProperties(optionsComponent.component);
    delete subcomponents[activeSubcomponentName].importedComponent.lastSelectectedSubcomponentToImport;
  }

  private static toggleOff(optionsComponent: ComponentOptions, isOptionsButtonClicked: boolean): WorkshopEventCallbackReturn {
    optionsComponent.isImportComponentModeActive = !optionsComponent.isImportComponentModeActive;
    if (!isOptionsButtonClicked) ImportComponentToggleUtils.displayOptionSettings(optionsComponent);
    if (optionsComponent.hasImportComponentModeClosedExpandedModal) {
      optionsComponent.toggleModalExpandMode();
      setTimeout(() => {
        optionsComponent.hasImportComponentModeClosedExpandedModal = false;
        optionsComponent.$emit('toggle-import-subcomponent-mode', [false] as ToggleImportComponentModeEvent);
      }, TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS);
    } else {
      optionsComponent.$emit('toggle-import-subcomponent-mode', [false] as ToggleImportComponentModeEvent);
    }
    ImportComponentToggleUtils.removeTemporaryProperties(optionsComponent);
    return { shouldRepeat: false };
  }

  private static setImportedComponentProperties(optionsComponent: ComponentOptions): void {
    const { subcomponents, activeSubcomponentName } = optionsComponent.component;
    if (subcomponents[activeSubcomponentName].importedComponent.lastSelectectedSubcomponentToImport) {
      subcomponents[activeSubcomponentName].importedComponent.componentRef.componentStatus = subcomponents[activeSubcomponentName]
        .importedComponent.lastSelectectedSubcomponentToImport.componentStatus;
      // timeout used to not display the animation immediately if expanded modal mode has been temporarily closed
      setTimeout(() => {
        subcomponents[activeSubcomponentName].importedComponent.inSync = true;
        subcomponents[activeSubcomponentName].subcomponentDisplayStatus.isDisplayed = true;
      }, optionsComponent.hasImportComponentModeClosedExpandedModal ? TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS : 0);
    }
    ImportComponentToggleUtils.toggleOff(optionsComponent, false);
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
      ImportComponentToggleUtils.moveTempPropertiesToCustomProperties(activeComponent.subcomponents, activeComponentSubcomponentNames[subcomponentName]);
    });
  }

  private static toggleImportComponentModeOff(optionsComponent: ComponentOptions, event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
    if (event instanceof KeyboardEvent) {
      if (event.key === DOM_EVENT_TRIGGER_KEYS.ESCAPE) {
        ImportComponentToggleUtils.resetImportedComponent(optionsComponent.component);
        return ImportComponentToggleUtils.toggleOff(optionsComponent, false);
      } else if (event.key === DOM_EVENT_TRIGGER_KEYS.ENTER) {
        optionsComponent.temporarilyAllowOptionAnimations(ImportComponentToggleUtils.setImportedComponentProperties.bind(this, optionsComponent), true, true);
        return { shouldRepeat: false };
      }
      return { shouldRepeat: true };
    }
    const buttonElement = WorkshopEventCallbackUtils.getButtonElement(event.target as HTMLElement);
    if (buttonElement === optionsComponent.$refs.importComponentToggle) {
      ImportComponentToggleUtils.resetImportedComponent(optionsComponent.component);
      ImportComponentToggleUtils.removeTemporaryProperties(optionsComponent);
      return { shouldRepeat: false };
    }
    if (buttonElement.classList.contains(CONFIRM_SUBCOMPONENT_TO_IMPORT_MARKER)) {
      optionsComponent.temporarilyAllowOptionAnimations(ImportComponentToggleUtils.setImportedComponentProperties.bind(this, optionsComponent), true, true);
      return { shouldRepeat: false };
    } 
    if (buttonElement.classList.contains(EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER)) {
      optionsComponent.hasImportComponentModeClosedExpandedModal = false;
      return ImportComponentToggleUtils.toggleOff(optionsComponent, false);
    }
    if (buttonElement.classList.contains(OPTION_MENU_SETTING_OPTION_BUTTON_MARKER)) {
      return ImportComponentToggleUtils.toggleOff(optionsComponent, true);
    }
    if (buttonElement.classList.contains(OPTION_MENU_BUTTON_MARKER)
        || buttonElement.classList.contains(optionsComponent.SUBCOMPONENTS_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER)
        || buttonElement.classList.contains(optionsComponent.CSS_PSEUDO_CLASSES_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER)) {
      return ImportComponentToggleUtils.toggleOff(optionsComponent, false);
    }
    return { shouldRepeat: true };
  }

  private static toggleImportComponentModeOn(optionsComponent: ComponentOptions): void {
    const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_UP, DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE])
    const workshopEventCallback: WorkshopEventCallback = { keyTriggers, func: this.toggleImportComponentModeOff.bind(this, optionsComponent) };
    optionsComponent.$emit('toggle-import-subcomponent-mode', [optionsComponent.isImportComponentModeActive, workshopEventCallback] as ToggleImportComponentModeEvent);
  }

  private static toggleDuringExpandedModalMode(optionsComponent: ComponentOptions): boolean {
    if (optionsComponent.isExpandedModalPreviewModeActive) {
      optionsComponent.toggleModalExpandMode();
      optionsComponent.hasImportComponentModeClosedExpandedModal = true;
    } else if (optionsComponent.hasImportComponentModeClosedExpandedModal) {
      setTimeout(() => {
        ImportComponentToggleUtils.toggleImportComponentModeOn(optionsComponent);
        optionsComponent.hasImportComponentModeClosedExpandedModal = false;
      }, TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS);
      optionsComponent.toggleModalExpandMode();
      return true;
    }
    return false;
  }

  public static toggleSubcomponentImport(optionsComponent: ComponentOptions): void {
    optionsComponent.isImportComponentModeActive = !optionsComponent.isImportComponentModeActive;
    if (optionsComponent.isImportComponentModeActive) {
      optionsComponent.hideSettings();
    } else {
      ImportComponentToggleUtils.displayOptionSettings(optionsComponent);
    }
    const hasBeenToggled = ImportComponentToggleUtils.toggleDuringExpandedModalMode(optionsComponent);
    if (!hasBeenToggled) ImportComponentToggleUtils.toggleImportComponentModeOn(optionsComponent);
  }

  public static isInSyncButtonDisplayed(activeSubcomponent: SubcomponentProperties): boolean {
    return (activeSubcomponent.importedComponent && !activeSubcomponent.importedComponent.componentRef.componentStatus.isRemoved
            && activeSubcomponent.importedComponent.inSync) 
        || (activeSubcomponent.baseSubcomponentRef && activeSubcomponent.baseSubcomponentRef.importedComponent
            && !activeSubcomponent.baseSubcomponentRef.importedComponent.componentRef.componentStatus.isRemoved
            && activeSubcomponent.baseSubcomponentRef.importedComponent.inSync);
  }
}
