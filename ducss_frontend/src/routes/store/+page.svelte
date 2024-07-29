<script lang="ts">

	import type { PageData } from "../$types"; 
	import { cartItems, addToCart, removeFromCart } from "./cart";

	import ShopCard from "$lib/components/ShopCard.svelte";
	import ShopModal from "$lib/components/ShopModal.svelte";

	import duckSpin from "$lib/images/duckspinning.gif";
	import shoppingBasket from "$lib/images/UI_Icons/shoppingBasket.svelte";

	import funkyTown from "$lib/audio/FunkyTown.mp3";
	import ShoppingBasket from "$lib/images/UI_Icons/shoppingBasket.svelte";

	let basketHasItem : boolean = false;
	$: basketStatus = basketHasItem ? "active" : "inactive";

	export let data: PageData;

	$: ({ products } = data);

	let duck : boolean = false;
	if (data.products.length == 0) duck = true;
	else duck = false;

	let showModal : boolean = false;
	let modalName : string;
	let modalDesc : string;
	let modalCost : string;
	let modalImage : string;
	let modalId : number;
	let modalOptions : string;

	function modal(event) {
		modalName = event.detail.name;
		modalDesc = event.detail.description;
		modalCost = event.detail.cost;
		modalImage = event.detail.image;
		modalId = event.detail.id;
		showModal = true;
	}

	async function checkout() {
    const data = await fetch("/store/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: $cartItems,
      }),
    }).then((data) => data.json());
    window.location.replace(data.url);
  }

  function buyNow(event) {
	var product = {
		id : event.detail.id,
		name : event.detail.name,
		price : event.detail.cost
	};
	addToCart(product);
	checkout;
  }

  function addToCartWrapper(event) {
	var product = {
		id : event.detail.id,
		name : event.detail.name,
		price : event.detail.cost
	};
	addToCart(product);
  }

</script>


{#if duck}

	<!-- svelte-ignore a11y-distracting-elements -->
	<marquee direction="right">Nothing For Sale</marquee>

	<audio src={funkyTown} loop autoplay/>
	<img class="spinning-duck"  src={duckSpin} alt="Spinning Duck to signify nothing for sale"/>

	<!-- svelte-ignore a11y-distracting-elements -->
	<marquee>Please Accept This Duck as an Apology</marquee>

{:else}

	{#if showModal}

	<ShopModal bind:showModal name={modalName} id={modalId} cost={modalCost} desc={modalDesc} image={modalImage}
	on:buyNow={checkout} on:addToCart={addToCartWrapper}
	/>

	{/if}

	<div class="basket-container {basketStatus}">
		<div class="basket-left {basketStatus}"/>
		<div class="basket {basketStatus}">
			<ShoppingBasket/>
		</div>
		<div class="basket-right {basketStatus}"/>
	</div>

	<div class="cards">

		{#each products as product}

			<ShopCard name={product.name} cost={product.cost} id={product.id}
			descShort={product.descShort} description={product.description} image={product.image}
			on:inspect={modal}/>

		{/each}
	</div>

{/if}


<style>

	marquee {
		font-size: 32px;
	}

	.spinning-duck {
		display: block;
		margin: 0 auto;
		margin-top: 35px;
		height: 450px;
		width: 450px;
	}

	.cards {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-content: center;
		margin-left: -40px;
	}

	.basket-container.inactive {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 16px;
		margin-top: -15px;

		transform: scale(0,0);
		transition: transform 850ms ease, height 400ms ease;
	}

	.basket-container.active{
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 50px;
		margin-top: -15px;
		margin-bottom: 10px;

		transform: scale(1,1);
		transition: transform 850ms ease, height 500ms ease;
	}

	.basket.inactive {
		width: 50px;
		height: 50px;
		border-radius: 100%;
		background-color: hsl(240, 100%, 99%);
		border: 3.5px solid hsl(25, 95%, 58%);

		text-align: center;
		align-content: flex-end;

		transform: scale(0,0);
		transition: transform 500ms ease;
	}

	.basket {
		
		width: 50px;
		height: 50px;
		border-radius: 100%;
		background-color: hsl(25, 100%, 97%);
		border: 3.5px solid hsl(25, 95%, 58%);

		box-sizing: border-box;
		padding: 0;
		margin: 0;

		transform: scale(1,1);
		transition: transform 500ms ease;
	}

	.basket-left {
		width: 35%;
		height: 3.2px;
		background-color: hsl(25, 95%, 58%);

		transition: width 2000ms ease;
	}

	.basket-left:before {
		content: '';
		position: absolute;
  		background: hsl(25, 95%, 58%);
		width: 15px;
		height: 3px;
		margin-left: -10px;
  		-webkit-transform-origin: 100% 0;
  		-ms-transform-origin: 100% 0;
  		transform-origin: 100% 0;
  		-webkit-transform: skew(45deg);
  		-ms-transform: skew(45deg);
  		transform: skew(45deg);
  		z-index: -1;
	}

	.basket-right {
		width: 35%;
		height: 3px;
		background-color: hsl(25, 95%, 58%);
	}

	.basket-right:after {
		content: '';
		position: absolute;
  		background: hsl(25, 95%, 58%);
		width: calc(35% + 15px);
		height: 3px;
  		-webkit-transform-origin: 100% 0;
  		-ms-transform-origin: 100% 0;
  		transform-origin: 100% 0;
  		-webkit-transform: skew(-45deg);
  		-ms-transform: skew(-45deg);
  		transform: skew(-45deg);
  		z-index: -1;
	}

</style>