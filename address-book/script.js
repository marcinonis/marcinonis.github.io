var ContactsApp = (function() {

    // Private
    
    // JSON for new contacts
    var _contactData = [];
    
    var _loadData = function(){
        $.ajax({
            url: "http://localhost:3000/contacts",
            method: "GET",
        }).done(function(data){
            _contactData = data;
            renderTable(_contactData);
            console.log('Duomenys gauti');
        }).fail(function(exception){
            console.log('Klaida gaunant duomenis:', exception);
        });
    }

    var _sortAsc = function() {
        var dataByName = _.sortBy(_contactData, "name");
        renderTable(dataByName);
        $(".sort-by-name-btn").attr({class: 'sort-by-name-btn glyphicon glyphicon-sort-by-attributes'});
    }

    var _sortDesc = function() {
        var dataByNameDesc = _.sortBy(_contactData, "name").reverse();
        renderTable(dataByNameDesc);
        $(".sort-by-name-btn").attr({class: 'sort-by-name-btn glyphicon glyphicon-sort-by-attributes-alt'});
    }

    var _add = function(person) {
        // Save person if at least one field was entered
        var formHasValues = checkIfNotEmptyValues(person);

        if (formHasValues) {
            // Save to DB
            $.ajax({
                url: "http://localhost:3000/contacts",
                data: person,
                method: "POST"
            }).done(function(a){
                console.log('Duomenys išsaugoti');
            }).fail(function(exception){
                console.log('Klaida saugant duomenis:', exception);
            });

            // View
            _contactData.push(person);
            renderTable(_contactData);
        }
    }

    // Select elements
    var $nameInput = $("input[name=name]");
    var $surnameInput = $("input[name=surname]");
    var $phoneInput = $("input[name=phone]");
    var $emailInput = $("input[name=email]");
    var $addressInput = $("textarea[name=address]");
    var $saveButton = $('.btn-save-contact');
    var $form = $("#newContact form");
    var $noContactsMessage = $(".no-contacts");
    var $table = $(".table-contacts");


    // Contact constructor
    function Contact(name, surname, phone, email, address) {
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.email = email;
        this.address = address;
    }

    // Save contact action
    function saveContact() {
        // Nuskaitom reiksmes is formos
        var person = new Contact($nameInput.val(), $surnameInput.val(), $phoneInput.val(), $emailInput.val(), $addressInput.val());

        // Add person
        _add(person);

        // Hide form, disable save button
        setFormToSubmitted(true);
    }

    // Show/hide form submit message
    function setFormToSubmitted(isSubmitted) {
        if (isSubmitted) {
            $form.addClass("is-submitted");
            $saveButton.attr('disabled', 'disabled');
        } else {
            $saveButton.removeAttr('disabled');
            $form.removeClass("is-submitted");
            $("input, textarea").val(""); // Clear input text
        }
    }

    function checkIfNotEmptyValues(person) { // Priima objekta
        for (key in person) {
            if (person[key] && key !== "id") {
                return true;
            }
        }
        
        return false;
    }

    // Display results in table
    function renderTable(data) {
        var html = [];
        var rowHtml = "";

        if (data.length === 0) {
            $noContactsMessage.show();
            $table.hide();
            return;
        }

        for (contact in data) {
            rowHtml = [
                "<tr data-row-id='" + data[contact].id + "'>",
                "    <td>" + data[contact].name + " " + data[contact].surname + "</td>",
                "    <td>" + data[contact].phone + "</td>",
                "    <td>" + data[contact].email + "</td>",
                "    <td>" + data[contact].address + "</td>",
                "    <td><span class='glyphicon glyphicon-trash remove-contact-row' aria-hidden='true'></span></td>",
                "</tr>"
            ].join("/n");

            html.push(rowHtml);
        }

        $noContactsMessage.hide();

        $table
            .find("tbody")
            .html(html.join("/n"));

        $table.show();
    }


    // When save button is clicked
    $saveButton.on("click", saveContact);

    // When modal is shown
    $('#newContact').on('hidden.bs.modal', function() {
        // Reset form
        setFormToSubmitted(false);
    });


    var ascFlag; // BOOLEAN: if true - ASC, if false - DESC, undefined - nesurikiuotas

    // When sort by name is clicked
    $(".sort-by-name-btn").on("click", function() {
        if (!ascFlag || ascFlag === undefined) {
            _sortAsc();
        } else {
            _sortDesc();
        }
        ascFlag = !ascFlag; // !undefined
    });


    //removing data from table  ------------------------------------------------????????--------------------------------------------------------------

    var _remove = function() {
        $(".remove-contact-row").ajax({
            method: 'DELETE',
            url: "http://localhost:3000/contacts/ID",
        }) 

    }     

     var _sortAsc = function() {
        var dataByName = _.sortBy(_contactData, "name");
        renderTable(dataByName);
        $(".sort-by-name-btn").attr({class: 'sort-by-name-btn glyphicon glyphicon-sort-by-attributes'});
    }   

    // iki cia mano briedas ----------------------------------------------------????????????????---------------------------------------------------------------



    // When delete row button is clicked
    $(".remove-contact-row").on("click", function() {
        var $row = $(this).parents('tr');
        
        // Susirandam kontakto ID. Jis issaugotas tr elemento atribute data-row-id
        var id = $row.attr('data-row-id');

        // Ismetam elementa is duomenu
        _.remove(_contactData, function(n) {
            return n.id === id;
        });

        
        // Ismetam elementa is DOM
        $row
            .css({ color: 'red', opacity: 0.8 })
            .fadeOut(300, function(){
                $(this).remove();
            });
    });

    return {
        loadData: _loadData,
        sortAsc: _sortAsc,
        sortDesc: _sortDesc,
        add: _add,
        remove: _remove
    }

})();


ContactsApp.loadData();
