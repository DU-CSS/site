<script lang="ts">
    import { fade, fly, scale } from 'svelte/transition';

    import ducss from '$lib/images/UI_Icons/ducss_big.png';
    import ducssMask from '$lib/images/UI_Icons/ducss_right_bracket.png';

    import doubleArrow from '$lib/images/UI_Icons/double-arrow.png';

    import discord from '$lib/images/Footer_Icons/discord.png';
    import facebook from '$lib/images/Footer_Icons/facebook.png';
    import instagram from '$lib/images/Footer_Icons/instagram.png';
    import linkedin from '$lib/images/Footer_Icons/linkedin.png';
    import twitter from '$lib/images/Footer_Icons/twitter.png';

    import contactForm from '$lib/images/Footer_Icons/contactForm.png';
    import email from '$lib/images/Footer_Icons/email.png';

    var collapsed: boolean = true;

    $: footerState = collapsed ? 'collapsed' : 'expanded';

</script>

<nav>
    <div class="nav-content-container">
        <div class="logo-container">
            <a class="ducss" href="/">
                <img  class="ducss" src={ducss} alt="D.U. Computer Science Logo"/>
            </a>
                <div class="ducssMask">
                    <a href="/">
                        <img class="ducssBracket" src={ducssMask} alt=""/>
                    </a>
                </div>
        </div>
        <ul>
            <li>
                <a class="nav-button" href="/store">Store</a>
            </li>
        <!--
            <li>
                <a class="nav-button" href="/opportunities">Opportunities</a>
            </li>
            <li>
                <a class="nav-button" href="/events">Events</a>
            </li>
            <li>
                <a class="nav-button" href="/about">About</a>
            </li>
            <li>
                <a class="nav-button" href="/sponsors">Sponsors</a>
            </li>
        -->
        </ul>
    </div>    
</nav>

<div class="content">
    <slot/>
</div>

<footer class={footerState}>
    <div class="footer-content-container">
        <a class="footer-icon-wrapper facebook" href="https://facebook.com/ducss.ie">
            <img class="footer-icon facebook" src={facebook} alt="Link to facebook"/>
        </a>
        <a class="footer-icon-wrapper instagram" href="https://instagram.com/ducss_">
            <img class="footer-icon instagram" src={instagram} alt="Link to instagram"/>
        </a>
        <a class="footer-icon-wrapper linkedin" href="https://ie.linkedin.com/company/ducss">
            <img class="footer-icon linkedin" src={linkedin} alt="Link to linkedin"/>
        </a>

        <input type="image" class="footer-toggle {footerState}" src={doubleArrow} alt="Footer Toggle Button" on:click={() => collapsed = !collapsed}/>
        
        <a class="footer-icon-wrapper discord" href="https://discord.gg/NUZGYT4">
            <img class="footer-icon discord" src={discord} alt="Link to discord"/>
        </a>
        <a class="footer-icon-wrapper contact" href="/contact">
            <img class="footer-icon contact" src={contactForm} alt="Link to contact form"/>
        </a>
        <a class="footer-icon-wrapper email" href="mailto:ducss@csc.tcd.ie">
            <img class="footer-icon email" src={email} alt="Link to email"/>
        </a>
    </div>
</footer>

