export const getId = (id) => {
  return document.getElementById(id)
}

export const formatDate = (tanggalISO) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const tanggal = new Date(tanggalISO).toLocaleDateString('id-ID', options);
  return tanggal;
}