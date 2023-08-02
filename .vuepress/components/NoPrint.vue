<template>
  <div>
    <slot/>
  </div>
</template>

<script>
export default {
  name: "NoPrint",
};
</script>

<style scoped>
@media print
{    
    div
    {
        display: none !important;
    }
}
</style>