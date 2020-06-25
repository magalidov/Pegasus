export default {
  props: ["note"],
  template: `
        <section class="video-area"> 
            <iframe :src="url"></iframe>
            <textarea ref="textarea" v-model="url" v-if="isOnEdit" @blur="setEmbedVid"></textarea>
        </section>
    `,
  data() {
    return {
      url:this.note.info.url
    };
  },
  created() {
    this.setEmbedVid();
  },
  computed: {
    isOnEdit() {
      return this.note.isOnEdit;
    },
  },
  methods: {
    saveChanges() {
      this.$emit("save");
    },
    setEmbedVid() {
      if (this.url.includes("embed"))return
      let url = new URL(this.note.info.url);
      let params = new URLSearchParams(url.search);
      const videoId = params.get("v");
      let embedUrl = `https://www.youtube.com/embed/${videoId}`;
      this.url = embedUrl;
      this.$emit("edit");
    },
  },
};
