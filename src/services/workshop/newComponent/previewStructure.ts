import { SubcomponentProperties, Subcomponents } from '../../../interfaces/workshopComponent';
import { NestedDropdownStructure } from '../../../interfaces/nestedDropdownStructure';
import { SUB_COMPONENTS } from '../../../consts/subcomponentModes.enum';

// WORK1: export these
enum SUBCOMPONENT_CATEGORIES {
  BASE, LAYER, NESTED,
}

enum NESTED_SECTIONS_TYPES {
  ALIGNED_SECTIONS = 'alignedSections', EQUAL_SPLIT_SECTIONS = 'equalSplitSections',
}

enum ALIGNED_SECTION_COLUMNS {
  LEFT = 'left', CENTER = 'center', RIGHT = 'right',
}

export default class PreviewStructure {

  private static addLayerToSubcomponentCustomFeatures(layerObject: any, subcomponentName: SUB_COMPONENTS,
      allSubcomponents: Subcomponents): void {
    allSubcomponents[subcomponentName].customFeatures.layerObject = layerObject;
    allSubcomponents[subcomponentName].defaultCustomFeatures.layerObject = layerObject;
  }

  private static addSubcomponentToAlignedSection(layerObject: any, layerSubcomponent: SubcomponentProperties,
      subcomponentName: SUB_COMPONENTS, allSubcomponents: Subcomponents): void {
    layerObject.nestedSubcomponents[layerSubcomponent.layerSectionsType]
      [allSubcomponents[subcomponentName].alignedLayerSection][subcomponentName] = allSubcomponents[subcomponentName];
  }

  private static addEmptyObjectsToAlignedSections(layerObject: any): void {
    layerObject.nestedSubcomponents[NESTED_SECTIONS_TYPES.ALIGNED_SECTIONS][ALIGNED_SECTION_COLUMNS.LEFT] = {};
    layerObject.nestedSubcomponents[NESTED_SECTIONS_TYPES.ALIGNED_SECTIONS][ALIGNED_SECTION_COLUMNS.CENTER] = {};
    layerObject.nestedSubcomponents[NESTED_SECTIONS_TYPES.ALIGNED_SECTIONS][ALIGNED_SECTION_COLUMNS.RIGHT] = {};
  }

  private static populateAlignedSections(layerObject: any, layerSubcomponent: SubcomponentProperties, layerSubcomponentsStructure: any,
      allSubcomponents: Subcomponents): void {
    PreviewStructure.addEmptyObjectsToAlignedSections(layerObject);
    Object.keys(layerSubcomponentsStructure).forEach((subcomponentName: SUB_COMPONENTS) => {
      PreviewStructure.addSubcomponentToAlignedSection(layerObject, layerSubcomponent, subcomponentName, allSubcomponents);
      PreviewStructure.addLayerToSubcomponentCustomFeatures(layerObject, subcomponentName, allSubcomponents);
    });
  }
  
  private static createLayerObject(layerName: SUB_COMPONENTS, layerSubcomponent: SubcomponentProperties): any {
    return {
      customCss: layerSubcomponent.customCss,
      subcomponentType: layerName,
      nestedSubcomponents: {
        [layerSubcomponent.layerSectionsType]: {},
      }
    };
  }

  private static createLayer(layerName: SUB_COMPONENTS, layerSubcomponent: SubcomponentProperties, layerSubcomponentsStructure: any,
      allSubcomponents: Subcomponents): any {
    const layerObject = PreviewStructure.createLayerObject(layerName, layerSubcomponent);
    if (layerSubcomponent.layerSectionsType === NESTED_SECTIONS_TYPES.ALIGNED_SECTIONS) {
      PreviewStructure.populateAlignedSections(layerObject, layerSubcomponent, layerSubcomponentsStructure, allSubcomponents)
    } else if (layerSubcomponent.layerSectionsType === NESTED_SECTIONS_TYPES.EQUAL_SPLIT_SECTIONS) {
      // WORK1
    }
    return layerObject;
  }
  
  public static createLayers(subcomponentBase: any, subcomponents: Subcomponents): any {
    const layers = [];
    Object.keys(subcomponentBase).forEach((subcomponentName: SUB_COMPONENTS) => {
      if (subcomponents[subcomponentName].category === SUBCOMPONENT_CATEGORIES.LAYER) {
        layers.push(PreviewStructure.createLayer(subcomponentName, subcomponents[subcomponentName],
          subcomponentBase[subcomponentName], subcomponents));
      }
    })
    return layers;
  }

  public static createSubcomponentDropdownDructure(subcomponentDropdownStructure: NestedDropdownStructure, subcomponents: Subcomponents): any {
    const layers = PreviewStructure.createLayers(subcomponentDropdownStructure[SUB_COMPONENTS.BASE], subcomponents);
    return {
      baseCss: subcomponents[SUB_COMPONENTS.BASE],
      layeringType: 'vertical',
      layers,
      subcomponentDropdownStructure,
    }
  }
}
