<script lang="ts">

	import type { PageData } from "../$types"; 
	import { fly, scale } from 'svelte/transition';
	import { cartItems, addToCart, removeFromCart, decrementCart } from "./cart";
	import { browser } from "$app/environment";

	import ShopCard from "$lib/components/ShopCard.svelte";
	import ShopModal from "$lib/components/ShopModal.svelte";

	import duckSpin from "$lib/images/duckspinning.gif";
	import shoppingBasket from "$lib/images/UI_Icons/shoppingBasket.svelte";

	import funkyTown from "$lib/audio/FunkyTown.mp3";
	import ShoppingBasket from "$lib/images/UI_Icons/shoppingBasket.svelte";
	import { quintInOut, quintOut } from "svelte/easing";

	var basketStatus = JSON.parse(localStorage.cartItems).length > 0 ? true : false;
	var viewBasket : boolean = false;

  	let basketItems;
	cartItems.subscribe(items => basketItems = items)

	function basketClick() {
		viewBasket = !viewBasket;
	}

	function updateBasket() {
		if (JSON.parse(localStorage.cartItems).length > 0) basketStatus = true;
		else basketStatus = false;
	}

	export let data: PageData;

	$: ({ products } = data);

	let duck : boolean = false;
	let MongoError : boolean = false;

	if (data.products == null)  MongoError = true;
	else { MongoError = false;
		if (data.products.length == 0) duck = true;
		else duck = false;
	}

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

  function addToCartWrapper(event) {
	var product = {
		id : event.detail.id,
		name : event.detail.name,
		price : event.detail.cost
	};
	addToCart(product);
	updateBasket();
  }

</script>

{#if MongoError}
	<h1>Error Connecting to Mongo DB</h1>
{:else}
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

		{#if basketStatus}
		<div class="basket-container" transition:fly={{ y: 50 }} on:introstart on:outroend>
			<div class="basket-left"/>
			<!-- svelte-ignore a11y-click-events-have-key-events svelte-ignore a11y-no-static-element-interactions -->
			<div class="basket" on:click={basketClick} on:focus={basketClick}>
				<ShoppingBasket/>
				
			</div>
			<div class="basket-right"/>
		</div>
		{#if viewBasket}
			<div class="basket-details" transition:fly={{ duration: 1000, x: 0, y: 0,  easing: quintOut}}>
				{#each basketItems as cartItem}
					<div class="basket-item"> 
						<h1 class="basket-item-content item-name">{cartItem.name}</h1>
						<h2 class="basket-item-content item-price">€{cartItem.price * cartItem.amount}</h2>
						<div class="item-amount pill">
							<button class="decrement-button" on:click={() => decrementCart(cartItem.id)}>-</button>
							<h3 class="basket-item-content item-amount">{cartItem.amount}</h3>
							<button class="increment-button" on:click={() => 
								{var product = {
										id : cartItem.id,
										name : cartItem.name,
										price : cartItem.price
									};
								 addToCart(product);
								}}>+</button>
						</div>
						<!-- svelte-ignore a11y-click-events-have-key-events svelte-ignore a11y-no-static-element-interactions -->
						<div class="remove-button" on:click={() => removeFromCart(cartItem.id)}>remove</div>
					</div>
				{/each}
				<button class="checkout-button" on:click={checkout}>checkout</button>
			</div>
		{/if}

		{/if}

		<div class="cards">

			{#each products as product}

				<ShopCard name={product.name} cost={product.cost} id={product.id}
				descShort={product.descShort} description={product.description} image={product.image}
				on:inspect={modal}/>

			{/each}
		</div>

	{/if}
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

	.basket-container {
		display: flex;
		position: relative;
		z-index: 2;
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

	.basket {

		width: 50px;
		height: 50px;
		border-radius: 100%;
		background-color: hsl(25, 100%, 97%);
		border: 3.5px solid hsl(25, 95%, 58%);

		box-sizing: border-box;
		padding: 0;
		margin: 0;

		cursor: pointer;

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

	.basket-details {
		position: absolute;
		left: 0; 
  		right: 0; 
  		margin-left: auto; 
  		margin-right: auto;
		margin-top: -34px;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		background-color: hsl(25, 100%, 97%);
		border: 4px solid hsl(25, 95%, 58%);
		border-top: none;
		
		height: 300px;
		width: 68%;

		box-sizing: content-box;

	}

	.basket-item {
		display: grid;
		grid-template-columns: 1fr 1fr 2fr 1fr;
		gap: 0px 0px;
		grid-template-areas: "name price amount remove";

		margin-left: 8px;
		margin-right: 8px;

        border-bottom: 3px inset hsla(229, 19%, 62%, .5);

		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		line-height: .6;
	
	}

	.basket-item-content {
		margin-left: 8px;
	}

	.item-name {
		grid-area: name;

		font-size: 24px;
		font-weight: 600;	
		letter-spacing: -0.05em;
        color: hsl(209, 15%, 28%);

		align-self: baseline;
	}

	.item-price {
		grid-area: price;

		font-size: 16px;
		font-weight: 500;
		color: hsla(207, 12%, 43%);
		letter-spacing: -0.05em;	
		
		align-self: baseline;
	}

	.item-amount {
		flex: 0 0 20px;
		font-size: 12px;
		font-weight: 500;
        color: hsl(208, 12%, 58%);
		text-align: center;
		padding-right: .5em;
	}

	.item-amount.pill {
		display: flex;
		grid-area: amount;
		width: 88px;
		height: 25px;
		padding-right: 0px;
		padding-left: 2px;
		background-color: white;

		align-self:center;
		justify-self: end;

		justify-content:end;
  		align-items: center;

		border: 2px solid hsl(207, 12%, 43%);
		border-radius: 50px;
	}

	.decrement-button {
		flex: 0 0 28px;
		height: 25px;
		border-radius: 15px;
		border: none;

		background-color: hsl(208, 21%, 88%);
		color: hsl(25, 93%, 35%);

		font-size: 16px;
		font-weight: 500;

		cursor: pointer;
	}

	.increment-button {
		flex: 0 0 28px;
		height: 25px;
		border-radius: 15px;
		border: none;

		background-color: hsl(208, 21%, 88%);
		color: hsl(25, 93%, 35%);

		font-size: 16px;
		font-weight: 500;

		cursor: pointer;
	}

	.remove-button {
		color: hsla(25, 93%, 35%, .8);
		border-bottom: 2px solid hsla(25, 93%, 35%, .8);
		font-weight: 600;

		height: 1em;
		width: max-content;

		align-self: baseline;
		justify-self: center;

		cursor: pointer;
	}

	.remove-button:hover {
		color: hsl(25, 93%, 35%);
		border-bottom: 2px solid hsl(25, 93%, 35%);
	}

	.checkout-button {
		position: absolute;
		left: 0; 
  		right: 0; 
		bottom: 0;
  		margin-left: auto; 
  		margin-right: auto;
		margin-bottom: 8px;
		
		padding: 10px;
		width: 128px;
		height: 48px;
		border-radius: 16px;
		border: none;
		cursor: pointer;

		background-color: hsl(15, 95%, 58%);

		box-shadow: inset 0 2px 0 hsl(35, 95%, 58%), inset 0 2px 3px rgba(0,0,0,.2);

		transition: box-shadow 1000ms;
		
	}

	.checkout-button:active {
		box-shadow: inset 0 -2px 0 hsl(35, 95%, 58%), inset 0 2px 2px rgba(0,0,0,.1);
	}

</style>