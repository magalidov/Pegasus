export default {
  props: ["note"],
  template: `
        <section class="audio-area"> 
        <audio controls :src="getUrl">
            Your browser does not support the
            <code>audio</code> element.
         </audio>
         <textarea ref="textarea" v-model="getUrl" v-if="note.isOnEdit" @blur="setEmbedVid"></textarea>
        </section>
    `,
  computed:{
    getUrl(){
      return this.note.info.url
    }
  },
  methods: {
    saveChanges() {
      this.$emit("save");
    },
   
  },
};
