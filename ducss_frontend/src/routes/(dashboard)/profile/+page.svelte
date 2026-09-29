<script lang="ts">
	// @ts-nocheck

	import '$lib/style.css';
	import { onMount } from 'svelte';
    import { page } from '$app/state';
	let { data } = $props();

	onMount(async () => {
		if (document) document.body.classList.add('yellow');
	});
</script>

<svelte:head>
	<!-- Icons loaded here. Specify which ones to load in the link after "icon_names=" -->
	<link
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&icon_names=confirmation_number,schedule,location_on,account_balance,crowdsource&display=block"
		rel="stylesheet"
	/>
	<!-- Fonts loaded here.-->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Devanagari:wght@100;200;300;400;500;600;700&family=Roboto+Slab:wght@100..900&family=Shrikhand&display=swap"
		rel="stylesheet"
	/></svelte:head
>
<main>
	<section class="hero">
		<h2 style="color: var(--yellow);">{data.first_name} {data.last_name} is a DUCSS member.</h2>
	</section>
	
</main>
