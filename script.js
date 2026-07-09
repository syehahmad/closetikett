// Fungsi regex pintar yang kebal format sebaris, beda baris, dan gabungan garis miring
function getData(label, text) {
    // 1. Cek dulu apakah labelnya berupa model gabungan (contoh: Service Id / CRM ID)
    if (label.toLowerCase() === "service id" || label.toLowerCase() === "sid") {
        const regexGabungan = /(?:Servi[cs]e\s*Id|CRM\s*ID|SID)\s*\/[^:\n]*\n([^\n]+)/i;
        const matchGabungan = text.match(regexGabungan);
        if (matchGabungan && !matchGabungan[1].includes("/") && !/[a-z]/i.test(matchGabungan[1])) {
            return matchGabungan[1].trim();
        }
    }

    // 2. Format standar: Teks ada di baris yang sama (contoh: Service Id : 12345)
    const regexSebaris = new RegExp(label + "\\s*[:=-]?\\s*([^\\s/\\n][^\\n]*)", "i");
    let match = text.match(regexSebaris);
    
    if (match && match[1].trim().startsWith("/")) {
        match = null;
    }

    // 3. Format Fallback: Teks ada di baris bawahnya
    if (!match) {
        const regexBawah = new RegExp(label + "\\s*\\n([^\\n]+)", "i");
        match = text.match(regexBawah);
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

    // PENCARIAN SID BERLAPIS & PINTAR
    let sidData = getData("Service Id", text); 
    if (!sidData) sidData = getData("Servise Id", text); 
    if (!sidData) sidData = getData("CRM Id", text);
    if (!sidData) sidData = getData("CRM", text);
    if (!sidData) sidData = getData("SID", text);
    
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

    // PERBAIKAN: Menghapus tanda titik koma (;) yang salah pada getElementById("action")
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
