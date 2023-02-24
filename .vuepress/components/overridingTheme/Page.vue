<script setup lang="ts">
import PageMeta from '@theme/PageMeta.vue'
import PageNav from '@theme/PageNav.vue'
import {ref, nextTick, computed, watch} from 'vue'
import { useWindowScroll } from '@vueuse/core'

const onThisPage = ref<any[]>([]);
const hasDocumentToc = ref(false);
const activeItem = ref("");
const navBarHeight = ref(0);
const { y } = useWindowScroll();
const defaultName = ref("Cours");

nextTick(() => {
    if (typeof window === 'undefined' || !window.document) {
        return
    }

    try{
        document.getElementsByClassName("site-name")[0].textContent = defaultName.value;
    } catch(e){
        // ignored
    }

    // Récupération des titres de la page (h2)
    document.querySelectorAll('.content h2').forEach((h2: any) => {
        onThisPage.value.push({
            el: h2,
            id: h2.id,
            text: h2.innerText.replace("#", "")
        })
    })

    // Vérification de l'existence d'une table des matières dans la page
    // (si oui, on affiche la colonne de droite)
    hasDocumentToc.value = document.getElementsByClassName("table-of-contents").length > 0;

    // Récupération de la hauteur de la barre de navigation (pour gérer la classe "active" sur le bon élément)
    navBarHeight.value = document.getElementsByClassName("navbar")[0]?.clientHeight ?? 0
})

// Computed, Est-ce qu'on doit afficher la colonne de droite ?
// Oui, si la page a une table des matières ET qu'il y a des titres dans la page
const shouldShowToc = computed(() => hasDocumentToc.value && onThisPage.value.length > 0);

watch(y, () => {
    if (typeof window === 'undefined' || !window.document) {
        return
    }

    try{
        // Si on est en dessous de la barre de navigation, on affiche le nom du site
        if(y.value > navBarHeight.value){
            // Récupération du titre de la page (h1) et affichage dans la barre de navigation
            document.getElementsByClassName("site-name")[0].textContent = document.querySelectorAll(".content h1")[0]?.textContent?.replace("#", "") ?? defaultName.value;
        } else {
            // Sinon, on affiche le nom du site
            document.getElementsByClassName("site-name")[0].textContent = defaultName.value;
        }
    } catch(e){
        // ignored
    }
    
    try{
        if(shouldShowToc){
            // Récupération de l'élément actif, en fonction de la position de la page (y)
            var cur = onThisPage.value.filter(it => (it.el.offsetTop <= y.value + navBarHeight.value));

            // Mise à jour de l'élément actif dans la variable activeItem
            activeItem.value = cur[cur.length - 1]?.id;
        }
    } catch(e){
        // ignored
    }
})

</script>

<template>
  <main class="page" ref="el">
    <slot name="top" />

    <div class="theme-default-content" :class="{'centered': !shouldShowToc}">
      <div class="content">
        <slot name="content-top" />

        <Content />
      
        <slot name="content-bottom" />
      </div>
      <div id="onThisPage" v-if="shouldShowToc">
        <div>
            <div class="toc-titre">Dans cette page</div>
            <ul class="toc-list">
                <li v-for="item in onThisPage" :key="item.id">
                    <a :href="'#' + item.id" :class="{active: activeItem == item.id}">{{item.top}} {{ item.text }}</a>
                </li>
            </ul>
        </div>
      </div>
    </div>

    <PageMeta />

    <PageNav />

    <slot name="bottom" />
  </main>
</template>

<style scoped>

.theme-default-content.centered{
    justify-content: center;
}

#onThisPage{
    display: none;
}

@media print {
    .theme-default-content{
        display: block;
    }
    #onThisPage {
        display: none;
    }
}

@media screen and (min-width: 1300px) {
    .theme-default-content{
        display: flex;
        max-width: calc(100vw - var(--sidebar-width));
        margin: 0;
    }

    #onThisPage {
        display: block;
    }
    .content {
        flex-grow: 1;
        width: 80%;
        max-width: 1300px;
    }
}


#onThisPage{
    min-width: 15%;
    padding-left: 10px;
}

#onThisPage > div{
    position: sticky;
    top: 70px;
    margin-left: 10px;
}

#onThisPage > div::before{
    content: " ";
    position: absolute;
    top: 0;
    bottom: 0;
    left: -8px;
    z-index: -1;
    width: 2px;
    background: #eaecef;
}

.toc-titre{
    letter-spacing: .4px;
    line-height: 28px;
    font-size: 13px;
    font-weight: 600;
}

.toc-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    margin-left: 10px;
}

.toc-list li{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.toc-list a {
    transition: color .25s;
    line-height: 28px;
    font-size: 13px;
    color: #999;
    overflow: hidden;
    white-space: nowrap;
}

.toc-list a.active {
    color: var(--c-brand);
    text-decoration: none;
}

.toc-list a:hover {
    color: var(--c-brand);
    text-decoration: none;
}

</style>