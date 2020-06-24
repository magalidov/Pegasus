import { eventBus } from "../services/event-bus.service.js";
import editBar from "./note-editbar.cmp.js";
import noteText from "./note-txt.cmp.js";
import noteImage from "./note-img.cmp.js"
import noteVideo from "./note-video.cmp.js"

export default {
  props: ["note"],
  template: `
        <section class="note-item flex col space-around" :note="note" :style="getStyle"> 
            <i class="fas fa-thumbtack align-self-end"></i>
             <component :is="note.type" :info="note.info" :id="note.id" @edit="saveChanges"/></component>
             <section class="edited">
                 {{getNoteChangedTime}}
             </section>
              <edit-bar :note="note"/>
        </section>
    `,
  data() {
    return {
      noteColor: this.note.style.backgroundColor,
    };
  },
  created() {
    console.log("YAY New Text note !!");
  },
  computed: {
    getNoteChangedTime() {
      let info = this.note.info;
      if (!info.editedAt) return "Created: " + info.createdAt;
      else return "Edited: " + info.editedAt;
    },
    getStyle() {
      return this.note.style;
    },
  },
  methods: {
    saveChanges() {
      eventBus.$emit('update',this.note)
    },
  },
  components: {
    editBar,
    noteText,
    noteImage,
    noteVideo,
  },
};
