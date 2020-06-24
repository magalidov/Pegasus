import { noteService } from "../services/note-service.js";
import editBar from "./note-editbar.cmp.js";

export default {
  props: ["info"],
  template: `
        <section class="video-area"> 
            <iframe width="240" height="150" :src="info.url"></iframe>
        </section>
    `,
  methods: {
    saveChanges() {
      this.$emit("save");
    },
  },

};
