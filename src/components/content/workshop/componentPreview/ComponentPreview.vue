<template>
  <div style="position: relative">
    <div style="margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); text-align: center"> 
      <div :class="componentProperties.frameworkClass">
          <a :class="componentProperties.componentClass" :style="componentProperties.customCss" v-html="componentProperties.innerHtml"></a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

// if the component properties are going to get too difficult to maintain, pass each of them in individually
export default {
  props: {
    componentProperties: Object,
  }
};
</script>
