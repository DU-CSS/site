<script lang="ts">

    export let poster : string;
    export let poster_alt : string;
    export let title : string;
    export let description : string;

</script>


<div class="event-container">
    <img class="poster" src={poster} alt={poster_alt}>
    <div class="event-details">
        <h1 class="title">{title}</h1>
        <p class="description">{description}</p>
    </div>
    <div class="gallery">

    </div>
</div>

<style>
    * {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .event-container {
        display: grid;
        gap: 0px 0px; 
	    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
	    grid-template-areas: 
		    "poster details details . gallery gallery"; 

        margin-top: -24px;
        width: 100%;
        height: 192px;
        background-color: orange;

        justify-items: start;
        align-items: center;
    }

    .poster {
        grid-area: poster;
        margin-left: 16px;

        border: 3px solid black;
    }

    .event-details {
        grid-area: details;

        align-self: baseline;
    }

    .title {
        font-size: 28px;
        font-weight: 700;
    }

    .description {
        font-size: 16px;
        font-weight: 400;
    }

    .gallery {
        grid-area: gallery;
        height:160px;
        width: 160px;
        background-color: black;
    }

</style>