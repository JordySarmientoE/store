import Swal from 'sweetalert2';

/**
 * Muestra un toast con el icono y mensaje proporcionados.
 * @param {string} icon - Icono del toast ('success', 'error', 'warning', etc.).
 * @param {string} title - Mensaje que se mostrará.
 */
export const showToast = (icon, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  Toast.fire({
    icon,
    title: title ?? 'Ocurrió un error, inténtelo más tarde.',
  });
};

/**
 * Muestra un cuadro de diálogo de confirmación.
 * @param {Object} options - Opciones para el diálogo de confirmación.
 * @param {string} options.title - Título del cuadro de diálogo.
 * @param {string} options.icon - Icono del cuadro de diálogo.
 * @param {Function} options.onConfirm - Función a ejecutar si el usuario confirma.
 * @param {Function} options.onClose - Función a ejecutar si el usuario cancela.

 */
export const showConfirmDialog = ({ title, onConfirm, icon, onClose }) => {
  Swal.fire({
    title,
    icon,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    customClass: {
      popup: 'z-[1050]', // Asegúrate de que esté por encima del diálogo principal
    },
  }).then((result) => {
    if (result.isConfirmed) {
      if (onConfirm) {
        onConfirm();
      }
    } else if (result.dismiss) {
      if (onClose) {
        onClose();
      }
    }
  });
};
