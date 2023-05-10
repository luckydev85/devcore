<template>
	<div
		class="card-body"
		style="display: flex; flex-direction: column; place-content: center"
		>
	<h1 class="h3 text-shadow text-center">{{ $t("Register to join the Project") }}</h1>
	<hr />
	<b-form class="floating-labels" @submit.prevent="save">
		<b-alert
			v-if="form.hasErrors"
			variant="danger"
			dismissible
			show
			class="text-sm"
			>
			<i class="mdi mdi-close-octagon"></i>
			{{ form.errors.message }}
		</b-alert>
		<b-row>
			<b-col class="col-12 col-lg-6">
				<div class="form-label-group required">
					<b-form-input
						id="firstName"
						v-model.trim="form.firstName"
						v-validate="'required'"
						:disabled="form.busy"
						:placeholder="$t('First name')"
						type="text"
						name="firstName"
						:state="$validateState('firstName', form)"
						autofocus
					></b-form-input>
					<label for="firstName">{{ $t("First name") }}</label>
					<b-form-invalid-feedback>{{
						$displayError("firstName", form)
					}}</b-form-invalid-feedback>
				</div>
			</b-col>
			<b-col class="col-12 col-lg-6">
				<div class="form-label-group required">
					<b-form-input
						id="lastName"
						v-model="form.lastName"
						v-validate="'required'"
						:disabled="form.busy"
						:placeholder="$t('Last name')"
						type="text"
						name="lastName"
						:state="$validateState('lastName', form)"
					></b-form-input>
					<label for="lastName">{{ $t("Last name") }}</label>
					<b-form-invalid-feedback>{{
						$displayError("lastName", form)
					}}</b-form-invalid-feedback>
				</div>
			</b-col>
		</b-row>
		<div class="form-label-group required">
			<b-form-input
				id="email"
				v-model="form.email"
				v-validate="'required|email'"
				:disabled="form.busy"
				:placeholder="$t('Email')"
				type="email"
				name="email"
				:state="$validateState('email', form)"
			></b-form-input>
			<label for="email">{{ $t("Email") }}</label>
			<b-form-invalid-feedback>{{
				$displayError("email", form)
			}}</b-form-invalid-feedback>
		</div>
		
		<div class="form-label-group select required role_wrapper">
			<v-select
			v-model="form.companyRoleId"
			v-validate="'required'"
			label="name"
			data-vv-name="companyRole"
			:placeholder="$t('Role')"
			:options="getAvailableRoles"
			:reduce="(role) => role.id"
			:class="{
				'is-invalid': $validateState('companyRole', form) === false,
				'is-valid': $validateState('companyRole', form) === true,
			}"
			></v-select>
			<label for="companyRole">{{ $t("Role") }}</label>
			<b-form-invalid-feedback>{{
				$displayError("companyRole", form)
			}}</b-form-invalid-feedback>
		</div>

		<div class="form-label-group required">
			<b-form-input
				id="phone"
				v-model="form.phone"
				:disabled="form.busy"
				:placeholder="$t('Mobile No.')"
				type="text"
				v-validate="'phone_validation'"
				name="phone"
				:state="$validateState('phone', form)"
			></b-form-input>
			<label for="phone">{{ $t("Mobile No.") }}</label>
			<b-form-invalid-feedback>{{
				$displayError("phone", form)
			}}</b-form-invalid-feedback>
		</div>
		<div class="form-label-group required">
			<b-form-input
				id="password"
				ref="password"
				v-model="form.password"
				v-validate="'required|min:6'"
				:disabled="form.busy"
				:placeholder="$t('Password')"
				type="password"
				name="password"
				:state="$validateState('password', form)"
			></b-form-input>
			<label for="password">{{ $t("Password") }}</label>
			<b-form-invalid-feedback>{{
				$displayError("password", form)
			}}</b-form-invalid-feedback>
		</div>
		<div class="form-label-group required">
			<b-form-input
				id="passwordConfirmation"
				v-model="passwordConfirmation"
				v-validate="
                    `required|confirmed:password`
                  "
				:disabled="form.busy"
				:placeholder="$t('Confirm Password')"
				type="password"
				ref="passwordConfirmation"
				name="passwordConfirmation"
				:state="$validateState('passwordConfirmation', form)"
			></b-form-input>
			<label for="passwordConfirmation">{{ $t("Confirm Password") }}</label>
			<b-form-invalid-feedback>{{
				$displayError("passwordConfirmation", form)
			}}</b-form-invalid-feedback>
		</div>
		<div class="mb-3">
			<hr />
			<loading-button
				type="submit"
				size="lg"
				:disabled="
					form.busy ||
					vErrors.any() "
				:loading="form.busy"
				:block="true"
				variant="primary">
				{{ $t("Register") }}
			</loading-button>
		</div>
	</b-form>
	<div class="text-center">
		Already have an account? <a style="cursor:pointer;text-decoration:underline;" @click="showLogin">Login</a>
	</div>
