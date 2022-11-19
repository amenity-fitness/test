<template>
<div id="reloadDialog" class="hidden">
  <div id="overlay">
    <div class="dialog">
      <h3>An updated version is available,</h3>
      <p class="pb-2">Click OK to refresh content</p>
      <form id="reloadForm" onsubmit="e.preventDefault()">
        <footer>
          <button>OK</button>
        </footer>
      </form>
    </div>
  </div>
</div>
</template>

<script>
export default {
  methods: {
    submit(event) {
      // event.close()
      // event.preventDefault()
    }
  }
}
</script>
