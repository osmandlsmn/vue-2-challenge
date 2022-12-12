<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Button",
  inheritAttrs: false,
  props: {
    primary: Boolean,
    secondary: Boolean,
    success: Boolean,
    danger: Boolean,
  },
  computed: {
    getVariant() {
      if (this.$props.primary) return "bg-primary text-white";
      else if (this.$props.secondary) return "bg-secondary text-white";
      else if (this.$props.success) return "bg-success text-white";
      else if (this.$props.danger) return "bg-danger text-white";
    },
  },
  methods: {
    onClick(event: any) {
      this.$emit("onClick", event);
    },
  },
});
</script>

<template>
  <button
    :class="`font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-no-drop ${getVariant}`"
    @click="onClick"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>
