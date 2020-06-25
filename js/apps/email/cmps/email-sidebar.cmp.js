import emailStatus from './email-status.cmp.js'

export default {
    name:'email-sidebar',
    props: ['allEmails'],
    template:`
    <section class="side-bar flex col space-between">
        <div class="sidebar-links">
            <router-link class="side-link" to="/email/compose/new"><i class="link-icon fas fa-file"></i>Compose</router-link>
            <router-link class="side-link" to="/email"><i class="link-icon fas fa-inbox-in"></i>Inbox</router-link>
            <router-link class="side-link" to="/email/sent"><i class="link-icon fas fa-inbox-out"></i>Sent</router-link>
            <router-link class="side-link" to="/email/stared"><i class="link-icon fas fa-star"></i>Stared</router-link>
            <router-link class="side-link" to="/email/drafts"><i class="link-icon fab fa-firstdraft"></i>Drafts</router-link>
            <router-link class="side-link" to="/email/deleted"><i class="link-icon fas fa-trash"></i>Deleted</router-link>
        </div>
        <email-status :allEmails="allEmails"/>
    </section>
    `,
    components:{
        emailStatus,
    }
}