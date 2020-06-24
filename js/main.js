import { myRouter } from './routes.js'
import appHeader from './cmp/app-header.cmp.js'
import appFooter from './cmp/app-footer.cmp.js'
// import userMsg from './cmps/user-msg.cmp.js';


new Vue({
    el: '#App',
    router: myRouter,
    template: `
        <main>
            <app-header/> 
            <router-view/>
            <app-footer/>
        </main>
    `,
    components: {
        appHeader,
        appFooter,
    }
});
