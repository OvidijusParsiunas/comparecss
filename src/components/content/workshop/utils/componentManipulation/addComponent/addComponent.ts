import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SetActiveComponentUtils } from '../utils/setActiveComponentUtils';
import { ComponentOptions } from 'vue';

export class AddComponent {
  
  public static add(workshopComponent: ComponentOptions, component: WorkshopComponent): void {
    (workshopComponent.components as undefined as WorkshopComponent[]).push(component);
    SetActiveComponentUtils.switchActiveComponent(workshopComponent, component);
  }
}
