<template>
  <header>
    <!-- Navbar -->
    <MDBNavbar expand="lg" light bg="white" container>
      <MDBNavbarBrand href="#">
          <img src="../assets/logo.png" height="60" alt="logo" loading="lazy"/>
      </MDBNavbarBrand>
      <MDBNavbarToggler target="#navbarExample01"></MDBNavbarToggler>
      <MDBNavbarNav collapse="navbarExample01" class="mb-2 mb-lg-0">
        <MDBNavbarItem to="/" active>
          Accueil
        </MDBNavbarItem>
        <MDBNavbarItem to="/my-projects" active>
          Mes Projets
        </MDBNavbarItem>
       <router-link to="/new-project"><MDBBtn outline="success" class="me-2">Nouveau Projet </MDBBtn></router-link>
      </MDBNavbarNav>
    </MDBNavbar>
    <!-- Navbar -->
  </header>
</template>

<script>
  import { MDBNavbar, MDBNavbarToggler, MDBNavbarNav, MDBNavbarItem, MDBNavbarBrand, MDBBtn } from 'mdb-vue-ui-kit';

  export default {
    components: {
      MDBNavbar,
      MDBNavbarToggler,
      MDBNavbarNav,
      MDBNavbarItem,
      MDBNavbarBrand,
      MDBBtn
    },
  };
</script>
