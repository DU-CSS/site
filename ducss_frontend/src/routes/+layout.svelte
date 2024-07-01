<script lang="ts">
    
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
        </ul>
    </div>    
</nav>

<slot/>

<footer class={footerState}>
    <div class="footer-content-container">
        <div class="footer-left {footerState}">
            <a href="https://facebook.com/ducss.ie">
                <img class="footerIcon left" src={facebook} alt="Link to facebook"/>
            </a>
            <a href="https://instagram.com/ducss_">
                <img class="footerIcon left" src={instagram} alt="Link to instagram"/>
            </a>
            <a href="https://ie.linkedin.com/company/ducss">
                <img class="footerIcon left" src={linkedin} alt="Link to linkedin"/>
            </a>
        </div>
        <input type="image" class="footer-toggle {footerState}" src={doubleArrow} alt="Footer Toggle Button" on:click={() => collapsed = !collapsed}/>
        <div class="footer-right {footerState}">
            <a href="https://discord.gg/NUZGYT4">
                <img class="footerIcon discord" src={discord} alt="Link to discord"/>
            </a>
            <a href="/contact">
                <img class="footerIcon right" src={contactForm} alt="Link to contact form"/>
            </a>
            <a href="mailto:ducss@csc.tcd.ie">
                <img class="footerIcon right" src={email} alt="Link to email"/>
            </a>
        </div>
    </div>
</footer>

<style>

    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
    
    :global(body) {
        position: relative;
        margin: 0;
        background-color: hsla(30, 100%, 85%, .2);
        background-image: url("https://www.transparenttextures.com/patterns/inspiration-geometry.png");
        overflow:hidden;
    }

    /* ↓↓ Navigation Styling ↓↓ */

    nav {
        position: relative;
        min-height: 64px;
        width: 100%;
        margin-bottom: 24px;
        background-color: hsl(240, 100%, 99%);
        border-bottom: 3px inset hsl(229, 19%, 62%);
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
        transition: transform 350ms ease-in-out;
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
        display: flex;
        overflow: visible;
        position: sticky;
        max-width: 1000px;
        margin: 0 auto;
        justify-content: center;
    }

    .footer-toggle.collapsed {
        position: absolute;
        display: block;
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
        position: absolute;
        display: block;
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

    .footer-right.collapsed, .footer-left.collapsed {
        display: none;
        flex: 1;
    } 

    .footer-left.expanded {
        text-align: right;
        flex: 1;
    }

    .footer-right.expanded {
        text-align: left;
        flex: 1;
    }

    .footerIcon.right {
        max-height: 32px;
        width: auto;
        margin-left: 64px;
        margin-top: 16px;
    }

    .footerIcon.left {
        max-height: 24px;
        width: auto;
        margin-right: 64px;
        margin-top: 18px;
    }

    .footerIcon.discord {
        max-height: 24px;
        width: auto;
        margin-left: 64px;
        margin-top: 14px;
    }

</style>