import { FE } from "./API";

export const activeCSS = (param, page) => {
  let active = "";

  if (param === `${FE}/home` && page === "home") active = "active";
  else if (page === "dataMaster") {
    if (
      param === `${FE}/nasabah` ||
      param === `${FE}/barang` ||
      param === `${FE}/bunga`
    )
      active = "active";
  } else if (page === "trans") {
    if (
      param === `${FE}/peminjaman` ||
      param === `${FE}/perpanjangan` ||
      param === `${FE}/pembayaran`
    )
      active = "active";
  } else if (param === `${FE}/ganti-foto` && page === "gantiFoto")
    active = "active";
  else if (param === `${FE}/ganti-pass` && page === "gantiPass")
    active = "active";
  return active;
};

export const Capitalize = (str) => {
  if (str !== undefined)
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

export const Angkasaja = (evt) => {
  let charCode = evt.which ? evt.which : Event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
  return true;
};

export const rupiah = (angka, prefix) => {
  let number_string = angka.replace(/[^,\d]/g, "").toString(),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    let separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  return prefix === undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
};

export const rupiahInteger = (rupiah) => {
  const split = rupiah.split(".");
  const convert = split.join("");
  return convert;
};

export const pejumahanHari = (hari) => {
  let inputHari = hari;
  let hariKedepan = new Date(
    new Date().getTime() + inputHari * 24 * 60 * 60 * 1000
  );
  return hariKedepan;
};

export const converLongDate = (data) => {
  let arr = data.split("/");
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const tgl = arr[1] + " " + bulan[arr[0] - 1] + " " + arr[2];
  return tgl;
};

export const IDRcurrency = (currency) => {
  let money = new Intl.NumberFormat(["ban", "id"]).format(currency);
  return `Rp. ${money}`;
};

export const createSN = (kode, no) => {
  if (kode !== undefined && no !== undefined) {
    let nol = "0000";
    let pjKar = no.toString().length;
    let gabung = nol.substr(0, nol.length - pjKar) + no;

    return kode + gabung;
  }
  return "";
};
