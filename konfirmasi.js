document.addEventListener("DOMContentLoaded", function() {
    buatPesan();
});

/* Mendapatkan salam otomatis berdasarkan jam saat ini */
function getSalamOtomatis() {
    const jam = new Date().getHours();
    if (jam >= 3 && jam < 11) return "Pagi";
    if (jam >= 11 && jam < 15) return "Siang";
    if (jam >= 15 && jam < 18) return "Sore";
    return "Malam";
}

/* Mengambil data dari teks mentah tiket */
function ambilData() {
    const text = document.getElementById("raw").value;

    if (text.trim() === "") {
        alert("Paste isi tiket terlebih dahulu!");
        return;
    }

    const lines = text.split("\n").filter(x => x.trim() !== "");
    let noTiket = lines[0] ? lines[0].replace(/[^A-Z0-9-]/gi, '').trim() : "";
    
    /* Penarikan Nomor Insiden presisi untuk format INSIDEN NO. 26081302269 */
    const insidenMatch = text.match(/INSIDEN NO\.?\s*[:=-]?\s*([^\n]+)/i);
    if (insidenMatch) {
        noTiket = insidenMatch[1].trim();
    }

    /* Ambil Nama Pelanggan */
    const namaMatch = text.match(/Nama\s*[:=-]?\s*([^\n]+)/i);
    const nama = namaMatch ? namaMatch[1].trim() : "";

    /* Ambil No HP jika ada */
    const hpMatch = text.match(/(?:No\s*HP|Telepon|HP|Telp)\s*[:=-]?\s*([0-9+]+)/i);
    if (hpMatch) {
        document.getElementById("nohp").value = hpMatch[1].trim();
    }

    document.getElementById("notiket").value = noTiket;
    document.getElementById("nama").value = nama;

    buatPesan();
}

/* Membentuk template pesan konfirmasi */
function buatPesan() {
    const namaInput = document.getElementById("nama").value.trim();
    const tiketInput = document.getElementById("notiket").value.trim();
    const pilihanSalam = document.getElementById("waktuSalam").value;

    const salam = (pilihanSalam === "Otomatis") ? getSalamOtomatis() : pilihanSalam;
    const nama = namaInput || "(NAMA)";
    const idTiket = tiketInput || "(ID TIKET)";

    const template = 
`Selamat ${salam}
Perkenalkan Kami dari Tim Maintenance Iconnet Area kendal, Mau konfirmasi terkait laporan gangguan yang di alami, atas nama Bapak/Ibu ${nama} dengan nomer aduan (${idTiket})

mohon maaf atas kendala yang di alami bapak/ibu sehingga layanan internet di rumah mengalami gangguan, saat ini tiket aduan sudah masuk dan akan di kerjakan sesegera mungkin ya bapak/ibu.

mohon maaf sekali lagi apabila harus menunggu.

salam
Tim CM Iconnet`;

    document.getElementById("hasilWA").value = template;
}

/* Salin teks pesan */
function copyWA() {
    const hasil = document.getElementById("hasilWA").value;
    navigator.clipboard.writeText(hasil);
    alert("Pesan WA berhasil disalin!");
}

/* Buka WhatsApp Web / App jika No HP diisi */
function bukaWA() {
    let nohp = document.getElementById("nohp").value.replace(/[^0-9]/g, '');
    const pesan = encodeURIComponent(document.getElementById("hasilWA").value);

    if (!nohp) {
        alert("Masukkan No HP terlebih dahulu untuk menggunakan fitur Kirim WA langsung!");
        document.getElementById("nohp").focus();
        return;
    }

    if (nohp.startsWith("0")) {
        nohp = "62" + nohp.slice(1);
    }

    window.open(`https://api.whatsapp.com/send?phone=${nohp}&text=${pesan}`, "_blank");
}

/* Reset form */
function resetForm() {
    document.querySelectorAll("input").forEach(e => e.value = "");
    document.querySelectorAll("textarea").forEach(e => e.value = "");
    document.getElementById("waktuSalam").selectedIndex = 0;
    buatPesan();
}
