import { AlignedSections, ComponentPreviewStructure, Layer, NestedSubcomponent } from '../../../../../interfaces/componentPreviewStructure';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../consts/layerSections.enum';
import { SubcomponentProperties, Subcomponents } from '../../../../../interfaces/workshopComponent';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../consts/coreSubcomponentNames.enum';
import { CustomSubcomponentNames } from '../../../../../interfaces/customSubcomponentNames';
import { NestedDropdownStructure } from '../../../../../interfaces/nestedDropdownStructure';
import { EntityDisplayStatusUtils } from '../entityDisplayStatus/entityDisplayStatusUtils';
import { ENTITY_DISPLAY_STATUS_REF } from '../../../../../interfaces/entityDisplayStatus';

export default class PreviewStructure {

  private static createNestedSubcomponent(name: string, subcomponentProperties: SubcomponentProperties): NestedSubcomponent {
    return { name, subcomponentProperties };
  }

  private static addSubcomponentToEqualSplitSection(layer: Layer, layerSubcomponent: SubcomponentProperties,
      subcomponentName: string, allSubcomponents: Subcomponents): void {
    (layer.sections[layerSubcomponent.layerSectionsType] as NestedSubcomponent[]).push(
      PreviewStructure.createNestedSubcomponent(subcomponentName, allSubcomponents[subcomponentName]));
  }

  private static populateEqualSplitSections(layer: Layer, layerSubcomponent: SubcomponentProperties,
      layerSubcomponentsStructure: NestedDropdownStructure, allSubcomponents: Subcomponents): void {
    Object.keys(layerSubcomponentsStructure).forEach((subcomponentName: string) => {
      PreviewStructure.addSubcomponentToEqualSplitSection(layer, layerSubcomponent, subcomponentName, allSubcomponents);
      allSubcomponents[subcomponentName].parentLayer = layer;
    });
  }

  private static addSubcomponentToAlignedSection(layer: Layer, layerSubcomponent: SubcomponentProperties,
      subcomponentName: string, allSubcomponents: Subcomponents): void {
    layer.sections[layerSubcomponent.layerSectionsType][allSubcomponents[subcomponentName].customFeatures.alignedLayerSection.section].push(
        PreviewStructure.createNestedSubcomponent(subcomponentName, allSubcomponents[subcomponentName]));
  }

  private static populateAlignedSections(layer: Layer, layerSubcomponent: SubcomponentProperties,
      layerSubcomponentsStructure: NestedDropdownStructure, allSubcomponents: Subcomponents): void {
    Object.keys(layerSubcomponentsStructure).forEach((subcomponentName: string) => {
      if (subcomponentName === ENTITY_DISPLAY_STATUS_REF) return;
      PreviewStructure.addSubcomponentToAlignedSection(layer, layerSubcomponent, subcomponentName, allSubcomponents);
      allSubcomponents[subcomponentName].parentLayer = layer;
    });
  }

  private static createEmptyAlignedSections(): AlignedSections {
    return {
      [ALIGNED_SECTION_TYPES.LEFT]: [],
      [ALIGNED_SECTION_TYPES.CENTER]: [],
      [ALIGNED_SECTION_TYPES.RIGHT]: [],
    }
  }

  public static createEmptyLayer(layerName: string, layerSubcomponent: SubcomponentProperties): Layer {
    const layerSections = layerSubcomponent.layerSectionsType === LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS
      ? PreviewStructure.createEmptyAlignedSections() : [];
    return {
      name: layerName,
      subcomponentProperties: layerSubcomponent,
      sections: {
        [layerSubcomponent.layerSectionsType]: layerSections,
      }
    };
  }

  private static createLayer(layerName: string, layerSubcomponent: SubcomponentProperties,
      layerSubcomponentsStructure: NestedDropdownStructure, allSubcomponents: Subcomponents): Layer {
    const layer = PreviewStructure.createEmptyLayer(layerName, layerSubcomponent);
    if (layerSubcomponent.layerSectionsType === LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS) {
      PreviewStructure.populateAlignedSections(layer, layerSubcomponent, layerSubcomponentsStructure, allSubcomponents);
    } else if (layerSubcomponent.layerSectionsType === LAYER_SECTIONS_TYPES.EQUAL_SPLIT_SECTIONS) {
      PreviewStructure.populateEqualSplitSections(layer, layerSubcomponent, layerSubcomponentsStructure, allSubcomponents);
    }
    return layer;
  }
  
  private static createLayers(dropdownStructure: NestedDropdownStructure, subcomponents: Subcomponents, subcomponentNames?: CustomSubcomponentNames): Layer[] {
    if (!subcomponents[Object.keys(dropdownStructure)[0]]) return [];
    if (subcomponents[Object.keys(dropdownStructure)[0]].layerSectionsType) {
      return Object.keys(dropdownStructure).map((subcomponentName: string) =>
        PreviewStructure.createLayer(subcomponentName, subcomponents[subcomponentName],
          dropdownStructure[subcomponentName] as NestedDropdownStructure, subcomponents)
      );
    }
    const layerName = subcomponentNames ? subcomponentNames.layer : CORE_SUBCOMPONENTS_NAMES.LAYER_1;
    return [PreviewStructure.createLayer(layerName, subcomponents[layerName],
      dropdownStructure as NestedDropdownStructure, subcomponents)];
  }

  public static createComponentPreviewStructure(subcomponentDropdownStructure: NestedDropdownStructure,
      subcomponents: Subcomponents, subcomponentNames?: CustomSubcomponentNames): ComponentPreviewStructure {
    const layers = PreviewStructure.createLayers(
      subcomponentDropdownStructure[subcomponentNames ? subcomponentNames.base : CORE_SUBCOMPONENTS_NAMES.BASE] as NestedDropdownStructure,
      subcomponents, subcomponentNames);
    return {
      baseSubcomponentProperties: subcomponents[subcomponentNames ? subcomponentNames.base : CORE_SUBCOMPONENTS_NAMES.BASE],
      layeringType: 'vertical',
      layers,
      subcomponentDropdownStructure,
    };
  }

  public static createEmptyComponentPreviewStructure(subcomponents: Subcomponents, baseSubcomponentName: string): ComponentPreviewStructure {
    const subcomponentDropdownStructure = { [baseSubcomponentName]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject() };
    return {
      baseSubcomponentProperties: subcomponents[baseSubcomponentName],
      layeringType: 'vertical',
      layers: [],
      subcomponentDropdownStructure,
    }
  }
}
