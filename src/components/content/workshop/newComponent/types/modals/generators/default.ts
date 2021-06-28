import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ModalBuilder } from './modalBuilder';

export const defaultModal: ComponentGenerator = {
  createNewComponent(): WorkshopComponent {
    return ModalBuilder.create();
  },
}
