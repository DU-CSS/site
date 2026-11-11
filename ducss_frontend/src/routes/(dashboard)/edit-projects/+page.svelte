<script lang="ts">
	import '$lib/style.css';
	import { enhance } from '$app/forms';

	// Blank project
	const projectParams = {
		id: 0,
		date_submitted: null,
		title: '',
		overview: '',
		repo_link: '',
		demo_path: '',
		featured: false,
		stage_id: 2
	};
	let showForm = $state(false);

	let projectToEdit = $state(projectParams);
	let { form, data } = $props();

	// Reset form to blank
	$effect(() => {
		if (form?.success) {
			showForm = false;
			projectToEdit = projectParams;
		}
	});

	// Fill form with selected project
    function setProject(project: any) {
        projectToEdit = {
            ...project,
            date_submitted: project.date_submitted.toLocaleDateString('en-CA')
        }
		showForm = true;
    }

	function newProject() {
		projectToEdit = projectParams;
		showForm = true;
	}
</script>

<svelte:head>
	<!-- Icons loaded here. Specify which ones to load in the link after "icon_names=" -->
	<link
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&icon_names=delete&display=block"
		rel="stylesheet"
	/>
</svelte:head>

<main>
	<section class="hero" style="display: flex;">
		<h1>Edit Projects</h1>
	</section>
	<section>
		<div>
			<h3>All Projects</h3>
			<button onclick={newProject}>New Project</button>
			<div>
				{#each data.projects as project}
					<a href="/edit-projects" onclick={() => (setProject(project))}>
						<p>{project.date_submitted.toLocaleDateString()} {project.title}</p>
					</a>
				{/each}
				{#if data.projects.length === 0}
					<p>No Projects Yet</p>
				{/if}
			</div>
		</div>
		{#if showForm}
			<div style="width: 100%;" id="project-form">
				<form method="post" use:enhance enctype="multipart/form-data">
					<input type="hidden" name="id" bind:value={projectToEdit.id} />
					<div>
						<p>Stage</p>
						<select name="stage_id" required
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
						<input required type="date" name="date_submitted" bind:value={projectToEdit.date_submitted} />
					</div>
					<div style="grid-column: span 3;">
						<p>Title</p>
						<input required type="text" name="title" bind:value={projectToEdit.title} />
					</div>
					<div style="grid-column: span 3;">
						<p>Overview</p>
						<input required type="text" name="overview" bind:value={projectToEdit.overview} />
					</div>
					<div style="grid-column: span 3;">
						<p>Repo Link</p>
						<input type="text" name="repo_link" bind:value={projectToEdit.repo_link} />
					</div>
					<div style="grid-column: span 3;">
						<p>Demo Path</p>
						<input type="text" name="demo_path" bind:value={projectToEdit.demo_path} />
					</div>
					<button style="grid-column: span 2;" type="submit"
							formaction="?/save"> Don't Forget to Save! </button>
					<button class="icon" type="submit"
							formaction="?/delete" formmethod="POST"
							onclick={(event) => {
								if (!confirm('Are you sure you want to delete this project?')) {
									event.preventDefault();
								}
							}}> Delete Project </button>
				</form>
			</div>
		{/if}
	</section>
</main>

<style>
	form {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 30px;
	}
</style>