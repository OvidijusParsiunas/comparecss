import { CustomCss, CustomFeatures, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../../../consts/subcomponentCssModes.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import createButtonComponentPreviewStructure from './buttonComponentPreviewStructure';
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum';
import { NewComponent } from '../../../../../../../interfaces/newComponent';
import { buttonSpecificSettings } from './buttonSpecificSettings';
import { inheritedButtonCss } from './inheritedCss';

function createInitialBaseCss(): CustomCss {
  return {
    [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
      borderRadius: '0px',
      borderWidth: '0px',
      borderColor: '#1779ba',
      backgroundColor: '#1779ba',
      borderStyle: 'solid',
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
      color: '#ffffff',
      fontSize: '14px',
      fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
      transition: 'unset',
    },
    [SUB_COMPONENT_CSS_MODES.HOVER]: {
      backgroundColor: '#ff0000',
    },
    [SUB_COMPONENT_CSS_MODES.CLICK]: {
      backgroundColor: '#409441',
    },
  }
}

function createLayerCss(): CustomCss {
  return {
    [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
      height: '100%',
    },
  }
}

function createTextCss(): CustomCss {
  return {
    [SUB_COMPONENT_CSS_MODES.DEFAULT]: {
      height: '100%',
      transform: 'unset',
      overflow: 'unset',
      userSelect: 'none',
      top: '50%',
    },
  }
}

function createInitialButtonJsClasses(): Set<JAVASCRIPT_CLASSES> {
  return new Set([JAVASCRIPT_CLASSES.RIPPLES])
}

function createDefaultButtonCustomFeatures(): CustomFeatures {
  return {
    jsClasses: createInitialButtonJsClasses(),
  }
}

function createSubcomponents(): Subcomponents {
  return {
    [SUB_COMPONENTS.BASE]: {
      customCss: createInitialBaseCss(),
      initialCss: createInitialBaseCss(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      subcomponentPreviewTransition: 'all 0.25s ease-out',
      tempCustomCss: new Set(['transition']),
      inheritedCss: inheritedButtonCss,
      subcomponentSpecificSettings: buttonSpecificSettings,
      customFeatures: createDefaultButtonCustomFeatures(),
      defaultCustomFeatures: createDefaultButtonCustomFeatures(),
    },
    [SUB_COMPONENTS.LAYER_1]: {
      customCss: createLayerCss(),
      initialCss: createLayerCss(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
    },
    [SUB_COMPONENTS.TEXT_1]: {
      componentTag: 'div',
      componentText: 'button',
      customCss: createTextCss(),
      initialCss: createTextCss(),
      activeCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      defaultCustomCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
      customFeatures: createDefaultButtonCustomFeatures(),
      defaultCustomFeatures: createDefaultButtonCustomFeatures(),
    },
  }
}

export const defaultButton: NewComponent = {
  getNewComponent(): WorkshopComponent {
    const subcomponents = createSubcomponents();
    return {
      type: NEW_COMPONENT_TYPES.BUTTON,
      subcomponents,
      activeSubcomponentMode: SUB_COMPONENTS.BASE,
      defaultSubcomponentMode: SUB_COMPONENTS.BASE,
      componentPreviewStructure: createButtonComponentPreviewStructure(subcomponents[SUB_COMPONENTS.BASE],
        subcomponents[SUB_COMPONENTS.LAYER_1], subcomponents[SUB_COMPONENTS.TEXT_1]),
      className: 'default-class-name',
    }
  },
};
