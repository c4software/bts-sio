<template>
  <div>
    <slot/>
  </div>
</template>

<script>
export default {
  name: "NoBreak",
};
</script>

<style scoped>
@media print {
  div {
    break-inside: avoid;
  }
}
</style>