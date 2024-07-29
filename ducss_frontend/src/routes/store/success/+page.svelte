<script>
    import { browser } from "$app/environment";
    import { onMount } from "svelte"
     
	onMount(() => {
		localStorage.cartItems = [];
	});
</script>

<h1>Successfully ordered items!</h1>