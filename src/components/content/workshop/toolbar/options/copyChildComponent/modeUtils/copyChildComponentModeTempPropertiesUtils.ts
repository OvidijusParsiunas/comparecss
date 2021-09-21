import { TraverseComponentViaPreviewStructureParentFirst } from '../../../../utils/componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureParentFirst';
import { AddContainerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SubcomponentPreviewTraversalState } from '../../../../../../../interfaces/componentTraversal';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import JSONUtils from '../../../../utils/generic/jsonUtils';

export class CopyChildComponentModeTempPropertiesUtils {
  
  private static moveCustomPropertiesToTempProperties(activeComponentSubcomponent: SubcomponentProperties): void {
    activeComponentSubcomponent.tempOriginalCustomProperties = {
      customCss: activeComponentSubcomponent.customCss,
      customFeatures: activeComponentSubcomponent.customFeatures,
    };
  }

  private static copyAllCustomProperties(activeComponentSubcomponent: SubcomponentProperties, subcomponentToBeCopied: SubcomponentProperties): void {
    activeComponentSubcomponent.customFeatures = subcomponentToBeCopied.customFeatures;
    const componentToBeCopiedCustomCss = subcomponentToBeCopied.customCss;
    activeComponentSubcomponent.customCss = componentToBeCopiedCustomCss;
    if (!componentToBeCopiedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top && subcomponentToBeCopied.subcomponentType !== SUBCOMPONENT_TYPES.LAYER) {
      componentToBeCopiedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top = AddContainerComponent.DEFAULT_TOP_PROPERTY;
    }
  }

  private static copyPropertiesThatOnlyExistInActiveComponent(activeComponentSubcomponent: SubcomponentProperties, subcomponentToBeCopied: SubcomponentProperties): void {
    activeComponentSubcomponent.customCss = subcomponentToBeCopied.customCss;
    // need to create a new object as otherwise tempOriginalCustomProperties would be overwritten by a normal traversal
    activeComponentSubcomponent.customFeatures = JSONUtils.createObjectUsingObject1AndSameObject2Properties(
      activeComponentSubcomponent.customFeatures, subcomponentToBeCopied.customFeatures);
  }

  public static copySubcomponent(activeComponentSubcomponent: SubcomponentProperties, subcomponentToBeCopied: SubcomponentProperties, addTemporaryProperties: boolean): void {
    if (addTemporaryProperties && !activeComponentSubcomponent.tempOriginalCustomProperties) {
      CopyChildComponentModeTempPropertiesUtils.moveCustomPropertiesToTempProperties(activeComponentSubcomponent);
    }
    // this is a naive approach to check if customFeatures are different but is a useful form of lazy evaluation to prevent
    // all features from being traversed all the time (used for components like drodpown button)
    if (Object.keys(subcomponentToBeCopied.customFeatures).length !== Object.keys(activeComponentSubcomponent.customFeatures).length) {
      CopyChildComponentModeTempPropertiesUtils.copyPropertiesThatOnlyExistInActiveComponent(activeComponentSubcomponent, subcomponentToBeCopied);
    } else {
      CopyChildComponentModeTempPropertiesUtils.copyAllCustomProperties(activeComponentSubcomponent, subcomponentToBeCopied);
    }
  }

  private static copySubcomponentDuringPreviewTraversal(activeComponentTraversal: SubcomponentPreviewTraversalState, componentToBeCopiedTraversal: SubcomponentPreviewTraversalState): SubcomponentPreviewTraversalState {
    const addTemporaryProperties = this as any as boolean;
    if (componentToBeCopiedTraversal) {
      const activeSubcomponent = activeComponentTraversal.subcomponentProperties;
      const subcomponentToBeCopied = componentToBeCopiedTraversal.subcomponentProperties;
      CopyChildComponentModeTempPropertiesUtils.copySubcomponent(activeSubcomponent, subcomponentToBeCopied, addTemporaryProperties);
    }
    return activeComponentTraversal;
  }

  public static copyComponentToTarget(currentlySelectedComponent: WorkshopComponent, componentToBeCopied: WorkshopComponent): void {
    const activeComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].seedComponent;
    TraverseComponentViaPreviewStructureParentFirst.traverseUsingComponent(
      CopyChildComponentModeTempPropertiesUtils.copySubcomponentDuringPreviewTraversal.bind(true), activeComponent, componentToBeCopied);
  }

  private static copySubcomponentToMultipleDuringPreviewTraversal(componentToBeCopiedTraversal: SubcomponentPreviewTraversalState,
      ...activeComponentTraversal: SubcomponentPreviewTraversalState[]): SubcomponentPreviewTraversalState {
    activeComponentTraversal.forEach((traversalState) => {
      CopyChildComponentModeTempPropertiesUtils.copySubcomponentDuringPreviewTraversal.bind(false)(traversalState, componentToBeCopiedTraversal);
    });
    return activeComponentTraversal[0];
  }

  public static copyComponentToMultipleTargets(componentToBeCopied: WorkshopComponent, targetComponents: Set<WorkshopComponent>): void {
    TraverseComponentViaPreviewStructureParentFirst.traverseUsingComponent(
      CopyChildComponentModeTempPropertiesUtils.copySubcomponentToMultipleDuringPreviewTraversal, componentToBeCopied, ...targetComponents);
  }

  private static resetOriginalCss(subcomponentProperties: SubcomponentProperties): void {
    if (!subcomponentProperties.tempOriginalCustomProperties) return;
    subcomponentProperties.customCss = subcomponentProperties.tempOriginalCustomProperties.customCss;
    subcomponentProperties.customFeatures = subcomponentProperties.tempOriginalCustomProperties.customFeatures; 
  }

  private static resetSubcomponentProperties(activeComponentTraversal: SubcomponentPreviewTraversalState): SubcomponentPreviewTraversalState {
    const resetSubcomponentProperties = this as any as boolean;
    const activeSubcomponent = activeComponentTraversal.subcomponentProperties;
    if (resetSubcomponentProperties) CopyChildComponentModeTempPropertiesUtils.resetOriginalCss(activeSubcomponent);
    delete activeSubcomponent.tempOriginalCustomProperties;
    return activeComponentTraversal;
  }

  public static cleanComponent(currentlySelectedComponent: WorkshopComponent, resetSubcomponentProperties = true): void {
    const activeComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].seedComponent;
    TraverseComponentViaPreviewStructureParentFirst.traverseUsingComponent(
      CopyChildComponentModeTempPropertiesUtils.resetSubcomponentProperties.bind(resetSubcomponentProperties), activeComponent);
  }

  public static copyLastSelectectedComponentToTarget(activeComponent: WorkshopComponent, componentToBeCopied: WorkshopComponent): void {
    activeComponent.subcomponents
      [activeComponent.activeSubcomponentName].seedComponent.sync.lastSelectedComponentToSync = componentToBeCopied;
  }

  public static deleteLastSelectedComponentToCopy(activeComponent: WorkshopComponent): void {
    delete activeComponent.subcomponents[activeComponent.activeSubcomponentName].seedComponent.sync.lastSelectedComponentToSync;
  }
}
