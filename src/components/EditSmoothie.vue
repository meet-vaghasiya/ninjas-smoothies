<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>smoothie {{ smoothie.title }}</h2>

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
          <button class="btn pink">Update Smoothie</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "EditSmoothie",
  data() {
    return {
      smoothie: null,
      title: null,
      ingrediant: null,
      allIng: [],
      feedBack: ""
    };
  },
  created() {
    let ref = db
      .collection("smoothies")
      .where("slug", "==", this.$route.params.slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;

        this.title = doc.data().title;
        this.allIng = doc.data().ingrediants;
      });
    });
  },
  methods: {
    addIng() {
      if (this.ingrediant) {
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
    },
    handleSubmit() {
      if (this.title) {
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[&\/\\#,+()$~%.'":*?<>{}]/g,
          lower: true
        });
        db.collection("smoothies")
          .doc(this.smoothie.id)
          .update({
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
    }
  }
};
</script>

<style scoped>
.edit-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

h2 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-smoothie title {
  font-size: 2em;
  margin: 20px auto;
}
.edit-smoothie .field {
  position: relative;
}
.edit-smoothie .delete {
  position: absolute;
  bottom: 16px;
  right: 0;
  color: #aaa;
  cursor: pointer;
}
</style>
