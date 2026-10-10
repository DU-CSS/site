<script lang="ts">
	import EventCategory from "./EventCategory.svelte";

	let { caps, title, tags, description, categoryId } = $props();
</script>

<div class="card">
    <p class="caps">{caps}</p>
    <h3>{title}</h3>
    <div class="tags">
        {#each tags as tag}
        <div class="tag">
            <span class="material-symbols-outlined">{tag.get('icon')}</span>
            <p>{tag.get('name')}</p>
        </div>
        {/each}
    </div>
    <p class="description">{description}</p>
    <div class="category">
        <EventCategory categoryNumber={categoryId} />
    </div>
</div>

<style>
	
/* Card */
.card {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 30px;
    border-radius: var(--border-radius);
    border: 2px solid var(--orange);
    background-color: var(--lightyellow);
    box-shadow: 6px 6px var(--lightorange);
}
.card .caps {
    font-style: normal;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: calc(var(--p-size) - 2px);
}
.card h3 {
    margin-top: 15px;
    color: var(--orange);
}
.tags {
    display: flex;
    flex-flow: row wrap;
    column-gap: 30px;
    row-gap: 5px;
    margin-bottom: 30px;
}
.tag {
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 7px;
}
.card .description {
    font-style: italic;
    margin-top: auto;
    color: var(--gray);
}
.card .category {
    position: absolute;
    top: 0;
    right: 0;
    margin: -2px;
}
</style>