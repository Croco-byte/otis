<template>
<div style="height: 80vh">
    <!-- Header -->
    <div class="p-5 text-center bg-light">
      <h1 class="mb-3">Créer un nouveau projet</h1>
    </div>
    <!-- Header -->
    <div class="w-50 p-3 justify-content-center" style="background-color: #eee; margin: auto;">
    <form>
        <MDBInput type="text" label="Nom du projet (doit être unique)" id="projectName" v-model="projectName" wrapperClass="mb-4"/>
        <MDBTextarea label="Description (facultatif)" rows="4" v-model="projectDescription" wrapperClass="mb-4" />
        <MDBBtn color="danger" block class="w-25 mb-4" v-on:click="saveNewProject()"> Confirmer</MDBBtn>
        <div v-if="submitError">
            <h6 class="text-danger">Erreur: {{ submitError }}</h6>
        </div>
    </form>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { MDBInput, MDBBtn, MDBTextarea } from 'mdb-vue-ui-kit';
import { ProjectRegistrationResult } from '../types/projectRegistration.interface'

interface NewProjectVueData
{
    projectName: string;
    projectDescription: string;
    submitError?: string;
}

export default defineComponent ({
    components: {
        MDBInput,
        MDBBtn,
        MDBTextarea
    },
    data(): NewProjectVueData {
        return {
            projectName: "",
            projectDescription: "",
            submitError: ""
        }
    },

    methods: {
        saveNewProject: async function() {
            console.log("Saving project with name: " + this.projectName);
            console.log("Saving project with description " + this.projectDescription);
            const result: ProjectRegistrationResult = await window.electronAPI.registerProject({projectName: this.projectName, projectDescription: this.projectDescription});
            if (result.success) {
                console.log("Successfully registered project");
                this.$router.push({path: '/project/' + result.projectId});
            }
            else {
                console.log("Error registering project");
                this.submitError = result.error;
            }
        }
    }

});
</script>
