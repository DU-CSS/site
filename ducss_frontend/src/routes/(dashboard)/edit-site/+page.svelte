<script lang="ts">
	import '$lib/style.css';
	import { enhance } from '$app/forms';

	let eventToEdit = $state({
		id: 0,
		title: '',
		start_date: null,
		start_time: null,
		end_date: null,
		end_time: null,
		location: '',
		organizer: '',
		ticketed: false,
		content: '',
		category: ''
	});

	let { form, data } = $props();

	$effect(() => {
		if (form?.success) {
			eventToEdit = {
				id: 0,
				title: '',
				start_date: null,
				start_time: null,
				end_date: null,
				end_time: null,
				location: '',
				organizer: '',
				ticketed: false,
				content: '',
				category: ''
			};
		}
	});
    function setEvent(event: any) {
        eventToEdit = {
            ...event,
            start_date: event.start_date.toLocaleDateString('en-CA'),
            end_date: event.end_date.toLocaleDateString('en-CA')
        }
        console.log('event start date: ' + event.start_date);
        console.log('event to edit start date: ' + eventToEdit.start_date);
    }
</script>

<main>
	<section class="hero" style="display: flex;">
		<h1>Edit Site</h1>
	</section>
	<section class="yellow">
		<div>
			<h3>All Events</h3>
			<div>
				{#each data.events as event}
					<a href="/edit-site" onclick={() => (setEvent(event))}>
						<p>{event.start_date.toLocaleDateString()} {event.title}</p>
					</a>
				{/each}
				{#if data.events.length === 0}
					<p>No Events Yet</p>
				{/if}
			</div>
		</div>
		<div style="width: 100%;">
			<h3>Add/Edit Events</h3>
			{#if form?.message}
				<p class="error">{form.message}</p>
			{/if}
			<form method="post" use:enhance enctype="multipart/form-data">
				<input type="hidden" name="id" bind:value={eventToEdit.id} />
				<div style="grid-column: span 3;">
					<p>Title</p>
					<input type="text" name="title" bind:value={eventToEdit.title} />
				</div>
				<div>
					<p>Category</p>
					<select name="category_id">
						bind:value={eventToEdit.category}
						{#each data.categories as category}
							<option value={category.id}>{category.content}</option>
						{/each}
					</select>
				</div>
				<div>
					<p>Start Date</p>
					<input type="date" name="start_date" bind:value={eventToEdit.start_date} />
				</div>
				<div>
					<p>Start Time</p>
					<input type="time" name="start_time" bind:value={eventToEdit.start_time} />
				</div>
				<div>
					<p>Ticketed?</p>
					<input type="checkbox" name="ticketed" bind:checked={eventToEdit.ticketed} />
				</div>
				<div>
					<p>End Date</p>
					<input type="date" name="end_date" bind:value={eventToEdit.end_date} />
				</div>
				<div>
					<p>End Time</p>
					<input type="time" name="end_time" bind:value={eventToEdit.end_time} />
				</div>
				<div style="grid-column: span 3;">
					<p>Location</p>
					<input type="text" name="location" bind:value={eventToEdit.location} />
				</div>
				<div style="grid-column: span 3;">
					<p>Content</p>
					<input type="text" name="content" bind:value={eventToEdit.content} />
				</div>
				<button style="grid-column: span 2;" type="submit"> Don't Forget to Save! </button>
			</form>
		</div>
	</section>
</main>

<style>
	form {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 30px;
	}
</style>
