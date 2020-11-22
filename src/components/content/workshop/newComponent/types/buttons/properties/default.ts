import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { NewComponent } from '../../../../../../../interfaces/newComponent';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { inheritedButtonCss } from './inheritedCss';
import { COMPONENT_MODES } from '../../../../../../../consts/componentModes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum';

export const defaultButton: NewComponent = {
  getNewComponent(): WorkshopComponent {
    return {
      type: NEW_COMPONENT_TYPES.BUTTON,
      subcomponents: {
        [SUB_COMPONENTS.CONTAINER]: {
          frameworkClass: 'foundation',
          componentTag: 'button',
          innerHtmlText: 'button',
          transition: 'all 0.25s ease-out',
          customCss: {
            [COMPONENT_MODES.DEFAULT]: {
              borderRadius: '0px',
              borderWidth: '0px',
              borderColor: '#1779ba',
              backgroundColor: '#1779ba',
              boxShadow: '0px 0px 0px 0px #000000',
              outline: 'none',
              lineHeight: '0',
              paddingTop: '0px',
              paddingBottom: '0px',
              marginLeft: '0px',
              marginTop: '0px',
              marginRight: '0px',
              marginBottom: '0px',
              width: '40px',
              height: '38px',
              boxSizing: 'content-box',
              transition: 'unset',
              color: '#ffffff',
            },
            [COMPONENT_MODES.HOVER]: {
              backgroundColor: '#ff0000',
            },
            [COMPONENT_MODES.CLICK]: {
              backgroundColor: '#409441',
            },
          },
          initialCss: {
            [COMPONENT_MODES.DEFAULT]: {
              borderRadius: '0px',
              borderWidth: '0px',
              borderColor: '#1779ba',
              backgroundColor: '#1779ba',
              boxShadow: '0px 0px 0px 0px #000000',
              outline: 'none',
              lineHeight: '0',
              paddingTop: '0px',
              paddingBottom: '0px',
              marginLeft: '0px',
              marginTop: '0px',
              marginRight: '0px',
              marginBottom: '0px',
              width: '40px',
              height: '38px',
              boxSizing: 'content-box',
              transition: 'none',
              color: '#ffffff',
            },
            [COMPONENT_MODES.HOVER]: {
              backgroundColor: '#ff0000',
            },
            [COMPONENT_MODES.CLICK]: {
              backgroundColor: '#409441',
            },
          },
          jsClasses: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
          initialJsClasses: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
          customCssActiveMode: COMPONENT_MODES.DEFAULT,
          tempCustomCss: new Set(['transition']),
          inheritedCss: inheritedButtonCss,
        },
      },
      subcomponentsActiveMode: SUB_COMPONENTS.CONTAINER,
      customSettingsProperties: {
        width: [0, 250],
        height: [0, 250],
      },
      className: 'default-class-name',
    }
  },
};
