import { AlignedSections, ComponentPreviewStructure, Layer } from '../../../interfaces/componentPreviewStructure';
import { SubcomponentProperties, Subcomponents } from '../../../interfaces/workshopComponent';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../consts/layerSections';
import { NestedDropdownStructure } from '../../../interfaces/nestedDropdownStructure';
import { SUB_COMPONENTS } from '../../../consts/subcomponentModes.enum';

export default class PreviewStructure {

  private static addLayerToSubcomponentCustomFeatures(layer: Layer, subcomponentName: SUB_COMPONENTS,
      allSubcomponents: Subcomponents): void {
    allSubcomponents[subcomponentName].customFeatures.parentLayer = layer;
    allSubcomponents[subcomponentName].defaultCustomFeatures.parentLayer = layer;
  }

  private static addSubcomponentToAlignedSection(layer: Layer, layerSubcomponent: SubcomponentProperties,
      subcomponentName: SUB_COMPONENTS, allSubcomponents: Subcomponents): void {
    layer.sections[layerSubcomponent.layerSectionsType]
      [allSubcomponents[subcomponentName].alignedLayerSection][subcomponentName] = allSubcomponents[subcomponentName];
  }

  private static createEmptyAlignedSections(): AlignedSections {
    return {
      [ALIGNED_SECTION_TYPES.LEFT]: {},
      [ALIGNED_SECTION_TYPES.CENTER]: {},
      [ALIGNED_SECTION_TYPES.RIGHT]: {},
    }
  }

  private static populateAlignedSections(layer: Layer, layerSubcomponent: SubcomponentProperties,
      layerSubcomponentsStructure: NestedDropdownStructure, allSubcomponents: Subcomponents): void {
    layer.sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS] = PreviewStructure.createEmptyAlignedSections();
    Object.keys(layerSubcomponentsStructure).forEach((subcomponentName: SUB_COMPONENTS) => {
      PreviewStructure.addSubcomponentToAlignedSection(layer, layerSubcomponent, subcomponentName, allSubcomponents);
      PreviewStructure.addLayerToSubcomponentCustomFeatures(layer, subcomponentName, allSubcomponents);
    });
  }
  
  private static createEmptyLayer(layerName: SUB_COMPONENTS, layerSubcomponent: SubcomponentProperties): Layer {
    return {
      customCss: layerSubcomponent.customCss,
      subcomponentType: layerName,
      sections: {
        [layerSubcomponent.layerSectionsType]: {},
      }
    };
  }

  private static createLayer(layerName: SUB_COMPONENTS, layerSubcomponent: SubcomponentProperties,
      layerSubcomponentsStructure: NestedDropdownStructure, allSubcomponents: Subcomponents): Layer {
    const layer = PreviewStructure.createEmptyLayer(layerName, layerSubcomponent);
    if (layerSubcomponent.layerSectionsType === LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS) {
      PreviewStructure.populateAlignedSections(layer, layerSubcomponent, layerSubcomponentsStructure, allSubcomponents)
    } else if (layerSubcomponent.layerSectionsType === LAYER_SECTIONS_TYPES.EQUAL_SPLIT_SECTIONS) {
      // WORK1
    }
    return layer;
  }
  
  private static createLayers(subcomponentBase: NestedDropdownStructure, subcomponents: Subcomponents): Layer[] {
    const layers = [];
    Object.keys(subcomponentBase).forEach((subcomponentName: SUB_COMPONENTS) => {
      if (subcomponents[subcomponentName].layerSectionsType) {
        layers.push(PreviewStructure.createLayer(subcomponentName, subcomponents[subcomponentName],
          subcomponentBase[subcomponentName] as NestedDropdownStructure, subcomponents));
      }
      // else used for button component
    })
    return layers;
  }

  public static createComponentPreviewStructure(subcomponentDropdownStructure: NestedDropdownStructure,
      subcomponents: Subcomponents): ComponentPreviewStructure {
    const layers = PreviewStructure.createLayers(
      subcomponentDropdownStructure[SUB_COMPONENTS.BASE] as NestedDropdownStructure, subcomponents);
    return {
      baseCss: subcomponents[SUB_COMPONENTS.BASE],
      layeringType: 'vertical',
      layers,
      subcomponentDropdownStructure,
    }
  }
}
