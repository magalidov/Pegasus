import { bookService } from "../service/book-service.js";
import reviewsList from '../cmp/book-review-list.cmp.js'
import { eventBus } from "../../../services/event-bus.service.js";

{/* <button type="button" class="btn-open-reviews" @click="isShowReviews=!isShowReviews">{{toggleReviewBtnName}}</button> */}

export default {
  props: ["book"],
  template: `
      <div class="book-review ">
            <div class="reviews">
              <reviews-list  :reviews="book.reviews" @delete="onDeleteReview" />
            </div>
           <form @submit.prevent="onAddReview" class="col-layout">
           <section class="flex">
                <label for="reviewer-name">Name:</label>
                <input type="text"  id="reviewer-name" placeholder="Your Name" v-model:value="newReview.name"/>
                <label for="rate">Your Rate:</label>
                <select id="rate" v-model:value="newReview.rate">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                </select>
               </section>
               <label for="review-area">Your Review: </label>
               <textarea id="review-area" rows="3" cols="65" placeholder="Write Your Review" v-model:value="newReview.reviewText" />
               <button type="submit" class="btn-submit-review">Send Review</button>
              
           </form>
          
      </div>
      `,
  data() {
    return {
      newReview: {
        name: 'New Reader',
        rate: 5,
        date: `${new Date().toLocaleDateString()},${new Date().toLocaleTimeString()}`,
        reviewText: "",
      },
      isShowReviews: false,
    };
  },
  computed: {
    toggleReviewBtnName() {
      return this.isShowReviews ? 'Close Reviews' : 'Open Reviews'
    }
  },
  methods: {
    onAddReview() {
      bookService.addReview(this.book.id, { ...this.newReview });
      eventBus.$emit('message', 'Review Added!', 'good-msg') 
    },
    onDeleteReview(reviewIdx) {
      bookService.deleteReview(this.book.id, reviewIdx)
      eventBus.$emit('message', 'Review Deleted', 'bad-msg')
    },

  },
  components: {
    reviewsList,
  }
};
