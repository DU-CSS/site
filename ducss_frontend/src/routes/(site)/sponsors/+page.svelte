<script>
	// @ts-nocheck

	import '$lib/style.css';
	import { events } from '$lib/shared'; // Import event data
	import { sponsors } from '$lib/shared';
	import social from '$lib/images/event_categories/social.png';
	import gaming from '$lib/images/event_categories/gaming.png';
	import tech from '$lib/images/event_categories/tech.png';
	import Pond1 from '$lib/images/Ponds/Pond1.png';
	import Pond2 from '$lib/images/Ponds/Pond2.png';
	import TV from '$lib/images/Design/tv.png';
	import CommitteeNest from '$lib/images/committee/committee-nest.png';
	import OurSociety from '$lib/images/our_society.png';
	import Johnathan from '$lib/images/Johnathan.gif';
	import Johnathan_Stares_Into_Soul from '$lib/images/Johnathan_Stares_Into_Soul.png';
	import instagram from '$lib/images/Footer_Icons/instagram.png';
    import History from '$lib/images/History.png';

	function Johnathan_hover(element) {
		element.setAttribute('src', Johnathan_Stares_Into_Soul);
	}

	function Johnathan_unhover(element) {
		element.setAttribute('src', Johnathan);
	}
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
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Devanagari:wght@100;200;300;400;500;600;700&family=Jersey+20&family=Shrikhand&display=swap"
		rel="stylesheet"
	/></svelte:head
>
<main>
	<body class="yellow">
		<section class="hero blue">
			<div class="header">
				<h1>Sponsors</h1>
			</div>
		</section>
		<section>
            {#each sponsors as sponsor}
            <div class="card">
                <h3>{sponsor.get('Title')}</h3>
                <p class="description">{sponsor.get('Description')}</p>
            </div>
            {/each}
		</section>
	</body>
</main>