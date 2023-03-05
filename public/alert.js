export default {
  methods: {
    showAlert(message) {
      this.$swal.fire({
        text: message,
        toast: true,
        position: "bottom",
        showConfirmButton: false,
        showCancelButton: false,
        background: "#555",
        color: "#fff",
        timer: 800,
        width: "fit-content",
        padding: "5px",
      });
    },

   
  },
};
