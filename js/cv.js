const downloadPdf = document.getElementById('downloadPdf');

if (downloadPdf) {
  downloadPdf.addEventListener('click', () => {
    window.print();
  });
}

const cvPdfMenu = document.getElementById('cvPdfMenu');

if (cvPdfMenu) {
  document.addEventListener('click', (event) => {
    if (!cvPdfMenu.open) return;
    if (cvPdfMenu.contains(event.target)) return;
    cvPdfMenu.open = false;
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !cvPdfMenu.open) return;
    cvPdfMenu.open = false;
    const summary = cvPdfMenu.querySelector('summary');
    if (summary) summary.focus();
  });
}
