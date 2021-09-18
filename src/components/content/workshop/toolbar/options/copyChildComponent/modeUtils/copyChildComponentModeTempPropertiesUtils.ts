import { TraverseComponentsViaFullPreviewStructure } from '../../../../utils/componentTraversal/traverseComponentsViaFullPreviewStructure';
import { AddContainerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';

export class CopyChildComponentModeTempPropertiesUtils {
  
  private static moveCustomPropertiesToTempProperties(activeComponentSubcomponent: SubcomponentProperties): void {
    activeComponentSubcomponent.tempOriginalCustomProperties = {
      customCss: activeComponentSubcomponent.customCss,
      customFeatures: activeComponentSubcomponent.customFeatures,
    };
  }

  private static copyAllCustomProperties(subcomponentToBeCopied: SubcomponentProperties, activeComponentSubcomponent: SubcomponentProperties): void {
    activeComponentSubcomponent.customFeatures = subcomponentToBeCopied.customFeatures;
    const componentToBeCopiedCustomCss = subcomponentToBeCopied.customCss;
    activeComponentSubcomponent.customCss = componentToBeCopiedCustomCss;
    if (!componentToBeCopiedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top && subcomponentToBeCopied.subcomponentType !== SUBCOMPONENT_TYPES.LAYER) {
      componentToBeCopiedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top = AddContainerComponent.DEFAULT_TOP_PROPERTY;
    }
  }

  public static copySubcomponent(activeComponentSubcomponent: SubcomponentProperties, subcomponentToBeCopied: SubcomponentProperties): void {
    // WORK2 - this is added to the seed component of the copied child component, does it remain after the component has been successfully added?
    if (!activeComponentSubcomponent.tempOriginalCustomProperties) {
      CopyChildComponentModeTempPropertiesUtils.moveCustomPropertiesToTempProperties(activeComponentSubcomponent);
    }
    CopyChildComponentModeTempPropertiesUtils.copyAllCustomProperties(subcomponentToBeCopied, activeComponentSubcomponent);
  }

  public static setActiveComponentToChildComponentCopy(currentlySelectedComponent: WorkshopComponent, componentToBeCopied: WorkshopComponent): void {
    const activeComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].seedComponent;
    TraverseComponentsViaFullPreviewStructure.traverseSameComponentTypes(
      CopyChildComponentModeTempPropertiesUtils.copySubcomponent, activeComponent, componentToBeCopied);
  }

  private static resetOriginalCss(subcomponentProperties: SubcomponentProperties): void {
    if (!subcomponentProperties.tempOriginalCustomProperties) return;
    subcomponentProperties.customCss = subcomponentProperties.tempOriginalCustomProperties.customCss;
    subcomponentProperties.customFeatures = subcomponentProperties.tempOriginalCustomProperties.customFeatures; 
  }

  private static resetSubcomponentProperties(activeSubcomponent: SubcomponentProperties): void {
    if (activeSubcomponent.tempOriginalCustomProperties) {
      delete activeSubcomponent.tempOriginalCustomProperties;
      CopyChildComponentModeTempPropertiesUtils.resetOriginalCss(activeSubcomponent);
    }
  }

  public static cleanComponent(currentlySelectedComponent: WorkshopComponent): void {
    const activeComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].seedComponent;
    TraverseComponentsViaFullPreviewStructure.traverseSameComponentTypes(
      CopyChildComponentModeTempPropertiesUtils.resetSubcomponentProperties, activeComponent);
  }

  public static setLastSelectectedComponentToCopy(componentToBeCopied: WorkshopComponent, activeComponent: WorkshopComponent): void {
    activeComponent.subcomponents
      [activeComponent.activeSubcomponentName].seedComponent.sync.lastSelectedComponentToSync = componentToBeCopied;
  }

  public static deleteLastSelectedComponentToCopy(activeComponent: WorkshopComponent): void {
    delete activeComponent.subcomponents[activeComponent.activeSubcomponentName].seedComponent.sync.lastSelectedComponentToSync;
  }
}
