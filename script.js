function getData(label, text) {
    const regex = new RegExp(label + "\\s*\\n([^\\n]+)", "i");
    const match = text.match(regex);
    return match ? match[1].trim() : "";
}

function ambilData() {
    const text = document.getElementById("raw").value;

    // Nomor tiket
    const tiket = (text.match(/INSIDEN NO\.?\s*(\d+)/i) || ["",""])[1];

    // Data lain
    const nama = getData("Nama", text);
    const sid = getData("Service Id", text);
    const layanan = getData("Layanan Produk", text);
    const alamat = getData("Alamat", text);

    // Ambil angka Mbps saja
    let mbps = "";
    const m = layanan.match(/(\d+)/);
    if (m) mbps = m[1];

    document.getElementById("tiket").value = tiket;
    document.getElementById("nama").value = nama;
    document.getElementById("sid").value = sid;
    document.getElementById("layanan").value = mbps;
    document.getElementById("alamat").value = alamat;

    // Isi otomatis TIKOR USER dengan alamat
    document.getElementById("tikoruser").value = alamat;
}

function generate() {

    const hasil =
`FORMAT TIKET CLOSE
====================================
Tiket/Insiden : ${tiket.value}
Tim : KENDAL
Nama : ${nama.value}
SID : ${sid.value}
Layanan : ${layanan.value} Mbps
Rootcause : ${rootcause.value}
Action : ${action.value}

Material Terpakai
-------------------
SN Kabel : ${snkabel.value}
SN ONT : ${snont.value}
Pathcord APC : ${apc.value}
Pathcord UPC : ${upc.value}
Sleeve Protektor : ${sleeve.value}
Pigtail : ${pigtail.value}
====================================
TIKOR USER : ${tikoruser.value}
TIKOR TITIK PUTUS : ${tikorputus.value}`;

    document.getElementById("hasil").value = hasil;
}

function copyText() {
    const hasil = document.getElementById("hasil").value;

    navigator.clipboard.writeText(hasil).then(() => {
        alert("Berhasil disalin");
    });
}

function resetForm() {

    document.getElementById("raw").value = "";
    document.getElementById("tiket").value = "";
    document.getElementById("nama").value = "";
    document.getElementById("sid").value = "";
    document.getElementById("layanan").value = "";
    document.getElementById("alamat").value = "";
    document.getElementById("rootcause").value = "";
    document.getElementById("action").value = "";
    document.getElementById("snkabel").value = "";
    document.getElementById("snont").value = "";
    document.getElementById("apc").value = "";
    document.getElementById("upc").value = "";
    document.getElementById("sleeve").value = "";
    document.getElementById("pigtail").value = "";
    document.getElementById("tikoruser").value = "";
    document.getElementById("tikorputus").value = "";
    document.getElementById("hasil").value = "";
}