<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    import image from '$lib/images/image1.jpeg'

    export let name : String = "Product Name";
    export let cost : String = "0";
    export let descShort : String = "Lorem ipsum dolor sit amet, conse";

    let dispatcher = createEventDispatcher();

    function add() {
        dispatcher('add');
    }

</script>

<button on:click={add}>
<div class="card">
    <div class="image" style="background-image: url(https://images.unsplash.com/photo-1585533530535-2f4236949d08?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"/>
    <div class="details">
        <h1 class="name"> {name} </h1>
        <div class="details small">
            <h2 class="cost"> €{cost} </h2>
            <h3 class="description-short"> {descShort} </h3>
        </div>
    </div>
</div>
</button>

<style>

    * {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    button {
        width: 325px;
        height: 250px;
        border: none;
        margin-bottom:25px;
        margin-left: 25px;
        border-radius: 15px;
        text-decoration: none;
        background: none;
    }

    .card {
        display: inline-block;
        width: 325px;
        height: 250px;
        background-color: hsl(150, 100%, 98%);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10);
        padding-top: 10px;
        border-radius: 15px;
        transition: box-shadow 750ms ease-in-out;
        cursor:pointer;
    }

    .card:hover {
        display: inline-block;
        width: 325px;
        height: 250px;
        background-color: hsl(150, 100%, 98%);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        padding-top: 10px;
        border-radius: 15px;
    }

    .image {
        background-size: cover;
        height: 175px;
        width: 305px;
        margin-left: 10px;
        border-radius: 10px;
    }

    .details {
        padding: 0 20px;
        margin-top: -8px;
    }

    .name {
        font-size: 24px;
        font-weight: 600;
        text-align: left;
        margin-bottom: 5px;
        letter-spacing: -0.05em;
        color: hsl(209, 15%, 28%);
    }

    .details.small {
        display: flex;
        margin-left: -14px;
        padding: 0 15px;
        flex-flow: row nowrap;
        justify-content: space-between;
    }

    .cost {
        font-size: 14px;
        font-weight: 500;
        margin-top: auto;
        color: hsla(207, 12%, 43%);
        letter-spacing: -0.05em;
    }

    .description-short {
        font-size: 12px;
        font-weight: 500;
        letter-spacing: -0.05em;
        color: hsl(208, 12%, 58%);
    }

</style>
