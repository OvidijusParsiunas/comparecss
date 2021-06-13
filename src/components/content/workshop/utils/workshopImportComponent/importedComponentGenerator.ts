import { CUSTOM_SUBCOMPONENT_NAMES_PREFIXES } from '../../../../../consts/customSubcomponentNamesPrefixes.enum';
import { EntityDisplayStatus, ENTITY_DISPLAY_STATUS_REF } from '../../../../../interfaces/entityDisplayStatus';
import { ImportedComponentStructure } from '../../../../../interfaces/importedComponentStructure';
import { Subcomponents, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { CustomSubcomponentNames } from '../../../../../interfaces/customSubcomponentNames';
import { EntityDisplayStatusUtils } from '../entityDisplayStatus/entityDisplayStatusUtils';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { ComponentGenerator } from '../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../consts/layerSections.enum';

export class ImportedComponentGenerator {

  public static readonly DEFAULT_TOP_PROPERTY = '50%';

  public static generateImportedComponentNames(importedComponentBaseName: string, importedComponentId: number): CustomSubcomponentNames {
    const spaces = new Array(importedComponentId).join(' ');
    return { base: importedComponentBaseName, layer: `${CUSTOM_SUBCOMPONENT_NAMES_PREFIXES.LAYER}${spaces}`, text: `${CUSTOM_SUBCOMPONENT_NAMES_PREFIXES.TEXT}${spaces}`};
  }

  private static applyTopProperty(importedComponentRef: WorkshopComponent, importedComponentName: string): void {
    const customCssProperties = importedComponentRef.subcomponents[importedComponentName].customCss[CSS_PSEUDO_CLASSES.DEFAULT];
    const defaultCustomCssProperties = importedComponentRef.subcomponents[importedComponentName].defaultCss[CSS_PSEUDO_CLASSES.DEFAULT];
    if (!customCssProperties.top) {
      customCssProperties.top = ImportedComponentGenerator.DEFAULT_TOP_PROPERTY;
      defaultCustomCssProperties.top = ImportedComponentGenerator.DEFAULT_TOP_PROPERTY;
    }
  }

  private static applyOptionalSubcomponentProperty(importedComponentRef: WorkshopComponent, importedComponentName: string): void {
    const baseSubcomponent = importedComponentRef.subcomponents[importedComponentName];
    baseSubcomponent.subcomponentDisplayStatus = EntityDisplayStatusUtils.createDefaultEntityDisplayStatus();
    importedComponentRef.componentPreviewStructure.subcomponentDropdownStructure
      [importedComponentName][ENTITY_DISPLAY_STATUS_REF] = baseSubcomponent.subcomponentDisplayStatus;
  }

  public static createImportedComponents(componentGenerator: ComponentGenerator, importedComponentName: string, importedComponentId: number,
      subcomponentText?: string): Subcomponents {
    const importedComponentRef = componentGenerator.createNewComponent(importedComponentName, importedComponentId, subcomponentText);
    ImportedComponentGenerator.applyTopProperty(importedComponentRef, importedComponentName);
    ImportedComponentGenerator.applyOptionalSubcomponentProperty(importedComponentRef, importedComponentName);
    // referencing the whole component within it's own subcomponent may not be efficient
    // alternative would be to have a placeholder subcomponent to reference it
    importedComponentRef.subcomponents[importedComponentName].importedComponent = { componentRef: importedComponentRef, inSync: false };
    return importedComponentRef.subcomponents;
  }

  public static createImportedComponentStructure(subcomponents: Subcomponents, baseName: string, alignment?: ALIGNED_SECTION_TYPES,
      isComponentDisplayed = true): ImportedComponentStructure {
    (subcomponents[baseName].importedComponent.componentRef.componentPreviewStructure.subcomponentDropdownStructure[baseName]
      .optionalSubcomponentRef as EntityDisplayStatus).isDisplayed = isComponentDisplayed;
    if (alignment) {
      subcomponents[baseName].importedComponent.componentRef.subcomponents[baseName].customFeatures.alignedLayerSection.section = alignment;
    }
    return {
      baseName,
      component: subcomponents[baseName].importedComponent.componentRef.componentPreviewStructure.subcomponentDropdownStructure,
    };
  }
}
