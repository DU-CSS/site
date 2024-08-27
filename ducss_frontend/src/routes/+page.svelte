<script>
// @ts-nocheck


    import Johnathan from '$lib/images/Johnathan.gif'
    import Johnathan_Stares_Into_Soul from '$lib/images/Johnathan_Stares_Into_Soul.png'

    function Johnathan_hover(element) {
        element.setAttribute('src', Johnathan_Stares_Into_Soul);
    }

    function Johnathan_unhover(element) {
        element.setAttribute('src', Johnathan);
    }

</script>

<div class="heading-container">
    <h1 class="heading">
        <p class="open-bracket">&lt; </p> Dublin University Computer Science Society
        <p class="close-bracket">&#47;&gt;</p>
    </h1>
    <a class="sign-up-button" href="https://trinitysocietieshub.com/collections/society-memberships/products/ducss">
        <h2 class="sign-up-text">Join DUCSS</h2>
        <img class="Johnathan" src={Johnathan} alt="Our mascot, Johnathan DUCSS (Pronounced Ducks)"/>
        <img class="Johnathan_Stares" src={Johnathan_Stares_Into_Soul} alt="Our mascot, Johnathan DUCSS (Pronounced Ducks)"/>
    </a>
</div>

<div class="blurb">
    <p class="blurb-text">
        A student-run society, the Dublin University Computer Science Society (DUCSS), 
        is a cornerstone of technical exploration and social interaction within Trinity College Dublin. 
        Hosting students from a variety of academic backgrounds such as Computer Science, Engineering, Mathematics, 
        and eSports enthusiasts, DUCSS is dedicated to fostering a dynamic environment that stimulates both technical prowess 
        and essential soft skills. Members partake in diverse activities ranging from workshops, hackathons, and eSports events, 
        to social gatherings like gaming tournaments and networking sessions. With a dedicated society space within the Hamilton building, 
        joining DUCSS is about more than society membership; it's about engaging with a thriving community united by innovation, inclusivity, 
        and a passion for technology and gaming.    
    </p>
</div>

<style>
    
    * {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .heading-container {
        display: inline-block;

        width: 100%;
        height: max-content;
        margin-top: -15px;
    }

    .heading {
        width:100%;

        text-align: center;
        font-size: 36px;
        font-weight: 700;
        letter-spacing: -0.05em;
        color: hsl(209, 15%, 20%);
    }

    .open-bracket {
        display: inline;

        font-size: 40px;
        font-weight: 600;

        margin-left: 1ch;

        color: hsl(15, 95%, 58%);
    }

    .close-bracket {
        display: inline;

        font-size: 40px;
        font-weight: 600;

        color: hsl(15, 95%, 58%);
    }

    .sign-up-button {
        display: block;

        margin: 0 auto;
        padding-left: 15px;
        padding-right: 15px;

        text-decoration: none;

        width: 300px;
        height: 80px;

        background-color: hsl(15, 95%, 58%);
        border-radius: 10px;
    }

    .sign-up-text {
        display: inline-block;

        margin-top: 22px;
        margin-left: 35px;

        font-size: 28px;
        font-weight: 600;
        color: hsl(240, 100%, 99%);
    }

    .Johnathan {
        display: inline-block;
        position: absolute;

        margin-left: 28px;
        margin-top: 10px;

        height: 60px;
        width: 60px;
    }

    .Johnathan_Stares {
        display: none;
    }

    .sign-up-button:hover > .Johnathan {
        display: none;
    }

    .sign-up-button:hover > .Johnathan_Stares {
        display: inline-block;
        position: absolute;

        margin-left: 28px;
        margin-top: 10px;

        height: 60px;
        width: 60px;
    }

    .blurb {
        margin-top: 25px;
    }

    .blurb-text {
        width: clamp(45ch, 75vw, 75ch);
        text-align: justify;
        margin: 0 auto;
        font-size: 18px;

        color: hsl(209, 15%, 28%);
    }

    @media screen and (max-width: 840px) {

        .heading {
            font-size: 16px;
            margin-bottom: 30px;
        }

        .open-bracket {
            font-size: 18px;
        }

        .close-bracket {
            font-size: 18px;
        }

        .blurb-text {
            font-size: 12px;
        }

        .sign-up-button {
            width: 200px;
            height: 60px;
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

        .sign-up-button:hover > .Johnathan_Stares {
            width: 40px;
            height: 40px;
        }

    }

</style>
