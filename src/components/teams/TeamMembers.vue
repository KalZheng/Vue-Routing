<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
    <router-link to="/teams/t2">Go to Team 2</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  inject: ['users', 'teams'],
  props: ['teamId'],
  components: {
    UserItem,
  },
  data() {
    return {
      teamName: '',
      members: [],
    };
  },
  methods: {
    // loadTamMembers(route) {
    loadTamMembers(teamId) {
      // this.$route.path;//teams/t1
      // const teamId = this.$route.params.teamId;
      // const teamId = route.params.teamId;
      const selectedTeam = this.teams.find((team) => team.id === teamId);
      const members = selectedTeam.members;
      const selectedMember = [];
      for (const member of members) {
        const selectedUser = this.users.find((user) => user.id === member);
        selectedMember.push(selectedUser);
      }
      this.members = selectedMember;
      this.teamName = selectedTeam.name;
    },
  },
  created() {
    // this.loadTamMembers(this.$route);
    this.loadTamMembers(this.teamId);
  },
  //an alternative to solve update teamId but not as effecient
  beforeRouteUpdate(to, from, next) {
    console.log('TeamMembers cmp beforeRouteUpdate');
    console.log(to, from);
    // this.loadTamMembers(to.params.teamId);
    next();
  },
  watch: {
    // $route(newRoute) {
    //   this.loadTamMembers(newRoute);
    // },
    teamId(newId) {
      this.loadTamMembers(newId);
    },
  },
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
