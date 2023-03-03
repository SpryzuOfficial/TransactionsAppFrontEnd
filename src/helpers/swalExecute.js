import Swal from 'sweetalert2';

export const swalExecute = (condition, message, isSuccess = true) =>
{
    if(condition)
    {
        Swal.fire({
            icon: `${isSuccess ? 'success' : 'error'}`,
            text: message,
            background: '#131b20',
            confirmButtonText: `${isSuccess ? 'Done' : 'Try again'}`,
            customClass: {
                confirmButton: `custom-container ${isSuccess ? 'custom-container-success' : 'custom-container-danger'}`,
                htmlContainer: 'custom-container'
            }
        });

        return false;
    }

    return true;
}