<script>
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
	<body class="green">
		<section
			class="hero photo"
			style="background-image: linear-gradient(var(--clear-only-fullscreen), rgba(15, 10, 0, 0.8)), url({Pond1});"
		>
			<div class="header">
				<h1>Structure</h1>
				<p>
					Hosting students from a variety of academic backgrounds such as Computer Science,
					Engineering, Mathematics, and eSports enthusiasts, DUCSS is dedicated to fostering a
					dynamic environment that stimulates both technical prowess and essential soft skills.
				</p>
                <button><a href={constitution}>Read Our Constitution</a></button>
			</div>
			<div class="box">
				<h3>How to Become a Member</h3>
				<p>
					DUCSS is open to Trinity students interested in computer science, technology, gaming,
					careers, and the society’s social and technical events.
				</p>
                <button><a href="https://trinitysocietieshub.com">Become a Member</a></button>
			</div>
		</section>
		<section>
			<div class="header">
				<h2>Our Committee</h2>
				<p>
					DUCSS is run by a central committee of 12 members who are elected by the society every
					year. The committee runs everything in the society, including managing funds, upkeeping
					our official room, putting on events, supporting members, coordinating with sponsors,
					conducting outreach, and recordkeeping.
				</p>
				<div class="carousel">
					<ul class="carousel">
						{#each committee as member}
							<li data-accName={member.get('Name')}>
								<div class="card">
									<p class="caps">{member.get('Course')}</p>
									<h3>{member.get('Name')}</h3>
									<div class="tags">
										<div class="tag">
											<p>{member.get('Title')}</p>
										</div>
									</div>
									<p class="description">{member.get('Role')}</p>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			</div>
			<div class="relative-container">
				<img src={CommitteeNest} alt="Whole committee in a giant nest." class="nest" />
			</div>
			<div class="div-img" style="background-image: url({History}); margin-left: -135px;"></div>
			<div class="header">
				<h2>History</h2>
				<p>
					Founded in 1980, DUCSS has been part of Trinity College Dublin’s computing community for
					more than four decades, growing alongside the university’s Computer Science programmes and
					the wider technology industry.
				</p>
				<p>
					Over the years, the society has developed from a student-led computing community into one
					of Trinity’s established technical societies, hosting a wide range of events including
					coding competitions, technical workshops, company talks, careers events, hackathons,
					gaming events and socials.
				</p>
				<p>
					DUCSS has also built long-standing relationships with major technology, finance and
					professional services companies, giving students opportunities to meet engineers,
					recruiters and industry professionals and gain insight into careers in technology.
				</p>
				<p>
					Today, DUCSS continues to combine its technical roots with a strong social community,
					providing a space for students to learn, build, compete, network and meet others with
					similar interests.
				</p>
			</div>
		</section>
	</body>
</main>

<!--
<script>
    //↓↓ Images ↓↓
    import Chair from "$lib/images/committee/lucy.jpeg"
    import Treasurer from "$lib/images/committee/mia.jpeg"
    import Secretary from "$lib/images/committee/madz.jpeg"
    import PRO from "$lib/images/committee/zara.jpeg"
    import TechLead from "$lib/images/committee/plooney.jpeg"
    import Amenities from "$lib/images/committee/ayushmaan.jpeg"
    import Competitions from "$lib/images/committee/elizabeth.jpeg"
    import Gaming from "$lib/images/committee/pavit.jpeg"
    import Events from "$lib/images/committee/darragh.jpeg"
    import CoderDojo from "$lib/images/committee/agnetha.jpeg"
    import GeneralOfficer1 from "$lib/images/committee/izzy.jpeg"
    import GeneralOfficer2 from "$lib/images/committee/darren.jpeg"
    import eSports from "$lib/images/committee/keith.jpeg"
    // import DiversityAndInclusion from "$lib/images/committee/elizabeth.jpg"
    import FirstYearRepresentative from "$lib/images/committee/dimitris.jpeg"
    //↑↑ Images ↑↑

import PassportCard from "$lib/components/PassportCard.svelte";
</script>

<div class="about-page">
    <h1>The DUCSS Committee (2025/26)</h1>
    <div class="committee-container">
        <PassportCard name='Lucy Byrne' description='Chair' image={Chair}/>
        <PassportCard name='Mia Rolfe' description='Treasurer' image={Treasurer}/>
        <PassportCard name='Madalina Costovici' description='Secretary' image={Secretary}/>
        <PassportCard name='Zara Braastad-Korhonen' description='PRO' image={PRO}/>
        <PassportCard name='Plooney' description='Tech Lead' image={TechLead}/>
        <PassportCard name='Elizabeth Gogová' description='Competitions' image={Competitions}/>
        <PassportCard name='Pavit Gogia' description='Gaming' image={Gaming}/>
        <PassportCard name='Darragh Condron' description='Events' image={Events}/>
        <PassportCard name='Agnetha Kamath' description='CoderDojo' image={CoderDojo}/>
        <PassportCard name='Izzy Guey' description='General Officer' image={GeneralOfficer1}/>
        <PassportCard name='Darren McCabe' description='General Officer' image={GeneralOfficer2}/>
        <PassportCard name='Keith Lyons' description='eSports' image={eSports}/>
        <PassportCard name='Ayushmaan Kumar Yadav' description='Amenities' image={Amenities}/>
        <PassportCard name='Dmitiris Charalampakis' description='First Year Rep' image={FirstYearRepresentative}/>
    </div>
</div>

<style>
    * {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .about-page {
        text-align: center;
        padding: 16px;
    }

    h1 {
        text-align: center;
        font-size: 36px;
        font-weight: 700;
        letter-spacing: -0.05em;
        
        margin-bottom: 24px;
        color: hsl(209, 15%, 20%);
    }

    .committee-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
        gap: 24px;
        padding: 16px;
    }

    @media (max-width: 600px) {
        h1 {
            font-size: 2.25rem;
        }

        .committee-container {
            gap: 32px;
        }
    }
</style>
-->
