function getData(label, text) {
    const regex = new RegExp(label + "\\s*\\n([^\\n]+)", "i");
    const match = text.match(regex);
    return match ? match[1].trim() : "";
}

function ambilData() {

    const text = document.getElementById("raw").value;

    if(text.trim()==""){
        alert("Paste isi tiket terlebih dahulu!");
        return;
    }

    // No Tiket = baris pertama
    const lines = text.split("\n").filter(x => x.trim() !== "");
    document.getElementById("notiket").value = lines[0] || "";

    // No Insiden
    const insiden = (text.match(/INSIDEN NO\.?\s*(.+)/i) || ["",""])[1];
    document.getElementById("insiden").value = insiden;

    // Nama
    document.getElementById("nama").value = getData("Nama", text);

    // SID
    document.getElementById("sid").value = getData("Service Id", text);

    // Layanan
    const layanan = getData("Layanan Produk", text);
    const mbps = (layanan.match(/(\d+)/) || ["",""])[1];
    document.getElementById("layanan").value = mbps;

    // Alamat
    const alamat = getData("Alamat", text);
    document.getElementById("alamat").value = alamat;

    // Otomatis isi TIKOR USER
    document.getElementById("tikoruser").value = alamat;
}

function generate() {

    const hasil =
`FORMAT TIKET CLOSE
====================================
No Tiket : ${document.getElementById("notiket").value}
No Insiden : ${document.getElementById("insiden").value}
Tim : ${document.getElementById("tim").value}
Nama : ${document.getElementById("nama").value}
SID : ${document.getElementById("sid").value}
Layanan : ${document.getElementById("layanan").value} Mbps
Rootcause : ${document.getElementById("rootcause").value}
Action : ${document.getElementById("action").value}

Material Terpakai
-------------------
SN Kabel : ${document.getElementById("snkabel").value}
SN ONT : ${document.getElementById("snont").value}
Pathcord APC : ${document.getElementById("apc").value}
Pathcord UPC : ${document.getElementById("upc").value}
Sleeve Protektor : ${document.getElementById("sleeve").value}
Pigtail : ${document.getElementById("pigtail").value}
====================================
TIKOR USER : ${document.getElementById("tikoruser").value}
TIKOR TITIK PUTUS : ${document.getElementById("tikorputus").value}`;

    document.getElementById("hasil").value = hasil;
}

function copyText() {

    const hasil = document.getElementById("hasil").value;

    navigator.clipboard.writeText(hasil);

    alert("Berhasil disalin!");

}

function resetForm() {

    document.querySelectorAll("input").forEach(e=>e.value="");
    document.querySelectorAll("textarea").forEach(e=>e.value="");
    document.querySelectorAll("select").forEach(e=>e.selectedIndex=0);

}