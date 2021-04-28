import { Imported, SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../consts/coreSubcomponentNames.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import JSONManipulation from '../../../../../services/workshop/jsonManipulation';
import ImportSubcomponent from '../importSubcomponent/importSubcomponent';
import ComponentJs from '../../../../../services/workshop/componentJs';
import ProcessClassName from '../componentGenerator/processClassName';
import { ComponentOptions } from 'vue';
import { CustomSubcomponentNames } from '@/interfaces/customSubcomponentNames';
import { componentTypeToStyles } from '../../newComponent/types/componentTypeToStyles';
import { NEW_COMPONENT_STYLES } from '@/consts/newComponentStyles.enum';
import { NestedDropdownStructure } from '@/interfaces/nestedDropdownStructure';
import { ENTITY_DISPLAY_STATUS_REF } from '@/interfaces/entityDisplayStatus';

export default class ComponentManipulationUtils {

  private static resetComponentModes(previousComponent: WorkshopComponent): void {
    if (!previousComponent) return;
    previousComponent.activeSubcomponentName = previousComponent.defaultSubcomponentName;
    Object.keys(previousComponent.subcomponents).forEach((key) => {
      const subcomponent: SubcomponentProperties = previousComponent.subcomponents[key];
      subcomponent.activeCssPseudoClass = subcomponent.defaultCssPseudoClass;
    });
  }

  private static switchActiveComponent(optionsComponent: ComponentOptions, newComponent: WorkshopComponent): void {
    ComponentManipulationUtils.resetComponentModes(optionsComponent.currentlySelectedComponent);
    if (optionsComponent.currentlySelectedComponent && optionsComponent.currentlySelectedComponent.type !== newComponent.type) {
      ComponentJs.manipulateJS(optionsComponent.currentlySelectedComponent.type, 'revokeJS');
    }
    optionsComponent.currentlySelectedComponent = newComponent;
    ComponentJs.manipulateJS(optionsComponent.currentlySelectedComponent.type, 'executeJS');
    optionsComponent.$refs.toolbar.updateToolbarForNewComponent();
  }
  
  public static addNewComponent(optionsComponent: ComponentOptions, newComponent: WorkshopComponent): void {
    (optionsComponent.components as undefined as WorkshopComponent[]).push(newComponent);
    ComponentManipulationUtils.switchActiveComponent(optionsComponent, newComponent);
  }

  private static resetLocalSubcomponent(newSubcomponent: SubcomponentProperties, oldSubcomponent: SubcomponentProperties): void {
    newSubcomponent.customCss = JSONManipulation.deepCopy(oldSubcomponent.customCss);
    newSubcomponent.customFeatures = JSONManipulation.deepCopy(oldSubcomponent.customFeatures);
    newSubcomponent.defaultCss = JSONManipulation.deepCopy(oldSubcomponent.customCss);
    newSubcomponent.defaultCustomFeatures = JSONManipulation.deepCopy(oldSubcomponent.customFeatures);
    if (newSubcomponent.subcomponentDisplayStatus) {
      newSubcomponent.subcomponentDisplayStatus = JSONManipulation.deepCopy(oldSubcomponent.subcomponentDisplayStatus);
    }
  }

  private static resetImportedSubcomponent(importedSubcomponent: Imported, newComponent: WorkshopComponent,
      copiedComponent: WorkshopComponent): void {
    const { subcomponentNames, referenceSharingExecutables } = importedSubcomponent.componentRef;
    Object.keys(subcomponentNames).forEach((subcomponentName: string) => {
      const newImportedSubcomponent = newComponent.subcomponents[subcomponentNames[subcomponentName]];
      const copiedImportedSubcomponent = copiedComponent.subcomponents[subcomponentNames[subcomponentName]];
      if (importedSubcomponent.inSync) {
        if (newImportedSubcomponent.importedComponent) {
          newImportedSubcomponent.importedComponent.inSync = true;
          newImportedSubcomponent.importedComponent.componentRef.componentStatus = importedSubcomponent.componentRef.componentStatus;
        }
        newImportedSubcomponent.customCss = copiedImportedSubcomponent.customCss;
        newImportedSubcomponent.customFeatures = copiedImportedSubcomponent.customFeatures;
        newImportedSubcomponent.defaultCss = JSONManipulation.deepCopy(copiedImportedSubcomponent.defaultCss);
        newImportedSubcomponent.defaultCustomFeatures = JSONManipulation.deepCopy(copiedImportedSubcomponent.defaultCustomFeatures);
      } else {
        newImportedSubcomponent.customCss = JSONManipulation.deepCopy(copiedImportedSubcomponent.customCss);
        newImportedSubcomponent.customFeatures = JSONManipulation.deepCopy(copiedImportedSubcomponent.customFeatures);
        newImportedSubcomponent.defaultCss = JSONManipulation.deepCopy(copiedImportedSubcomponent.customCss);
        newImportedSubcomponent.defaultCustomFeatures = JSONManipulation.deepCopy(copiedImportedSubcomponent.customFeatures);
      }
      if (newImportedSubcomponent.subcomponentDisplayStatus) {
        newImportedSubcomponent.subcomponentDisplayStatus = JSONManipulation.deepCopy(copiedImportedSubcomponent.subcomponentDisplayStatus);
      }
    });
    referenceSharingExecutables.forEach((executable: (param1: Subcomponents, param2: CustomSubcomponentNames) => void) => {
      executable(newComponent.subcomponents, subcomponentNames);
    });
  }

  private static resetSubcomponent(activeSubcomponentName: string, newComponent: WorkshopComponent, copiedComponent: WorkshopComponent): void {
    const newSubcomponent = newComponent.subcomponents[activeSubcomponentName];
    const oldSubcomponent = copiedComponent.subcomponents[activeSubcomponentName];
    if (newSubcomponent.importedComponent) {
      ComponentManipulationUtils.resetImportedSubcomponent(oldSubcomponent.importedComponent, newComponent, copiedComponent);
    } else {
      ComponentManipulationUtils.resetLocalSubcomponent(newSubcomponent, oldSubcomponent);
    }
  }

  private static resetChildSubcomponents(subcomponentDropdownStructure: NestedDropdownStructure,
      newComponent: WorkshopComponent, copiedComponent: WorkshopComponent): void {
    const subcomponentDropdownStructureKeys = Object.keys(subcomponentDropdownStructure);
    for (let i = 0; i < subcomponentDropdownStructureKeys.length; i += 1) {
      const subcomponentName = subcomponentDropdownStructureKeys[i];
      if (subcomponentName === ENTITY_DISPLAY_STATUS_REF) return;
      ComponentManipulationUtils.resetSubcomponent(subcomponentName, newComponent, copiedComponent);
      if (Object.keys(subcomponentDropdownStructure[subcomponentName]).length && !newComponent.subcomponents[subcomponentName].importedComponent) {
        ComponentManipulationUtils.resetChildSubcomponents(subcomponentDropdownStructure[subcomponentName] as NestedDropdownStructure,
          newComponent, copiedComponent);
      }
    }
  }

  private static findAndResetAllChildSubcomponents(activeSubcomponentName: string, subcomponentDropdownStructure: NestedDropdownStructure,
      newComponent: WorkshopComponent, copiedComponent: WorkshopComponent): void {
    const subcomponentDropdownStructureKeys = Object.keys(subcomponentDropdownStructure);
    for (let i = 0; i < subcomponentDropdownStructureKeys.length; i += 1) {
      const subcomponentName = subcomponentDropdownStructureKeys[i];
      if (activeSubcomponentName === subcomponentName) {
        ComponentManipulationUtils.resetChildSubcomponents(subcomponentDropdownStructure[subcomponentName] as NestedDropdownStructure,
          newComponent, copiedComponent);
        break;
      } else if (Object.keys(subcomponentDropdownStructure[subcomponentName]).length > 0) {
        ComponentManipulationUtils.findAndResetAllChildSubcomponents(activeSubcomponentName,
          subcomponentDropdownStructure[subcomponentName] as NestedDropdownStructure, newComponent, copiedComponent);
      }
    }
  }

  // fix syntax / make reusable / fix subcomponentDropdownStructure
  private static copyComponentProperties(newComponent: WorkshopComponent, selectComponentCard: WorkshopComponent): void {
    newComponent.componentPreviewStructure.subcomponentDropdownStructure = JSONManipulation.deepCopy(
      selectComponentCard.componentPreviewStructure.subcomponentDropdownStructure);
    ComponentManipulationUtils.resetLocalSubcomponent(newComponent.subcomponents[CORE_SUBCOMPONENTS_NAMES.BASE],
      selectComponentCard.subcomponents[CORE_SUBCOMPONENTS_NAMES.BASE]);
    ComponentManipulationUtils.findAndResetAllChildSubcomponents(newComponent.activeSubcomponentName,
      newComponent.componentPreviewStructure.subcomponentDropdownStructure, newComponent, selectComponentCard);
  }

  public static copyComponent(optionsComponent: ComponentOptions, selectComponentCard: WorkshopComponent): void {
    const newComponent = componentTypeToStyles[selectComponentCard.type][NEW_COMPONENT_STYLES.DEFAULT].createNewComponent();
    ComponentManipulationUtils.copyComponentProperties(newComponent, selectComponentCard);
    newComponent.activeSubcomponentName = CORE_SUBCOMPONENTS_NAMES.BASE;
    newComponent.subcomponents[CORE_SUBCOMPONENTS_NAMES.BASE].activeCssPseudoClass = CSS_PSEUDO_CLASSES.DEFAULT;
    newComponent.className = ProcessClassName.addPostfixIfClassNameTaken(newComponent.className,
      (optionsComponent.components as undefined as WorkshopComponent[]), '-copy');
    ComponentManipulationUtils.addNewComponent(optionsComponent, newComponent);
  }

  public static selectComponent(optionsComponent: ComponentOptions, selectedComponent: WorkshopComponent): void {
    if (optionsComponent.isImportSubcomponentModeActive) {
      ImportSubcomponent.previewImportSubcomponent(selectedComponent, optionsComponent.currentlySelectedComponent);
      optionsComponent.currentlySelectedImportComponent = selectedComponent;
    } else if (optionsComponent.currentlySelectedComponent !== selectedComponent) {
      ComponentManipulationUtils.switchActiveComponent(optionsComponent, selectedComponent);
    }
  }

  private static selectNextComponentAfterRemoving(optionsComponent: ComponentOptions, removedComponentIndex: number): void {
    const components = (optionsComponent.components as undefined as WorkshopComponent[]);
    const nextComponentIndex = removedComponentIndex === components.length ? removedComponentIndex - 1 : removedComponentIndex;
    ComponentManipulationUtils.switchActiveComponent(optionsComponent, components[nextComponentIndex]);
  }

  private static removeComponentCallback(optionsComponent: ComponentOptions, componentToBeRemovedWithoutSelecting: WorkshopComponent): number {
    // the modal does not have a reference to the selected component card but we can be sure that currentlySelectedComponent is the one being removed,
    // however, when the don't show again checkbox is ticked and the user clicks on remove without selecting a modal, need to have its reference
    // passed in through the componentToBeRemovedWithoutSelecting argument
    const componentToBeRemoved: WorkshopComponent = componentToBeRemovedWithoutSelecting || optionsComponent.currentlySelectedComponent;
    const componentMatch = (component: WorkshopComponent) => componentToBeRemoved === component;
    const components = (optionsComponent.components as undefined as WorkshopComponent[]);
    const componentToBeRemovedIndex = components.findIndex(componentMatch);
    components.splice(componentToBeRemovedIndex, 1);
    componentToBeRemoved.componentStatus.isRemoved = true;
    if (components.length === 0) {
      optionsComponent.$refs.toolbar.saveLastActiveOptionPriorToAllComponentsDeletion();
      optionsComponent.componentPreviewAssistance.margin = false;
      ComponentJs.manipulateJS(componentToBeRemoved.type, 'revokeJS');
      optionsComponent.currentlySelectedComponent = undefined;
      return -1;
    }
    return componentToBeRemovedIndex;
  }

  public static removeComponent(optionsComponent: ComponentOptions, componentToBeRemovedWithoutSelecting: WorkshopComponent): void {
    // only switch after using the removal modal (componentToBeRemovedWithoutSelecting is undefined)
    // or not using the modal but directly removing the component that is currently selected
    if (!componentToBeRemovedWithoutSelecting || componentToBeRemovedWithoutSelecting === optionsComponent.currentlySelectedComponent) {
      const componentToBeRemovedIndex = ComponentManipulationUtils.removeComponentCallback(optionsComponent, componentToBeRemovedWithoutSelecting);
      if (componentToBeRemovedIndex > -1) ComponentManipulationUtils.selectNextComponentAfterRemoving(optionsComponent, componentToBeRemovedIndex);
    } else {
      optionsComponent.$refs.toolbar.$refs.options.temporarilyAllowOptionAnimations(
      ComponentManipulationUtils.removeComponentCallback.bind(this, optionsComponent, componentToBeRemovedWithoutSelecting), true, true);
    }
  }
}
