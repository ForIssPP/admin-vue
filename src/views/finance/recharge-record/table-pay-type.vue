<template>
  <table-pay-type :payName="'支付类型'"></table-pay-type>
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
