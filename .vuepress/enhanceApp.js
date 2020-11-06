const AUTH_KEY = 'auth_client_side'

const setAuth = () => {
    if (sessionStorage) {
        sessionStorage.setItem(AUTH_KEY, '1');
    }
}

const isAuth = () => {
    if (sessionStorage) {
        return sessionStorage.getItem(AUTH_KEY) === '1';
    } else {
        return false;
    }
}

export default ({
    Vue, // the version of Vue being used in the VuePress app
    options, // the options for the root Vue instance
    router, // the router instance for the app
    siteData, // site metadata
    isServer // is this enhancement applied in server-rendering or client
}) => {
    router.beforeEach((to, from, next) => {
        if (siteData.themeConfig.protected.paths.includes(to.path)) {
            if (isAuth() || prompt() == siteData.themeConfig.protected.pass) {
                setAuth()
                next()
            } else {
                next("/")
            }
        } else {
            next()
        }
    })
}