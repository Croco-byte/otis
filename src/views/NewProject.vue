<template>
    <!-- Header -->
    <div class="p-5 text-center bg-light">
      <h1 class="mb-3">Create a new project</h1>
    </div>
    <!-- Header -->

    <form>
        <MDBInput type="text" label="Your project name (must be unique)" id="projectName" v-model="projectName" wrapperClass="mb-4"/>
        <MDBBtn color="danger" block class="mb-4"> Confirmer</MDBBtn>
    </form>
    <p> The project name you want is : {{ projectName }} </p>
</template>

<script>
import { MDBInput, MDBBtn } from 'mdb-vue-ui-kit';

export default {
    components: {
        MDBInput,
        MDBBtn
    },
    data() {
        return {
            projectName: ""
        }
    }
};

</script>
