var btnAdaugare = document.getElementById("btnAdugare"); // buton pt afisarea formului
var btnAdaugareAngajat = document.getElementById("btnAdaugareAngajat"); // butonul din form
var btnStergere = document.getElementById("btnStergere");
var btnEditare = document.getElementById("btnEditare");
var btnEditareAngajat = document.getElementById("modificaAngajat");


const database = firebase.database(); // conectez la data de baze
const rootRef = database.ref("users"); // creez nodul users
const main = database.ref("main");
const divizieArray = [];
var files = [];
var ImgUrl;

// TODO
// Trebuie sa salvam poza 




// Afisaza formul de adaugare
btnAdaugare.addEventListener("click", () => {
    document.getElementById("adaugareAngajat").style.display = "block";
})


// document.getElementById("output").style.display="block";
//Incarcare poza
document.getElementById("file").onchange = e => {

    files = e.target.files;
    var reader = new FileReader();
    reader.onload = function() {
        document.getElementById("output").src = reader.result;
    }
    reader.readAsDataURL(files[0]);

}




btnAdaugareAngajat.addEventListener("click", (e) => {
        e.preventDefault();

        //declar variabilele din form

        poza = document.getElementById("output").src;
        pukForm = document.getElementById("pukForm").value;
        numeForm = document.getElementById("numeForm").value;
        prenumeForm = document.getElementById("prenumeForm").value;
        cnpForm = document.getElementById("cnpForm").value;
        nrlegitimatieForm = document.getElementById("nrlegitimatieForm").value;
        nrmasinaForm = document.getElementById("nrmasinaForm").value;
        diviziaForm = document.getElementById("diviziaForm").value;
        accesForm = document.getElementById("accesForm").value;
        ora1Form = document.getElementById("ora1Form").value;
        ora2Form = document.getElementById("ora2Form").value;
        gradForm = document.getElementById("gradForm").value;
        dataForm = document.getElementById("dataForm").value;
        marcaAdminForm = document.getElementById("marcaAdminForm").value;


        //Conditie ca sa fie introduse toate datele
        if (poza == "" || pukForm == "" || numeForm == "" || prenumeForm == "" || cnpForm == "" || nrlegitimatieForm == "" || nrmasinaForm == "" || diviziaForm == "" || accesForm == "" || ora1Form == "" || ora2Form == "" || gradForm == "" || dataForm == "" || marcaAdminForm == "") {
            alert("Trebuie introduse toate datele!")

        } else {

            //Creez un element Li 
            var li = document.createElement("LI");
            li.classList.add("hover-me");
            li.innerHTML = `<a href="#" class="esAngajat">Angajat </a> 
  <div class="date-angajati"> 
    <ul>
      <div class="container-date"> 
        <div class="pozaAngajat"> 
          <li><img src=${poza} alt=""></li>
        </div>
      </div>
      <li>PUK: <span id="puk">${pukForm}</span></li>
      <li>Nume: <span id="nume">${numeForm}</span></li>
      <li>Prenume: <span id="prenume">${prenumeForm}</span></li>
      <li>CNP: <span id="cnp">${cnpForm}</span></li>
      <li>Numar legitimatie: <span id="nrlegitimatie">${nrlegitimatieForm}</span></li>
      <li>Numar masina: <span id="nrmasina">${nrmasinaForm}</span></li>
      <li>Divizia: <span id="divizia">${diviziaForm}</span></li>
      <li>Acces: <span id="acces">${accesForm}</span></li>
      <li>Interval ore acces: <span id="interval">${ora1Form}-${ora2Form}</span></li>
      <li>Grad: <span id="grad">${gradForm}</span></li>
      <li>Data de inregistrare: <span id="data">${dataForm}</span></li>
      <li>Marca admin: <span id="marcaAdmin">${marcaAdminForm}</span></li>
    </ul>
  </div>`;


            if (diviziaForm.toUpperCase() == "A") {
                document.getElementById("ul-divizie-A").appendChild(li);
            } else if (diviziaForm.toUpperCase() == "B") {
                document.getElementById("ul-divizie-B").appendChild(li);
            } else if (diviziaForm.toUpperCase() == "C") {
                document.getElementById("ul-divizie-C").appendChild(li);
            } else if (diviziaForm.toUpperCase() == "D") {
                document.getElementById("ul-divizie-D").appendChild(li);
            } else if (diviziaForm.toUpperCase() == "E") {
                document.getElementById("ul-divizie-E").appendChild(li);
            }




            salvareImagine();
            // Salvare Imagine
            function salvareImagine() {
                // console.log("salvare imagine")
                var uploadTask = firebase.storage().ref("Images/" + numeForm + ".png").put(files[0]);

                uploadTask.on("state_changed", function() {
                    uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
                        ImgUrl = url;

                    });
                });
            }




            //Scriu in data de baze



            setTimeout(function() { salvaraBazaDeDate(); }, 3000);
            //Tabela users
            function salvaraBazaDeDate() {
                // console.log("Salvare data de baze")
                rootRef.child(pukForm + '/main/').set({
                    PUK: pukForm,
                    Nume: numeForm,
                    Prenume: prenumeForm,
                    CNP: cnpForm,
                    Poza: ImgUrl, //aici imi dadea eroare
                    Divizia: diviziaForm,
                    Numar_legitimatie: nrlegitimatieForm,
                    Interval_Orar1: ora1Form,
                    Interval_Orar2: ora2Form,
                    Acces: accesForm,
                    Numar_masina: nrmasinaForm,
                    Grad: gradForm,
                    Data: dataForm,
                    Marca_Admin: marcaAdminForm
                });

                //Tabela pontaj

                rootRef.child(pukForm + '/pontaj/').set({

                    Data: "10.10.2021",
                    Ora_intrare: "10:00",
                    Ora_iesire: "18:00"

                });
            }





            //ascund formul
            document.getElementById("adaugareAngajat").style.display = "none";
            document.getElementById("adaugareAngajat").reset();


        }
    })
    // aici se gata adaugarea






