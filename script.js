function generate() {
    const tiket = document.getElementById("tiket").value;
    const nama = document.getElementById("nama").value;
    const sid = document.getElementById("sid").value;
    const layanan = document.getElementById("layanan").value;
    const rootcause = document.getElementById("rootcause").value;
    const action = document.getElementById("action").value;
    const snkabel = document.getElementById("snkabel").value;
    const snont = document.getElementById("snont").value;
    const apc = document.getElementById("apc").value;
    const upc = document.getElementById("upc").value;
    const sleeve = document.getElementById("sleeve").value;
    const pigtail = document.getElementById("pigtail").value;
    const tikoruser = document.getElementById("tikoruser").value;
    const tikorputus = document.getElementById("tikorputus").value;

    document.getElementById("hasil").value =
`FORMAT TIKET CLOSE
====================================
Tiket/Insiden : ${tiket}
Tim : KENDAL
Nama : ${nama}
SID : ${sid}
Layanan : ${layanan} Mbps
Rootcause : ${rootcause}
Action : ${action}

Material Terpakai
-------------------
SN Kabel : ${snkabel}
SN ONT : ${snont}
Pathcord APC : ${apc}
Pathcord UPC : ${upc}
Slevee Protektor : ${sleeve}
Pigtail : ${pigtail}
====================================
TIKOR USER : ${tikoruser}
TIKOR TITIK PUTUS : ${tikorputus}`;
}