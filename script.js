// Fungsi regex yang lebih fleksibel (bisa membaca di sebelah kanan label atau di bawahnya)
function getData(label, text) {
    // Mencari label, mengabaikan spasi/titik dua, lalu mengambil teks di baris yang sama atau baris berikutnya
    const regex = new RegExp(label + "\\s*[:=-]?\\s*([^\n]+)", "i");
    let match = text.match(regex);
    
    // Jika tidak ketemu di baris yang sama, pakai cara lama (cari di baris bawahnya)
    if (!match) {
        const regexFallback = new RegExp(label + "\\s*\\n([^\\n]+)", "i");
        match = text.match(regexFallback);
    }
    
    return match ? match[1].trim() : "";
}

function ambilData() {
    const text = document.getElementById("raw").value;

    if (text.trim() == "") {
        alert("Paste isi tiket terlebih dahulu!");
        return;
    }

    // Ambil No Tiket dari baris pertama
    const lines = text.split("\n").filter(x => x.trim() !== "");
    document.getElementById("notiket").value = lines[0] ? lines[0].replace(/[^A-Z0-9-]/gi, '').trim() : "";

    // No Insiden
    const insiden = (text.match(/INSIDEN NO\.?\s*[:=-]?\s*(.+)/i) || text.match(/INSIDEN NO\.?\s*\n(.+)/i) || ["", ""])[1];
    document.getElementById("insiden").value = insiden.trim();

    // Nama
    document.getElementById("nama").value = getData("Nama", text);

    // SID (Mencari variasi "Service ID" atau "SID")
    let sidData = getData("Service Id", text);
    if (!sidData) {
        sidData = getData("SID", text); // Alternatif jika di tiket tertulis singkatan "SID"
    }
    document.getElementById("sid").value = sidData;

    // Layanan
    const layanan = getData("Layanan Produk", text) || getData("Layanan", text);
    const mbps = (layanan.match(/(\d+)/) || ["", ""])[1];
    document.getElementById("layanan").value = mbps;

    // Alamat
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
