<script setup lang="ts">
import NavbarItems from '@theme/NavbarItems.vue'
import SidebarItems from '@theme/SidebarItems.vue'
import { ref, watch } from 'vue';

const isClose = ref(false);

watch(isClose, (value) => {
    if (value) {
        document.documentElement.style.setProperty("--sidebar-width", "0");
    } else {
        document.documentElement.style.setProperty("--sidebar-width", "20rem");
    }
});

</script>

<template>
    <aside :class="{ sidebar: true, 'close': isClose }">
        <NavbarItems />
        <slot name="top" />
        <SidebarItems />
        <slot name="bottom" />
    </aside>
    <div class="back-to-top" :class="{ close: isClose }" @click="isClose = !isClose"></div>
</template>

<style scoped lang="scss">
.back-to-top{
    left: 18rem;
    bottom: 20px;
    rotate: 270deg;
    height: 1rem;
    width: 1rem;
    z-index: 100;
    transition: transform var(--t-transform);
}

.back-to-top.close{
    rotate: 90deg;
    left: 0;
    bottom: 20px;
}

.close {
    transform: translateX(-100%);
}

.no-sidebar .back-to-top{
    display: none;
}

@media (max-width: 719px){
    .back-to-top{
        display: none;
    }
}
</style>