<script>
    import { browser } from "$app/environment";
    import { onMount } from "svelte"
     
	onMount(() => {
		localStorage.cartItems = [];
	});
</script>

<div>
	<h1>Successfully ordered items!</h1>
</div>

<style>

	:global(body) {
		height: calc(50vh + 88.4px);
		width: 100%;
	}

	div {
		display: flex;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		color: hsl(209, 15%, 28%);

		width: 100%;
		height: 100%;

		align-items: center;
		justify-content: center;
	}

</style>