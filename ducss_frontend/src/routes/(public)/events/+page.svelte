<script lang="ts">
	// @ts-nocheck

	import '$lib/style.css';
	import { events } from '$lib/shared'; // Import event data
	import { committee } from '$lib/shared';
	import social from '$lib/images/event_categories/social.png';
	import gaming from '$lib/images/event_categories/gaming.png';
	import tech from '$lib/images/event_categories/tech.png';
	import Pond1 from '$lib/images/Ponds/Pond1.png';
	import Pond2 from '$lib/images/Ponds/Pond2.png';
	import TV from '$lib/images/Design/tv.png';
	import CommitteeNest from '$lib/images/committee/committee-nest.png';
	import OurSociety from '$lib/images/Our_Society.png';
	import constitution from '$lib/images/committee/constitution.pdf';
	import Johnathan from '$lib/images/Johnathan.gif';
	import Johnathan_Stares_Into_Soul from '$lib/images/Johnathan_Stares_Into_Soul.png';
	import instagram from '$lib/images/Footer_Icons/instagram.png';
	import History from '$lib/images/History.png';
	import { onMount } from 'svelte';

	function Johnathan_hover(element) {
		element.setAttribute('src', Johnathan_Stares_Into_Soul);
	}

	function Johnathan_unhover(element) {
		element.setAttribute('src', Johnathan);
	}

	onMount(async () => {
		if (document) document.body.classList = 'beige';
	});

	// Today's date
	const today = new Date();
	const monthInt = today.getMonth();
	const year = today.getFullYear();
	const firstDay = new Date(year, monthInt, 1).getDay();
	const daysInMonth = new Date(year, monthInt + 1, 0).getDate();
	const monthString = today.toLocaleString('default', { month: 'long' });
	const calendarDays = [];
	console.log(firstDay);
	for (let day = 0; day < firstDay; day++) {
		calendarDays.push(null);
	}
	for (let day = 1; day <= daysInMonth; day++) {
		calendarDays.push(new Date(year, monthInt, day));
	}
</script>

<svelte:head>
	<!-- Icons loaded here. Specify which ones to load in the link after "icon_names=" -->
	<link
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&icon_names=confirmation_number,search,schedule,location_on,account_balance,crowdsource&display=block"
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
		<div class="header">
			<h1>Events</h1>
			<p>
				DUCSS members partake in diverse activities ranging from workshops, hackathons, and eSports
				events, to social gatherings like gaming tournaments and networking sessions.
			</p>
		</div>
		<div class="box">
			<h3>Come visit our society room in the Hamilton!</h3>
			<p>
				Our society room is available for events and is usually open whenever a committee member is
				around. Inside, you’ll find game consoles, PCs, couches, and a space to relax, socialise, or
				hang out between lectures.
			</p>
			<div class="list">
				<h4>1</h4>
				<p>Enter through the door to the first door on the left. The door code is 01986.</p>
				<h4>2</h4>
				<p>Walk up the stairs to the first floor.</p>
				<h4>3</h4>
				<p>Turn right and pass through the two red doors. The DUCSS room will be on your right!</p>
			</div>
		</div>
	</section>
	<section>
		<h2>{monthString}</h2>
		<div class="calendar">
			<p>Sunday</p>
			<p>Monday</p>
			<p>Tuesday</p>
			<p>Wednesday</p>
			<p>Thursday</p>
			<p>Friday</p>
			<p>Saturday</p>
			{#each calendarDays as day}
				<div class="card">
					<h4>{day != null ? day.getDate() : ''}</h4>
				</div>
			{/each}
		</div>
	</section>
	<section>
		<div class="filters">
			<input type="text" class="search" placeholder="Search"/>
            <span class="material-symbols-outlined">search</span>
		</div>
		{#each calendarDays as card}
			<div class="event-grid">
				<div>
					<p></p>
					<h3></h3>
				</div>
				<div class="card">
					<h3>{card.get('Title')}</h3>
					<div class="tags">
						<div class="tag">
							<span class="material-symbols-outlined">confirmation_number</span>
							<p>Free</p>
						</div>
						<div class="tag">
							<span class="material-symbols-outlined">schedule</span>
							<p>{card.get('Start Time')}-{card.get('End Time')}</p>
						</div>
						<div class="tag">
							<span class="material-symbols-outlined">location_on</span>
							<p>{card.get('Location')}</p>
						</div>
					</div>
					<p class="description">{card.get('Description')}</p>
					<div
						class="category {card.get('Category') === 'Social'
							? 'social'
							: card.get('Category') === 'Gaming'
								? 'gaming'
								: card.get('Category') === 'Tech'
									? 'tech'
									: ''}"
					>
						<!--TO-DO: On hover say category name-->
						<div class="noise"></div>
						<img
							src={card.get('Category') === 'Social'
								? social
								: card.get('Category') === 'Gaming'
									? gaming
									: card.get('Category') === 'Tech'
										? tech
										: ''}
							alt={card.get('Category') === 'Social'
								? 'A coffee cup.'
								: card.get('Category') === 'Gaming'
									? 'A mechanical cog.'
									: card.get('Category') === 'Tech'
										? 'Headphones.'
										: ''}
						/>
					</div>
				</div>
			</div>
		{/each}
	</section>
</main>

<style>
	div.event-grid {
		display: grid;
		grid-template-columns: 90px minmax(0, 1fr);
		gap: 30px;
	}
	div.filters {
		grid-column: 1 / span 2;
	}
	div.calendar {
		width: 100%;
		text-align: center;
		grid-column: 1 / span 2;
		display: grid;
		grid-template-columns: repeat(7, minmax(0, 1fr));
		gap: 15px;
	}
	div.calendar .card {
		border: 2px solid var(--lightorange);
		min-height: 90px;
	}
	div.calendar .card h4 {
		position: absolute;
		top: 0;
		right: 0;
		margin: 15px;
		color: var(--orange);
	}
	section.hero {
		background-color: var(--lightorange);
	}
	section.hero h1 {
		color: var(--red);
		-webkit-text-fill-color: var(--white);
		-webkit-text-stroke: 2px;
		text-shadow: 5px 5px 0px var(--orange);
	}
	section.hero div.box {
		background-color: var(--blue);
	}
	section.hero div.box h3 {
		color: var(--yellow);
		text-shadow: 1px 1px 0px var(--darkyellow);
	}
	section.hero div.box p {
		color: var(--beige);
	}
	section.hero div.box .list {
		grid-template-columns: 40px minmax(0, 1fr);
		margin: 20px 0px 0px 0px;
		gap: 20px;
	}
	section.hero div.box h4 {
		background-color: var(--green);
		box-shadow: 4px 4px var(--darkgreen);
		margin: 0px;
		padding: 4px 8px;
		border-radius: 50px;
		border: 1px solid var(--darkgreen);
		text-align: center;
		color: var(--darkgreen);
		-webkit-text-fill-color: var(--yellow);
		-webkit-text-stroke: 0.2px;
	}
</style>
