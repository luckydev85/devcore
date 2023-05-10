<template>
	<div v-if="shareLinks.length">
		<div
			v-for="link in shareLinks"
			:key="link.id"
			:title="link.urlName"
		>
			<div class="px-2 pt-3 pb-2 rounded-0 bg-primary text-white border-bottom" style="width: 270px; min-height: 50px">
				<h2 class="h5 mb-2 text-center">{{ link.urlName }}</h2>
				
				<div class="bg-primary text-white p-1 bg-light">
					<b-input-group>
						<b-form-input
							:disabled="true"
							style="background:transparent !important; border: none !important; height:30px; font-size:14px;"
							:value="populateLink(link.urlHash)"
						></b-form-input>
						<b-input-group-append>
							<div>
								<b-button 
									variant="transparent"
									class="btn text-white border outline-none bg-primary"
									style="height:100%; z-index:0;"
									@click="copyLink(link.id)"
								>Copy</b-button>
							</div>
							<confirm-button
								variant="transparent"
								:confirm-message="$t('This action cannot be undone!')"
								:confirm-title="$t('Delete item?')"
								:confirm-text="$t('Delete')"
								btn-class="text-white border outline-none bg-primary z-0"
								:show-overlay="false"
								:btnStyle="'height:100%'"
								style="height:100%; z-index:0;"
								block
								@confirm="deleteLink(link.id)"							
							>
							Delete
							</confirm-button>
						</b-input-group-append>
					</b-input-group>
				</div>			
			</div>
		</div>
	</div>
</template>
<script>
// import { /* mapState, */ mapGetters } from "vuex";
// import GQLForm from "@/lib/gqlform";

export default {
	props: {
		shareLinks: {
			required: true
		}
	},
	data: () => ({
	}),
	methods: {
		populateLink(hash){
			return process.env.BASE_URL + '/share/' + hash;
		},
		copyLink(id){
			var a = this.shareLinks.filter((item) => item.id == id);
			navigator.clipboard.writeText(process.env.BASE_URL + '/share/' + a[0].urlHash);

			window.vm.$snotify.success(
		        this.$t("Copied to clipboard."),
		        {
		          timeout: 1000,
		          showProgressBar: true,
		          closeOnClick: false,
		          pauseOnHover: false,
		        }
		      );
		},
		deleteLink(val){
			this.$emit('delLink', val);
			window.vm.$snotify.success(
		        this.$t("ShareLink deleted successfully."),
		        {
		          timeout: 1000,
		          showProgressBar: true,
		          closeOnClick: false,
		          pauseOnHover: false,
		        }
		      );
		},
		close() {
			this.$emit("closed");
		},
		async save() {
			try {
				console.log('save');
				// await this.$validator.validateAll();
				// if (!this.vErrors.any()) {
				// 	console.log("submit")
				// 	await this.$store.dispatch("project/share", this.form);
					
				// }
			} catch (ex) {
				// this.budget = this.form.budget / 100;
				console.log(ex);
			}
		}
	}
};
</script>
