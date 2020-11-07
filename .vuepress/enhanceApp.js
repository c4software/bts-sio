const AUTH_KEY = 'auth_client_side';
const UUID = '53ac15ea-e430-4ea1-8db5-fcfa63bf2844';

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

const askForPass = (siteData) => {
    try {
        return prompt() === siteData.themeConfig.protected.pass
    } catch (err) {
        return ""
    }
}

const shouldAskPass = (siteData, path) => {
    return siteData.themeConfig.protected.paths.includes(path)
}

export default ({
    Vue, // the version of Vue being used in the VuePress app
    options, // the options for the root Vue instance
    router, // the router instance for the app
    siteData, // site metadata
    isServer // is this enhancement applied in server-rendering or client
}) => {
    router.beforeEach((to, from, next) => {
        if (shouldAskPass(siteData, to.path)) {
            if (isAuth() || askForPass(siteData)) {
                saveAuth()
                next()
            } else {
                next("/")
            }
        } else {
            next()
        }
    })
}