<style>

    /*@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');*/
    
    :global(body) {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        margin: 0;
        background-color: hsla(30, 100%, 85%, .2);
        overflow-x: hidden;

       /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='%239C92AC' fill-opacity='0.12' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 1 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/svg%3E"); */
    }

    .content {
        flex: 1;
    }

    /* ↓↓ Navigation Styling ↓↓ */

    nav {
        min-height: 64px;
        width: 100%;
        margin-bottom: 24px;
        background-color: hsl(240, 100%, 99%);
        border-bottom: 3px inset hsl(229, 19%, 62%);
        box-sizing: border-box;
        overflow: auto;
    }

    .nav-content-container {
        display: flex;
        max-width: 1000px;
        margin: 0 auto;
        margin-bottom: 0px;
    }

    .logo-container {
        display: flex;
        align-items:center;
        justify-items:auto;
    }

    .ducssMask {
        position: relative;
        display: inline-block;
        margin-left: -66px;
        margin-right: 2px;
        width: 66px;
        overflow: hidden;
        white-space: nowrap;
        background-color: hsl(240, 100%, 99%);
        right: 0;
        transition: right 500ms ease-in-out;
    }

    .ducss:hover + .ducssMask {
        right: -42px;
    }

    ul {
        display: flex;
        list-style: none;
        margin-left: auto;
    }

    li {
        margin-right: 24px;
    }

    li:before {
        display: block;
        content: '';
        border-bottom: solid 3.5px hsl(15, 95%, 58%);
        padding-bottom: 2px;
        margin-bottom: -2px;
        transform: scaleX(0);
        transition: transform 500ms ease-in-out;
    }

    li:hover:before {
        transform: scaleX(1);
        transform-origin: 100% 50%;
    }

    li:after {
        display: block;
        content: '';
        border-bottom: solid 3.5px hsl(15, 95%, 58%);
        padding-bottom: 2px;
        transform: scaleX(0);
        transition: transform 500ms ease-in-out;
    }

    li:hover:after {
        transform: scaleX(1);
        transform-origin: 0% 50%;
    }

    .nav-button {
        color: hsl(207, 12%, 43%);
        font-weight: 500;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 16px;
        text-decoration: none;
    }

    /* ↓↓ Footer Styling ↓↓ */

    footer.collapsed {
        position: relative;
        bottom: 0;
        height: 24px;
        width: 100%;
        margin-top: 38px;
        margin-top: 16px;
        background-color: hsl(240, 100%, 99%);
        border-top: 3px outset hsl(229, 19%, 62%);
        transition: height 500ms ease, margin-top 500ms ease;
    }

    footer.expanded {
        position: relative;
        bottom: 0;
        height: 64px;
        width: 100%;
        background-color: hsl(240, 100%, 99%);
        border-top: 3px outset hsl(229, 19%, 62%);
        transition: height 500ms ease, margin-top 500ms ease;
    }

    .footer-content-container {
        display: grid;
        position: relative;

        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
		grid-template-rows: 1fr max-content;

        gap: 0px 0px; 
		grid-template-areas: 
		  "facebook instagram linkedin toggle discord contact email"; 

        position: sticky;
        max-width: 1000px;
        max-height: 64px;
        min-height: 22px;
        margin: 0 auto;
        justify-content: center;
    }

    .footer-toggle.collapsed {
        grid-area: toggle;

        bottom: 1;
        margin: 0 auto;
        margin-top: -15px;
        z-index: 1;
        padding: 2px;
        height: 22px;
        width: 22px;
        background-color: hsl(240, 100%, 99%);
        border-top: 3px outset hsl(229, 19%, 62%);
        border-bottom: 3px inset hsl(229, 19%, 62%);
        border-right: 3px inset hsl(229, 19%, 62%);
        border-left: 3px outset hsl(229, 19%, 62%);
        border-radius: 100%;
        transform: rotate(0deg);
        transition: transform 400ms ease-in-out;
    }

    .footer-toggle.collapsed:hover {
        transform-origin: center center;
        transform: rotate(180deg);
        border-width: 3.5px;
        animation: borderColour 500ms forwards;
    }

    .footer-toggle.expanded {
        grid-area: toggle;

        bottom: 1;
        margin: 0 auto;
        margin-top: -15px;
        z-index: 1;
        padding: 2px;
        height: 22px;
        width: 22px;
        background-color: hsl(240, 100%, 99%);
        background-size: cover;
        border-top: 3px outset hsl(229, 19%, 62%);
        border-bottom: 3px inset hsl(229, 19%, 62%);
        border-right: 3px inset hsl(229, 19%, 62%);
        border-left: 3px outset hsl(229, 19%, 62%);
        border-radius: 100%;
        transform: rotate(180deg);
        transition: transform 400ms ease-in-out;
    }

    .footer-toggle.expanded:hover {
        transform-origin: center center;
        transform: rotate(0deg);
        animation: borderColour 400ms forwards;
    }

    @keyframes borderColour {
        100% {
            border-width: 3.5px;
            border-color: hsl(15, 95%, 58%);
        }
    }

    .footer-icon {
        max-height: 32px;
        width: auto;

        margin-top: 16px;

    }

    footer.collapsed .footer-icon-wrapper {
        display: none;
    } 

    .footer-icon-wrapper {
        position: absolute;
        align-self: baseline;
    }

    .footer-icon-wrapper.facebook {
        grid-area: facebook;
        position: fixed;
        justify-self: end;
    }

    .footer-icon-wrapper.instagram {
        grid-area: instagram;
        position: fixed;
        justify-self: end;
    }

    .footer-icon-wrapper.linkedin {
        grid-area: linkedin;
        position: fixed;
        justify-self: end;
    }

    .footer-icon-wrapper.discord {
        grid-area: discord;
        position: fixed;
    }

    .footer-icon-wrapper.contact {
        grid-area: contact;
        position: fixed;
    }

    .footer-icon-wrapper.email {
        grid-area: email;
        position: fixed;
    }

</style>