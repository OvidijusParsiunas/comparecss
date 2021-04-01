import { SubcomponentProperties, Subcomponents } from '../../../interfaces/workshopComponent';
import { SUB_COMPONENTS } from '../../../consts/subcomponentModes.enum';

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
  
  private static createLayer(layerName: SUB_COMPONENTS, layerSubcomponent: SubcomponentProperties, layerSubcomponentsStructure: any, allSubcomponents: Subcomponents): any {
    const layerObject = {
      customCss: layerSubcomponent.customCss,
      subcomponentType: layerName,
      nestedSubcomponents: {
        [layerSubcomponent.layerSectionsType]: {},
      }
    };
    if (layerSubcomponent.layerSectionsType === NESTED_SECTIONS_TYPES.ALIGNED_SECTIONS) {
      layerObject.nestedSubcomponents[NESTED_SECTIONS_TYPES.ALIGNED_SECTIONS][ALIGNED_SECTION_COLUMNS.LEFT] = {};
      layerObject.nestedSubcomponents[NESTED_SECTIONS_TYPES.ALIGNED_SECTIONS][ALIGNED_SECTION_COLUMNS.CENTER] = {};
      layerObject.nestedSubcomponents[NESTED_SECTIONS_TYPES.ALIGNED_SECTIONS][ALIGNED_SECTION_COLUMNS.RIGHT] = {};
      Object.keys(layerSubcomponentsStructure).forEach((subcomponentName: SUB_COMPONENTS) => {
        layerObject.nestedSubcomponents[layerSubcomponent.layerSectionsType][allSubcomponents[subcomponentName].alignedLayerSection][subcomponentName] = allSubcomponents[subcomponentName];
        allSubcomponents[subcomponentName].customFeatures.layerObject = layerObject;
        allSubcomponents[subcomponentName].defaultCustomFeatures.layerObject = layerObject;
      });
    }
    return layerObject;
  }
  
  public static createLayers(subcomponentBase: any, subcomponents: Subcomponents): any {
    const layers = [];
    Object.keys(subcomponentBase).forEach((subcomponentName: SUB_COMPONENTS) => {
      if (subcomponents[subcomponentName].category === SUBCOMPONENT_CATEGORIES.LAYER) {
        layers.push(PreviewStructure.createLayer(subcomponentName, subcomponents[subcomponentName], subcomponentBase[subcomponentName], subcomponents));
      }
    })
    return layers;
  }
}
