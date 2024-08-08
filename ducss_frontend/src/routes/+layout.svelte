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

<style>

    /*@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');*/
    
    :global(body) {
        position: relative;
        height: 100%;
        margin: 0;
        padding-bottom: 30px;
        background-color: hsla(30, 100%, 85%, .2);
        background-image: url("https://www.transparenttextures.com/patterns/inspiration-geometry.png");
        overflow-x: hidden;
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

</style>