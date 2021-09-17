import { CoreSubcomponentRefsUtils } from '../../../../utils/componentManipulation/coreSubcomponentRefs/coreSubcomponentRefsUtils';
import { AddContainerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { BaseSubcomponentRef } from '../../../../../../../interfaces/componentPreviewStructure';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CoreSubcomponentRefs } from '../../../../../../../interfaces/coreSubcomponentRefs';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import JSONUtils from '../../../../utils/generic/jsonUtils';

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

  private static copyComponentSpecificProperties(subcomponentToBeCopied: SubcomponentProperties, activeComponentSubcomponent: SubcomponentProperties): void {
    activeComponentSubcomponent.customCss = subcomponentToBeCopied.customCss;
    JSONUtils.copyPropertiesThatExistInTarget(activeComponentSubcomponent.customFeatures, subcomponentToBeCopied.customFeatures);
  }

  public static copyTargetSubcomponent(subcomponentToBeCopied: SubcomponentProperties, activeComponentSubcomponent: SubcomponentProperties): void {
    // WORK2 - this is added to the seed component of the copied child component, does it remain after the component has been successfully added?
    if (!activeComponentSubcomponent.tempOriginalCustomProperties) {
      CopyChildComponentModeTempPropertiesUtils.moveCustomPropertiesToTempProperties(activeComponentSubcomponent);
    }
    // WORK2 - not sure if this is required any more
    if (subcomponentToBeCopied.seedComponent.type !== activeComponentSubcomponent.seedComponent.type) {
      CopyChildComponentModeTempPropertiesUtils.copyComponentSpecificProperties(subcomponentToBeCopied, activeComponentSubcomponent);
    } else {
      CopyChildComponentModeTempPropertiesUtils.copyAllCustomProperties(subcomponentToBeCopied, activeComponentSubcomponent);
    }
  }

  // WORK2 - need to take care of instances when certain subcomponents are not available, e.g. button icon
  private static copySubcomponent(componentToBeCopied: WorkshopComponent, activeComponentSubcomponentCoreRefs: CoreSubcomponentRefs): void {
    CopyChildComponentModeTempPropertiesUtils.copyTargetSubcomponent(componentToBeCopied.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE],
      activeComponentSubcomponentCoreRefs[SUBCOMPONENT_TYPES.BASE]);
  }

  private static copyComponent(componentToBeCopied: WorkshopComponent, activeComponent: WorkshopComponent): void {
    CopyChildComponentModeTempPropertiesUtils.copySubcomponent(componentToBeCopied, activeComponent.coreSubcomponentRefs);
    activeComponent.componentPreviewStructure.layers.forEach((layer, layerIndex) => {
      const { alignedSections } = layer.sections;
      Object.keys(alignedSections).forEach((alignedSection) => {
        (alignedSections[alignedSection] || []).forEach((baseSubcomponentRef: BaseSubcomponentRef, baseSubcomponentIndex) => {
          if (!(componentToBeCopied.componentPreviewStructure.layers[layerIndex].sections.alignedSections[alignedSection] as BaseSubcomponentRef[])[baseSubcomponentIndex]) return;
          CopyChildComponentModeTempPropertiesUtils.copySubcomponent(
            (componentToBeCopied.componentPreviewStructure.layers[layerIndex].sections.alignedSections[alignedSection] as BaseSubcomponentRef[])[baseSubcomponentIndex].subcomponentProperties.seedComponent,
            baseSubcomponentRef.subcomponentProperties.seedComponent.coreSubcomponentRefs);
        });
      });
      CopyChildComponentModeTempPropertiesUtils.copySubcomponent(componentToBeCopied.componentPreviewStructure.layers[layerIndex].subcomponentProperties.seedComponent, layer.subcomponentProperties.seedComponent.coreSubcomponentRefs);
    });
  }

  // WORK2 - refactor
  private static copyPaddingComponent(componentToBeCopied: WorkshopComponent, activeComponent: WorkshopComponent): void {
    CopyChildComponentModeTempPropertiesUtils.copyComponent(componentToBeCopied, activeComponent);
    CopyChildComponentModeTempPropertiesUtils.copyComponent(componentToBeCopied.paddingComponentChild, activeComponent.paddingComponentChild);
    activeComponent.paddingComponentChild.linkedComponents.auxiliary.forEach((auxiliaryComponent, index) => {
      CopyChildComponentModeTempPropertiesUtils.copyComponent(componentToBeCopied.paddingComponentChild.linkedComponents.auxiliary[index], auxiliaryComponent);
    });
  }

  // WORK2 - refactor
  public static setActiveComponentToCopyChildComponent(componentToBeCopied: WorkshopComponent, activeComponent: WorkshopComponent): void {
    if (componentToBeCopied.paddingComponentChild) {
      CopyChildComponentModeTempPropertiesUtils.copyPaddingComponent(componentToBeCopied, activeComponent.subcomponents[activeComponent.activeSubcomponentName].seedComponent);
    } else {
      CopyChildComponentModeTempPropertiesUtils.copyComponent(componentToBeCopied, activeComponent.subcomponents[activeComponent.activeSubcomponentName].seedComponent);
    } 
  }

  private static resetOriginalCss(subcomponentProperties: SubcomponentProperties): void {
    subcomponentProperties.customCss = subcomponentProperties.tempOriginalCustomProperties.customCss;
    subcomponentProperties.customFeatures = subcomponentProperties.tempOriginalCustomProperties.customFeatures; 
  }

  public static cleanComponent(activeComponent: WorkshopComponent, resetOriginalProperties: boolean): void {
    const { coreSubcomponentRefs } = activeComponent.subcomponents[activeComponent.activeSubcomponentName].seedComponent;
    const coreSubcomponentRefsArray = CoreSubcomponentRefsUtils.getActiveRefsArray(coreSubcomponentRefs);
    for (let i = 0; i < coreSubcomponentRefsArray.length; i += 1) {
      const activeSubcomponent = coreSubcomponentRefsArray[i];
      if (!activeSubcomponent.tempOriginalCustomProperties) break;
      if (resetOriginalProperties) { CopyChildComponentModeTempPropertiesUtils.resetOriginalCss(activeSubcomponent); }
      delete activeSubcomponent.tempOriginalCustomProperties;
    }
  }

  public static setLastSelectectedComponentToCopy(componentToBeCopied: WorkshopComponent, activeComponent: WorkshopComponent): void {
    activeComponent.subcomponents
      [activeComponent.activeSubcomponentName].seedComponent.sync.lastSelectedComponentToSync = componentToBeCopied;
  }

  public static deleteLastSelectedComponentToCopy(activeComponent: WorkshopComponent): void {
    delete activeComponent.subcomponents[activeComponent.activeSubcomponentName].seedComponent.sync.lastSelectedComponentToSync;
  }
}
