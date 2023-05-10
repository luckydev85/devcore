<template>
	<div>
		<b-spinner style="color: lightgray"></b-spinner>
	</div>
</template>
<script>
import GQLForm from "@/lib/gqlform";
import { blockUi, unblockUi } from "@/lib/utils";
import { mapGetters } from "vuex";

export default {
	data: () => ({
		exists: ''
	}),
	computed: {
		...mapGetters({
			shareLink: "app/shared",
	        user: "auth/user",
		}),
	},
    async mounted() {
        if( typeof this.shareLink.id === "undefined" ){
			this.$store.dispatch("app/shared", "")
			if (this.user && this.user.roles[0].name === "User") {
				window.location.replace(process.env.VUE_APP_MOBILE_URL);
			} else {
				await this.$router.replace("/");
			}
		}

		const form = new GQLForm({
			id: this.shareLink.id
		});
		try {
			blockUi();
			const response = await this.$store.dispatch('shareLink/shareProjectByLinkId', form)

			if (response.data.shareProjectByLinkId) {
				console.log( 'exist link' );
				this.$store.dispatch("app/shared", "")
				if (this.user && this.user.roles[0].name === "User") {
					window.location.replace(process.env.VUE_APP_MOBILE_URL);
					return;
				}
			} else {
				console.log( 'Invalid Link' );
				this.$store.dispatch("app/shared", "")
			}
			await this.$router.replace("/");
			unblockUi();
		} catch (e) {
			console.log(e);
		}
    }
}
</script>
