import { AlignedSections, ComponentPreviewStructure, Layer, NestedSubcomponent } from '../../../../../interfaces/componentPreviewStructure';
import { SubcomponentProperties, Subcomponents } from '../../../../../interfaces/workshopComponent';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../consts/layerSections';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../consts/coreSubcomponentNames.enum';
import { NestedDropdownStructure } from '../../../../../interfaces/nestedDropdownStructure';
import { CustomSubcomponentNames } from '../../../../../interfaces/customSubcomponentNames';

export default class PreviewStructure {

  private static addLayerToSubcomponentCustomFeatures(layer: Layer, subcomponentName: string,
      allSubcomponents: Subcomponents): void {
    allSubcomponents[subcomponentName].customFeatures.parentLayer = layer;
    allSubcomponents[subcomponentName].defaultCustomFeatures.parentLayer = layer;
  }

  private static addSubcomponentToEqualSplitSection(layer: Layer, layerSubcomponent: SubcomponentProperties,
      subcomponentName: string, allSubcomponents: Subcomponents): void {
    (layer.sections[layerSubcomponent.layerSectionsType] as NestedSubcomponent[]).push(
      PreviewStructure.createNestedSubcomponent(subcomponentName, allSubcomponents[subcomponentName]));
  }

  private static populateEqualSplitSections(layer: Layer, layerSubcomponent: SubcomponentProperties,
      layerSubcomponentsStructure: NestedDropdownStructure, allSubcomponents: Subcomponents): void {
    layer.sections[LAYER_SECTIONS_TYPES.EQUAL_SPLIT_SECTIONS] = [];
    Object.keys(layerSubcomponentsStructure).forEach((subcomponentName: string) => {
      PreviewStructure.addSubcomponentToEqualSplitSection(layer, layerSubcomponent, subcomponentName, allSubcomponents);
      PreviewStructure.addLayerToSubcomponentCustomFeatures(layer, subcomponentName, allSubcomponents);
    });
  }

  private static createNestedSubcomponent(name: string, subcomponentProperties: SubcomponentProperties): NestedSubcomponent {
    return { name, subcomponentProperties };
  }

  private static addSubcomponentToAlignedSection(layer: Layer, layerSubcomponent: SubcomponentProperties,
      subcomponentName: string, allSubcomponents: Subcomponents): void {
    layer.sections[layerSubcomponent.layerSectionsType][allSubcomponents[subcomponentName].customFeatures.alignedLayerSection.section].push(
        PreviewStructure.createNestedSubcomponent(subcomponentName, allSubcomponents[subcomponentName]));
  }

  private static createEmptyAlignedSections(): AlignedSections {
    return {
      [ALIGNED_SECTION_TYPES.LEFT]: [],
      [ALIGNED_SECTION_TYPES.CENTER]: [],
      [ALIGNED_SECTION_TYPES.RIGHT]: [],
    }
  }

  private static populateAlignedSections(layer: Layer, layerSubcomponent: SubcomponentProperties,
      layerSubcomponentsStructure: NestedDropdownStructure, allSubcomponents: Subcomponents): void {
    layer.sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS] = PreviewStructure.createEmptyAlignedSections();
    Object.keys(layerSubcomponentsStructure).forEach((subcomponentName: string) => {
      PreviewStructure.addSubcomponentToAlignedSection(layer, layerSubcomponent, subcomponentName, allSubcomponents);
      PreviewStructure.addLayerToSubcomponentCustomFeatures(layer, subcomponentName, allSubcomponents);
    });
  }
  
  private static createEmptyLayer(layerName: string, layerSubcomponent: SubcomponentProperties): Layer {
    return {
      customCss: layerSubcomponent.customCss,
      subcomponentType: layerName,
      sections: {
        [layerSubcomponent.layerSectionsType]: {},
      }
    };
  }

  private static createLayer(layerName: string, layerSubcomponent: SubcomponentProperties,
      layerSubcomponentsStructure: NestedDropdownStructure, allSubcomponents: Subcomponents): Layer {
    const layer = PreviewStructure.createEmptyLayer(layerName, layerSubcomponent);
    if (layerSubcomponent.layerSectionsType === LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS) {
      PreviewStructure.populateAlignedSections(layer, layerSubcomponent, layerSubcomponentsStructure, allSubcomponents)
    } else if (layerSubcomponent.layerSectionsType === LAYER_SECTIONS_TYPES.EQUAL_SPLIT_SECTIONS) {
      PreviewStructure.populateEqualSplitSections(layer, layerSubcomponent, layerSubcomponentsStructure, allSubcomponents);
    }
    return layer;
  }
  
  private static createLayers(subcomponentBase: NestedDropdownStructure, subcomponents: Subcomponents, subcomponentNames?: CustomSubcomponentNames): Layer[] {
    // if subcomponentDropdownStructure contains layers
    if (subcomponents[Object.keys(subcomponentBase)[0]].layerSectionsType) {
      return Object.keys(subcomponentBase).map((subcomponentName: string) =>
        PreviewStructure.createLayer(subcomponentName, subcomponents[subcomponentName],
          subcomponentBase[subcomponentName] as NestedDropdownStructure, subcomponents)
      );
    }
    const layerName = subcomponentNames ? subcomponentNames.layer : CORE_SUBCOMPONENTS_NAMES.LAYER_1;
    return [PreviewStructure.createLayer(layerName, subcomponents[layerName],
      subcomponentBase as NestedDropdownStructure, subcomponents)];
  }

  public static createComponentPreviewStructure(subcomponentDropdownStructure: NestedDropdownStructure,
      subcomponents: Subcomponents, subcomponentNames?: CustomSubcomponentNames): ComponentPreviewStructure {
    const layers = PreviewStructure.createLayers(
      subcomponentDropdownStructure[subcomponentNames ? subcomponentNames.base : CORE_SUBCOMPONENTS_NAMES.BASE] as NestedDropdownStructure,
      subcomponents, subcomponentNames);
    return {
      baseCss: subcomponents[subcomponentNames ? subcomponentNames.base : CORE_SUBCOMPONENTS_NAMES.BASE],
      layeringType: 'vertical',
      layers,
      subcomponentDropdownStructure,
    };
  }
}