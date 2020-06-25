export default {
  props: ["note"],
  template: `
         <section class="image-area align-self-center">
             <img :src="getUrl"/>
             <textarea v-model="getUrl" v-if="isOnEdit" @blur="onEdit"></textarea>
          </section>
              
      `,
  // data() {
  //   return {
  //     url:this.note.info.url
  //   };
  // },
  computed: {
    isOnEdit() {
      return this.note.isOnEdit;
    },
    getUrl() {
      return this.note.info.url;
    },
  },
  methods: {
    saveChanges() {
      this.$emit("save");
    },
    onEdit() {
      this.$emit("edit");
    },
  },
};