//Afisez angajati din Firebase in form
//la incarcarea paginii
window.onload = function citireDatabase() {

    var nrUseriA = 1;
    var nrUseriB = 1;
    var nrUseriC = 1;
    var nrUseriD = 1;
    var nrUseriE = 1;

    rootRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            // var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            // console.log(childData.main.Poza);
            // console.log(blobToImage(childData.main.Poza));




            //Si il pun in continuare li-urilior

            if (childData.main.Divizia.toUpperCase() == "A") {
                var li = document.createElement("LI");
                li.classList.add("hover-me");
                li.innerHTML = `<a href="#" class="esAngajat">Angajat ${nrUseriA}</a> 
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

                document.getElementById("ul-divizie-A").appendChild(li);
                nrUseriA++;
            } else if (childData.main.Divizia.toUpperCase() == "B") {
                var li = document.createElement("LI");
                li.classList.add("hover-me");
                li.innerHTML = `<a href="#" class="esAngajat">Angajat ${nrUseriB}</a> 
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

                document.getElementById("ul-divizie-B").appendChild(li);
                nrUseriB++;
            } else if (childData.main.Divizia.toUpperCase() == "C") {
                var li = document.createElement("LI");
                li.classList.add("hover-me");
                li.innerHTML = `<a href="#" class="esAngajat">Angajat ${nrUseriC}</a> 
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

                document.getElementById("ul-divizie-C").appendChild(li);
                nrUseriC++;
            } else if (childData.main.Divizia.toUpperCase() == "D") {
                var li = document.createElement("LI");
                li.classList.add("hover-me");
                li.innerHTML = `<a href="#" class="esAngajat">Angajat ${nrUseriD}</a> 
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

                document.getElementById("ul-divizie-D").appendChild(li);
                nrUseriD++;
            } else if (childData.main.Divizia.toUpperCase() == "E") {
                var li = document.createElement("LI");
                li.classList.add("hover-me");
                li.innerHTML = `<a href="#" class="esAngajat">Angajat ${nrUseriE}</a> 
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
                nrUseriE++;
            }


        });
    });
}


// Steregere Angajat
document.querySelector(".cautarePuk").style.display = "none"



btnStergere.addEventListener("click", () => {

    document.querySelector(".cautarePuk").style.display = "block"

    document.getElementById("btncautarePuk").textContent = "Sterge"
    document.getElementById("btncautarePuk").addEventListener("click", () => {


        var pukCautat = document.getElementById("pukCautat").value;

        document.querySelector(".cautarePuk").style.display = "none"


        rootRef.child(pukCautat).remove()
            .then(() => {
                window.alert("Angajatul a fost sters");
            })
            .catch(error => {
                console.log(error);
            });



    })

})



//Editez angajatul

btnEditare.addEventListener("click", () => {
    document.querySelector(".cautarePuk").style.display = "block"

    document.getElementById("btncautarePuk").addEventListener("click", () => {

        var pukCautat = document.getElementById("pukCautat").value;

        document.querySelector(".cautarePuk").style.display = "none"
        document.getElementById("editareAngajat").style.display = "block";



        //Cites din baza de date si le pun in form
        rootRef.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                // var childKey = childSnapshot.key;
                var childData = childSnapshot.val();

                if (pukCautat == childData.main.PUK) {

                    document.getElementById("pukFormM").value = childData.main.PUK;
                    document.getElementById("numeFormM").value = childData.main.Nume;
                    document.getElementById("prenumeFormM").value = childData.main.Prenume;
                    document.getElementById("cnpFormM").value = childData.main.CNP
                    document.getElementById("nrlegitimatieFormM").value = childData.main.Numar_legitimatie;
                    document.getElementById("nrmasinaFormM").value = childData.main.Numar_masina;
                    document.getElementById("diviziaFormM").value = childData.main.Divizia;
                    document.getElementById("accesFormM").value = childData.main.Acces;
                    document.getElementById("ora1FormM").value = childData.main.Interval_Orar1;
                    document.getElementById("ora2FormM").value = childData.main.Interval_Orar2;
                    document.getElementById("gradFormM").value = childData.main.Grad;
                    document.getElementById("marcaAdminFormM").value = childData.main.Marca_Admin;
                    document.getElementById("dataFormM").value = childData.main.Data;

                }
            });

        })


        document.getElementById("modificaAngajat").addEventListener("click", () => {

            var pukForm = document.getElementById("pukFormM").value;
            var numeForm = document.getElementById("numeFormM").value;
            var prenumeForm = document.getElementById("prenumeFormM").value;
            var cnpForm = document.getElementById("cnpFormM").value;
            var nrlegitimatieForm = document.getElementById("nrlegitimatieFormM").value;
            var nrmasinaForm = document.getElementById("nrmasinaFormM").value;
            var diviziaForm = document.getElementById("diviziaFormM").value;
            var accesForm = document.getElementById("accesFormM").value;
            var ora1Form = document.getElementById("ora1FormM").value;
            var ora2Form = document.getElementById("ora2FormM").value;
            var gradForm = document.getElementById("gradFormM").value;
            var dataForm = document.getElementById("dataFormM").value;
            var marcaAdminForm = document.getElementById("marcaAdminFormM").value;


            rootRef.child(pukCautat + '/main/').update({
                PUK: pukForm,
                Nume: numeForm,
                Prenume: prenumeForm,
                CNP: cnpForm,
                Divizia: diviziaForm,
                Numar_legitimatie: nrlegitimatieForm,
                Interval_Orar1: ora1Form,
                Interval_Orar2: ora2Form,
                Acces: accesForm,
                Numar_masina: nrmasinaForm,
                Grad: gradForm,
                Data: dataForm,
                Marca_Admin: marcaAdminForm
            });
        })


    })
})