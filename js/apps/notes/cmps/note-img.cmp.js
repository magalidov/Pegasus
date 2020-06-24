export default {
    props: ["info"],
    template: `
         <section class="image-area align-self-center">
             <img :src="info.url"/>
          </section>
              
      `,
    methods: {
      saveChanges() {
        this.$emit("save");
      },
    },
  };
  