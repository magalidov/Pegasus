export default {
    template:`
    <header class="app-header">
        <nav class="app-nav flex space-between clean-list">
            <div class="logo flex justify-end">
                <i class="far fa-pegasus fa-2x"></i>
                <h1>Pegasus</h1>
            </div>
            <button class="open-menue" @click="showSideMenue"><i class="fa fa-bars"></i></button>
            <section class="nav-links flex">
                <router-link tag="li" to="/">Home</router-link>  
                <router-link tag="li" to="/books/" >Books</router-link>  
                <router-link tag="li" to="/email/" >Email</router-link>  
                <router-link tag="li" to="/notes">Notes</router-link>  
                <router-link tag="li" to="/about">About</router-link>  
            </section>
        </nav>
    </header>
    `,
    methods:{
        // showSideMenue
    }
}

