<script lang="ts">
	import { fade, fly, scale } from 'svelte/transition';

	import ducss from '$lib/images/UI_Icons/ducss_big.png';
	import ducssMask from '$lib/images/UI_Icons/ducss_right_bracket.png';

	import doubleArrow from '$lib/images/UI_Icons/double-arrow.png';

	import discord from '$lib/images/Footer_Icons/discord.png';
	import instagram from '$lib/images/Footer_Icons/instagram.png';
	import linkedin from '$lib/images/Footer_Icons/linkedin.png';

	import contactForm from '$lib/images/Footer_Icons/contactForm.png';

	import { page } from '$app/state';
	import { onMount } from 'svelte';
	let { children, data } = $props();

	var collapsed: boolean = true;

	const navLinks = [
		['Committee', '/about'],
		['Sponsors', '/sponsors']
	];

	//$: footerState = collapsed ? 'collapsed' : 'expanded';
	// Pathname learned from https://www.reddit.com/r/sveltejs/comments/qx95ge/how_can_i_get_the_current_route_in_a_svelte_kit/
	let currentPage = $derived(page.url.pathname);

	let showNav = $state(true);
	let openMenu = $state(false);
	let lastScrollY = $state(0);

	onMount(() => {
		const onScroll = () => {
			const scrollY = window.scrollY;
			if (scrollY <= 0 || scrollY < lastScrollY) {
				// At top or scrolling up
				showNav = true;
			} else if (scrollY > lastScrollY) {
				// Scrolling down
				showNav = false;
				openMenu = false;
			}
			lastScrollY = scrollY;
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	});
	$effect(() => {
		page.url.pathname;
		openMenu = false;
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Devanagari:wght@100;200;300;400;500;600;700&family=Roboto+Slab:wght@100..900&family=Shrikhand&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main>
	<nav class:visible={showNav} class:open={openMenu}>
		<div class="relative-container">
			<div class="logo-container">
				<a class="ducss" href="/">
					<img class="ducss" src={ducss} alt="D.U. Computer Science Logo" />
				</a>
				<div class="ducssMask">
					<a href="/">
						<img class="ducssBracket" src={ducssMask} alt="" />
					</a>
				</div>
			</div>
		</div>
		<div class="relative-container">
		<ul>
			<!--
                <li><a class="nav-button" href="/store">Store</a></li>
                <li><a class="nav-button" href="/opportunities">Opportunities</a></li>
                    Podcast
                    Leetcode
                    Project of the Month
				<li><a class="nav-button" href="/events">Events</a></li>
                    Run a workshop
                <li><a class="nav-button" href="/about">About</a></li>
                    Structure
                    Constitution
                    Sponsors
                <li><a class="nav-button" href="/contact">Contact</a></li>
                    For members
                    For sponsors
                <li><a class="nav-button" href="/login">Login</a></li>
                <li><a class="nav-button" href="/join">Join Us</a></li>
                -->
			{#each navLinks as navLink}
				<li>
					<a
						class="nav-button {currentPage === navLink[1]
							? 'active'
							: ''}"
						href={navLink[1]}
					>
						{navLink[0]}
					</a>
				</li>
			{/each}
			<!--
				If no login:
				Login
				If logged in:
				Name (if committee)
				- My Profile
				- Edit Site
				- Bulletin Board
				- Logout
				Name (if member)
				- My Profile
				- Logout
			-->
			{#if data.email}
				<li>
					<div class="dropdown">
						<button class="compass">{data.email}</button>
						<div class="compass-dropdown">
							<a href="/profile">My Profile</a>
							{#if data.role === 'committee'}
								<a href="/edit-site">Edit Site</a>
								<!--<a href="/bulletin-board">Bulletin Board</a>-->
							{/if}
							<a href="/logout">Logout</a>
						</div>
					</div>
				</li>
			{:else}
				<li><a href="/login" class="login">Login</a></li>
			{/if}
		</ul>
		<button
			class="menu-button"
			aria-label="Toggle navigation"
			aria-expanded={openMenu}
			onclick={() => (openMenu = !openMenu)}
		>
			<span></span>
			<span></span>
			<span></span>
		</button>
		</div>
	</nav>
	{@render children()}
</main>

<!--
<footer class={footerState}>
    <div class="footer-content-container">
        <a class="footer-icon-wrapper instagram" href="https://instagram.com/ducss_">
            <img class="footer-icon instagram" src={instagram} alt="Link to instagram"/>
        </a>
        <a class="footer-icon-wrapper linkedin" href="https://ie.linkedin.com/company/ducss">
            <img class="footer-icon linkedin" src={linkedin} alt="Link to linkedin"/>
        </a>

        <input type="image" class="footer-toggle {footerState}" src={doubleArrow} alt="Footer Toggle Button" on:click={() => collapsed = !collapsed}/>
        
        <a class="footer-icon-wrapper discord" href="https://discord.gg/GcTjxcsbW4">
            <img class="footer-icon discord" src={discord} alt="Link to discord"/>
        </a>
        <a class="footer-icon-wrapper contact" href="/contact-us">
            <img class="footer-icon contact" src={contactForm} alt="Link to contact form"/>
        </a>
    </div>
</footer>
-->

<style>
	/* ↓↓ Navigation Styling ↓↓ */
	nav {
		position: fixed;
		display: flex;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		box-sizing: border-box;
		margin: 30px;
		background-color: var(--orange);
		border-radius: 50px;
		border: 2px solid var(--yellow);
		box-shadow: 0px 3px var(--lightred);
		transition: transform 0.3s ease;
	}
	nav > :first-child {
		margin-right: auto;
	}
	nav:not(.visible) {
		transform: translateY(-200%);
	}
	nav.visible {
		transform: translateY(0);
	}
	.logo-container {
		position: absolute;
		display: flex;
		align-items: center;
		background-color: var(--beige);
		border-radius: 50px;
		border: 2px solid var(--orange);
		box-shadow: 0px 6px var(--lightorange);
		left: 0;
		margin-left: -5px;
	}
	.ducss {
		height: 80px;
	}
	.ducssBracket {
		height: 78px;
		margin-top: 3px;
	}
	.ducssMask {
		position: relative;
		display: inline-block;
		margin-left: -65px;
		width: 80px;
		overflow: hidden;
		white-space: nowrap;
		transition: right 500ms ease-in-out;
	}
	/*
	.ducss:hover + .ducssMask {
		right: -60px;
	}
    **/
	nav ul {
		display: flex;
		list-style: none;
		margin-left: auto;
		margin: 0;
	}
	nav li {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 15px;
	}
	/*
	nav li:before {
		display: block;
		content: '';
		border-bottom: solid 3.5px hsl(15, 95%, 58%);
		padding-bottom: 2px;
		margin-bottom: -2px;
		transform: scaleX(0);
		transition: transform 500ms ease-in-out;
	}
	nav li:hover:before {
		transform: scaleX(1);
		transform-origin: 100% 50%;
	}
	nav li:after {
		display: block;
		content: '';
		border-bottom: solid 3.5px hsl(15, 95%, 58%);
		padding-bottom: 2px;
		transform: scaleX(0);
		transition: transform 500ms ease-in-out;
	}
	nav li:hover:after {
		transform: scaleX(1);
		transform-origin: 0% 50%;
	}
		*/
	.nav-button {
		color: var(--yellow);
		text-shadow: 1px 1px 0px var(--darkorange);
		font-family: var(--font-titles);
		font-size: var(--p-size);
		text-decoration: none;
		padding: 5px;
	}
	.nav-button:hover {
		background-color: var(--lightorange);
	}
	.nav-button.active {
		background-color: var(--yellow);color: var(--orange);
	}
	nav .dropdown {
		position: relative;
		display: flex;
		align-items: center;
		text-align: center;
		margin: 5px 15px;
	}
	.login {
		height: max-content;
		margin: 0;
		padding: 5px 20px;
		color: var(--darkorange);
		background-color: var(--yellow);
		text-shadow: 1px 1px 0px var(--darkorange);
		-webkit-text-fill-color: var(--orange);
		-webkit-text-stroke: 1px;
		font-family: var(--font-titles);
		font-size: var(--p-size);
		text-decoration: none;
		border-radius: 15px;
		border: 1px solid var(--darkorange);
		box-shadow: 0px 2px var(--darkorange);
		cursor: pointer;
		justify-content: center;
	}
	.compass {
		height: max-content;
		margin: 0;
		min-width: max-content;
		width: 150px;
		padding: 3px 20px;
		color: var(--darkorange);
		background-color: var(--yellow);
		text-shadow: 1px 2px 0px var(--darkorange);
		-webkit-text-fill-color: var(--orange);
		-webkit-text-stroke: 1px;
		font-family: var(--font-titles);
		font-size: var(--p-size);
		text-decoration: none;
		border-radius: 15px;
		border: 1px solid var(--darkorange);
		box-shadow: 0px 2px var(--darkorange);
		cursor: pointer;
		justify-content: center;
	}
	nav .dropdown:hover .compass {
		border-radius: 15px 15px 0px 0px;
	}
	nav .dropdown .compass-dropdown {
		margin-top: -10px;
		position: absolute;
		left: 0;
		top: 100%;
		width: 100%;
		z-index: 1;
		overflow: hidden;
		box-sizing: border-box;
		display: none;
		flex-direction: column;
		background-color: var(--yellow);
		border: 1px solid var(--darkorange);
		box-shadow: 0px 2px var(--darkorange);
		border-radius: 0px 0px 15px 15px;
	}
	nav .dropdown:hover .compass-dropdown {
		display: flex;
	}
	.compass-dropdown a {
		color: var(--orange);
		text-shadow: 1px 1px var(--lightyellow);
		font-size: 16px;
		color: var(--darkorange);
		padding: 15px;
		text-decoration: none;
		font-family: var(--font-headings);
		border-top: 1px solid var(--darkorange);
	}
	.compass-dropdown a:hover {
		background-color: var(--orange);
	}
	.menu-button {
		display: none;
		background: none;
		border: 0;
		justify-content: center;
		padding: 15px;
		gap: 5px;
		cursor: pointer;
		flex-direction: column;
		align-items: flex-end;
	}
	.menu-button span {
		display: block;
		width: 30px;
		height: 5px;
		background: var(--yellow);
	}
	@media screen and (max-width: 1200px) {
		.logo-container {
			position: absolute;
			display: flex;
			align-items: center;
			background-color: var(--beige);
			border-radius: 50px;
			border: 2px solid var(--orange);
			box-shadow: 0px 6px var(--lightorange);
			left: 0;
			margin-left: -15px;
		}

		.ducss {
			height: 80px;
		}

		.ducssBracket {
			height: 78px;
			margin-top: 3px;
		}

		.ducssMask {
			position: relative;
			display: inline-block;
			margin-left: -65px;
			width: 80px;
			overflow: hidden;
			white-space: nowrap;
			transition: right 500ms ease-in-out;
		}
	}
	@media screen and (max-width: 800px) {
		nav {
			margin: 15px;
		}
		.logo-container {
			margin-left: -5px;
		}
		.ducss {
			height: 60px;
		}
		.ducssBracket {
			height: 58px;
			margin-top: 3px;
		}
		.ducssMask {
			margin-left: -50px;
			width: 50px;
		}
		.menu-button {
			display: flex;
		}
		nav ul {
			position: absolute;
			top: 100%;
			right: 0;
			width: 240px;
			padding: 0;
			z-index: -100;
			border: 1px solid black;

			display: none;
			flex-direction: column;
			gap: 0;

		}
		nav.open ul {
			display: flex;
		}
		nav.open .menu-button {
			background-color: var(--yellow);
			border: 1px solid black;
			border-radius: 15px 15px 0px 0px;
		}
		nav.open .menu-button span {
			background-color: var(--orange);
		}
		nav ul li {
			background-color: var(--orange);
			border-bottom: 1px solid var(--darkorange);
		}
		nav .dropdown .compass-dropdown {
			margin-top: 0px;
		}
	}
</style>
