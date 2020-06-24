export default {
    template:`
    <section class="app-header">
        <h1>Header</h1>
        <nav>
              <router-link to="/">Home</router-link>  
              <router-link to="/email/list" >Email</router-link>  
              <router-link to="/notes">Notes</router-link>  
              <router-link to="/about">About</router-link>  
        </nav>
    </section>
    `
}