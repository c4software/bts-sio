// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import AlgoEnquete from './components/AlgoEnquete.vue'
import Contact from './components/Contact.vue'
import ExternalIframe from './components/ExternalIframe.vue'
import NoBreak from './components/NoBreak.vue'
import NoPrint from './components/NoPrint.vue'
import Qcm from './components/Qcm.vue'
import QuizGift from './components/QuizGift.vue'
import Reveal from './components/Reveal.vue'
import Sample from './components/Sample.vue'
import SlidesDeck from './components/SlidesDeck.vue'
import SqlEnquete from './components/SqlEnquete.vue'
import SqlInjection from './components/SqlInjection.vue'
import Center from './components/Center.vue'
import DebianConfiguration from './components/DebianConfiguration.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('AlgoEnquete', AlgoEnquete)
    app.component('Contact', Contact)
    app.component('ExternalIframe', ExternalIframe)
    app.component('NoBreak', NoBreak)
    app.component('NoPrint', NoPrint)
    app.component('Qcm', Qcm)
    app.component('QuizGift', QuizGift)
    app.component('Reveal', Reveal)
    app.component('Sample', Sample)
    app.component('SlidesDeck', SlidesDeck)
    app.component('SqlEnquete', SqlEnquete)
    app.component('SqlInjection', SqlInjection)
    app.component('center', Center)
    app.component('DebianConfiguration', DebianConfiguration)
  }
} satisfies Theme