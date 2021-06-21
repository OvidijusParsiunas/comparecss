import { ImportedComponent, SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { componentTypeToStyleGenerators } from '../../newComponent/types/componentTypeToStyleGenerators';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../consts/coreSubcomponentNames.enum';
import { CustomSubcomponentNames } from '../../../../../interfaces/customSubcomponentNames';
import { ImportedComponentGenerator } from '../importComponent/importedComponentGenerator';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { NEW_COMPONENT_STYLES } from '../../../../../consts/newComponentStyles.enum';
import { defaultButton } from '../../newComponent/types/buttons/properties/default';
import JSONManipulation from '../../../../../services/workshop/jsonManipulation';
import ProcessClassName from '../componentGenerator/processClassName';
import PreviewStructure from '../componentGenerator/previewStructure';
import { ComponentOptions } from 'vue';

export default class ComponentComponentUtils {

  private static copyDisplayStatus(newSubcomponent: SubcomponentProperties, subcomponentBeingCopied: SubcomponentProperties): void {
    if (newSubcomponent.subcomponentDisplayStatus) {
      newSubcomponent.subcomponentDisplayStatus.isDisplayed = subcomponentBeingCopied.subcomponentDisplayStatus.isDisplayed;
    }
  }

  private static copyInSyncSubcomponent(importedComponent: ImportedComponent, newSubcomponent: SubcomponentProperties,
      subcomponentBeingCopied: SubcomponentProperties): void {
    if (newSubcomponent.importedComponent) {
      newSubcomponent.importedComponent.inSync = true;
      newSubcomponent.importedComponent.componentRef.componentStatus = importedComponent.componentRef.componentStatus;
    }
    newSubcomponent.customCss = subcomponentBeingCopied.customCss;
    newSubcomponent.customFeatures = subcomponentBeingCopied.customFeatures;
    newSubcomponent.defaultCss = JSONManipulation.deepCopy(subcomponentBeingCopied.defaultCss);
    newSubcomponent.defaultCustomFeatures = JSONManipulation.deepCopy(subcomponentBeingCopied.defaultCustomFeatures);
    ComponentComponentUtils.copyDisplayStatus(newSubcomponent, subcomponentBeingCopied);
  }

  private static copySubcomponentProperties(newSubcomponent: SubcomponentProperties, subcomponentBeingCopied: SubcomponentProperties): void {
    newSubcomponent.customCss = JSONManipulation.deepCopy(subcomponentBeingCopied.customCss);
    newSubcomponent.customFeatures = JSONManipulation.deepCopy(subcomponentBeingCopied.customFeatures);
    newSubcomponent.customStaticFeatures = JSONManipulation.deepCopy(subcomponentBeingCopied.customStaticFeatures);
    newSubcomponent.defaultCss = JSONManipulation.deepCopy(subcomponentBeingCopied.customCss);
    newSubcomponent.defaultCustomFeatures = JSONManipulation.deepCopy(subcomponentBeingCopied.customFeatures);
    newSubcomponent.defaultCustomStaticFeatures = JSONManipulation.deepCopy(subcomponentBeingCopied.customStaticFeatures);
    ComponentComponentUtils.copyDisplayStatus(newSubcomponent, subcomponentBeingCopied);
  }

  // WORK1: refactoring
  private static copySubcomponents(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent): void {
    const importedComponentRefs = [];
    // WORK1: remove new component subcomponents that are not in the component being copied
    // currently can add an imported component but need to be able to add a native component
  // newComponent.subcomponents = {};
    // uniqueSubcomponentIdState.resetUniqueId();
    Object.keys(componentBeingCopied.subcomponents).forEach((subcomponentName) => {
      // if subcomponent is part of an imported component, do not proceed as a new one will be created
      // PART3:
      // if (componentBeingCopied.subcomponents[subcomponentName].baseSubcomponentRef
      //   && componentBeingCopied.subcomponents[subcomponentName].baseSubcomponentRef.importedComponent) {
      //     return;
      //   };
      // still requires the first detected subcomponent to be the base, otherwise it will overwrite the smaller ones
      // PART1:
      // current strategy is to be able to repopulate subcomponents from scratch
      // PART2:
      // make sure the ids are the same (pass the subcomponentNames directly)
      // PART 5: change this if statement to
      /// if (componentBeingCopied.subcomponents[subcomponentName].importedComponent)
      if (!newComponent.subcomponents[subcomponentName] && !componentBeingCopied.subcomponents[subcomponentName].baseSubcomponentRef) {
        // 11111 recreate all subcomponents except base
        const importedComponentSubcomponents = ImportedComponentGenerator.createImportedComponentSubcomponents(defaultButton, subcomponentName);
        // 11111 adding all the subcomponents
        newComponent.subcomponents = {
          ...newComponent.subcomponents, ...importedComponentSubcomponents };
        // PART4:
        // copySubcomponentProperties
        // or inSyncSubcomponent
      }
      // PART6:
      // else proceed to create a default subcomponent
      // 1111111 importing in-sync componnets - check
      if (componentBeingCopied.subcomponents[subcomponentName].importedComponent) {
        importedComponentRefs.push(componentBeingCopied.subcomponents[subcomponentName].importedComponent.componentRef);
        if (componentBeingCopied.subcomponents[subcomponentName].importedComponent.inSync) {
          ComponentComponentUtils.copyInSyncSubcomponent(componentBeingCopied.subcomponents[subcomponentName].importedComponent, 
            newComponent.subcomponents[subcomponentName], componentBeingCopied.subcomponents[subcomponentName]);
          return;
        }
      }
      ComponentComponentUtils.copySubcomponentProperties(newComponent.subcomponents[subcomponentName],
        componentBeingCopied.subcomponents[subcomponentName]);
    });
    importedComponentRefs.forEach((importedComponentRef) => {
      const { subcomponentNames, referenceSharingExecutables } = importedComponentRef;
      (referenceSharingExecutables || []).forEach((executable: (subcomponents: Subcomponents, subcomponentNames: CustomSubcomponentNames) => void) => {
        executable(newComponent.subcomponents, subcomponentNames);
      });
    });
  }

  private static copyComponentProperties(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent): void {
    ComponentComponentUtils.copySubcomponents(newComponent, componentBeingCopied);
    newComponent.componentPreviewStructure = PreviewStructure.createComponentPreviewStructure(
      componentBeingCopied.componentPreviewStructure.subcomponentDropdownStructure, newComponent.subcomponents);
  }

  public static copyComponent(optionsComponent: ComponentOptions, componentBeingCopied: WorkshopComponent): WorkshopComponent {
    const newComponent = componentTypeToStyleGenerators[componentBeingCopied.type][NEW_COMPONENT_STYLES.DEFAULT].createNewComponent();
    ComponentComponentUtils.copyComponentProperties(newComponent, componentBeingCopied);
    newComponent.activeSubcomponentName = CORE_SUBCOMPONENTS_NAMES.BASE;
    newComponent.subcomponents[CORE_SUBCOMPONENTS_NAMES.BASE].activeCssPseudoClass = CSS_PSEUDO_CLASSES.DEFAULT;
    newComponent.className = ProcessClassName.addPostfixIfClassNameTaken(newComponent.className,
      (optionsComponent.components as undefined as WorkshopComponent[]), '-copy');
    return newComponent;
  }
}
