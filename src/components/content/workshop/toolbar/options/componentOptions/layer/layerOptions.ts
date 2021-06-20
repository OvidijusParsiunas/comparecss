import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { Options } from '../../../../../../../interfaces/options';
import { imageLayerTopOptions } from './imageLayerTop';
import { layerBottomOptions } from './layerBottom';

export class LayerOptions {

  private static getLayerSubcomponentNames(component: WorkshopComponent): string[] {
    return Object.keys(component.subcomponents)
      .filter((key) => component.subcomponents[key].subcomponentType === SUBCOMPONENT_TYPES.LAYER);
  }

  public static getOptions(component: WorkshopComponent): Options {
    const layerSubcomponentNames = LayerOptions.getLayerSubcomponentNames(component);
    const currentLayerIndex = layerSubcomponentNames.indexOf(component.activeSubcomponentName);
    if (currentLayerIndex === 0) {
      return imageLayerTopOptions as Options;
    }
    return layerBottomOptions as Options;
  }
}
