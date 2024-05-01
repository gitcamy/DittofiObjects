$(function() {
    // Handle stopping propagation of click events inside the dropdown menu
    $('.dropdown-menu').on('click', function(e) {
        e.stopPropagation();
    });
    
    // Initialize the datepicker
    var selectedFromDate = null;
    var selectedToDate = null;

    $("#datepickerFrom").datepicker({
        defaultDate: "-1w",
        changeMonth: true,
        changeYear: true,
        yearRange: "1950:2030",
        numberOfMonths: 1,
        onClose: function(selectedDate) {
            $("#datepickerTo").datepicker("option", "minDate", selectedDate);
        }
    });


    $("#datepickerTo").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        changeYear: true,
        yearRange: "1950:2030",
        numberOfMonths: 1,
        onClose: function(selectedDate) {
            $("#datepickerFrom").datepicker("option", "minDate", selectedDate);
        }
    });
    
    //Changes calendar display to contents
    var datepickerElements = document.querySelectorAll('.ui-datepicker');
    datepickerElements.forEach(function(element) {
    element.style.display = 'contents';
    });

    // Initially hide the outer dropdown menu
    $('.dropdown-menu').hide();

    // Handle opening the dropdown and showing the datepicker
    $('.dropdown-toggle').on('click', function (e) {
        e.stopPropagation();
        $('.dropdown-menu').toggle();

        if ($('.dropdown-menu').is(':visible')) {
            $("#datepickerFrom").datepicker('show');
        } else {
            $("#datepickerFrom").datepicker('hide');
        }
    });

    // Close the dropdown menu if the user clicks outside of it
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.dropdown-menu').length) {
            $('.dropdown-menu').hide();
            $("#datepickerFrom").datepicker('hide');
        }
    });


    //Preset date range handling
    $('.selectable-date-range').on('click', function() {
        var today = new Date();
        var fromDate;
        var toDate = new Date(today);

        switch (this.id) {
            case 'select-today':
                fromDate = new Date(today);
            break;

            case 'select-yesterday':
                fromDate = new Date(today.setDate(today.getDate() - 1));
                toDate = fromDate;
                break;

            case 'select-last-7':
                fromDate = new Date(today.setDate(today.getDate() - 7));
                break;

            case 'select-last-14':
                fromDate = new Date(today.setDate(today.getDate() - 14));
                break;

            case 'select-last-30':
                fromDate = new Date(today.setDate(today.getDate() - 30));
                break;

            case 'select-last-90':
                fromDate = new Date(today.setDate(today.getDate() - 90));
                break;
            
            case 'select-this-month':
                fromDate = new Date(today.getFullYear(), today.getMonth(), 1);
                break;
            
            case 'select-last-month':
                fromDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                toDate = new Date(today.getFullYear(), today.getMonth(), 0);
                break;

            case 'select-this-year':
                fromDate = new Date(today.getFullYear(), 0, 1);
                break;

            case 'select-last-year':
                fromDate = new Date(today.getFullYear(), -1, 1);
                toDate = new Date(today.getFullYear(), 0);
                break;

        };

        // Set the date in datepickers
        $('#datepickerFrom').datepicker('setDate', fromDate);
        $('#datepickerTo').datepicker('setDate', toDate);

        // Update the dropdown button text
        $(".dropdown-toggle span").text(`(${fromDate.toLocaleDateString()} - ${toDate.toLocaleDateString()})`);

    }); 
       
    //highlight days within date range
    function highlightDays(date) {
        var fromDate = $("#datepickerFrom").datepicker("getDate");
        var toDate = $("#datepickerTo").datepicker("getDate");
        if (fromDate && toDate && date >= fromDate && date <= toDate) {
             return [true, 'highlight', '']; // highlight is a class name
         }
        return [true, '', ''];
    };

    $("#datepickerFrom, #datepickerTo").datepicker("option", "beforeShowDay", highlightDays); 

    // Button click handler to save the date range
    $('#saveDateRange').on('click', function() {
        var fromDate = $("#datepickerFrom").datepicker("getDate");
        var toDate = $("#datepickerTo").datepicker("getDate");
            
        if(fromDate && toDate) {
            $(".dropdown-toggle span").text(`(${fromDate.toLocaleDateString()}) - (${toDate.toLocaleDateString()})`);
        } else {
            $(".dropdown-toggle span").text("Select Date Range");
        };

        $('.dropdown-menu').hide();
    });


});