<template>
  <div class="options-container">
    <div class="option-button">
      <div class="dropdown" v-if="Object.keys(component.subcomponents).length > 1">
        <button @click="openSubcomponentDropdownMenu" class="btn form-control dropdown-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <div class="dropdown-button-text">{{activeSubcomponentMode}}</div><i class="fa fa-angle-double-down dropdown-button-icon"></i>
        </button>
        <div ref="dropdownMenu" id="subcomponents-dropdown" class="dropdown-menu subcomponents-dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a v-for="(mode, subcomponentMode) in component.subcomponents" :key="subcomponentMode"
            class="dropdown-item subcomponents-dropdown-item" 
            @click="subcomponentModeClick" @mouseenter="mouseEnterFunc" @mouseleave="mouseLeaveFunc">
              {{subcomponentMode}}
            </a>
        </div>
      </div>
    </div>
    <div class="option-button">
      <button v-if="component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent"
        type="button" class="btn view-option"
        :class="[ component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent.currentlyDisplaying ? 'display-toggle-remove' : 'display-toggle-add' ]"
        @click="toggleSubcomponentDisplay(component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent)">
          {{ component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent.currentlyDisplaying ? 'Remove' : 'Add' }}
      </button>
    </div>
    <div v-if="!component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent || component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent.currentlyDisplaying"> 
      <div class="option-button">
        <select v-if="Object.keys(componentTypeToOptions[component.type][component.subcomponentsActiveMode]).length > 1" class="form-control" v-model="component.subcomponents[component.subcomponentsActiveMode].customCssActiveMode" @change="cssModeClick">
          <option v-for="(mode, cssMode) in componentTypeToOptions[component.type][component.subcomponentsActiveMode]" :key="cssMode">{{cssMode}}</option>
        </select>
      </div>
      <button
        type="button"
        v-for="(option) in componentTypeToOptions[component.type][component.subcomponentsActiveMode][component.subcomponents[component.subcomponentsActiveMode].customCssActiveMode]" :key="option"
        class="btn btn-outline-secondary option-button"
        @click="optionClick(option.identifier)">
          {{option.buttonName}}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../../consts/workshopToolbarOptions';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../consts/subcomponentCssModes.enum';
import { componentTypeToOptions } from '../options/components/componentTypeToOptions';
import { UpdateOptionsMode } from '../../../../../interfaces/updateCssMode';
import { SUB_COMPONENTS } from '../../../../../consts/subcomponentModes.enum';
import { OptionalSubcomponent } from '../../../../../interfaces/workshopComponent';

interface Data {
  WORKSHOP_TOOLBAR_OPTIONS;
  SUB_COMPONENT_CSS_MODES;
  componentTypeToOptions;
  activeOptionIdentifier: WORKSHOP_TOOLBAR_OPTIONS;
  activeSubcomponentMode: SUB_COMPONENTS;
  activeSubcomponentModeElement: HTMLElement,
  lastHoveredSubcomponentModeOptionElement: HTMLElement;
}

