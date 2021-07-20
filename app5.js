const database = firebase.database(); // conectez la data de baze
const rootRef = database.ref("users"); // creez nodul users
const main = database.ref("main");



window.onload = function citireDatabase() {

    var nrUseri = 1;


    rootRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            // var childKey = childSnapshot.key;
            var childData = childSnapshot.val();




            //Si il pun in continuare li-urilior

            if (childData.main.Divizia.toUpperCase() == "E") {
                var li = document.createElement("LI");
                li.classList.add("hover-me");
                li.innerHTML = `<a href="#" class="esAngajat">Angajat ${nrUseri}</a> 
      <div class="date-angajati"> 
        <ul>
          <div class="container-date"> 
            <div class="pozaAngajat"> 
              <li><img src="${childData.main.Poza}" alt=""></li>
            </div>
          </div>
          <li>PUK: <span id="puk">${childData.main.PUK}</span></li>
          <li>Nume: <span id="nume">${childData.main.Nume}</span></li>
          <li>Prenume: <span id="prenume">${childData.main.Prenume}</span></li>
          <li>CNP: <span id="cnp">${childData.main.CNP}</span></li>
          <li>Numar legitimatie: <span id="nrlegitimatie">${childData.main.Numar_legitimatie}</span></li>
          <li>Numar masina: <span id="nrmasina">${childData.main.Numar_masina}</span></li>
          <li>Divizia: <span id="divizia">${childData.main.Divizia}</span></li>
          <li>Acces: <span id="acces">${childData.main.Acces}</span></li>
          <li>Interval ore acces: <span id="interval">${childData.main.Interval_Orar1}-${childData.main.Interval_Orar2}</span></li>
          <li>Grad: <span id="grad">${childData.main.Grad}</span></li>
          <li>Data de inregistrare: <span id="data">${childData.main.Data}</span></li>
          <li>Marca admin: <span id="marcaAdmin">${childData.main.Marca_Admin}</span></li>
        </ul>
      </div>`;

                document.getElementById("ul-divizie-E").appendChild(li);
                nrUseri++;
            }



        });
    });
}