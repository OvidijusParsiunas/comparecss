import { ImportedComponent, SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { componentTypeToStyleGenerators } from '../../newComponent/types/componentTypeToStyleGenerators';
import { AddNewImportedComponent } from './addNewSubcomponentUtils/add/addNewImportedComponent';
import { AddNewLayerSubcomponent } from './addNewSubcomponentUtils/add/addNewLayerSubcomponent';
import { CustomSubcomponentNames } from '../../../../../interfaces/customSubcomponentNames';
import { uniqueSubcomponentIdState } from '../componentGenerator/uniqueSubcomponentIdState';
import JSONManipulation from '../../../../../services/workshop/jsonManipulation';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';
import ProcessClassName from '../componentGenerator/processClassName';
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
    // when imported component deleted, all other ones take control of its css
    // ripple animation does not carry on
    const importedComponentRefs = [];
    Object.keys(componentBeingCopied.subcomponents).forEach((subcomponentName) => {
      let newComponentName;
      if (!newComponent.subcomponents[subcomponentName]) {
        // if base component
        if (!componentBeingCopied.subcomponents[subcomponentName].baseSubcomponentRef) {
          const { type, style } = componentBeingCopied.subcomponents[subcomponentName].importedComponent.componentRef;
          if (type === COMPONENT_TYPES.LAYER) {
            const layerComponent = AddNewLayerSubcomponent.add(newComponent, style, true);
            newComponentName = layerComponent.baseName;
            ComponentComponentUtils.copySubcomponentProperties(layerComponent.subcomponents[layerComponent.baseName],
              componentBeingCopied.subcomponents[subcomponentName]);
          } else {
            const layer = newComponent.componentPreviewStructure.layers[componentBeingCopied.componentPreviewStructure.layers.indexOf(componentBeingCopied.subcomponents[subcomponentName].parentLayer)];
            const importedComponent = AddNewImportedComponent.add(newComponent, type, style,
              layer.name);
            newComponentName = importedComponent.baseName;
            const newSubcomponentNames = Object.keys(importedComponent.subcomponents);
            const copiedSubcomponentNames = Object.keys(componentBeingCopied.subcomponents[subcomponentName].importedComponent.componentRef.subcomponents);
            importedComponentRefs.push(importedComponent.subcomponents[importedComponent.baseName]);
            for (let i = 0; i < newSubcomponentNames.length; i += 1) {
              const subcomponentBeingCopied = componentBeingCopied.subcomponents[subcomponentName].importedComponent.componentRef.subcomponents[copiedSubcomponentNames[i]];
              if (!subcomponentBeingCopied.baseSubcomponentRef && subcomponentBeingCopied.importedComponent?.inSync) {
                ComponentComponentUtils.copyInSyncSubcomponent(componentBeingCopied.subcomponents[subcomponentName].importedComponent, 
                  importedComponent.subcomponents[newSubcomponentNames[i]],
                  componentBeingCopied.subcomponents[subcomponentName].importedComponent.componentRef.subcomponents[copiedSubcomponentNames[i]]);
              } else {
                ComponentComponentUtils.copySubcomponentProperties(importedComponent.subcomponents[newSubcomponentNames[i]],
                  componentBeingCopied.subcomponents[subcomponentName].importedComponent.componentRef.subcomponents[copiedSubcomponentNames[i]]); 
              }
            }
          }
        }
        // everything that is imported but not base is dealth with earlier
        return;
      }
      // 1111111 importing in-sync componnets - check
      if (componentBeingCopied.subcomponents[subcomponentName].importedComponent?.inSync) {
        ComponentComponentUtils.copyInSyncSubcomponent(componentBeingCopied.subcomponents[subcomponentName].importedComponent, 
          newComponent.subcomponents[subcomponentName], componentBeingCopied.subcomponents[subcomponentName]);
      } else {
        ComponentComponentUtils.copySubcomponentProperties(newComponent.subcomponents[newComponentName || subcomponentName],
          componentBeingCopied.subcomponents[subcomponentName]);
      }
      if (!newComponent.subcomponents[subcomponentName].baseSubcomponentRef) {
        importedComponentRefs.push(newComponent.subcomponents[subcomponentName].importedComponent?.componentRef || newComponent);
      }
    });
    importedComponentRefs.forEach((importedComponentRef) => {
      const { subcomponentNames, referenceSharingExecutables } = importedComponentRef;
      (referenceSharingExecutables || []).forEach((executable: (subcomponents: Subcomponents, subcomponentNames: CustomSubcomponentNames) => void) => {
        executable(newComponent.subcomponents, subcomponentNames);
      });
    });
  }

  public static copyComponent(optionsComponent: ComponentOptions, componentBeingCopied: WorkshopComponent): WorkshopComponent {
    // not refreshed for buttons
    uniqueSubcomponentIdState.resetUniqueId();
    const newComponent = componentTypeToStyleGenerators[componentBeingCopied.type][componentBeingCopied.style].createNewComponent();
    ComponentComponentUtils.copySubcomponents(newComponent, componentBeingCopied);
    newComponent.className = ProcessClassName.addPostfixIfClassNameTaken(newComponent.className,
      (optionsComponent.components as undefined as WorkshopComponent[]), '-copy');
    return newComponent;
  }
}
