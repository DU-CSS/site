<script>
    import '$lib/style.css';
    import { enhance } from '$app/forms';
    import { page } from '$app/state';
    let {form} = $props();
</script>

<svelte:head>
	<!-- Icons loaded here. Specify which ones to load in the link after "icon_names=" -->
	<link
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100;200;300;400;500;600;700&icon_names=key_off,confirmation_number,login,mail,key,schedule,location_on,account_balance,crowdsource&display=block"
		rel="stylesheet"
	/>
	<!-- Shrikhand loaded here.-->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Devanagari:wght@100;200;300;400;500;600;700&family=Iosevka+Charon+Mono:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Odibee+Sans&family=Shrikhand&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<!--Sign Up Box-->
<main>
    <form action="?/change" method="post" use:enhance>
        <input type="hidden" name="session_id" value={page.url.searchParams.get('id')} />
        <div class="login">
            <h3>Change Password</h3>
            {#if form?.message}
                <p class="error">{form.message}</p>
            {/if}
            <p class="caps">New Password<span class="material-symbols-outlined">key</span></p>
            <input type="password" name="password"/>
            <p class="caps">Confirm Password<span class="material-symbols-outlined">key_off</span></p>
            <input type="password" name="confirm-password"/>
            <button type="submit">
                Submit
                <span class="material-symbols-outlined">login</span>
            </button>
        </div>
    </form>
    
</main>
<style>
    form {
		width: 300px;
		justify-self: center;
		margin-top: 100px;
    }
</style>