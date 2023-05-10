<template>
  <v-app-bar
    app
    color="white"
    elevation="1"
    flat
    :hide-on-scroll="false"
    class="app-bar"
  >
    <div class="content">
      <div class="backBtn" v-if="showBack">
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </div>
      <div class="title">
        <h3 class="username">{{ $t("hi", { name: user.firstName }) }}</h3>
        <small>{{ $tc("you.project.count", getUserProjects.length) }}</small>
      </div>
      <div class="avatar">
        <router-link :to="{ name: 'settings' }">
          <v-avatar
            :color="user.getAvatarUrl('50x50') ? 'transparent' : 'primary'"
            class="border-primary"
            size="32"
          >
            <img
              :src="user.getAvatarUrl('50x50')"
              height="22"
              v-if="user.getAvatarUrl('50x50')"
            />
            <span class="white--text" style="font-size: 0.9rem" v-else>{{
              user.initials
            }}</span>
          </v-avatar>
        </router-link>
      </div>
    </div>
  </v-app-bar>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "auth/user",
      projects: "project/all",
      showBack: "app/show_back",
    }),
    getUserProjects: {
      get: function () {
        const projects = [...this.projects].sort((a, b) => {
          if (a.hasUserPendingEvaluations && !b.hasUserPendingEvaluations) {
            return -1;
          }
          if (b.hasUserPendingEvaluations && !a.hasUserPendingEvaluations) {
            return 1;
          }
          return a.name > b.name ? 1 : -1;
        });

        return projects.filter((project) => project.activeIdeaCount > 0);
      },
    },
  },
  data() {
    return {
      randomNumber: null,
    };
  },
 
  mounted() {
    document.body.classList.add("has-app-bar");
  },
  beforeDestroy() {
    document.body.classList.remove("has-app-bar");
  },
  methods: {
    goBack() {
      this.$router.replace({
        name: "projects",
      });
    },
  },
};
</script>