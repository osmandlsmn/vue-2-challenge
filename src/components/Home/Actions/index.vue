<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/UI/Button/index.vue";

export default defineComponent({
  name: "Actions",
  components: {
    Button,
  },
  methods: {
    openAddStackModal() {
      this.$modal.show("add-stock-modal");
    },
  },
});
</script>

<template>
  <div class="space-x-5">
    <Button @onClick="openAddStackModal" primary>Add Stock</Button>
    <Button primary>Refresh</Button>
  </div>
</template>
