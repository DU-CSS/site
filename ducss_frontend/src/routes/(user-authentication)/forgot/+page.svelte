<script>
	import { enhance } from '$app/forms';
	import '$lib/style.css';
    let {form} = $props();
</script>

<svelte:head>
	<!-- Icons loaded here. Specify which ones to load in the link after "icon_names=" -->
	<link
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100;200;300;400;500;600;700&icon_names=confirmation_number,search,login,mail,key,schedule,location_on,account_balance,crowdsource&display=block"
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

<!--Forgot Box-->
<main>
	<form action="?/forgot" method="post" use:enhance>
		<div class="login">
			<h3>Forgot Password</h3>
            {#if form?.message}
                <p class="error">{form.message}</p>
            {/if}
            {#if form?.success}
                <p class="success">If your email was found you should receive a password reset email shortly.</p>
            {/if}
			<p class="caps">TCD Email<span class="material-symbols-outlined">mail</span></p>
			<input type="text" name="email" />
			<button type="submit">
                Send Reset Email
                <span class="material-symbols-outlined">mail</span>
			</button>
			<div class="links">
				<a href="/login" class="">Back to Login</a>
			</div>
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