// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			id: number,
			first_name: string,
			last_name: string,
			on_committee: boolean,
			is_exec: boolean
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
