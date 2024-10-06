<script>
    import SIG from '$lib/images/sponsors/SIG.png';
    import Stripe from '$lib/images/sponsors/stripe.png';
    import Accenture from '$lib/images/sponsors/accenture.png';
    import Sulu from '$lib/images/sponsors/sulu.png';
    import KPMG from '$lib/images/sponsors/KPMG.png';
    import PWC from '$lib/images/sponsors/PWC.png';
</script>

<div class="sponsor-page">
    <h1>Meet Our Sponsors!</h1>
    <div class="container">
        <h2 class="gold heading">Gold</h2>
        <div class="sponsor-block gold">
            <img class="KPMG" src={KPMG} alt="KPMG"/>
            <img class="SIG" src={SIG} alt="SIG"/>
        </div>
        <h2 class="silver heading">Silver</h2>
        <div class="sponsor-block silver">
            <img class="Stripe" src={Stripe} alt="Stripe"/>
            <img class="PWC" src={PWC} alt="PWC"/>
            <img class="Sulu" src={Sulu} alt="Sulu"/>
        </div>
        <h2 class="bronze heading">Bronze</h2>
        <div class="sponsor-block bronze">
            <img class="Accenture" src={Accenture} alt="Accenture"/>
        </div>
    </div>
</div>

<style>

    * {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .sponsor-page {
        position: relative;
        background-color: hsla(208, 12%, 58%, 0.15);
        height: 100%;
        margin-top: -48px;
        margin-bottom: -20px;
    }

    h1 {
        text-align: center;
        font-size: 32px;
        font-weight: 700;
        letter-spacing: -0.05em;
        padding-top: 16px;
        color: hsl(35, 95%, 58%);
    }

    .container {
        display: flex;
        flex-direction: column;
        min-width: 100vw;
        height: auto;
        justify-content: center;
        align-content: center;
    }

    .sponsor-block {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        height: 100%;
        margin-bottom: 25px;
    }

    .sponsor-block.gold {
        border-bottom: 2px solid hsl(48, 97%, 48%);
        min-height: 250px;
    }

    .sponsor-block.silver {
        border-bottom: 2px solid hsl(0, 0%, 75%);
        min-height: 200px;
    }

    .sponsor-block.bronze {
        border-bottom: 2px solid hsl(30, 61%, 50%);
        min-height: 200px;
    }

    .heading {
        text-align: center;
        font-size: 24px;
    }

    .gold.heading {
        color: hsl(48, 97%, 48%);
        font-weight: 700;
        text-shadow: 1px 1px hsl(209, 15%, 28%);
        border-bottom: 2px solid hsl(48, 97%, 48%);
    }

    .silver.heading {
        color: hsl(0, 0%, 75%);
        font-weight: 700;
        text-shadow: 1px 1px hsl(209, 15%, 28%);
        border-bottom: 2px solid hsl(0, 0%, 75%);
    }

    .bronze.heading {
        color: hsl(30, 61%, 50%);
        font-weight: 700;
        text-shadow: 1px 1px hsl(209, 15%, 28%);
        border-bottom: 2px solid hsl(30, 61%, 50%);
    }

    .KPMG {
        max-width: 100%;
        max-height: 150px;
        height: auto; 
    }

    .SIG {
        max-width: 100%;
        max-height: 400px;
        height: auto; 
    }

    .Stripe {
        max-width: 100%;
        max-height: 300px;
        height: auto; 
    }

    .PWC {
        max-height: 200px;
        max-width: 100%;
        margin-right: 10px;
        margin-top: 25px;
        margin-bottom: 25px;
        height: auto; 
    }

    .Sulu {
        max-width: 100%;
        max-height: 300px;
        height: auto; 
    }

    .Accenture {
        max-width: 100%;
        max-height: 100px;
        height: auto; 
    }

</style>
