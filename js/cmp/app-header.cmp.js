export default {
    template:`
    <header class="app-header">
        <nav class="flex space-between clean-list">
            <section class="logo flex space-between">
                <i class="far fa-pegasus fa-2x align-self-center"></i>
                <h1>Pegasus</h1>
            </section>
            <section class="routes flex">
                <router-link tag="li" to="/">Home</router-link>  
                <router-link tag="li" to="/books/" >Books</router-link>  
                <router-link tag="li" to="/email/" >Email</router-link>  
                <router-link tag="li" to="/notes">Notes</router-link>  
                <router-link tag="li" to="/about">About</router-link>  
            </section>
        </nav>
    </header>
    `
}

