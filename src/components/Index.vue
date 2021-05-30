<template>
  <div class="index container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="material-icons delete" @click="handleDelete(smoothie.id)"
          >delete</i
        >
        <h2 class="indigo-text">{{ smoothie.title }}</h2>
        <ul class="ingrediants">
          <li v-for="(ing, index) in smoothie.ingrediants" :key="index">
            <span class="chip">
              {{ ing }}
            </span>
          </li>
        </ul>
        <a href="" class="btn-floating btn-small halfway-fab pink">
          <router-link
            :to="{ name: 'EditSmoothie', params: { slug: smoothie.slug } }"
          >
            <i class="material-icons">edit</i>
          </router-link>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "Index",
  data() {
    return {
      smoothies: []
    };
  },
  methods: {
    handleDelete(id) {
      db.collection("smoothies")
        .doc(id)
        .delete()
        .then(() => {
          this.smoothies = this.smoothies.filter(
            smoothie => smoothie.id !== id
          );
        });
    }
  },
  created() {
    db.collection("smoothies")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let smoothie = doc.data();
          smoothie.id = doc.id;
          this.smoothies.push(smoothie);
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 30px;
}
.index h2 {
  font-size: 1.8rem;
  text-align: center;
  margin-top: 0;
}
.index .ingrediants {
  margin: 30px auto;
}

.index .ingrediants li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
