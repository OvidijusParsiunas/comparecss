import { CoreSubcomponentRefsUtils } from '../../../../utils/componentManipulation/coreSubcomponentRefs/coreSubcomponentRefsUtils';
import { AddContainerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { AlignedSections, BaseSubcomponentRef, Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CoreSubcomponentRefs } from '../../../../../../../interfaces/coreSubcomponentRefs';
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

  public static copyTargetSubcomponent(subcomponentToBeCopied: SubcomponentProperties, activeComponentSubcomponent: SubcomponentProperties): void {
    // WORK2 - this is added to the seed component of the copied child component, does it remain after the component has been successfully added?
    if (!activeComponentSubcomponent.tempOriginalCustomProperties) {
      CopyChildComponentModeTempPropertiesUtils.moveCustomPropertiesToTempProperties(activeComponentSubcomponent);
    }
    CopyChildComponentModeTempPropertiesUtils.copyAllCustomProperties(subcomponentToBeCopied, activeComponentSubcomponent);
  }

  private static copySubcomponent(componentToBeCopied: WorkshopComponent, activeComponentSubcomponentCoreRefs: CoreSubcomponentRefs): void {
    CopyChildComponentModeTempPropertiesUtils.copyTargetSubcomponent(componentToBeCopied.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE],
      activeComponentSubcomponentCoreRefs[SUBCOMPONENT_TYPES.BASE]);
  }

  private static copyAlignedComponents(alignedComponentsToBeCopied: BaseSubcomponentRef[], activeLayerComponents: BaseSubcomponentRef[]): void {
    (alignedComponentsToBeCopied || []).forEach((baseSubcomponentRef: BaseSubcomponentRef, baseSubcomponentIndex) => {
      const alignedComponentToBeCopied = activeLayerComponents[baseSubcomponentIndex];
      if (!alignedComponentToBeCopied) return;
      CopyChildComponentModeTempPropertiesUtils.copySubcomponent(
        alignedComponentToBeCopied.subcomponentProperties.seedComponent, baseSubcomponentRef.subcomponentProperties.seedComponent.coreSubcomponentRefs);
    });
  }

  private static copyAlignedSections(alignedSectionsToBeCopied: AlignedSections, activeAlignedSections: AlignedSections): void {
    Object.keys(alignedSectionsToBeCopied).forEach((alignedSection) => {
      CopyChildComponentModeTempPropertiesUtils.copyAlignedComponents(
        alignedSectionsToBeCopied[alignedSection], activeAlignedSections[alignedSection]);
    });
  }

  private static copyLayers(layersToBeCopied: Layer[], activeLayers: Layer[]): void {
    activeLayers.forEach((layer, layerIndex) => {
      const layerToBeCopied = layersToBeCopied[layerIndex];
      CopyChildComponentModeTempPropertiesUtils.copyAlignedSections(layerToBeCopied.sections.alignedSections, layer.sections.alignedSections);
      CopyChildComponentModeTempPropertiesUtils.copySubcomponent(
        layerToBeCopied.subcomponentProperties.seedComponent, layer.subcomponentProperties.seedComponent.coreSubcomponentRefs);
    });
  }

  private static copyComponent(componentToBeCopied: WorkshopComponent, activeComponent: WorkshopComponent): void {
    CopyChildComponentModeTempPropertiesUtils.copySubcomponent(componentToBeCopied, activeComponent.coreSubcomponentRefs);
    CopyChildComponentModeTempPropertiesUtils.copyLayers(
      componentToBeCopied.componentPreviewStructure.layers, activeComponent.componentPreviewStructure.layers);
  }

  private static copyPaddingComponentChild(paddingChildToBeCopied: WorkshopComponent, activePaddingChild: WorkshopComponent): void {
    CopyChildComponentModeTempPropertiesUtils.copyComponent(paddingChildToBeCopied, activePaddingChild);
    activePaddingChild.linkedComponents.auxiliary.forEach((auxiliaryComponent, index) => {
      CopyChildComponentModeTempPropertiesUtils.copyComponent(paddingChildToBeCopied.linkedComponents.auxiliary[index], auxiliaryComponent);
    });
  }

  public static setActiveComponentToChildComponentCopy(componentToBeCopied: WorkshopComponent, currentlySelectedComponent: WorkshopComponent): void {
    const activeComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].seedComponent;
    CopyChildComponentModeTempPropertiesUtils.copyComponent(componentToBeCopied, activeComponent);
    if (componentToBeCopied.paddingComponentChild) {
      CopyChildComponentModeTempPropertiesUtils.copyPaddingComponentChild(componentToBeCopied.paddingComponentChild, activeComponent.paddingComponentChild);
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
