<template>
    <!-- Header -->
    <div class="p-5 text-center bg-light">
      <h1 class="mb-3">Créer un nouveau projet</h1>
    </div>
    <!-- Header -->
    <div class="w-50 p-3 justify-content-center" style="background-color: #eee; margin: auto;">
    <form>
        <MDBInput type="text" label="Nom du projet (doit être unique)" id="projectName" v-model="projectName" wrapperClass="mb-4"/>
        <MDBTextarea label="Description (optionnelle)" rows="4" v-model="projectDescription" wrapperClass="mb-4" />
        <MDBBtn color="danger" block class="w-25 mb-4" v-on:click="saveNewProject()"> Confirmer</MDBBtn>
        <div v-if="submitError">
            <h6 class="text-danger">Erreur: {{ submitError }}</h6>
        </div>
    </form>
    </div>
</template>

<script lang="ts">
import { MDBInput, MDBBtn, MDBTextarea } from 'mdb-vue-ui-kit';

interface NewProjectVueData
{
    projectName: string;
    projectDescription: string;
    submitError: string;
}

export default {
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
        async saveNewProject() {
            // These are just frontend checks for user experience. Security checks are implemented on the main electron process.
            if (!this.projectName) { this.submitError = "Le nom du projet ne peut pas être vide."; return; }
            const re = /^[\u00C0-\u024F\u1E00-\u1EFF\w\d\s-]+$/;
            if (!re.test(this.projectName)) { this.submitError = "Le nom du projet ne peut contenir que des lettres, nombres, espaces, et tirets."; return; }
            if (this.projectName.length > 100) { this.submitError = "Le nom du projet ne peut faire plus de 100 caractères."; return; }
            if (this.projectDescription.length > 500) { this.submitError = "La description ne peut faire plus de 500 caractères."; return; }

            // Saving the project
            console.log("Saving new project with name: " + this.projectName);
            console.log("Saving project with description " + this.projectDescription);
            const result: boolean = await window.electronAPI.registerProject({projectName: this.projectName, projectDescription: this.projectDescription});
            if (result) { console.log("Successfully registered project"); }
            else { console.log("Error registering project"); }
        }
    }

};
</script>
