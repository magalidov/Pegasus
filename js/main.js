import {myRouter} from './routes.js'
// import userMsg from './cmps/user-msg.cmp.js';


new Vue({
    el: '#App',
    router: myRouter,
	template: `
        <!-- <app-header/> -->
        <main>
            hey
            <!-- <router-view/> -->
        </main>
        <!-- <app-footer/> -->
    `,
    components:{
        // userMsg,
    }
});
