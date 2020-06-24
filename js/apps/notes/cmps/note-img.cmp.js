import { eventBus } from "../services/event-bus.service.js";

export default {
    props: ["info","id"],
    template: `
         <section class="image-area align-self-center">
             <img :src="info.url"/>
             <textarea v-model="info.url" v-if="info.isOnEdit" @blur="onEdit"></textarea>
          </section>
              
      `,
    data(){
        return {
            isOnEdit:false,
        }
    },
    methods: {
      saveChanges() {
        this.$emit("save");
      },
      onEdit(){
        this.$emit('edit')
      }
    },
  };
  