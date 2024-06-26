$(document).ready(function () {
    var btn_recherche = $('#btn_recherche');

    btn_recherche.click(function (event) {
        event.preventDefault();
        let nom_film = $('#nom_recherche').val();
        window.location.href = "index_.php?page=rech_film.php&nom=" + nom_film;

    })

    $('#deco').click(function () {
        if (confirm("Voulez-vous vous déconnecter ?")) {
            window.location.href = "index_.php?page=logout.php";
            alert("Vous avez été déconnecté");
        }
    });

    $('#res_connexion').click(function () {
        window.location.reload();
    });


    //quand une balise contient des atttributs,
    //cette balise est un tableau
    $("td[id]").click(function () {
        //trim : supprimer les blancs avant et après
        let valeur1 = $.trim($(this).text());
        let id = $(this).attr('id');
        let name = $(this).attr('name');
        console.log(valeur1 + " id = " + id + " name = " + name);
        $(this).blur(function () {
            let valeur2 = $.trim($(this).text());
            if (valeur1 != valeur2) {
                let parametre = "id=" + id + "&name=" + name + "&valeur=" + valeur2;
                let retour = $.ajax({
                    type: 'get',
                    dataType: 'json',
                    data: parametre,
                    url: './src/php/ajax/ajaxUpdateClient.php',
                    success: function (data) {//data = retour du # php
                        console.log(data);
                    }
                })
            }
        })
    })


    $('#texte_bouton_submit').text("Ajouter ou mettre à jour");

    $('#reset').click(function () {
        $('#texte_bouton_submit').text("Ajouter ou mettre à jour");
    })

    $('#texte_bouton_submit').click(function (e) { //e = formulaire
        e.preventDefault(); //empêcher l'attribut action de form
        let email = $('#email').val();
        let nom = $('#nom').val();
        let prenom = $('#prenom').val();
        let adresse = $('#adresse').val();
        let password = $('#password').val();
        let param = 'email=' + email + '&nom=' + nom + '&prenom=' + prenom + '&adresse=' + adresse + '&password=' + password;
        let retour = $.ajax({
            type: 'get',
            dataType: 'json',
            data: param,
            url: './src/php/ajax/ajaxAjoutClient.php',
            success: function (data) {//data = retour du # php
                console.log(data);
                window.location.href = "index_.php?page=gestion_client.php";
            }

        })
    })

    $('#email').blur(function () {
        let email = $(this).val();
        console.log("email : " + email);
        let parametre = 'email=' + email;
        let retour = $.ajax({
            type: 'get',
            dataType: 'json',
            data: parametre,
            url: './src/php/ajax/ajaxRechercheClient.php',
            success: function (data) {//data = retour du # php
                console.log(data);

                $('#nom').val(data[0].nom);
                $('#prenom').val(data[0].prenom);
                $('#adresse').val(data[0].adresse);
                $('#password').val(data[0].password);
                $('#texte_bouton_submit').text("Mettre à jour");

                let nom2 = $('#nom').val();
                if (nom2 === '') {
                    $('#texte_bouton_submit').text("Ajouter");
                }
                $('#texte_bouton_submit').click(function () {
                    window.location.href = "index_.php?page=gestion_client.php";
                })


            }
        })
    })
    $(".delete_btn").click(function () {
        // Get the email from the same row as the clicked delete button
        let email = $(this).closest('tr').find('td[name="email"]').text();
        let param = 'email=' + email;
        console.log(param);
        let retour = $.ajax({
            type: 'get',
            dataType: 'json',
            data: param,
            url: './src/php/ajax/ajaxSuppressionClient.php',
            success: function (data) {
                console.log(data);
            }
        })
        location.reload();
    })

    $('#form_cli').submit(function (e) {
        e.preventDefault();
        let email = $('#mail').val();
        let nom = $('#nom').val();
        let prenom = $('#prenom').val();
        let adresse = $('#adresse').val();
        let password = $('#password').val();
        let param = 'email=' + email + '&nom=' + nom + '&prenom=' + prenom + '&adresse=' + adresse + '&password=' + password;
        $.ajax({
            type: 'get',
            dataType: 'json',
            data: param,
            url: './admin/src/php/ajax/ajaxAjoutClient.php',
            success: function (data) {
                console.log(data);
                alert("Client ajouté avec succès");
                $('#form_cli')[0].reset();
            }
        })
    });


})

























