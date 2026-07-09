function generate(){

    let hasil =
`====================================
FORMAT TIKET CLOSE
====================================
Tiket/Insiden : ${tiket.value}
Tim : ${tim.value}
Nama : ${nama.value}
SID : ${sid.value}
Alamat : ${alamat.value}
Penyebab : ${penyebab.value}
Action : ${action.value}
====================================`;

    document.getElementById("hasil").value = hasil;
}

function copyText(){
    let text = document.getElementById("hasil");
    text.select();
    document.execCommand("copy");
    alert("Teks berhasil disalin!");
}