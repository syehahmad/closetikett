function generate(){

const hasil=`FORMAT TIKET CLOSE
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
Slevee Protektor : ${sleeve.value}
Pigtail : ${pigtail.value}
====================================
TIKOR USER : ${tikoruser.value}
TIKOR TITIK PUTUS : ${tikorputus.value}`;

document.getElementById("hasil").value=hasil;
}

function copyText(){
const hasil=document.getElementById("hasil");
navigator.clipboard.writeText(hasil.value);
alert("Berhasil disalin");
}