</div>
</template>
<script>
import { mapGetters } from "vuex";
import GQLForm from "@/lib/gqlform";
import { blockUi, unblockUi } from "@/lib/utils";

	export default {
		props: {
			callback: null,
		},
		data: () => ({
			form: new GQLForm({
				firstName: null,
				lastName: null,
				email: null,
				phone: null,
				password: null,
				companyRoleId: null,
				companyId: null,
				projectId: null,
			}),
			passwordConfirmation: "",
		}),
		computed: {
			...mapGetters({
				shareLink: "app/shared",
	        	user: "auth/user",
	        	companyRoles: "companyRole/all",
			}),
			getAvailableRoles: {
				get() {
					console.log(this.shareLink)
					const availableRoles = this.shareLink.companyRoleIds ?? []
					return this.companyRoles.filter( (role) => availableRoles.includes( role.id ));
				}
			}
		},
		async mounted() {
			await this.$store.dispatch("companyRole/findAll");
			// if( this.shareLink.companyRoleIds.length )
	        // 	this.form.companyRoleId = this.shareLink.companyRoleIds[0]
	        // else
	        // 	this.form.companyRoleId = null;
			
	        this.form.companyId = this.shareLink.companyId
	        this.form.projectId = this.shareLink.projectId
		},
		methods: {
			initForm() {
				this.form = new GQLForm({
					firstName: null,
					lastName: null,
					email: null,
					phone: null,
					password: "",
				});
			},
			showLogin: function () {
				this.callback();
			},
			save: async function () {
				await this.$validator.validateAll();
			      if (!this.vErrors.any()) {
			        await this.$validator.reset();
			        await this.$store.dispatch("user/register", this.form);

			        // Login
			        const loginForm = new GQLForm({
				        username: this.form.email,
				        password: this.form.password,
				        remember: false,
			        });

			        try {
			        	await this.$store.dispatch("auth/login", loginForm);
			        	blockUi();
			        	this.$store.dispatch("app/load");
			        	this.$store.dispatch("app/asyncLoad");
			        	const defaultRoute = "/";

			        	if (this.user && this.user.can("core/company/manage")) {
			        		await this.$router.replace("/manage/companies");
			        	}

			        	await this.$router.replace(
			        		this.$store.getters["app/intented_route"] || defaultRoute
			        		);
			        } catch (ex) {
			        	if (ex.code && ex.code === "MUST_VERIFY_EMAIL") {
			        		await this.$router.push({
			        			name: "send-email-verification",
			        			query: { email: this.form.username },
			        		});
			        	}
			        } finally {
			        	unblockUi();
			        }
			        this.$emit("input", this.input);
          			this.$emit("done");
			      }
			}
		}
	}
</script>
<style>
.role_wrapper .vs__selected-options{
	padding-top: 0.5rem;
    height: 3.5rem;
}
.role_wrapper label{
	width:calc( 100% - 40px) !important;
}

.form-label-group.select.role_wrapper .v-select.is-invalid + label{
	font-size: 1.33rem;
}
.form-label-group.select.role_wrapper .v-select.is-valid + label{
	padding-top: 0.25rem;
	font-size: 12px;
}
</style>