import { noteService } from "../services/note-service.js";
import editBar from "./note-editbar.cmp.js";

export default {
  props: ["info", "id"],
  template: `
        <section class="video-area"> 
            <iframe :src="info.url"></iframe>
            <textarea ref="textarea" v-model="info.url" v-if="info.isOnEdit" @blur="setEmbedVid"></textarea>
        </section>
    `,
  methods: {
    saveChanges() {
      this.$emit("save");
    },
    setEmbedVid() {
      let url = new URL(this.info.url);
      let params = new URLSearchParams(url.search);
      const videoId = params.get("v");
      let embedUrl = `https://www.youtube.com/embed/${videoId}`;
      this.info.url = embedUrl;
      this.$emit("edit");
    },
  },
};
