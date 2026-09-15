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
    import Room from '$lib/images/Room.jpg';
	import OurSociety from '$lib/images/our_society.png';
	import Johnathan from '$lib/images/Johnathan.gif';
	import Johnathan_Stares_Into_Soul from '$lib/images/Johnathan_Stares_Into_Soul.png';
	import instagram from '$lib/images/Footer_Icons/instagram.png';
	import Our_Society from '$lib/images/Our_Society.png';

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
	<!-- Shrikhand loaded here.-->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Devanagari:wght@100;200;300;400;500;600;700&family=Iosevka+Charon+Mono:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Odibee+Sans&family=Shrikhand&display=swap"
		rel="stylesheet"
	/></svelte:head
>
<main>
	<body class="yellow">
		<section
			class="hero photo home"
			style="background-image: linear-gradient(var(--clear-only-fullscreen), rgba(15, 10, 0, 0.8)), url({Pond2});"
		>
			<div class="header">
				<h1>Welcome to the quackiest society!</h1>
				<p>
					The Dublin University Computer Science Society (DUCSS) is Trinity College Dublin’s student
					society for computer science, technology and the wider computing community.
				</p>
				<div style="display: flex; flex-flow: row wrap; gap: 15px;">
					<button><a href="https://trinitysocietieshub.com">Join the Society</a></button>
					<button type="button" class="instagram-button">
						<a class="instagram-link" href="https://instagram.com/ducss_">
							Follow Us on Instagram
						</a>
					</button>
				</div>
			</div>
			<div class="relative-container">
				<img
					class="img-side"
					src={TV}
					alt="An old, grey tv sitting in a large orange nest. The screen is pixelated and translucent."
				/>
				<!--<img class="tv-background" src={Johnathan}>-->
			</div>
		</section>
		<section>
			<div class="header">
				<h2>Coming Up</h2>
				<p>
					Over the years, the society has developed from a student-led computing community into one
					of Trinity’s established technical societies, hosting a wide range of events including
					coding competitions, technical workshops, company talks, careers events, hackathons,
					gaming events and socials.
				</p>
			</div>
			<div class="grid">
				{#each events as card}
					<div class="card">
						<p class="caps">{card.get('Day')}, {card.get('Month')} {card.get('Date')}</p>
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
				{/each}
			</div>
		</section>
		<section class="blue">
			<div class="header">
				<h2>Our Society</h2>
				<p>
					Founded in 1980, DUCSS has been part of Trinity College Dublin’s computing community for
					more than four decades, growing alongside the university’s Computer Science programmes and
					the wider technology industry.
				</p>
				<p>
					Hosting students from a variety of academic backgrounds such as Computer Science,
					Engineering, Mathematics, and eSports, DUCSS is dedicated to fostering a dynamic
					environment that stimulates both technical prowess and essential soft skills.
				</p>
				<p>
					DUCSS is open to Trinity students interested in computer science, technology, gaming,
					careers, and the society’s social and technical events. As a member, you can enjoy our
					dedicated society space within the Hamilton building as well as:
				</p>
				<div class="list">
					<div class="category tech">
						<div class="noise"></div>
						<img src={tech} alt={'Mechanical cog.'} />
					</div>
					<h3 style="-webkit-text-fill-color: var(--lightorange);">
						Technical Talks and Workshops
					</h3>
					<div class="category contest">
						<div class="noise"></div>
						<img src={tech} alt={'Headphones'} />
					</div>
					<h3 style="-webkit-text-fill-color: var(--lightteal);">
						Coding Competitions and Hackathons
					</h3>
					<div class="category career">
						<div class="noise"></div>
						<img src={tech} alt={'Headphones'} />
					</div>
					<h3 style="-webkit-text-fill-color: var(--lightpurple);">Careers and Industry Events</h3>
					<div class="category gaming">
						<div class="noise"></div>
						<img src={gaming} alt="Headphones." />
					</div>
					<h3 style="-webkit-text-fill-color: var(--lightred);">Gaming and Esports Tournaments</h3>
					<div class="category social">
						<div class="noise"></div>
						<img src={social} alt="Coffee cup." />
					</div>
					<h3 style="-webkit-text-fill-color: var(--lightgreen);">
						Social Events and Community Outreach
					</h3>
				</div>
				<button><a href="/about">Meet Our Committee</a></button>
			</div>
			<div class="div-img right" style="background-image: url({OurSociety})"></div>
		</section>
		<section>
			<div class="sponsors">
				{#each sponsors as sponsor}
					<img src={sponsor.get('Photo')} alt="{sponsor.get('Title')} logo." />
				{/each}
			</div>
			<div class="header">
				<h2>Our Sponsors</h2>
				<p>
					DUCSS has built long-standing relationships with major technology, finance and
					professional services companies, giving students opportunities to meet engineers,
					recruiters and industry professionals and gain insight into careers in technology.
				</p>
				<button><a href="/sponsors">Read More</a></button>
			</div>
		</section>
		<section class="blue">
			<div class="header">
				<h2>Come visit our society room in Hamilton!</h2>
				<p>
					Our society room is available for events and is usually open whenever a committee member
					is around. Inside, you’ll find game consoles, PCs, couches, and a space to relax,
					socialise, or hang out between lectures.
				</p>
				<div class="list">
					<h3>1</h3>
					<p>Enter through the door to the first door on the left. The door code is 01986.</p>
					<h3>2</h3>
					<p>
						Walk up the stairs to the first floor.
					</p>
					<h3>3</h3>
					<p>
						Turn right and pass through the two red doors. The DUCSS room will be on your right!
					</p>
				</div>
			</div>
			<div class="div-img right" style="background-image: url({Room})"></div>
		</section>
	</body>
</main>

<!--
<main>
    <div class="home-container">
        <div class="heading-container">
            <h1 class="heading">
                <p class="open-bracket">&lt; </p> Dublin University  Science Society
                <p class="close-bracket">&#47;&gt;</p>
            </h1>
            <h3 class="ribbon">Now Accepting Sponsors for 2026/27!</h3>
        </div>

        <div class="sponsor-container">
            <div class="column">
                <h2 class="subheading">Become a Sponsor</h2>
                <p class="blurb">A student-run society, the Dublin University Computer Science Society (DUCSS)
                is a cornerstone of technical exploration and social interaction within Trinity College Dublin. 
                Hosting students from a variety of academic backgrounds such as Computer Science, Engineering, Mathematics, 
                and eSports enthusiasts, DUCSS is dedicated to fostering a dynamic environment that stimulates both technical prowess 
                and essential soft skills. Members partake in diverse activities ranging from workshops, hackathons, and eSports events, 
                to social gatherings like gaming tournaments and networking sessions. With a dedicated society space within the Hamilton building, 
                joining DUCSS is about more than society membership; it's about engaging with a thriving community united by innovation, inclusivity, 
                and a passion for technology and gaming.</p>
                
            </div>
        </div>
    </div>

</main>
-->
<!--
    <img  class="KPMG" src={KPMG} alt="KPMG"/>
    <img class="PWC" src={PWC} alt="PWC"/>
    <img class="Stripe" src={Stripe} alt="Stripe"/>
    <img class="SIG" src={SIG} alt="SIG"/>
    <img class="Sulu" src={Sulu} alt="Sulu"/>
    <img class="Accenture" src={Accenture} alt="Accenture"/>

    <div class="form-container">
                    <form action="https://formsubmit.co/496e912bc81e561bc8dd9b6b1a9b7af4" method="POST">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="example@yourcompany.com" required>

                        <label for="subject">Subject</label>
                        <input type="text" id="subject" name="_subject" placeholder="Ex. Interest in Being a 2026 Sponsor of DUCSS" required>

                        <label for="message">Message</label>
                        <textarea name="message" id="message" required></textarea>

                        <input type="hidden" name="_autoresponse" value="We have received your message, and will review it ASAP!">
                        
                        <div class="button-container">
                            <button type="submit" class="sign-up-button">
                                <p class="sign-up-text">Contact Us</p>
                                <img class="Johnathan" src={Johnathan} alt="Our mascot, Johnathan DUCSS (Pronounced Ducks)"/>
                                <img class="Johnathan_Stares" src={Johnathan_Stares_Into_Soul} alt="Our mascot, Johnathan DUCSS (Pronounced Ducks)"/>
                            </button>
                            <button type="button" class="email-button">
                                <a href="mailto:ducss@csc.tcd.ie">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox= "0 -960 960 960"
                                    width= "60px"
                                    fill= "#ffffff">
                                    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 
                                    23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 
                                    320-200H160l320 200ZM160-640v-80 480-400Z"/>
                                    </svg>
                                </a>
                            </button>
                        </div>
                    </form>
                </div>
-->

<!--Sign up link: https://trinitysocietieshub.com/collections/society-memberships/products/ducss-->
<!--Contact us link: /contact-us-->

<!--
<style>
    
    * {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    h1 {
        font-size: 36px;
        font-weight: 700;
        letter-spacing: -0.05em;
        color: hsl(209, 15%, 20%);
    }

    p {
        font-size: 18px;
        color: hsl(209, 15%, 28%);
    }

    .heading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: max-content;
        margin-top: -15px;
        text-align: center;
    }

    .heading {
        width:100%;
        font-size: 36px;
        font-weight: 700;
        letter-spacing: -0.05em;
        color: hsl(209, 15%, 20%);
        margin-bottom: 0;
    }

    .open-bracket {
        display: inline;
        font-size: 40px;
        font-weight: 600;
        color: hsl(33, 96%, 65%);
    }

    .close-bracket {
        display: inline;
        font-size: 40px;
        font-weight: 600;
        color: hsl(33, 96%, 65%);
    }

    .ribbon {
        color: hsl(15, 95%, 58%);
        background-color: hsl(33, 96%, 65%, 10%);
        border: 2px solid hsl(15, 95%, 58%);
        border-radius: 25px;
        padding: 5px 45px;
        margin-bottom: 30px;
    }

    .sign-up-text {
        font-size: 28px;
        font-weight: 600;
        color: hsl(240, 100%, 99%);
    }

    .Johnathan {
        display: inline-block;
        height: 60px;
        width: 60px;
        margin-right: -10px;
    }

    .Johnathan_Stares {
        display: none;
    }

    .blurb {
        margin-top: 25px;
    }

    main {
        padding: 30px;
    }

    .home-container {
        display: flex;
        flex-direction: column;
        margin: auto;
        padding: 30px;
        max-width: 1200px;
        border: 5px solid hsl(15, 95%, 58%);
        border-radius: 25px;
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
        background: linear-gradient(135deg,hsl(33, 96%, 65%, 20%) 0%, hsl(15, 95%, 58%, 20%) 100%);
        backdrop-filter: blur(1px);
        -webkit-backdrop-filter: blur(12px); /* Safari support */
    }

    .sponsor-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5%;
        padding: 0;
        text-align: justify;
    }
    /*
    .column {
        display: flex;
        flex-direction: column;
        max-width: 100%;
    }
    **/
    .sponsor-images {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 0 2%;
        max-height: 100%;
        gap: 30px;
        margin-bottom: 45px;
    }

    .sponsor-images > img {
        justify-self: center;
        max-width: 100%;
        filter: drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.2));
    }

    .subheading {
        grid-column: span 2;
        margin: 0;
        font-size: 32px;
        font-weight: 700;
        text-align: center;
        letter-spacing: -0.05em;
        background: linear-gradient(90deg, orange, hsl(15, 95%, 58%));
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
    }

    label {
        font-weight: 700;
        letter-spacing: -0.05em;
        color: coral;
    }

    input, textarea {
        width: 100%;
        padding: 12px;
        border-radius: 4px;
        box-sizing: border-box;
        margin-top: 6px;
        margin-bottom: 16px;
        resize: vertical;
        border: 2px solid transparent;
        background: hsla(0, 0%, 100%, 0.6);
        transition: .2s;
        font-size: 16px;
        color: hsl(209, 15%, 28%);
    }

    textarea {
        field-sizing: content;
        min-height: 100px; /* Prevents the field from collapsing to zero */
        max-height: 600px; /* Optional: adds a scrollbar if text gets too long */
    }

    input:hover, textarea:hover {
      background: hsla(0, 0%, 100%, 0.8);
    }

    input:focus, textarea:focus {
      background: hsla(0, 0%, 100%, 0.8);
      border: 2px solid coral;
      outline: none;
    }

    input::placeholder, textarea::placeholder {
        opacity: .5;
        font-size: 16px;
        color: hsl(209, 15%, 28%);
    }


    .form-container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    form {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .button-container {
        display: flex;
        gap: 15px;
        width: 100%;
        margin-top: 15px;
    }

    .button-container > button {
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        height: 80px;
        border-radius: 10px;
        border: 0;
        cursor: pointer;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10);
		transition: .2s ease-in-out;
        outline: 2px solid transparent;
        width: 100%;
    }

    button[type=submit] {
        gap: 30px;
        padding: 20px;
        min-width: 300px;
        background: linear-gradient(90deg, orangered, hsl(15, 95%, 58%));
    }

    button[type=submit]:hover {
        outline: 4px solid coral;
    }

    .sign-up-button:hover > .Johnathan {
        display: none;
    }

    .sign-up-button:hover > .Johnathan_Stares {
        display: inline-block;
        height: 60px;
        width: 60px;
        margin-right: -10px;
    }

    .instagram-button {
        background: linear-gradient(90deg, hsl(292, 80%, 31%), rgb(221, 17, 79));
    }

    .instagram-button:hover {
        outline: 4px solid rgb(188, 70, 162);
    }

    .instagram-link {
        display: flex;
        align-items: center;
    }

    .instagram-img {
        width: 60px;
        filter: invert(1);
    }

    .email-button {
        background: linear-gradient(90deg, rgb(70, 92, 218), rgb(63, 175, 166));
    }

    .email-button:hover {
        outline: 4px solid rgb(67, 130, 197);
    }

    .column {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media screen and (max-width: 840px) {
        main {
            padding: 10px;
        }
        .subheading {
            margin-top: 30px;
            grid-column: span 1;
        }
        p {
            font-size: 16px;
        }
        .home-container {
            padding: 15px;
        }
        .ribbon {
            margin-bottom: 5px;
        }
        .heading {
            font-size: 32px;
        }
        .open-bracket {
            font-size: 32px;
        }
        .close-bracket {
            font-size: 32px;
        }
        .sign-up-text {
            font-size: 20px;

            margin-top: 20px;
            margin-left: 18px;
        }
        .Johnathan {
            width: 40px;
            height: 40px;
        }
        button[type=submit] {
            min-width: 100px;
            height: 60px;
        }
        .sign-up-button:hover > .Johnathan_Stares {
            width: 40px;
            height: 40px;
        }
        .sponsor-container {
            grid-template-columns: 1fr;
            gap: 15px;
            padding: 0px;
        }
        .button-container {
            flex-direction: column;
        }
        button {
            min-width: 100%;
        }
        .sponsor-images {
            grid-template-columns: 1fr;
            max-height: none;
            max-width: 600px;
            padding: 0;
        }
        .column {
            justify-content: center;
        }
    }

</style>
-->
