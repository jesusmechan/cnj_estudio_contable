const downloadPdf = document.getElementById('downloadPdf');

if (downloadPdf) {
  downloadPdf.addEventListener('click', () => {
    window.print();
  });
}
