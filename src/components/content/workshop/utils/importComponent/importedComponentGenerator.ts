import { EntityDisplayStatus, ENTITY_DISPLAY_STATUS_REF } from '../../../../../interfaces/entityDisplayStatus';
import { UniqueSubcomponentNameGenerator } from '../componentGenerator/uniqueSubcomponentNameGenerator';
import { ImportedComponentStructure } from '../../../../../interfaces/importedComponentStructure';
import { Subcomponents, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { CustomSubcomponentNames } from '../../../../../interfaces/customSubcomponentNames';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../consts/coreSubcomponentNames.enum';
import { EntityDisplayStatusUtils } from '../entityDisplayStatus/entityDisplayStatusUtils';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../consts/newComponentTypes.enum';
import { ComponentGenerator } from '../../../../../interfaces/componentGenerator';

export class ImportedComponentGenerator {

  public static readonly DEFAULT_TOP_PROPERTY = '50%';

  public static generateImportedComponentNames(importedComponentBaseName: string): CustomSubcomponentNames {
    const layerName = UniqueSubcomponentNameGenerator.generate(CORE_SUBCOMPONENTS_NAMES.LAYER);
    const textName = UniqueSubcomponentNameGenerator.generate(CORE_SUBCOMPONENTS_NAMES.TEXT);
    return { base: importedComponentBaseName, layer: layerName, text: textName };
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

  public static createImportedComponentSubcomponents(componentGenerator: ComponentGenerator, importedComponentName: string): Subcomponents {
    const importedComponentRef = componentGenerator.createNewComponent(importedComponentName);
    // WORK1: if copy is using addNewImportedComponent instead - the following code should be just taken out to that class and this if
    // statement should then be removed
    if (importedComponentRef.type !== NEW_COMPONENT_TYPES.LAYER) {
      ImportedComponentGenerator.applyTopProperty(importedComponentRef, importedComponentName);
    }
    ImportedComponentGenerator.applyOptionalSubcomponentProperty(importedComponentRef, importedComponentName);
    // referencing the whole component within it's own subcomponent may not be efficient
    // alternative would be to have a placeholder subcomponent to reference it
    importedComponentRef.subcomponents[importedComponentName].importedComponent = { componentRef: importedComponentRef, inSync: false };
    return importedComponentRef.subcomponents;
  }

  public static createImportedComponentStructure(subcomponents: Subcomponents, baseName: string): ImportedComponentStructure {
    (subcomponents[baseName].importedComponent.componentRef.componentPreviewStructure.subcomponentDropdownStructure[baseName]
      .optionalSubcomponentRef as EntityDisplayStatus).isDisplayed = true;
    return {
      baseName,
      component: subcomponents[baseName].importedComponent.componentRef.componentPreviewStructure.subcomponentDropdownStructure,
    };
  }
}
