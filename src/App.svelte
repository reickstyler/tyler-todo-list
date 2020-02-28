<script>
	export let name;
	import Login from "./Login.svelte";
</script>

<svelte:head>
	<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css" /> -->
</svelte:head>

<style>
	h1 {
	  	color: rgb(73, 147, 231);
	}
	main {
	  margin: 20px;
	}
</style>

<main class="content">

	<h1>{name}</h1>

	<Login />
</main>