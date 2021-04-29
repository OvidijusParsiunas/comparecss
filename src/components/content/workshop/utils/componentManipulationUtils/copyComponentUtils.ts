import { Imported, SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
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

  private static copyInSyncSubcomponent(importedSubcomponent: Imported, newSubcomponent: SubcomponentProperties,
      subcomponentBeingCopied: SubcomponentProperties): void {
    if (newSubcomponent.importedComponent) {
      newSubcomponent.importedComponent.inSync = true;
      newSubcomponent.importedComponent.componentRef.componentStatus = importedSubcomponent.componentRef.componentStatus;
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
    newSubcomponent.defaultCss = JSONManipulation.deepCopy(subcomponentBeingCopied.customCss);
    newSubcomponent.defaultCustomFeatures = JSONManipulation.deepCopy(subcomponentBeingCopied.customFeatures);
    ComponentComponentUtils.copyDisplayStatus(newSubcomponent, subcomponentBeingCopied);
  }

  private static copyImportedSubcomponent(importedSubcomponent: Imported, newComponent: WorkshopComponent,
      copiedComponent: WorkshopComponent): void {
    const { subcomponentNames, referenceSharingExecutables } = importedSubcomponent.componentRef;
    Object.keys(subcomponentNames).forEach((subcomponentName: string) => {
      const newSubcomponent = newComponent.subcomponents[subcomponentNames[subcomponentName]];
      const subcomponentBeingCopied = copiedComponent.subcomponents[subcomponentNames[subcomponentName]];
      if (importedSubcomponent.inSync) {
        ComponentComponentUtils.copyInSyncSubcomponent(importedSubcomponent, newSubcomponent, subcomponentBeingCopied);
      } else {
        ComponentComponentUtils.copySubcomponentProperties(newSubcomponent, subcomponentBeingCopied);
      }
    });
    referenceSharingExecutables.forEach((executable: (subcomponents: Subcomponents, subcomponentNames: CustomSubcomponentNames) => void) => {
      executable(newComponent.subcomponents, subcomponentNames);
    });
  }

  private static copySubcomponent(copiedComponent: WorkshopComponent, activeSubcomponentName: string, newComponent: WorkshopComponent): void {
    const newSubcomponent = newComponent.subcomponents[activeSubcomponentName];
    const oldSubcomponent = copiedComponent.subcomponents[activeSubcomponentName];
    if (newSubcomponent.importedComponent) {
      ComponentComponentUtils.copyImportedSubcomponent(oldSubcomponent.importedComponent, newComponent, copiedComponent);
    } else {
      ComponentComponentUtils.copySubcomponentProperties(newSubcomponent, oldSubcomponent);
    }
  }
  
  private static copyComponentProperties(newComponent: WorkshopComponent, selectComponentCard: WorkshopComponent): void {
    const copySubcomponentCallback = ComponentComponentUtils.copySubcomponent.bind(this, selectComponentCard);
    ComponentTraversalUtils.traverseSubcomponentsUsingDropdownStructure(newComponent.componentPreviewStructure.subcomponentDropdownStructure,
      newComponent, copySubcomponentCallback);
  }

  public static copyComponent(optionsComponent: ComponentOptions, selectComponentCard: WorkshopComponent): WorkshopComponent {
    const newComponent = componentTypeToStyles[selectComponentCard.type][NEW_COMPONENT_STYLES.DEFAULT].createNewComponent();
    ComponentComponentUtils.copyComponentProperties(newComponent, selectComponentCard);
    newComponent.activeSubcomponentName = CORE_SUBCOMPONENTS_NAMES.BASE;
    newComponent.subcomponents[CORE_SUBCOMPONENTS_NAMES.BASE].activeCssPseudoClass = CSS_PSEUDO_CLASSES.DEFAULT;
    newComponent.className = ProcessClassName.addPostfixIfClassNameTaken(newComponent.className,
      (optionsComponent.components as undefined as WorkshopComponent[]), '-copy');
    return newComponent;
  }
}
