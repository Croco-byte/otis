<template>
    <!-- Header -->
    <div class="p-3 text-center bg-light border d-flex justify-content-evenly">
      <h3 class="mb-3 w-75">{{ projectName }} </h3>
      <div>
      <div class="d-flex">
        <div v-for="step in completedSteps" :key="step[0]">
            <p v-if="!step" style="border:solid; padding-top:6px; padding-bottom:6px; margin:0px; width:30px; background: #D3D3D3;"></p>
            <p v-else style="border:solid; padding-top:6px; padding-bottom:6px; margin:0px; width:30px; background: green;"></p>
        </div>
      </div>
      <p> Progression : {{ computeProgression() }}%</p>
      </div>
    </div>
    <!-- Header -->

    <div class="d-flex" style="margin: 10px;">
        <div class="p-2 w-25 border border-danger border-3 rounded" style="text-align: left; margin-right: 5px; margin-left: 5px;">
            <h5 style="text-align: center"><b>Le projet, étape par étape</b></h5>
            <br/>
            <MDBListGroup light>
                <MDBListGroupItem tag="label" class="list-group-item-danger">
                <input class="form-check-input me-1" disabled type="checkbox" :checked="completedSteps['StepStart'] ? true : undefined" value="" />
                <a href="javascript:void(0)" style="color: #A8213D;" v-on:click="changeCurrentStep('StepStart')">Départ !
                    <span v-if="currentStep === 'StepStart'" style="float: right;"><i class="fas fa-edit"></i></span></a>
                </MDBListGroupItem>
                <MDBListGroupItem tag="label" class="list-group-item-danger">
                <b>Travail préliminaire</b>
                    <MDBListGroup light>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                        <input class="form-check-input me-1" disabled type="checkbox" :checked="completedSteps['StepPrelimApproach'] ? true : undefined" value="" />
                        <a href="javascript:void(0)" style="color: #A8213D;" v-on:click="changeCurrentStep('StepPrelimApproach')">Aborder le texte
                            <span v-if="currentStep === 'StepPrelimApproach'" style="float: right;"><i class="fas fa-edit"></i></span></a>
                        </MDBListGroupItem>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                        <input class="form-check-input me-1" disabled type="checkbox" :checked="completedSteps['StepPrelimUnderstand'] ? true : undefined" value="" />
                        <a href="javascript:void(0)" style="color: #A8213D;" v-on:click="changeCurrentStep('StepPrelimUnderstand')">Comprendre le texte
                            <span v-if="currentStep === 'StepPrelimUnderstand'" style="float: right;"><i class="fas fa-edit"></i></span></a>
                        </MDBListGroupItem>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                        <input class="form-check-input me-1" disabled type="checkbox" value="" />
                        Les bases
                        </MDBListGroupItem>
                    </MDBListGroup>
                </MDBListGroupItem>
                <MDBListGroupItem tag="label" class="list-group-item-danger">
                <b>Brouillon</b>
                    <MDBListGroup light>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                        <input class="form-check-input me-1" disabled type="checkbox" value="" />
                        Les basiques
                        </MDBListGroupItem>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                        <input class="form-check-input me-1" disabled type="checkbox" value="" />
                        Le plan
                        </MDBListGroupItem>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                        <input class="form-check-input me-1" disabled type="checkbox" value="" />
                        L'annonce de plan
                        </MDBListGroupItem>
                    </MDBListGroup>
                </MDBListGroupItem>
                <MDBListGroupItem tag="label" class="list-group-item-danger">
                <input class="form-check-input me-1" disabled type="checkbox" value="" />
                <b>Analyse du texte</b>
                </MDBListGroupItem>
                <MDBListGroupItem tag="label" class="list-group-item-danger">
                <b>Rédaction</b>
                    <MDBListGroup light>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                        <input class="form-check-input me-1" disabled type="checkbox" value="" />
                        Quelques conseils...
                        </MDBListGroupItem>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                        <input class="form-check-input me-1" disabled type="checkbox" value="" />
                        Rédiger son introduction
                        </MDBListGroupItem>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                        <input class="form-check-input me-1" disabled type="checkbox" value="" />
                        Rédiger ses parties
                        </MDBListGroupItem>
                        <MDBListGroupItem tag="label" class="list-group-item-danger">
                        <input class="form-check-input me-1" disabled type="checkbox" value="" />
                        Rédiger sa conclusion
                        </MDBListGroupItem>
                    </MDBListGroup>
                </MDBListGroupItem>
                <MDBListGroupItem tag="label" class="list-group-item-danger">
                <input class="form-check-input me-1" disabled type="checkbox" value="" />
                <b>Relecture</b>
                </MDBListGroupItem>
                <MDBListGroupItem tag="label" class="list-group-item-danger">
                <input class="form-check-input me-1" disabled type="checkbox" value="" />
                <a href="javascript:void(0)" style="color: #A8213D;">Arrivée !</a>
                </MDBListGroupItem>
            </MDBListGroup>
        </div>
        <div class="p-2 flex-grow-1 border border-danger border-3 rounded">
            <component :is="currentStep" v-on:stepCompleted="completeStep" v-on:uncompleteStep="uncompleteStep"></component>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { MDBListGroup, MDBListGroupItem } from 'mdb-vue-ui-kit';
import StepStart from '../components/steps/StepStart.vue';
import StepPrelimApproach from '../components/steps/StepPrelimApproach.vue';

interface ProjectData
{
    projectId: number,
    projectName: string,
    currentStep: string,
    completedSteps: {[key: string]: boolean},

}

export default defineComponent ({
    components: {
        MDBListGroup,
        MDBListGroupItem,
        StepStart,
        StepPrelimApproach
    },
    data(): ProjectData {
        return {
            projectId: parseInt(this.$route.params.projectId as string),
            projectName: "",
            currentStep: "",
            completedSteps: {}
        }
    },

    methods: {
        testMethod: function() {
            console.log("hello");
        },

        changeCurrentStep: function(step: string) {
            this.currentStep = step;
            window.electronAPI.updateCurrentStep(this.projectId, this.currentStep);
        },

        completeStep: function(completed: string) {
            let nextStep = false;
            for (var step in this.completedSteps) {
                if (nextStep) {
                    this.currentStep = step;
                    window.electronAPI.updateCurrentAndCompletedSteps(this.projectId, step, JSON.stringify(this.completedSteps));
                    return
                }
                if (step === completed) {
                    this.completedSteps[step] = true;
                    nextStep = true;
                }
            }
        },

        uncompleteStep: function(step: string) {
            this.completedSteps[step] = false;
            window.electronAPI.updateCompletedSteps(this.projectId,  JSON.stringify(this.completedSteps));
        },

        computeProgression: function() {
            const totalSteps = Object.keys(this.completedSteps).length;
            let completedSteps = 0;
            for (var step in this.completedSteps) {
                if (this.completedSteps[step]) { completedSteps++; }
            }
            return (100 * completedSteps / totalSteps).toPrecision(2);
        }

    },

    computed: {

    },

    created() {
        this.projectName = window.electronAPI.getProjectNameFromId(this.projectId);
        const stepInfo = window.electronAPI.getProjectStepInfoFromId(this.projectId);
        this.currentStep = stepInfo.currentStep;
        this.completedSteps = JSON.parse(stepInfo.completedSteps);
        console.log("Here come the step informations");
        console.log(this.currentStep);
        console.log(this.completedSteps);

    }

});
</script>
