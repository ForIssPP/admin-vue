<template>
  <div class="dashboard-container">
    <adminDashboard />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import adminDashboard from "./admin";

export default {
  name: "Home",
  components: { adminDashboard },
  computed: {
    ...mapGetters(["roles"])
  }
};
</script>
