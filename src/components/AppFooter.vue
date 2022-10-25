<template>
  <MDBFooter :text="['center', 'white']" class="fixed-bottom" bg="dark" style="padding-top: 5px; margin-bottom: -15px;">
    <!-- Grid container -->
    <MDBContainer>
      <!--Grid row-->
      <MDBRow>
        <!--Grid column-->
        <MDBCol>
              Made with  <i class="fas fa-robot fa-1,5x pr-5" aria-hidden="true"></i>  by Solène & Quentin
        </MDBCol>
        <!--Grid column-->

        <!--Grid column-->
        <MDBCol>
            <MDBBtn outline="light" class="mb-4" tag="a" href="https://github.com/Croco-byte/otis/issues"> Report a bug  <i class="fas fa-bug fa-1x pr-5" aria-hidden="true"></i></MDBBtn>
        </MDBCol>

        <MDBCol>
                Fuck copyrights <i class="fas fa-smile"></i>  : this software is open-source 
        </MDBCol>
        <!--Grid column-->
      </MDBRow>
      <!--Grid row-->
    </MDBContainer>
  </MDBFooter>
</template>

<script>
  import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdb-vue-ui-kit';

  export default {
    components: {
      MDBFooter,
      MDBContainer,
      MDBRow,
      MDBCol,
      MDBBtn
    },
  };
</script>
