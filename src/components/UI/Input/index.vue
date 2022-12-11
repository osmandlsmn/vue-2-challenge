<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  inheritAttrs: false,
  name: "Input",
  props: {
    placeholder: String,
  },
  methods: {
    changeValue(event: any) {
      this.$emit("input", event.target.value);
    },
  },
});
</script>

<template>
  <div>
    <input
      type="text"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :placeholder="placeholder"
      @input="changeValue"
    />
  </div>
</template>
