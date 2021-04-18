import { CUSTOM_SUBCOMPONENT_NAMES_PREFIXES } from '../../../../../consts/customSubcomponentNamesPrefixes.enum';
import { ImportedComponentStructure } from '../../../../../interfaces/importedComponentStructure';
import { Subcomponents, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { CustomSubcomponentNames } from '../../../../../interfaces/customSubcomponentNames';
import { EntityDisplayStatusUtils } from '../entityDisplayStatus/entityDisplayStatusUtils';
import { ENTITY_DISPLAY_STATUS_REF } from '../../../../../interfaces/entityDisplayStatus';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { ComponentGenerator } from '../../../../../interfaces/componentGenerator';

export default class ImportedSubcomponentProperties {

  public static DEFAULT_TOP_PROPERTY = '50%';

  public static generateImportedSubcomponentNames(importedSubcomponentBaseName: string, importedSubcomponentId: number): CustomSubcomponentNames {
    const spaces = new Array(importedSubcomponentId).join(' ');
    return { base: importedSubcomponentBaseName, layer: `${CUSTOM_SUBCOMPONENT_NAMES_PREFIXES.LAYER}${spaces}`, text: `${CUSTOM_SUBCOMPONENT_NAMES_PREFIXES.TEXT}${spaces}`};
  }

  private static applyTopProperty(importedComponentRef: WorkshopComponent, importedComponentName: string): void {
    const customCssProperties = importedComponentRef.subcomponents[importedComponentName].customCss[CSS_PSEUDO_CLASSES.DEFAULT];
    const defaultCustomCssProperties = importedComponentRef.subcomponents[importedComponentName].defaultCss[CSS_PSEUDO_CLASSES.DEFAULT];
    if (!customCssProperties.top) {
      customCssProperties.top = ImportedSubcomponentProperties.DEFAULT_TOP_PROPERTY;
      defaultCustomCssProperties.top = ImportedSubcomponentProperties.DEFAULT_TOP_PROPERTY;
    }
  }

  private static applyOptionalSubcomponentProperty(importedComponentRef: WorkshopComponent, importedComponentName: string): void {
    const baseSubcomponent = importedComponentRef.subcomponents[importedComponentName];
    baseSubcomponent.subcomponentDisplayStatus = EntityDisplayStatusUtils.createDefaultEntityDisplayStatus();
    importedComponentRef.componentPreviewStructure.subcomponentDropdownStructure
      [importedComponentName][ENTITY_DISPLAY_STATUS_REF] = baseSubcomponent.subcomponentDisplayStatus;
  }

  public static createImportedSubcomponents(componentGenerator: ComponentGenerator, importedComponentName: string, importedComponentId: number): Subcomponents {
    const importedComponentRef = componentGenerator.createNewComponent(importedComponentName, importedComponentId);
    // WORK3: IMPORT COMPONENT
    // take into consideration that when importing existing component, the default will need to be recreated
    ImportedSubcomponentProperties.applyTopProperty(importedComponentRef, importedComponentName);
    ImportedSubcomponentProperties.applyOptionalSubcomponentProperty(importedComponentRef, importedComponentName);
    // referencing the whole component within it's own subcomponent may not be efficient
    // alternative would be to have a placeholder subcomponent to reference it
    importedComponentRef.subcomponents[importedComponentName].importedComponent = { componentRef: importedComponentRef, inSync: false };
    return importedComponentRef.subcomponents;
  }

  public static createImportedComponentStructure(subcomponents: Subcomponents, baseName: string): ImportedComponentStructure {
    return {
      baseName,
      component: subcomponents[baseName].importedComponent.componentRef.componentPreviewStructure.subcomponentDropdownStructure,
    };
  }
}
