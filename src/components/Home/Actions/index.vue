<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/UI/Button/index.vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent<{}, any>({
  name: "Actions",
  components: {
    Button,
  },
  computed: {
    ...mapGetters({
      isLoading: "getLoading",
      stocks: "getStocks",
    }),
  },
  methods: {
    ...mapActions(["refresh"]),
    openAddStackModal() {
      this.$modal.show("add-stock-modal");
    },
  },
});
</script>

<template>
  <div class="space-x-5">
    <Button :disabled="isLoading" @onClick="openAddStackModal" primary>Add Stock</Button>
    <Button :disabled="stocks.length < 1" @onClick="refresh" primary>Refresh</Button>
  </div>
</template>
