function getData(label, text) {
    const regex = new RegExp(label + "\\s*\\n([^\\n]+)", "i");
    const hasil = text.match(regex);
    return hasil ? hasil[1].trim() : "";
}

function generate() {

    const text = document.getElementById("raw").value;

    const tiket = (text.match(/INSIDEN NO\\.?\\s*(\\d+)/i) || ["",""])[1];
    const nama = getData("Nama", text);
    const sid = getData("Service Id", text);
    const layanan = getData("Layanan Produk", text);
    const alamat = getData("Alamat", text);

    let mbps = "";
    const m = layanan.match(/(\d+)/);
    if (m) mbps = m[1];

    document.getElementById("hasil").value =
`FORMAT TIKET CLOSE
====================================
Tiket/Insiden : ${tiket}
Tim : KENDAL
Nama : ${nama}
SID : ${sid}
Layanan : ${mbps} Mbps
Rootcause :
Action :

Material Terpakai
-------------------
SN Kabel :
SN ONT :
Pathcord APC :
Pathcord UPC :
Slevee Protektor :
Pigtail :
====================================
TIKOR USER : ${alamat}
TIKOR TITIK PUTUS :`;
}

function copyText() {

    const hasil = document.getElementById("hasil");

    navigator.clipboard.writeText(hasil.value);

    alert("Berhasil disalin");

}