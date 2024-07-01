<script lang="ts">
	import ShopCard from "$lib/components/ShopCard.svelte";

	import duckSpin from "$lib/images/duckspinning.gif";
	import shoppingCart from "$lib/images/UI_Icons/shopping-cart.png";

	import funkyTown from "$lib/audio/FunkyTown.mp3";

	let duck : boolean = false;

	let basketHasItem : boolean = false;
	$: basketStatus = basketHasItem ? "active" : "inactive";

	function swap () {
		basketHasItem = !basketHasItem;
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

	<div class="basket-container {basketStatus}">
		<div class="basket-left {basketStatus}"/>
		<div class="basket {basketStatus}">
			<img class="basket-image {basketStatus}" src={shoppingCart} alt="Shopping Cart"/>
		</div>
		<div class="basket-right {basketStatus}"/>
	</div>

	<div class="cards">
		<ShopCard name="CS Ball Ticket" cost=50 descShort="Dancing and fun at the Radison Blu Hotel!"/>
		<ShopCard on:add={swap}/>
		<ShopCard/>
		<ShopCard/>
		<ShopCard/>
		<ShopCard/>

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
		margin-top: -20px;

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
		margin-top: -20px;

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
		background-color: hsl(240, 100%, 99%);
		border: 3.5px solid hsl(25, 95%, 58%);

		text-align: center;
		align-content: flex-end;

		transform: scale(1,1);
		transition: transform 500ms ease;
	}

	.basket-image {
		width: 35px;
		height: auto;

		margin-bottom: 5px;
		margin-left: 3.5px;
	}

	.basket-left {
		width: 35%;
		height: 3px;
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