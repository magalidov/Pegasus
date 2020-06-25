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

      var vidUrl = this.note.info.url;
      let url = new URL(vidUrl);
      if (vidUrl.includes("embed")) this.$emit("edit");;
      let params = new URLSearchParams(url.search);
      const videoId = params.get("v");
      let embedUrl = `https://www.youtube.com/embed/${videoId}`;
      this.note.info.url = embedUrl;
      this.$emit("edit");
    },
  },
};
