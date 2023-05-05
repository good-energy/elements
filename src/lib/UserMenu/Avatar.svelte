<script>
	import { Avatar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	$: provider = $page.data.session.user.app_metadata.provider;
	$: url =
		provider === 'github'
			? $page.data.session.user.user_metadata.avatar_url
			: provider === 'google'
			? $page.data.session.user.user_metadata.avatar_url
			: '';
</script>

<Avatar
	src={$page.data.session.user.user_metadata.avatar_url}
	border="border-2	border-surface-300-600-token hover:!border-primary-500"
/>
