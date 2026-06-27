export function showModal() {
  document.getElementById('long-break-modal').classList.remove('hidden');
}

export function hideModal() {
  document.getElementById('long-break-modal').classList.add('hidden');
}

export function initModal(onYes, onNo) {
  document.getElementById('modal-yes').addEventListener('click', (e) => {
    hideModal();
    onYes();
  });
  document.getElementById('modal-no').addEventListener('click', (e) => {
    hideModal();
    onNo();
  });
}
