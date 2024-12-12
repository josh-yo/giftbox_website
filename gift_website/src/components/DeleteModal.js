function DeleteModal({close, text, handleDelete, id}) {
    return (
      <div
        className='modal fade'
        tabIndex='-1'
        id='deleteModal'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header bg-danger'>
              <h1 className='modal-title text-white fs-5' id='exampleModalLabel'>
                Delete Product
              </h1>
              <button
                type='button'
                className='btn-close'
                aria-label='Close'
                onClick={close}
              />
            </div>
            <div className='modal-body'>Are you sure you want to delete {text}? </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' onClick={close}>
                Cancel
              </button>
              <button
                type='button'
                className='btn btn-danger'
                onClick={() => handleDelete(id)}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default DeleteModal;