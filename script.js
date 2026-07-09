function getData(label, text) {
    const regex = new RegExp(label + "\\s*\\n([^\\n]+)", "i");
    const match = text.match(regex);
    return match ? match[1].trim() : "";
}

function ambilData() {
    const text = document.getElementById("raw").value;

    if (text.trim() == "") {
        alert("Paste isi tiket terlebih dahulu!");
        return;
    }

    const lines = text.split("\n").filter(x => x.trim() !== "");
    document.getElementById("notiket").value = lines[0] ? lines[0].replace(/[^A-Z0-9-]/gi, '').trim() : "";

    const insiden = (text.match(/INSIDEN NO\.?\s*(.+)/i) || ["", ""])[1];
    document.getElementById("insiden").value = insiden.trim();

    document.getElementById("nama").value = getData("Nama", text);
    document.getElementById("sid").value = getData("Service Id", text);

    const layanan = getData("Layanan Produk", text);
    const mbps = (layanan.match(/(\d+)/) || ["", ""])[1];
    document.getElementById("layanan").value = mbps;

    document.getElementById("alamat").value = getData("Alamat", text);

    // Tetap dikosongkan untuk input manual koordinat maps
    document.getElementById("tikoruser").value = "";
}

function generate() {
    const notiket = document.getElementById("notiket").value;
    const insiden = document.getElementById("insiden").value;

    if (notiket.trim() == "" && insiden.trim() == "") {
        alert("Data tiket masih kosong. Silakan generate atau isi data terlebih dahulu.");
        return;
    }

    const hasil =
`FORMAT TIKET CLOSE
====================================
No Tiket : ${notiket}
No Insiden : ${insiden}
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

    if (hasil.trim() == "") {
        alert("Belum ada hasil format close untuk disalin.");
        return;
    }

    navigator.clipboard.writeText(hasil);
    alert("Hasil format close berhasil disalin!");
}

function resetForm() {
    document.querySelectorAll("input").forEach(e => e.value = "");
    document.querySelectorAll("textarea").forEach(e => e.value = "");
}
