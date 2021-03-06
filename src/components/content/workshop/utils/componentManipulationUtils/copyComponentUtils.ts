import { ImportedComponent, SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../consts/coreSubcomponentNames.enum';
import { CustomSubcomponentNames } from '../../../../../interfaces/customSubcomponentNames';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { componentTypeToStyles } from '../../newComponent/types/componentTypeToStyles';
import { NEW_COMPONENT_STYLES } from '../../../../../consts/newComponentStyles.enum';
import ComponentTraversalUtils from '../componentTraversal/componentTraversalUtils';
import JSONManipulation from '../../../../../services/workshop/jsonManipulation';
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

  private static copyImportedComponent(importedComponent: ImportedComponent, newComponent: WorkshopComponent,
      componentBeingCopied: WorkshopComponent): void {
    const { subcomponentNames, referenceSharingExecutables } = importedComponent.componentRef;
    Object.keys(subcomponentNames).forEach((subcomponentName: string) => {
      const newSubcomponent = newComponent.subcomponents[subcomponentNames[subcomponentName]];
      const subcomponentBeingCopied = componentBeingCopied.subcomponents[subcomponentNames[subcomponentName]];
      if (importedComponent.inSync) {
        ComponentComponentUtils.copyInSyncSubcomponent(importedComponent, newSubcomponent, subcomponentBeingCopied);
      } else {
        ComponentComponentUtils.copySubcomponentProperties(newSubcomponent, subcomponentBeingCopied);
      }
    });
    referenceSharingExecutables.forEach((executable: (subcomponents: Subcomponents, subcomponentNames: CustomSubcomponentNames) => void) => {
      executable(newComponent.subcomponents, subcomponentNames);
    });
  }

  private static copySubcomponent(componentBeingCopied: WorkshopComponent, activeSubcomponentName: string, newComponent: WorkshopComponent): void {
    const newSubcomponent = newComponent.subcomponents[activeSubcomponentName];
    const subcomponentBeingCompied = componentBeingCopied.subcomponents[activeSubcomponentName];
    if (newSubcomponent.importedComponent) {
      ComponentComponentUtils.copyImportedComponent(subcomponentBeingCompied.importedComponent, newComponent, componentBeingCopied);
    } else {
      ComponentComponentUtils.copySubcomponentProperties(newSubcomponent, subcomponentBeingCompied);
    }
  }
  
  private static copyComponentProperties(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent): void {
    const copySubcomponentCallback = ComponentComponentUtils.copySubcomponent.bind(this, componentBeingCopied);
    ComponentTraversalUtils.traverseSubcomponentsUsingDropdownStructure(newComponent.componentPreviewStructure.subcomponentDropdownStructure,
      newComponent, copySubcomponentCallback);
  }

  public static copyComponent(optionsComponent: ComponentOptions, componentBeingCopied: WorkshopComponent): WorkshopComponent {
    const newComponent = componentTypeToStyles[componentBeingCopied.type][NEW_COMPONENT_STYLES.DEFAULT].createNewComponent();
    ComponentComponentUtils.copyComponentProperties(newComponent, componentBeingCopied);
    newComponent.activeSubcomponentName = CORE_SUBCOMPONENTS_NAMES.BASE;
    newComponent.subcomponents[CORE_SUBCOMPONENTS_NAMES.BASE].activeCssPseudoClass = CSS_PSEUDO_CLASSES.DEFAULT;
    newComponent.className = ProcessClassName.addPostfixIfClassNameTaken(newComponent.className,
      (optionsComponent.components as undefined as WorkshopComponent[]), '-copy');
    return newComponent;
  }
}
