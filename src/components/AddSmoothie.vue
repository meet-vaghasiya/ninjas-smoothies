<template>
  <div>
    <div class="add-smoothie container">
      <h2 class="center-align indigo-text">Add Smoothie Recipt</h2>
      <form @submit.prevent="handleSubmit">
        <div class="field title">
          <label for="title">Smoothie title</label>
          <input v-model="title" type="text" />
        </div>
        <div v-for="(ing, index) in allIng" :key="index" class="field">
          <label>Ad an igrediant:</label>
          <input type="text" name="add-ingrediant" v-model="allIng[index]" />
          <i class="material-icons delete" @click="removeIng(ing)">delete</i>
        </div>
        <div class="field add-ingradient">
          <label for="add-ingredient">Ad an igrediant:</label>
          <input
            type="text"
            name="add-ingrediant"
            v-model="ingrediant"
            @keydown.tab.prevent="addIng"
          />
          <div class="field center-align">
            <p v-if="feedBack" class="red-text">{{ feedBack }}</p>
            <button class="btn pink">Add Smoothie</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "AddSmoothie",
  data() {
    return {
      title: null,
      ingrediant: null,
      allIng: [],
      feedBack: ""
    };
  },
  methods: {
    handleSubmit() {
      if (this.title) {
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[&\/\\#,+()$~%.'":*?<>{}]/g,
          lower: true
        });
        db.collection("smoothies")
          .add({
            title: this.title,
            ingrediants: this.allIng,
            slug: this.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(error => {
            console.log(error, "error dutin adding smoothies");
          });
        console.log(this.slug);

        this.feedBack = null;
      } else {
        this.feedBack = "You must enter a title";
      }
    },
    addIng() {
      if (this.ingrediant) {
        alert("hello");
        this.allIng.push(this.ingrediant);

        this.ingrediant = null;
        this.feedBack = null;
      } else {
        this.feedBack = "You must enter value ";
      }
      console.log(this.allIng);
    },
    removeIng(ing) {
      this.allIng = this.allIng.filter(ingred => {
        console.log(ingred, ing);
        return ingred !== ing;
      });
    }
  }
};
</script>

<style scoped>
.add-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

h2 {
  font-size: 2em;
  margin: 20px auto;
}

.add-smoothie title {
  font-size: 2em;
  margin: 20px auto;
}
.add-smoothie .field {
  position: relative;
}
.add-smoothie .delete {
  position: absolute;
  bottom: 16px;
  right: 0;
  color: #aaa;
  cursor: pointer;
}
</style>
