<template>
    <!-- Header -->
    <div class="p-5 text-center bg-light">
      <h3 class="mb-3">{{ projectName }} </h3>
    </div>
    <!-- Header -->

    <div class="d-flex">
        <div class="p-2 w-25 border border-danger border-3 rounded" style="text-align: left; margin-right: 5px; margin-left: 5px;">
            <h5 style="text-align: center"><b>Le projet, étape par étape</b></h5>
            <br/>
            <MDBListGroup light>
                <MDBListGroupItem tag="label" class="list-group-item-danger">
                <input class="form-check-input me-1" disabled type="checkbox" value="" />
                <a href="javascript:void(0)" style="color: #A8213D;" v-on:click="testMethod()">Départ !</a>
                </MDBListGroupItem>
                <MDBListGroupItem tag="label" class="list-group-item-danger">
                <b>Travail préliminaire</b>
                    <MDBListGroup light>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                        <input class="form-check-input me-1" type="checkbox" value="" />
                        Aborder le texte
                        </MDBListGroupItem>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                        <input class="form-check-input me-1" type="checkbox" value="" />
                        Comprendre le texte
                        </MDBListGroupItem>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                        <input class="form-check-input me-1" type="checkbox" value="" />
                        Les bases
                        </MDBListGroupItem>
                    </MDBListGroup>
                </MDBListGroupItem>
                <MDBListGroupItem tag="label" class="list-group-item-danger">
                <b>Brouillon</b>
                    <MDBListGroup light>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                        <input class="form-check-input me-1" type="checkbox" value="" />
                        Les basiques
                        </MDBListGroupItem>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                        <input class="form-check-input me-1" type="checkbox" value="" />
                        Le plan
                        </MDBListGroupItem>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                        <input class="form-check-input me-1" type="checkbox" value="" />
                        L'annonce de plan
                        </MDBListGroupItem>
                    </MDBListGroup>
                </MDBListGroupItem>
                <MDBListGroupItem tag="label" class="list-group-item-danger">
                <input class="form-check-input me-1" type="checkbox" value="" />
                <b>Analyse du texte</b>
                </MDBListGroupItem>
                <MDBListGroupItem tag="label" class="list-group-item-danger">
                <b>Rédaction</b>
                    <MDBListGroup light>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                        <input class="form-check-input me-1" type="checkbox" value="" />
                        Quelques conseils...
                        </MDBListGroupItem>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                        <input class="form-check-input me-1" type="checkbox" value="" />
                        Rédiger son introduction
                        </MDBListGroupItem>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                        <input class="form-check-input me-1" type="checkbox" value="" />
                        Rédiger ses parties
                        </MDBListGroupItem>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                        <input class="form-check-input me-1" type="checkbox" value="" />
                        Rédiger sa conclusion
                        </MDBListGroupItem>
                    </MDBListGroup>
                </MDBListGroupItem>
                <MDBListGroupItem tag="label" class="list-group-item-danger">
                <input class="form-check-input me-1" type="checkbox" value="" />
                <b>Relecture !</b>
                </MDBListGroupItem>
            </MDBListGroup>
        </div>
        <div class="p-2 flex-grow-1 border border-danger border-3 rounded">

        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { MDBListGroup, MDBListGroupItem } from 'mdb-vue-ui-kit';

interface ProjectData
{
    projectId: number,
    projectName: string,
    currentStep: string,

}

export default defineComponent ({
    components: {
        MDBListGroup,
        MDBListGroupItem
    },
    data(): ProjectData {
        return {
            projectId: parseInt(this.$route.params.projectId as string),
            projectName: "",
            currentStep: "ProjectStart"
        }
    },

    methods: {
        testMethod: function() {
            console.log("hello");
        }
    },

    created() {
        this.projectName = window.electronAPI.getProjectNameFromId(this.projectId);
    }

});
</script>
