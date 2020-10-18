<template>
  <div :class="componentProperties.frameworkClass">
      <a :class="componentProperties.componentClass" :style="componentProperties.customCss" v-html="componentProperties.innerHtml"></a>
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
