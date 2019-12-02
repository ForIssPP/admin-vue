<template>
  <table-pay-type :payName="'提现类型'"></table-pay-type>
</template>
<script>
import { TablePayType } from "@/components/table/index";

export default {
  name: "table-pictures",
  components: {
    TablePayType
  }
};
</script>
