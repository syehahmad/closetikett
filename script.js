// Fungsi yang otomatis berjalan saat halaman dimuat
document.addEventListener("DOMContentLoaded", function() {
    muatTimCustom();
});

function muatTimCustom() {
    const selectTim = document.getElementById("tim");
    // Mengambil data tim yang tersimpan di LocalStorage
    const timTersimpan = JSON.parse(localStorage.getItem("timCustom")) || [];
    
    // Memasukkan kembali tim yang tersimpan ke dalam dropdown
    timTersimpan.forEach(namaTim => {
        const option = document.createElement("option");
        option.value = namaTim;
        option.text = namaTim;
        selectTim.add(option);
    });
}

function tambahTimCustom() {
    const namaTim = prompt("Masukkan nama tim baru:");
    if (namaTim && namaTim.trim() !== "") {
        const namaTimClean = namaTim.trim();
        const selectTim = document.getElementById("tim");
        
        // Cek apakah tim sudah ada di dropdown
        let sudahAda = false;
        for (let i = 0; i < selectTim.options.length; i++) {
            if (selectTim.options[i].value === namaTimClean) {
                sudahAda = true;
                break;
            }
        }

        if (sudahAda) {
            alert("Tim '" + namaTimClean + "' sudah ada di daftar!");
            selectTim.value = namaTimClean;
            return;
        }

        // Tambah ke dropdown
        const option = document.createElement("option");
        option.value = namaTimClean;
        option.text = namaTimClean;
        selectTim.add(option);
        selectTim.value = namaTimClean;

        // Simpan ke LocalStorage agar tidak hilang saat refresh
        const timTersimpan = JSON.parse(localStorage.getItem("timCustom")) || [];
        timTersimpan.push(namaTimClean);
        localStorage.setItem("timCustom", JSON.stringify(timTersimpan));

        alert("Tim '" + namaTimClean + "' berhasil ditambahkan dan disimpan!");
    }
}

function getData(label, text) {
    if (label.toLowerCase() === "service id" || label.toLowerCase() === "sid") {
        const regexGabungan = /(?:Servi[cs]e\s*Id|CRM\s*ID|SID)\s*\/[^:\n]*\n([^\n]+)/i;
        const matchGabungan = text.match(regexGabungan);
        if (matchGabungan && !matchGabungan[1].includes("/") && !/[a-z]/i.test(matchGabungan[1])) {
            return matchGabungan[1].trim();
        }
    }

    const regexSebaris = new RegExp(label + "\\s*[:=-]?\\s*([^\\s/\\n][^\\n]*)", "i");
    let match = text.match(regexSebaris);
    
    if (match && match[1].trim().startsWith("/")) {
        match = null;
    }

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

    const lines = text.split("\n").filter(x => x.trim() !== "");
    document.getElementById("notiket").value = lines[0] ? lines[0].replace(/[^A-Z0-9-]/gi, '').trim() : "";

    const insiden = (text.match(/INSIDEN NO\.?\s*[:=-]?\s*(.+)/i) || text.match(/INSIDEN NO\.?\s*\n(.+)/i) || ["", ""])[1];
    document.getElementById("insiden").value = insiden.trim();

    document.getElementById("nama").value = getData("Nama", text);

    let sidData = getData("Service Id", text); 
    if (!sidData) sidData = getData("Servise Id", text); 
    if (!sidData) sidData = getData("CRM Id", text);
    if (!sidData) sidData = getData("CRM", text);
    if (!sidData) sidData = getData("SID", text);
    
    document.getElementById("sid").value = sidData;

    const layanan = getData("Layanan Produk", text) || getData("Layanan", text);
    const mbps = (layanan.match(/(\d+)/) || ["", ""])[1];
    document.getElementById("layanan").value = mbps;

    document.getElementById("alamat").value = getData("Alamat", text);
    document.getElementById("tikoruser").value = "";
}

function generate() {
    const timTerpilih = document.getElementById("tim").value;
    const notiket = document.getElementById("notiket").value;
    const insiden = document.getElementById("insiden").value;
    const rootcause = document.getElementById("rootcause").value;
    const action = document.getElementById("action").value;

    if (timTerpilih === "") {
        alert("Wajib memilih Tim terlebih dahulu sebelum melakukan generate format close!");
        document.getElementById("tim").focus();
        return;
    }

    if (rootcause.trim() === "") {
        alert("Kolom Rootcause wajib diisi!");
        document.getElementById("rootcause").focus();
        return;
    }

    if (action.trim() === "") {
        alert("Kolom Action wajib diisi!");
        document.getElementById("action").focus();
        return;
    }

    if (notiket.trim() == "" && insiden.trim() == "") {
        alert("Data tiket masih kosong. Silakan generate atau isi data terlebih dahulu.");
        return;
    }

    const hasil =
`FORMAT TIKET CLOSE
====================================
No Tiket : ${notiket}
No Insiden : ${insiden}
Tim : ${timTerpilih}
Nama : ${document.getElementById("nama").value}
SID : ${document.getElementById("sid").value}
Layanan : ${document.getElementById("layanan").value} Mbps
Rootcause : ${rootcause}
Action : ${action}

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
    document.querySelectorAll("select").forEach(e => e.selectedIndex = 0);
    document.querySelectorAll("textarea").forEach(e => e.value = "");
}