export default {
  data: (): Data => ({
    WORKSHOP_TOOLBAR_OPTIONS,
    SUB_COMPONENT_CSS_MODES,
    componentTypeToOptions,
    activeOptionIdentifier: null,
    activeSubcomponentMode: SUB_COMPONENTS.BASE,
    activeSubcomponentModeElement: null,
    lastHoveredSubcomponentModeOptionElement: null,
  }),
  methods: {


    subcomponentModeClick(): void {
      this.activeSubcomponentMode = (event.target as HTMLInputElement).innerHTML;
      this.activeSubcomponentModeElement = event.target;
      this.component.subcomponentsActiveMode = this.activeSubcomponentMode;
      this.$emit('subcomponents-mode-clicked', [this.component.subcomponentsActiveMode, this.getNewCssModeContainsActiveOptionState()] as UpdateOptionsMode);
    },
    mouseEnterFunc(): void {
      if (this.activeSubcomponentModeElement) this.activeSubcomponentModeElement.classList.remove('active');
      if (this.lastHoveredSubcomponentModeOptionElement) this.lastHoveredSubcomponentModeOptionElement.classList.remove('active');
      this.lastHoveredSubcomponentModeOptionElement = event.target;
      (event.target as HTMLInputElement).classList.add('active');
      // document.getElementById('close-subcomponent-preview').style.display = 'block';
    },
    mouseLeaveFunc(): void {
      // (event.target as HTMLInputElement).classList.remove('active');
      // document.getElementById('close-subcomponent-preview').style.display = 'none';
    },
    openSubcomponentDropdownMenu(): void {
      if (!this.activeSubcomponentModeElement) {
        const indexOfSubcompontModeInComponent = Object.keys(this.component.subcomponents).indexOf(this.component.subcomponentsActiveMode);
        const dropdownItemelement = this.$refs.dropdownMenu.childNodes[indexOfSubcompontModeInComponent + 1];
        dropdownItemelement.classList.add('active');
      }
      if (this.lastHoveredSubcomponentModeOptionElement) this.lastHoveredSubcomponentModeOptionElement.classList.remove('active');
      this.lastHoveredSubcomponentModeOptionElement = null;
      if (this.activeSubcomponentModeElement) this.activeSubcomponentModeElement.classList.add('active');
    },


  
    optionClick(option: WORKSHOP_TOOLBAR_OPTIONS): void {
      this.activeOption = option;
      this.$emit('option-clicked', option);
    },
    cssModeClick(): void {
      this.$emit('css-mode-clicked', [this.component.subcomponents[this.component.subcomponentsActiveMode].customCssActiveMode, this.getNewCssModeContainsActiveOptionState()] as UpdateOptionsMode);
    },
    getNewCssModeContainsActiveOptionState(activeMode?: SUB_COMPONENT_CSS_MODES): boolean {
      const { subcomponents, subcomponentsActiveMode, type } = this.component;
      const activeModeOptions = componentTypeToOptions[type][subcomponentsActiveMode][activeMode || subcomponents[subcomponentsActiveMode].customCssActiveMode];
      return activeModeOptions.some((option) => option.identifier === this.activeOption);
    },
    toggleSubcomponentDisplay(optionalSubcomponent: OptionalSubcomponent): void {
      optionalSubcomponent.currentlyDisplaying = !optionalSubcomponent.currentlyDisplaying;
    }
  },
  props: {
    component: Object,
  },
  watch: {
    activeSubcomponentMode(newSubcomponentMode: SUB_COMPONENTS, oldSubcomponentMode: SUB_COMPONENTS): void {
      if (oldSubcomponentMode && this.component.subcomponents[oldSubcomponentMode]) {
        this.component.subcomponents[oldSubcomponentMode].customCssActiveMode = SUB_COMPONENT_CSS_MODES.DEFAULT;
      }
    },
    component(): void {
      this.activeSubcomponentModeElement = null;
      this.activeSubcomponentMode = this.component.subcomponentsActiveMode;
    }
  }
};
</script>

<style lang="css" scoped>
  .options-container {
    margin-top: 10px !important;
    margin-bottom: 10px !important;
  }
  .view-option {
    color: black !important;
    border-color: #ced4da !important;
  }
  .btn-outline-secondary:hover {
    background-color: #d6d6d6 !important;
    color: black !important;
  }
  .option-button {
    float: left;
    margin-right: 8px;
    border-color: #9d9d9d !important;
    background-color: white !important;
  }
  .display-toggle-remove:hover {
    background-color: #fffdfd;
    border-color: red !important;
    color: red !important;
  }
  .display-toggle-add:hover {
    background-color: #f8fff8;
    border-color: green !important;
    color: green !important;
  }
  .dropdown-button {
    font-family: 'Poppins', sans-serif;
    min-width: 6.5rem;
    border: 1px solid #ced4da !important;
    background-color: white !important;
  }
  .dropdown-button-text {
    float: left;
    padding-left: 2px
  }
  .dropdown-button-icon {
    float: right;
    margin-top: 0.3em
  }
  .subcomponents-dropdown-menu {
    padding: 0px !important;
    padding-top: 2px !important;
    padding-bottom: 2px !important;
    margin-top: 0px !important;
    min-width: 6.5rem !important;
  }
  .subcomponents-dropdown-item {
    padding: 0.08rem 1rem !important;
  }
/* .newsomething:after {
  content: attr(data-button-icon);
  float: right;
  padding-left: 1em;
} */
</style>
