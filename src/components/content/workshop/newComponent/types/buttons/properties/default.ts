import { CustomCss, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../../../consts/subcomponentCssModes.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import createButtonComponentPreviewStructure from './buttonComponentPreviewStructure';
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum';
import { NewComponent } from '../../../../../../../interfaces/newComponent';
import { buttonSpecificSettings } from './buttonSpecificSettings';
import { inheritedButtonCss } from './inheritedCss';

// all default css needs to be filled in as to be able to 'reset' correctly
function createInitialBaseCss(): CustomCss {
  return {
    [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
      borderRadius: '0px',
      borderWidth: '0px',
      borderColor: '#1779ba',
      backgroundColor: '#1779ba',
      boxShadow: 'unset',
      outline: 'none',
      lineHeight: '0',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '12px',
      paddingRight: '12px',
      marginLeft: '0px',
      marginTop: '0px',
      marginRight: '0px',
      marginBottom: '0px',
      width: '40px',
      height: '38px',
      boxSizing: 'content-box',
      transition: 'unset',
      color: '#ffffff',
      fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
    },
    [SUB_COMPONENT_CSS_MODES.HOVER]: {
      backgroundColor: '#ff0000',
    },
    [SUB_COMPONENT_CSS_MODES.CLICK]: {
      backgroundColor: '#409441',
    },
  }
}

function createInitialButtonJsClasses(): Set<JAVASCRIPT_CLASSES> {
  return new Set([JAVASCRIPT_CLASSES.RIPPLES])
}

function createSubcomponents(): Subcomponents {
  return {
    [SUB_COMPONENTS.BASE]: {
      componentTag: 'button',
      customCss: createInitialBaseCss(),
      initialCss: createInitialBaseCss(),
      jsClasses: createInitialButtonJsClasses(),
      customCssActiveMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      inheritedCss: inheritedButtonCss,
      subcomponentSpecificSettings: buttonSpecificSettings,
    },
  }
}

export const defaultButton: NewComponent = {
  getNewComponent(): WorkshopComponent {
    const subcomponents = createSubcomponents();
    return {
      type: NEW_COMPONENT_TYPES.BUTTON,
      subcomponents,
      subcomponentsActiveMode: SUB_COMPONENTS.BASE,
      componentPreviewStructure: createButtonComponentPreviewStructure(subcomponents[SUB_COMPONENTS.BASE]),
      className: 'default-class-name',
    }
  },
};
