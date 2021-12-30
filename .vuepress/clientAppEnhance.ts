import { defineClientAppEnhance } from '@vuepress/client'
import confProtected from "./protected";
import Contact from './components/Contact.vue'
import ExternalIframe from './components/ExternalIframe.vue'
import NoBreak from './components/NoBreak.vue'
import NoPrint from './components/NoPrint.vue'
import Qcm from './components/Qcm.vue'
import Reveal from './components/Reveal.vue'
import Sample from './components/Sample.vue'
import SlidesDeck from './components/SlidesDeck.vue'
import Center from './components/Center.vue'

const AUTH_KEY = 'auth_client_side';
const UUID = '53ac15ea-e430-4ea1-8db5-fcfa63bf2844';

let isPrerender = false;
try {
    isPrerender = prompt === undefined;
} catch (err) {
    isPrerender = true;
}

const saveAuth = () => {
    try {
        sessionStorage.setItem(AUTH_KEY, UUID);
    } catch (err) { }
}

const isAuth = () => {
    try {
        return sessionStorage.getItem(AUTH_KEY) === UUID;
    } catch (err) {
        return false
    }
}

const askForPass = () => {
    try {
        return prompt("Merci de saisir le code") === confProtected.pass
    } catch (err) {
        return ""
    }
}

const shouldAskPass = (path) => {
    return !isPrerender && confProtected.paths.includes(path)
}

export default defineClientAppEnhance(({ app, router, siteData }) => {
    app.component('Contact', Contact)
    app.component('ExternalIframe', ExternalIframe)
    app.component('NoBreak', NoBreak)
    app.component('NoPrint', NoPrint)
    app.component('Qcm', Qcm)
    app.component('Reveal', Reveal)
    app.component('Sample', Sample)
    app.component('SlidesDeck', SlidesDeck)
    app.component('center', Center)

    router.beforeEach((to, from, next) => {
        if (shouldAskPass(to.path)) {
            if (isAuth() || askForPass()) {
                saveAuth()
                next()
            } else {
                next("/")
            }
        } else {
            next()
        }
    })
})