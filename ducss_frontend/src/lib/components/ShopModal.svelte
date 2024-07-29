<script lang="ts">

	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

    export let showModal : boolean;
	export let id : number;
	export let name : string;
	export let desc : string;
	export let cost : string;
	export let options : string = "";
	export let image : string;

    let dialog : HTMLDialogElement;

    $: if (dialog && showModal) dialog.showModal();

    let dispatcher = createEventDispatcher();

	function buyNow () {
		dispatcher(
			'buyNow',
			{
				id : id,
				name : name,
				cost : cost
			}
		);
	}

	function addToCart () {
		dispatcher(
			'addToCart', 
			{
				id : id,
				name : name,
				cost : cost
			}
		);
	}

</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialog} on:close={() => (showModal = false)} on:click|self={() => dialog.close()} transition:fly={{ y: 50 }} on:introstart on:outroend>
	<img src={image} alt={name}>
	<div class="details"> 
		<h1>{name}</h1>
		<h2>{cost}</h2>
		<p>{desc}</p>

		{#if options !== ""}
		<h3 class="options">TEST OPTIONS</h3>
		{/if}

	</div>
	<button class="cart-button" on:click={addToCart}>Add to Cart</button>
	<button class="buy-now-button" on:click={buyNow}>Buy Now</button>
</dialog>

<style>

	* {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	dialog {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr; 
		grid-template-rows: 1fr 1fr 1fr 1fr 1fr; 
		gap: 0px 0px; 
		grid-template-areas: 
		  "image image image details details"
		  "image image image details details "
		  "image image image cartButton buyNowButton"; 

		width: 1000px;
		height: 500px;
		padding: 0;
		border: none;
		border-radius: 10px;
		background-color: hsl(150, 100%, 98%);
	}

	dialog::backdrop {
		background: hsl(209, 15%, 28%, .6);
		backdrop-filter: blur(10px);
	}

	dialog[open]::backdrop {
		animation: fade 500ms ease-in-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	
	img {
		height: 500px;
		width: 100%;
		grid-area: image;

		border-right: 3px inset hsla(15, 95%, 58%, .6);
	}
	
	.details {
	  display: grid; 
	  gap: 0px 0px; 
	  grid-template-rows: 1fr 1fr 1fr 1fr;
	  grid-template-areas: 
		"name"
	  	"cost"
	    "description"
	    "options"; 
	  grid-area: details; 

	  padding: 15px;
	  pointer-events: none;
	}

	h1 {
		grid-area: name;

		font-size: 36px;
		font-weight: 500;
		color: hsl(209, 15%, 28%);
		line-height: .8;
	}

	h2 {
		grid-area: cost;

		margin-top: -12px;
		font-size: 24px;
		font-weight: 400;
		color: hsla(207, 12%, 43%);
		line-height: .6;
	}

	p {
		grid-area: description;

		margin-top: -42px;
		font-weight: 400;
		color: hsl(208, 12%, 58%);
		hyphens: auto;
		text-align: justify;
	}

	.options { 
		grid-area: options; 
		text-align: center;
	}

	.cart-button { 
		grid-area: cartButton; 
		
		width: 75%;
		height: 50%;
		margin: auto 0 auto auto;

		font-size: 24px;
		font-weight: 600;
		text-align: center;

		background-color: hsl(15, 95%, 58%);
		border: none;
		border-radius: 10px 0 0 10px;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10);
		transition: box-shadow 750ms ease-in-out;

		cursor: pointer;
	}

	.cart-button:hover {
        box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.5);
	}

	.cart-button:active {
		background-color: blue;
	}

	.buy-now-button { 
		grid-area: buyNowButton; 
		
		width: 75%;
		height: 50%;
		margin: auto auto auto 0;

		font-size: 24px;
		font-weight: 600;
		text-align: center;

		background-color: blue;
		border: none;
		border-radius: 0 10px 10px 0;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10);
		transition: box-shadow 750ms ease-in-out;

		cursor: pointer;
	}

	.buy-now-button:hover {
        box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.5);
	}

	.buy-now-button:active {
		background-color: blue;
	}

</style>