<template>
  <section>
    <form>
      <div class="w-10">
        <Loading-Spinner/>
      </div>
      <h1>You're Offline</h1>
      <h3>We can not currently access this page</h3>
      <p>
        Page will load when reconnected or
        <br>
        Click the button below to navigate back..
      </p>
      <footer>
        <button type="button" @click="previousPage">Return</button>
      </footer>
    </form>
  </section>
</template>
<script>
  // window.addEventListener('online', () => {
  //   window.location.reload();
  // });
// export default {
//   mounted() {
//     window.addEventListener('online', () => {
//       window.location.reload();
//     });
//     // this.checkNetworkAndReload();
//     // window.setTimeout(this.checkNetworkAndReload, 2500);
//   },
//   methods: {
//     async checkNetworkAndReload() {
//       const response = await fetch('.');
//       if (response.status >= 200 && response.status < 500) {
//         window.location.reload();
//         return;
//       }
//     },
//     previousPage() {
//       window.history.back()
//     }
//   }
// }
</script>
<style scoped>
  form {
    @apply bg-foreground p-4 rounded-xl space-y-2 flex flex-col items-center shadow-xl self-center
  }
  section {
    @apply self-center grow flex
  }
  footer {
    @apply w-full pt-2
  }
  button {
    @apply bg-accent w-full
  }
</style>