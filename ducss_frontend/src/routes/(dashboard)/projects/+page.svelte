<script lang="ts">
	import '$lib/style.css';
	import { enhance } from '$app/forms';

	let projectToEdit = $state({
		id: 0,
		date_submitted: null,
		title: '',
		overview: '',
		repo_link: '',
		demo_path: '',
		featured: false,
		stage_id: ''
	});

	let { form, data } = $props();

	$effect(() => {
		if (form?.success) {
			projectToEdit = {
				id: 0,
				date_submitted: null,
				title: '',
				overview: '',
				repo_link: '',
				demo_path: '',
				featured: false,
				stage_id: ''
			};
		}
	});
    function setProject(project: any) {
        projectToEdit = {
            ...project,
            date_submitted: project.date_submitted.toLocaleDateString('en-CA')
        }
    }
</script>

<main>
	<section class="hero" style="display: flex;">
		<h1>Edit Projects</h1>
	</section>
	<section class="yellow">
		<div>
			<h3>All Projects</h3>
			<div>
				{#each data.projects as project}
					<a href="(dashboard)/projects" onclick={() => (setProject(project))}>
						<p>{project.date_submitted.toLocaleDateString()} {project.title}</p>
					</a>
				{/each}
				{#if data.projects.length === 0}
					<p>No Projects Yet</p>
				{/if}
			</div>
		</div>
		<div style="width: 100%;">
			<h3>Edit Projects</h3>
			{#if form?.message}
				<p class="error">{form.message}</p>
			{/if}
			<form method="post" use:enhance enctype="multipart/form-data">
				<div>
					<p>Stage</p>
					<select name="stage_id"
						bind:value={projectToEdit.stage_id} >
						{#each data.stages as stage}
							<option value={stage.id}>{stage.title}</option>
						{/each}
					</select>
				</div>
				<div>
					<p>Featured</p>
					<input type="checkbox" name="featured" bind:checked={projectToEdit.featured} />
				</div>
				<div>
					<p>Submitted Date</p>
					<input type="date" name="date_submitted" bind:value={projectToEdit.date_submitted} />
				</div>
				<div style="grid-column: span 3;">
					<p>Title</p>
					<input type="text" name="title" bind:value={projectToEdit.title} />
				</div>
				<div style="grid-column: span 3;">
					<p>Overview</p>
					<input type="text" name="overview" bind:value={projectToEdit.overview} />
				</div>
				<div style="grid-column: span 3;">
					<p>Repo Link</p>
					<input type="text" name="overview" bind:value={projectToEdit.repo_link} />
				</div>
				<div style="grid-column: span 3;">
					<p>Demo Path</p>
					<input type="text" name="overview" bind:value={projectToEdit.demo_path} />
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