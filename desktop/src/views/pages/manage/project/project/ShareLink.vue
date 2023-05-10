<template>
	<div class="" style="width: 270px; min-height: 50px">
		<b-form
		class="hide-labels"
		@submit.prevent="save"
		@keyup="$validator.validateAll()">
			<b-row>
				<b-col class="col-12">
					<div class="form-label-group select required">
						<b-form-input
						id="urlName"
						v-model.trim="form.urlName"
						v-validate="'required'"
						:disabled="form.busy"
						:placeholder="$t('Name')"
						type="text"
						name="name"
						:state="$validateState('name', form)"
						autofocus
						></b-form-input>
						<label for="name">{{ $t("URL Name") }}</label>
						<b-form-invalid-feedback>{{
							$displayError("name", form)
						}}</b-form-invalid-feedback>
					</div>
				</b-col>

				<b-col class="col-12">
					<div class="form-group">
              <div class="idea_edit_path_container-body-process-select-title">
                {{ $t("roles") }}
              </div>
              <role-selector
                name="idea_roles"
                id="idea_roles"
                class="idea_edit_path_select_idea_roles"
                autocomplete="idea_roles"
                :placeholder="$t('Roles')"
                :disabled="form.busy"
                v-model="form.companyRoleIds"
                :show-field="true"
                :state="$validateState('companyRoleIds', form)"
                :items="companyRoles"
                :show-add-btn="false"
     						@input="changeCompanyRole"
              ></role-selector>
          </div>

				</b-col>
				<b-col class="col-12">
					<h4>{{ $t("Access") }}</h4>
					<h5 v-if="ideas.length">( {{$tc("idea.count", ideas.length) }} )</h5>

					<div v-if="idealoading" class="text-center p-3">
		          <b-spinner variant="primary"></b-spinner>
		        </div>
					<div class="form-label-group access-wrapper" v-else>
						<div v-if="ideas.length">
							<div v-for="idea in ideas">
								<div>
									<h5 style="color:#4294d0">{{ idea.title }}</h5>
									<p style="color:#888">{{ idea.stageTitle }}</p>
								</div>
							</div>
						</div>
						<div v-else>
							{{ $t("No") }} {{ $t("Idea") }}
						</div>
					</div>
				</b-col>

			</b-row>

			<p style="color:red; text-align: center;">{{ $t("You are sharing these company data.") }}</p>
			<b-row>
				<b-col>
					<loading-button
					block
					size="lg"
					type="submit"
					:disabled="vErrors.any() || form.busy"
					:loading="form.busy"
					variant="primary"
					>
						{{ $t("Create Link") }}
					</loading-button>
				</b-col>
			</b-row>
		</b-form>
	</div>
</template>
<script>
import { /* mapState, */ mapGetters } from "vuex";
import GQLForm from "@/lib/gqlform";

export default {
	props: {
		project: {
			required: true,
			type: Object
		},
		stage: {
	      required: true,
	      type: Object
	    },
	},
	data: () => ({
		form: new GQLForm({
			urlName: null,
			companyRoleIds: null
		}),
		items: {
	      required: true,
	      type: Array
	    },		
	    ideas: {
	      required: true,
	      type: Array
	    },
	    idealoading: true
	}),
	computed: {
		...mapGetters({
			companyRoles: "companyRole/all",
			currentUser: "auth/user",
		}),
	},
	async mounted() {
		await this.$store.dispatch("companyRole/findAll");
		await this.$store.dispatch("role/findAll");

		this.getInstructionList();
	},
	methods: {
		close() {
			this.$emit("closed");
		},
		changeCompanyRole () {
			this.idealoading = true;
			var selectedID = this.form.companyRoleIds;

			this.ideas = this.items.filter(function(i) {
				if( i.companyRoleIds == null || !selectedID.length || i.companyRoleIds == "undefined" ){
					return true;
				}

				for( let index = 0; index < selectedID.length; index++){
					if( i.companyRoleIds.includes( selectedID[index]) ){
						return true;
					}
				}

				return false;
			})

			this.idealoading = false;
		},
		async getInstructionList () {
			this.idealoading = true;
			this.items = await this.project.getIdeasByStage(this.stage.id)

			await Promise.all(this.items.map( async (idea) =>  {
				const ideaDetail = await this.$store.dispatch("idea/findById", {
			        id: idea.ideaId,
			        force: true,
			    });
			    idea.companyRoleIds = ideaDetail.companyRoleIds;
			    idea.stageTitle = this.getStageTitle( ideaDetail )
			}));

			this.ideas = this.items
			this.idealoading = false;
		},
		getStageTitle ( ideaDetail ){
			const parent = ideaDetail.parent;
			const phaseTitle = parent.title;

			var opTitle = "";
			if( typeof parent.operation === "object" ) {
				opTitle = parent.operation.title +" > ";
				const stageTitle = parent.operation.stage.title;

				opTitle = stageTitle + ">" + opTitle;
			}
			else if (typeof parent.stage === "object") {
				opTitle = parent.stage.title + " > ";
			}

			return opTitle + phaseTitle;
		},
		async save() {
			try {
				await this.$validator.validateAll();
				if (!this.vErrors.any()) {
					this.form.fields = {...this.form.fields, 
					projectId: this.project.id};
					if (await this.$store.dispatch("shareLink/create", this.form)){
						this.$emit('createdLink', true);
						this.close();

						window.vm.$snotify.success(
					        this.$t("ShareLink created successfully."),
					        {
					          timeout: 5000,
					          showProgressBar: true,
					          closeOnClick: false,
					          pauseOnHover: false,
					        }
					      );
					}
				}
			} catch (ex) {
				console.log(ex);
			}
		}
	}
};
</script>
<style lang="scss">
.access-wrapper {
	max-height:200px; 
	overflow-y:auto;
}
.access-wrapper::-webkit-scrollbar{
	display: block;
	width: 5px;
}
.access-wrapper::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
}
 
.access-wrapper::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid #c3c3c3;
  border-radius: 2px;
}
</style>