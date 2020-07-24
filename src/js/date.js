export function setDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth()+1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  document.getElementById('deadline').value = `${year}-${month}-${day}`;
}