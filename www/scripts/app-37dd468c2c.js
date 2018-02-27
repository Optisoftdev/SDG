var User ={username:"",user_id:"",email:"",first_name:"",last_name:"",country:"",state:"",city:"",profession:"",pro_image:"",gcm_id:""};
var url = "http://www.wofan-sdg-hydro-agro.org",logg = $("#logg");

var Facts ={
    dd :new Date().getDate(),
    mm : new Date().getMonth()+1,
    yyyy : new Date().getFullYear(),
    url:"http://www.wofan-sdg-hydro-agro.org/facts/process.php",
    logg : $("#logg"),
    storage:window.localStorage,
    request: function(dataString, cb){
        var self = this;

        self.logg.css({"display": "block"});
        $.ajax({
            type: "POST",
            url: self.url,
            data: dataString,
            async: true,
            success: function (data) {
                logg.css({"display": "none"});

                cb(data);
            },
            error: function (err,textStatus, errorThrown) {
                logg.css({"display": "none"});
                if($.trim(errorThrown) === ""){
                   //    alert("Please, Check your network connection."+errorThrown); 
                }
                else
                alert(errorThrown);
            }
        });

    },
    login:function (){

        var self = this,username = $("#usern").val(), password = $("#pass").val();
        $("#pass").val("");
        //alert("action=login&email=" + username + "&password=" + password);
            Facts.request("action=login&email=" + username + "&password=" + password,
                function(data){
console.log(data);

                    if(data.user_id){
                        alert('Login successful. Welcome '+data.first_name);
                        //var value = storage.getItem(key); // Pass a key name to get its value.
                        Facts.storage.setItem("user", JSON.stringify(data)); // Pass a key name and its value to add or update that key.
                        // storage.removeItem(key) // Pass a key name to remove that key from storage.
                        //window.location.href = "./pages/profile.html";
                            window.location.href = "./main.html";
                    }
                    else if (!data.success) {
                        alert('Invalid Login Parameters.');
                    }
                });

    },
    register:function (){

        var user ={"username":$("#uname").val(),
            "password": $("#psword").val(),"profession":$("#prof").val(),"speciality":$("#subprof").val(),"first":$("#first").val(),"last":$("#last").val(),"address":$("#address").val(),
            "country":$("#country").val(),"state":$("#state").val(),"city":$("#city").val(),"email":$("#email").val(),"cpasword":$("#cpsword").val(),"today": Facts.mm+'/'+Facts.dd+'/'+Facts.yyyy};
        var dataString = "action=signup&email=" + user.email + "&password="
            + user.password+"&username="+user.username+"&profession="+user.profession+"/"+user.speciality+"&first_name="+user.first
            +"&last_name="+user.last+"&address="+user.address+"&country="+user.country+"&state="+user.state
            +"&city="+user.city+"&today="+user.today;
        Facts.request(dataString,function(data){
            console.log(data);
            if($.trim(data.result)==="successfully") {

                alert('Success, Please Login.');
                $("#uname").removeAttr('value');
                $("#psword").removeAttr('value');
                $("#prof").removeAttr('value');
                $("#first").removeAttr('value');
                $("#last").removeAttr('value');
                $("#address").removeAttr('value');
                $("#country").removeAttr('value');
                $("#state").removeAttr('value');
                $("#city").removeAttr('value');
                $("#email").removeAttr('value');
                $("#cpsword").removeAttr('value');
                setTimeout(function () {
                    window.location.href = './index.html';
                }, 4000);
            }else{

                alert('Unable to register, '+data.result);
            }
        });


    },
    submitHydro:function(e){
        //show loader
        $("#diahydro").attr("disabled", "disabled");
         
        $("#sbt").css({"display":'block'});
      var water={
        "site":$("#site").val(),
        "water_source":$("#water_source").val(),
        "power_source":$("#power_source").val(),
        "latrines":$("#latrines").val(),
        "urinals":$("#urinals").val(),
        "repair_tools":$("#repair_tools").val(),
        "water_slabs":$("#water_slabs").val(),
        "slab_walls":$("#slab_walls").val(),
        "signage":$("#signage").val(),
        "lga":$("#lga").val(),
        "ehc":$("#ehc").val(),
        "ehc_males":$("#ehc_males").val(),
        "ehc_females":$("#ehc_females").val(),
        "garden":$("#garden").val(),
        "wescom":$("#wescom").val(),
        "wescom_males":$("#wescom_males").val(),
        "wescom_females":$("#wescom_females").val(),
        "pta":$("#pta").val(),
        "pta_males":$("#pta_males").val(),
        "pta_females":$("#pta_females").val(),
        "farming_groups":$("#farming_groups").val(),
        "farming_groups_males":$("#farming_groups_males").val(),
        "farming_groups_females":$("#farming_groups_females").val(),
        "water_project":$("#water_project").val(),
        "well_name":$("#well_name").val(),
        "water_yield":$("#water_yield").val(),
        "water_beneficiaries":$("#water_beneficiaries").val(),
        "user_id" : User.user_id,
        "action":"insert_hydro",
        "longitude":$("#longitude").val(),
        "latitude":$("#latitude").val(),
        "username" : User.username ,
        "country" : $("#country").val(),
        "state" : $("#state").val()

      };
        Facts.request($.param(water),
            function(data){
                console.log(data);
                $("#sbt").css({"display":'none'});
                $("#diahydro").removeAttr("disabled"); 
                if($.trim(data.result)==="successfully") {

                    alert('Success, Data Uploaded.');

                    setTimeout(function () {
                        window.location.href = './hydro.html';
                    }, 4000);
                }else{

                    alert('Unable to Upload Data Please try again., '+data.result);
                }
            },function(){
                $("#sbt").css({"display":'none'});
                $("#diahydro").removeAttr("disabled"); 
                alert('Please check your network connection., '+data.result);
            });

            e.preventDefault();

    },
    submitCp :function(){
        Array.prototype.unique = function() {
            var a = this.concat();
            for(var i=0; i<a.length; ++i) {
                for(var j=i+1; j<a.length; ++j) {
                    if(a[i] === a[j])
                        a.splice(j--, 1);
                }
            }

            return a;
        };
        var temp;
        var ids_input = $('#diagnosis_cp input[id]').map(function() {
            return this.id;
        }).get();
        var ids_select = $('#diagnosis_cp select[id]').map(function() {
            return this.id;
        }).get();
        
        var ids = ids_input.concat(ids_select).unique(); // Merges both arrays and gets only unique items
        // var ids = ids_input.concat(ids_select); Merges both arrays with duplicates
        var ary_count = ids.length;
        var json_ary = {"action":"insert_cp"};
        for(var i = 0; i < ary_count; i ++){
            if($('#'+ids[i]).is(':checkbox') === true){
                if($('#'+ids[i]).is(':checked')){
                    $('#'+ids[i]).val('yes');
                    temp = ids[i];
                    json_ary[temp] = $('#'+ids[i]).val();
                }else{
                    $('#'+ids[i]).val(' ');
                    temp = ids[i];
                    json_ary[temp] = $('#'+ids[i]).val();
                }
            }else if($('#'+ids[i]).is('input, select') === true){
                if(document.getElementById(ids[i]).selectedIndex === 0){
                    $('#'+ids[i]).val(' ');
                    temp = ids[i];
                    json_ary[temp] = $('#'+ids[i]).val();
                }else{
                    temp = ids[i];
                    json_ary[temp] = $('#'+ids[i]).val();
                }
            }else{
                if($.trim($('#'+ids[i]).val()) === ''){
                    $('#'+ids[i]).val(' ');
                    temp = ids[i];
                    json_ary[temp] = $('#'+ids[i]).val();
                }else{
                    temp = ids[i];
                    json_ary[temp] = $('#'+ids[i]).val();
                }
            }
        }

        Facts.request(json_ary,
            function(data){
console.log(data);
                if($.trim(data.result)==="successfully") {

                    alert('Success, Data Uploaded.');

                    setTimeout(function () {
                        window.location.href = './consumption_production.html';
                    }, 4000);
                }else{

                    alert('Unable to Upload Data Please try again., '+data.result);
                }
            },function(){

                alert('Please check your network connection., '+data.result);
            });

    },
    submitZero :function(){
        Array.prototype.unique = function() {
            var a = this.concat();
            for(var i=0; i<a.length; ++i) {
                for(var j=i+1; j<a.length; ++j) {
                    if(a[i] === a[j])
                        a.splice(j--, 1);
                }
            }

            return a;
        };
        var temp;
        var ids_input = $('#diagnosis_zero input[id]').map(function() {
            return this.id;
        }).get();
        var ids_select = $('#diagnosis_zero select[id]').map(function() {
            return this.id;
        }).get();
        
        var ids = ids_input.concat(ids_select).unique(); // Merges both arrays and gets only unique items
        // var ids = ids_input.concat(ids_select).unique(); Merges both arrays with duplicates
        var ary_count = ids.length;
        var json_ary = {"action":"insert_zero"};
        for(var i = 0; i < ary_count; i ++){
            if($('#'+ids[i]).is(':checkbox') === true){
                if($('#'+ids[i]).is(':checked')){
                    $('#'+ids[i]).val('yes');
                    temp = ids[i];
                    json_ary[temp] = $('#'+ids[i]).val();
                }else{
                    $('#'+ids[i]).val(' ');
                    temp = ids[i];
                    json_ary[temp] = $('#'+ids[i]).val();
                }
            }else if($('#'+ids[i]).is('input, select') === true){
                if(document.getElementById(ids[i]).selectedIndex === 0){
                    $('#'+ids[i]).val(' ');
                    temp = ids[i];
                    json_ary[temp] = $('#'+ids[i]).val();
                }else{
                    temp = ids[i];
                    json_ary[temp] = $('#'+ids[i]).val();
                }
            }else{
                if($.trim($('#'+ids[i]).val()) === ''){
                    $('#'+ids[i]).val(' ');
                    temp = ids[i];
                    json_ary[temp] = $('#'+ids[i]).val();
                }else{
                    temp = ids[i];
                    json_ary[temp] = $('#'+ids[i]).val();
                }
            }
        }

        Facts.request($.param(json_ary),
            function(data){
console.log(data);
                if($.trim(data.result)==="successfully") {

                    alert('Success, Data Uploaded.');

                    setTimeout(function () {
                        window.location.href = './zero_hunger.html';
                    }, 4000);
                }else{

                    alert('Unable to Upload Data Please try again., '+data.result);
                }
            },function(){

                alert('Please check your network connection., '+data.result);
            });

    },
    submitAgro :function(){

        // var agro ={
        //     "f_name": $("#f_name").val(),
        //     "f_gender": $("#f_gender").val(),
        //     "fbo": $("#fbo").val(),
        //     "f_comm": $("#f_comm").val(),
        //     "f_lga": $("#f_lga").val(),
        //     "f_size": $("#f_size").val(),
        //     "cp1": $("#cp1").val(),
        //     "cp2": $("#cp2").val(),
        //     "cp3": $("#cp3").val(),
        //     "f_g_year": $("#f_g_year").val(),
        //     "f_g_l_year": $("#f_g_l_year").val(),
        //     "lpd": $("#lpd").val(),
        //     "lpd_others": $("#lpd-others").val(),
        //     "b_h_l_year": $("#b_h_l_year").val(),
        //     "seed": $("input[name='seed']:checked").val() || 'No',
        //     "herbicides": $("input[name='herbicides']:checked").val() || 'No',
        //     "insecticides": $("input[name='insecticides']:checked").val() || 'No',
        //     "fungicides": $("input[name='fungicides']:checked").val() || 'No',
        //     "tpower": $("input[name='tpower']:checked").val() || 'No',
        //     "pests": $("input[name='pests']:checked").val() || 'No',
        //     "pests_loses": $("#pests_loses").val(),
        //     "fertilizer": $("input[name='fertilizer']:checked").val() || 'No',
        //     "fertilizer_type": $("#fertilizer_type").val(),
        //     "ft_num_bag": $("#ft_num_bag").val(),
        //     "ft_kg_bag": $("#ft_kg_bag").val(),
        //     "user_id=" : User.user_id,
        //     "username=" : User.username ,
        //     "action":"insert_agro",
        //     "longitude":"",
        //     "latitude":"",
        //     "location" : ""

        // };

        
        Array.prototype.unique = function() {
            var a = this.concat();
            for(var i=0; i<a.length; ++i) {
                for(var j=i+1; j<a.length; ++j) {
                    if(a[i] === a[j])
                        a.splice(j--, 1);
                }
            }

            return a;
        };
        var temp;
        var ids_input = $('#diagnosis input[id]').map(function() {
            return this.id;
        }).get();
        var ids_select = $('#diagnosis select[id]').map(function() {
            return this.id;
        }).get();
        
        var ids = ids_input.concat(ids_select).unique(); // Merges both arrays and gets only unique items
        // var ids = ids_input.concat(ids_select).unique(); Merges both arrays with duplicates
        var ary_count = ids.length;
        var json_ary = {"action":"insert_agro"};
        for(var i = 0; i < ary_count; i ++){
            if($('#'+ids[i]).is(':checkbox') === true){
                if($('#'+ids[i]).is(':checked')){
                    $('#'+ids[i]).val('yes');
                    temp = ids[i];
                    json_ary[temp] = $('#'+ids[i]).val();
                }else{
                    $('#'+ids[i]).val(' ');
                    temp = ids[i];
                    json_ary[temp] = $('#'+ids[i]).val();
                }
            }else if($('#'+ids[i]).is('input, select') === true){
                if(document.getElementById(ids[i]).selectedIndex === 0){
                    $('#'+ids[i]).val(' ');
                    temp = ids[i];
                    json_ary[temp] = $('#'+ids[i]).val();
                }else{
                    temp = ids[i];
                    json_ary[temp] = $('#'+ids[i]).val();
                }
            }else{
                if($.trim($('#'+ids[i]).val()) === ''){
                    $('#'+ids[i]).val(' ');
                    temp = ids[i];
                    json_ary[temp] = $('#'+ids[i]).val();
                }else{
                    temp = ids[i];
                    json_ary[temp] = $('#'+ids[i]).val();
                }
            }
        }

        //    console.log(json_ary);
            
        //    return false;
            
        Facts.request($.param(json_ary),
            function(data){
console.log(data);
                if($.trim(data.result)==="successfully") {

                    alert('Success, Data Uploaded.');

                    setTimeout(function () {
                        window.location.href = './agric.html';
                    }, 4000);
                }else{

                    alert('Unable to Upload Data Please try again., '+data.result);
                }
            },function(){

                alert('Please check your network connection., '+data.result);
            });

    },
    diagnose : function (){
if($("#days").val() ===null && $("#weeks").val()===null  && $("#years").val()===null){
    alert("Age is compulsory.");
}else if(User.location.length <2){
    alert("Please turn on location service and refresh.");
    setTimeout(function(){window.location.href = './facts.html';},4000);
        }else {

    var diagnose = {
        "gender": $("input[name='gender']:checked").val(),
        "days": $("#days").val(),
        "weeks": $("#weeks").val(),
        "years": $("#years").val(),
        "diagnosis": $("#dig").val(),
        "case": (($("#case").is(':checked')) ? "New" : "Not New" ),
        "mortality": (($("#mortality").is(':checked')) ? "Yes" : "No")
    };

    var dataString = "action=insert_facts&user_id=" + User.user_id + "&username=" + User.username + "&gender=" + diagnose.gender + "&age=" + ((diagnose.days != null) ? diagnose.days : "") + "-" + ((diagnose.weeks != null) ? diagnose.weeks : "") + "-" + ((diagnose.years != null) ? diagnose.years : "") + "&diagnosis="
        + diagnose.diagnosis + "&case=" + diagnose.case + "&mortality=" + diagnose.mortality + "&location=" + User.location;
    Facts.request(dataString, function (data) {
        $("#gender").removeAttr('value');
        $("#days").removeAttr('value');
        $("#months").removeAttr('value');
        $("#years").removeAttr('value');
        $("#dig").removeAttr('value');
        $("#case").removeAttr('value');
        $("#mortality").removeAttr('value');

        if($.trim(data.result)==="Please logout and relogin") {
            Facts.logout();
        }
        if($.trim(data.result)==="successfully") {
            alert("Submitted successfully");
            setTimeout(function () {
                window.location.href = './facts.html';
            }, 4000);
        }else{ alert(data.result);}

    });

}
    },
    updateProfile: function(){
        $("#updateProForm").ajaxForm({target: '#mepic',
            beforeSubmit:function(){
                $("#uid").val(User.user_id);
                $("#usname").val(User.username);
            },
            success:function(data){
                console.log(data);
            },
            error:function(data){
                console.log(data);
            } }).submit();
    },
    renderProfile:function(){

        $("#rFullName").html(User.first_name+" "+User.last_name);
        $("#rFullName2, #sfname").html(User.first_name+" "+User.last_name);
        $("#rProf").html(User.profession);
        $("#rMail, #semail").html(User.email);
        $("#rUname").html(User.username);
        $("#rAddresss").html(User.address);
        $("#rCountry").html(User.country);
        $("#rState").html(User.state);
        $("#rCity").html(User.city);
        $("#rSub").html(0);
        $("#rAddress").html(User.location);
        $("#mepic,#simg").attr(
            'src',User.pro_image);

    },
    change_password: function(){
        if($("pword").val() === $("#cpword").val()) {
            var dataString = "action=change_password_via_email&email="+$("#usern").val()+"&password="+$("pword").val();
            Facts.request(dataString,function(data){
                if(data.result===true){
                    alert('Success.');
                    window.location.href="./index.html";
                }else{
                    alert("No record found");
                }

            });
        }else{
            alert('Password and Confirm password must match.');
        }
    },
    detectMe:function () {



    },
    isUser: function(){

        var user = this.storage.getItem("user");

        if( user ==null ) {

            if(window.location.pathname === "/android_asset/www/index.html" || window.location.pathname === "/android_asset/www/" || window.location.pathname === "/android_asset/www/create.html" || window.location.pathname === "/android_asset/www/change_password.html"){

            }else{

                window.location.href="./index.html";
            }

        }else{
            //  var User ={username:"timotew",user_id:"11",location:"Lagos",email:"timotewpeters@gmail.com",first_name:"Timothy",last_name:"Peters",country:"Nigeria",
            // state:"Lagos",city:"Ikeja",profession:"Doctor",pro_image:"",gcm_id:""};
            // {"user_id":"11","username":"timotew","email":
            //   "timotewpeters@gmail.com","password":"afa24dfc4177902d2231314386551034",
            // "first_name":"Timothy","last_name":"Peters",
            //"country":"3","state":"2","city":
            //"Ikeja","profession":"2","pro_image":"http://5factsanalysis.com/facts/profile_image/img.png","result":"successful"}
            user = JSON.parse(user);
            User.user_id = user.user_id;
            User.username = user.username;
            User.email = user.email;
            User.first_name = user.first_name;
            User.last_name = user.last_name;
            User.country = user.country;
            User.state = user.state;
            User.city = user.city;
            User.profession = user.profession;
            User.pro_image = user.pro_image;
            User.location = user.location;
            User.latitude = user.latitude;
            User.longitude = user.longitude;
            if(window.location.pathname === "/android_asset/www/index.html" || window.location.pathname === "/android_asset/www/"){
                window.location.href = "./main.html";
            }

        }

    },
    logout:function(){
        Facts.storage.removeItem("user");
        window.location.href="./index.html";
    },
    factsByDate:function(){
var start =$("#start").val(),end = $("#end").val(),parent = document.getElementById("subF");

    var dataString = "action=factsByDate&user_id="+User.user_id+"&start="+start+"&end="+ end;
    Facts.request(dataString,function(data){
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
for(var i=0;i<data.submitted.length;i++){

    var tr = document.createElement("tr"),main = data.submitted;
    var diagnose = document.createElement("td"),
        age = document.createElement("td"), gender = document.createElement("td"), cases = document.createElement("td"), mortality= document.createElement("td"), date = document.createElement("td");

    diagnose.appendChild(document.createTextNode(main[i].diagnosis));
    tr.appendChild(diagnose);

    age.appendChild(document.createTextNode(main[i].age));
    tr.appendChild(age);

    //cases.appendChild(document.createTextNode(main[i].case));
    //tr.appendChild(cases);

    gender.appendChild(document.createTextNode(main[i].gender));
    tr.appendChild(gender);

    mortality.appendChild(document.createTextNode(main[i].mortality));
    tr.appendChild(mortality);

    date.appendChild(document.createTextNode(main[i].dated));
    tr.appendChild(date);

    parent.appendChild(tr);
}
        alert(data.submitted.length+" Entries found.");
        }
    );

    }
};



$(document).ready(function() {
    $("input[name*='age']").change();
    Materialize.updateTextFields();

    // alert(message, displayLength, className, completeCallback);

    //$('select').material_select();
    $('ul.tabs').tabs();
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });
    $(".button-col").sideNav();


    $('input.country-auto').autocomplete({data:{"Afghanistan":null,"Åland Islands":null,"Albania":null,"Algeria":null,"American Samoa":null,"AndorrA":null,"Angola":null,"Anguilla":null,"Antarctica":null,"Antigua and Barbuda":null,"Argentina":null,"Armenia":null,"Aruba":null,"Australia":null,"Austria":null,"Azerbaijan":null,"Bahamas":null,"Bahrain":null,"Bangladesh":null,"Barbados":null,"Belarus":null,"Belgium":null,"Belize":null,"Benin":null,"Bermuda":null,"Bhutan":null,"Bolivia":null,"Bosnia and Herzegovina":null,"Botswana":null,"Bouvet Island":null,"Brazil":null,"British Indian Ocean Territory":null,"Brunei Darussalam":null,"Bulgaria":null,"Burkina Faso":null,"Burundi":null,"Cambodia":null,"Cameroon":null,"Canada":null,"Cape Verde":null,"Cayman Islands":null,"Central African Republic":null,"Chad":null,"Chile":null,"China":null,"Christmas Island":null,"Cocos (Keeling) Islands":null,"Colombia":null,"Comoros":null,"Congo":null,"Congo, The Democratic Republic of the":null,"Cook Islands":null,"Costa Rica":null,"Cote D\"Ivoire":null,"Croatia":null,"Cuba":null,"Cyprus":null,"Czech Republic":null,"Denmark":null,"Djibouti":null,"Dominica":null,"Dominican Republic":null,"Ecuador":null,"Egypt":null,"El Salvador":null,"Equatorial Guinea":null,"Eritrea":null,"Estonia":null,"Ethiopia":null,"Falkland Islands (Malvinas)":null,"Faroe Islands":null,"Fiji":null,"Finland":null,"France":null,"French Guiana":null,"French Polynesia":null,"French Southern Territories":null,"Gabon":null,"Gambia":null,"Georgia":null,"Germany":null,"Ghana":null,"Gibraltar":null,"Greece":null,"Greenland":null,"Grenada":null,"Guadeloupe":null,"Guam":null,"Guatemala":null,"Guernsey":null,"Guinea":null,"Guinea-Bissau":null,"Guyana":null,"Haiti":null,"Heard Island and Mcdonald Islands":null,"Holy See (Vatican City State)":null,"Honduras":null,"Hong Kong":null,"Hungary":null,"Iceland":null,"India":null,"Indonesia":null,"Iran, Islamic Republic Of":null,"Iraq":null,"Ireland":null,"Isle of Man":null,"Israel":null,"Italy":null,"Jamaica":null,"Japan":null,"Jersey":null,"Jordan":null,"Kazakhstan":null,"Kenya":null,"Kiribati":null,"Korea, Democratic People\"S Republic of":null,"Korea, Republic of":null,"Kuwait":null,"Kyrgyzstan":null,"Lao People\"S Democratic Republic":null,"Latvia":null,"Lebanon":null,"Lesotho":null,"Liberia":null,"Libyan Arab Jamahiriya":null,"Liechtenstein":null,"Lithuania":null,"Luxembourg":null,"Macao":null,"Macedonia, The Former Yugoslav Republic of":null,"Madagascar":null,"Malawi":null,"Malaysia":null,"Maldives":null,"Mali":null,"Malta":null,"Marshall Islands":null,"Martinique":null,"Mauritania":null,"Mauritius":null,"Mayotte":null,"Mexico":null,"Micronesia, Federated States of":null,"Moldova, Republic of":null,"Monaco":null,"Mongolia":null,"Montserrat":null,"Morocco":null,"Mozambique":null,"Myanmar":null,"Namibia":null,"Nauru":null,"Nepal":null,"Netherlands":null,"Netherlands Antilles":null,"New Caledonia":null,"New Zealand":null,"Nicaragua":null,"Niger":null,"Nigeria":null,"Niue":null,"Norfolk Island":null,"Northern Mariana Islands":null,"Norway":null,"Oman":null,"Pakistan":null,"Palau":null,"Palestinian Territory, Occupied":null,"Panama":null,"Papua New Guinea":null,"Paraguay":null,"Peru":null,"Philippines":null,"Pitcairn":null,"Poland":null,"Portugal":null,"Puerto Rico":null,"Qatar":null,"Reunion":null,"Romania":null,"Russian Federation":null,"RWANDA":null,"Saint Helena":null,"Saint Kitts and Nevis":null,"Saint Lucia":null,"Saint Pierre and Miquelon":null,"Saint Vincent and the Grenadines":null,"Samoa":null,"San Marino":null,"Sao Tome and Principe":null,"Saudi Arabia":null,"Senegal":null,"Serbia and Montenegro":null,"Seychelles":null,"Sierra Leone":null,"Singapore":null,"Slovakia":null,"Slovenia":null,"Solomon Islands":null,"Somalia":null,"South Africa":null,"South Georgia and the South Sandwich Islands":null,"Spain":null,"Sri Lanka":null,"Sudan":null,"Suriname":null,"Svalbard and Jan Mayen":null,"Swaziland":null,"Sweden":null,"Switzerland":null,"Syrian Arab Republic":null,"Taiwan, Province of China":null,"Tajikistan":null,"Tanzania, United Republic of":null,"Thailand":null,"Timor-Leste":null,"Togo":null,"Tokelau":null,"Tonga":null,"Trinidad and Tobago":null,"Tunisia":null,"Turkey":null,"Turkmenistan":null,"Turks and Caicos Islands":null,"Tuvalu":null,"Uganda":null,"Ukraine":null,"United Arab Emirates":null,"United Kingdom":null,"United States":null,"United States Minor Outlying Islands":null,"Uruguay":null,"Uzbekistan":null,"Vanuatu":null,"Venezuela":null,"Viet Nam":null,"Virgin Islands, British":null,"Virgin Islands, U.S.":null,"Wallis and Futuna":null,"Western Sahara":null,"Yemen":null,"Zambia":null,"Zimbabwe":null}
        ,
        limit: 20});
    $('input.city-auto').autocomplete({
        data: {
            "Aba South":null,"Arochukwu":null,"Bende":null,"Ikwuano":null,"Isiala Ngwa North":null,"Isiala Ngwa South":null,"Isuikwuato":null,"Obi Ngwa":null,"Ohafia":null,"Osisioma":null,"Ugwunagbo":null,"Ukwa East":null,"Ukwa West":null,"Umuahia North":null,"Umuahia South":null,"Umu Nneochi":null,"Fufure":null,"Ganye":null,"Gayuk":null,"Gombi":null,"Grie":null,"Hong":null,"Jada":null,"Lamurde":null,"Madagali":null,"Maiha":null,"Mayo Belwa":null,"Michika":null,"Mubi North":null,"Mubi South":null,"Numan":null,"Shelleng":null,"Song":null,"Toungo":null,"Yola North":null,"Yola South":null,"Eastern Obolo":null,"Eket":null,"Esit Eket":null,"Essien Udim":null,"Etim Ekpo":null,"Etinan":null,"Ibeno":null,"Ibesikpo Asutan":null,"Ibiono-Ibom":null,"Ika":null,"Ikono":null,"Ikot Abasi":null,"Ikot Ekpene":null,"Ini":null,"Itu":null,"Mbo":null,"Mkpat-Enin":null,"Nsit-Atai":null,"Nsit-Ibom":null,"Nsit-Ubium":null,"Obot Akara":null,"Okobo":null,"Onna":null,"Oron":null,"Oruk Anam":null,"Udung-Uko":null,"Ukanafun":null,"Uruan":null,"Urue-Offong/Oruko":null,"Uyo":null,"Anambra East":null,"Anambra West":null,"Anaocha":null,"Awka North":null,"Awka South":null,"Ayamelum":null,"Dunukofia":null,"Ekwusigo":null,"Idemili North":null,"Idemili South":null,"Ihiala":null,"Njikoka":null,"Nnewi North":null,"Nnewi South":null,"Ogbaru":null,"Onitsha North":null,"Onitsha South":null,"Orumba North":null,"Orumba South":null,"Oyi":null,"Bauchi":null,"Bogoro":null,"Damban":null,"Darazo":null,"Dass":null,"Gamawa":null,"Ganjuwa":null,"Giade":null,"Itas/Gadau":null,"Jama'are":null,"Katagum":null,"Kirfi":null,"Misau":null,"Ningi":null,"Shira":null,"Tafawa Balewa":null,"Toro":null,"Warji":null,"Zaki":null,"Ekeremor":null,"Kolokuma/Opokuma":null,"Nembe":null,"Ogbia":null,"Sagbama":null,"Southern Ijaw":null,"Yenagoa":null,"Apa":null,"Ado":null,"Buruku":null,"Gboko":null,"Guma":null,"Gwer East":null,"Gwer West":null,"Katsina-Ala":null,"Konshisha":null,"Kwande":null,"Logo":null,"Makurdi":null,"Obi":null,"Ogbadibo":null,"Ohimini":null,"Oju":null,"Okpokwu":null,"Oturkpo":null,"Tarka":null,"Ukum":null,"Ushongo":null,"Vandeikya":null,"Askira/Uba":null,"Bama":null,"Bayo":null,"Biu":null,"Chibok":null,"Damboa":null,"Dikwa":null,"Gubio":null,"Guzamala":null,"Gwoza":null,"Hawul":null,"Jere":null,"Kaga":null,"Kala/Balge":null,"Konduga":null,"Kukawa":null,"Kwaya Kusar":null,"Mafa":null,"Magumeri":null,"Maiduguri":null,"Marte":null,"Mobbar":null,"Monguno":null,"Ngala":null,"Nganzai":null,"Shani":null,"Akamkpa":null,"Akpabuyo":null,"Bakassi":null,"Bekwarra":null,"Biase":null,"Boki":null,"Calabar Municipal":null,"Calabar South":null,"Etung":null,"Ikom":null,"Obanliku":null,"Obubra":null,"Obudu":null,"Odukpani":null,"Ogoja":null,"Yakuur":null,"Yala":null,"Aniocha South":null,"Bomadi":null,"Burutu":null,"Ethiope East":null,"Ethiope West":null,"Ika North East":null,"Ika South":null,"Isoko North":null,"Isoko South":null,"Ndokwa East":null,"Ndokwa West":null,"Okpe":null,"Oshimili North":null,"Oshimili South":null,"Patani":null,"Sapele":null,"Udu":null,"Ughelli North":null,"Ughelli South":null,"Ukwuani":null,"Uvwie":null,"Warri North":null,"Warri South":null,"Warri South West":null,"Afikpo North":null,"Afikpo South":null,"Ebonyi":null,"Ezza North":null,"Ezza South":null,"Ikwo":null,"Ishielu":null,"Ivo":null,"Izzi":null,"Ohaozara":null,"Ohaukwu":null,"Onicha":null,"Egor":null,"Esan Central":null,"Esan North-East":null,"Esan South-East":null,"Esan West":null,"Etsako Central":null,"Etsako East":null,"Etsako West":null,"Igueben":null,"Ikpoba Okha":null,"Orhionmwon":null,"Oredo":null,"Ovia North-East":null,"Ovia South-West":null,"Owan East":null,"Owan West":null,"Uhunmwonde":null,"Efon":null,"Ekiti East":null,"Ekiti South-West":null,"Ekiti West":null,"Emure":null,"Gbonyin":null,"Ido Osi":null,"Ijero":null,"Ikere":null,"Ikole":null,"Ilejemeje":null,"Irepodun/Ifelodun":null,"Ise/Orun":null,"Moba":null,"Oye":null,"Awgu":null,"Enugu East":null,"Enugu North":null,"Enugu South":null,"Ezeagu":null,"Igbo Etiti":null,"Igbo Eze North":null,"Igbo Eze South":null,"Isi Uzo":null,"Nkanu East":null,"Nkanu West":null,"Nsukka":null,"Oji River":null,"Udenu":null,"Udi":null,"Uzo Uwani":null,"Bwari":null,"Gwagwalada":null,"Kuje":null,"Kwali":null,"Municipal Area Council":null,"Balanga":null,"Billiri":null,"Dukku":null,"Funakaye":null,"Gombe":null,"Kaltungo":null,"Kwami":null,"Nafada":null,"Shongom":null,"Yamaltu/Deba":null,"Ahiazu Mbaise":null,"Ehime Mbano":null,"Ezinihitte":null,"Ideato North":null,"Ideato South":null,"Ihitte/Uboma":null,"Ikeduru":null,"Isiala Mbano":null,"Isu":null,"Mbaitoli":null,"Ngor Okpala":null,"Njaba":null,"Nkwerre":null,"Nwangele":null,"Obowo":null,"Oguta":null,"Ohaji/Egbema":null,"Okigwe":null,"Orlu":null,"Orsu":null,"Oru East":null,"Oru West":null,"Owerri Municipal":null,"Owerri North":null,"Owerri West":null,"Unuimo":null,"Babura":null,"Biriniwa":null,"Birnin Kudu":null,"Buji":null,"Dutse":null,"Gagarawa":null,"Garki":null,"Gumel":null,"Guri":null,"Gwaram":null,"Gwiwa":null,"Hadejia":null,"Jahun":null,"Kafin Hausa":null,"Kazaure":null,"Kiri Kasama":null,"Kiyawa":null,"Kaugama":null,"Maigatari":null,"Malam Madori":null,"Miga":null,"Ringim":null,"Roni":null,"Sule Tankarkar":null,"Taura":null,"Yankwashi":null,"Chikun":null,"Giwa":null,"Igabi":null,"Ikara":null,"Jaba":null,"Jema'a":null,"Kachia":null,"Kaduna North":null,"Kaduna South":null,"Kagarko":null,"Kajuru":null,"Kaura":null,"Kauru":null,"Kubau":null,"Kudan":null,"Lere":null,"Makarfi":null,"Sabon Gari":null,"Sanga":null,"Soba":null,"Zangon Kataf":null,"Zaria":null,"Albasu":null,"Bagwai":null,"Bebeji":null,"Bichi":null,"Bunkure":null,"Dala":null,"Dambatta":null,"Dawakin Kudu":null,"Dawakin Tofa":null,"Doguwa":null,"Fagge":null,"Gabasawa":null,"Garko":null,"Garun Mallam":null,"Gaya":null,"Gezawa":null,"Gwale":null,"Gwarzo":null,"Kabo":null,"Kano Municipal":null,"Karaye":null,"Kibiya":null,"Kiru":null,"Kumbotso":null,"Kunchi":null,"Kura":null,"Madobi":null,"Makoda":null,"Minjibir":null,"Nasarawa":null,"Rano":null,"Rimin Gado":null,"Rogo":null,"Shanono":null,"Sumaila":null,"Takai":null,"Tarauni":null,"Tofa":null,"Tsanyawa":null,"Tudun Wada":null,"Ungogo":null,"Warawa":null,"Wudil":null,"Batagarawa":null,"Batsari":null,"Baure":null,"Bindawa":null,"Charanchi":null,"Dandume":null,"Danja":null,"Dan Musa":null,"Daura":null,"Dutsi":null,"Dutsin Ma":null,"Faskari":null,"Funtua":null,"Ingawa":null,"Jibia":null,"Kafur":null,"Kaita":null,"Kankara":null,"Kankia":null,"Katsina":null,"Kurfi":null,"Kusada":null,"Mai'Adua":null,"Malumfashi":null,"Mani":null,"Mashi":null,"Matazu":null,"Musawa":null,"Rimi":null,"Sabuwa":null,"Safana":null,"Sandamu":null,"Zango":null,"Arewa Dandi":null,"Argungu":null,"Augie":null,"Bagudo":null,"Birnin Kebbi":null,"Bunza":null,"Dandi":null,"Fakai":null,"Gwandu":null,"Jega":null,"Kalgo":null,"Koko/Besse":null,"Maiyama":null,"Ngaski":null,"Sakaba":null,"Shanga":null,"Suru":null,"Wasagu/Danko":null,"Yauri":null,"Zuru":null,"Ajaokuta":null,"Ankpa":null,"Bassa":null,"Dekina":null,"Ibaji":null,"Idah":null,"Igalamela Odolu":null,"Ijumu":null,"Kabba/Bunu":null,"Kogi":null,"Lokoja":null,"Mopa Muro":null,"Ofu":null,"Ogori/Magongo":null,"Okehi":null,"Okene":null,"Olamaboro":null,"Omala":null,"Yagba East":null,"Yagba West":null,"Baruten":null,"Edu":null,"Ekiti":null,"Ifelodun":null,"Ilorin East":null,"Ilorin South":null,"Ilorin West":null,"Irepodun":null,"Isin":null,"Kaiama":null,"Moro":null,"Offa":null,"Oke Ero":null,"Oyun":null,"Pategi":null,"Ajeromi-Ifelodun":null,"Alimosho":null,"Amuwo-Odofin":null,"Apapa":null,"Badagry":null,"Epe":null,"Eti Osa":null,"Ibeju-Lekki":null,"Ifako-Ijaiye":null,"Ikeja":null,"Ikorodu":null,"Kosofe":null,"Lagos Island":null,"Lagos Mainland":null,"Mushin":null,"Ojo":null,"Oshodi-Isolo":null,"Shomolu":null,"Surulere":null,"Awe":null,"Doma":null,"Karu":null,"Keana":null,"Keffi":null,"Kokona":null,"Lafia":null,"Nasarawa":null,"Nasarawa Egon":null,"Obi":null,"Toto":null,"Wamba":null,"Agwara":null,"Bida":null,"Borgu":null,"Bosso":null,"Chanchaga":null,"Edati":null,"Gbako":null,"Gurara":null,"Katcha":null,"Kontagora":null,"Lapai":null,"Lavun":null,"Magama":null,"Mariga":null,"Mashegu":null,"Mokwa":null,"Moya":null,"Paikoro":null,"Rafi":null,"Rijau":null,"Shiroro":null,"Suleja":null,"Tafa":null,"Wushishi":null,"Abeokuta South":null,"Ado-Odo/Ota":null,"Egbado North":null,"Egbado South":null,"Ewekoro":null,"Ifo":null,"Ijebu East":null,"Ijebu North":null,"Ijebu North East":null,"Ijebu Ode":null,"Ikenne":null,"Imeko Afon":null,"Ipokia":null,"Obafemi Owode":null,"Odeda":null,"Odogbolu":null,"Ogun Waterside":null,"Remo North":null,"Shagamu":null,"Akoko North-West":null,"Akoko South-West":null,"Akoko South-East":null,"Akure North":null,"Akure South":null,"Ese Odo":null,"Idanre":null,"Ifedore":null,"Ilaje":null,"Ile Oluji/Okeigbo":null,"Irele":null,"Odigbo":null,"Okitipupa":null,"Ondo East":null,"Ondo West":null,"Ose":null,"Owo":null,"Atakunmosa West":null,"Aiyedaade":null,"Aiyedire":null,"Boluwaduro":null,"Boripe":null,"Ede North":null,"Ede South":null,"Ife Central":null,"Ife East":null,"Ife North":null,"Ife South":null,"Egbedore":null,"Ejigbo":null,"Ifedayo":null,"Ifelodun":null,"Ila":null,"Ilesa East":null,"Ilesa West":null,"Irepodun":null,"Irewole":null,"Isokan":null,"Iwo":null,"Obokun":null,"Odo Otin":null,"Ola Oluwa":null,"Olorunda":null,"Oriade":null,"Orolu":null,"Osogbo":null,"Akinyele":null,"Atiba":null,"Atisbo":null,"Egbeda":null,"Ibadan North":null,"Ibadan North-East":null,"Ibadan North-West":null,"Ibadan South-East":null,"Ibadan South-West":null,"Ibarapa Central":null,"Ibarapa East":null,"Ibarapa North":null,"Ido":null,"Irepo":null,"Iseyin":null,"Itesiwaju":null,"Iwajowa":null,"Kajola":null,"Lagelu":null,"Ogbomosho North":null,"Ogbomosho South":null,"Ogo Oluwa":null,"Olorunsogo":null,"Oluyole":null,"Ona Ara":null,"Orelope":null,"Ori Ire":null,"Oyo":null,"Oyo East":null,"Saki East":null,"Saki West":null,"Surulere":null,"Barkin Ladi":null,"Bassa":null,"Jos East":null,"Jos North":null,"Jos South":null,"Kanam":null,"Kanke":null,"Langtang South":null,"Langtang North":null,"Mangu":null,"Mikang":null,"Pankshin":null,"Qua'an Pan":null,"Riyom":null,"Shendam":null,"Wase":null,"Ahoada East":null,"Ahoada West":null,"Akuku-Toru":null,"Andoni":null,"Asari-Toru":null,"Bonny":null,"Degema":null,"Eleme":null,"Emuoha":null,"Etche":null,"Gokana":null,"Ikwerre":null,"Khana":null,"Obio/Akpor":null,"Ogba/Egbema/Ndoni":null,"Ogu/Bolo":null,"Okrika":null,"Omuma":null,"Opobo/Nkoro":null,"Oyigbo":null,"Port Harcourt":null,"Tai":null,"Bodinga":null,"Dange Shuni":null,"Gada":null,"Goronyo":null,"Gudu":null,"Gwadabawa":null,"Illela":null,"Isa":null,"Kebbe":null,"Kware":null,"Rabah":null,"Sabon Birni":null,"Shagari":null,"Silame":null,"Sokoto North":null,"Sokoto South":null,"Tambuwal":null,"Tangaza":null,"Tureta":null,"Wamako":null,"Wurno":null,"Yabo":null,"Bali":null,"Donga":null,"Gashaka":null,"Gassol":null,"Ibi":null,"Jalingo":null,"Karim Lamido":null,"Kumi":null,"Lau":null,"Sardauna":null,"Takum":null,"Ussa":null,"Wukari":null,"Yorro":null,"Zing":null,"Bursari":null,"Damaturu":null,"Fika":null,"Fune":null,"Geidam":null,"Gujba":null,"Gulani":null,"Jakusko":null,"Karasuwa":null,"Machina":null,"Nangere":null,"Nguru":null,"Potiskum":null,"Tarmuwa":null,"Yunusari":null,"Yusufari":null,"Bakura":null,"Birnin Magaji/Kiyaw":null,"Bukkuyum":null,"Bungudu":null,"Gummi":null,"Gusau":null,"Kaura Namoda":null,"Maradun":null,"Maru":null,"Shinkafi":null,"Talata Mafara":null,"Chafe":null,"Zurmi":null
        },
        limit: 10, // The max amount of results that can be shown at once. Default: Infinity.
    });


// var profession =[{"name":"Addiction medicine","children":[]},{"name":"Anaesthesia","children":[]}, {"name":"Dermatology","children":[]},{"name":"Dentist","children":[]}, {"name":"Emergency medicine","children":[]}, {"name":"General practice","children":[]},{"name":"Intensive care medicine","children":[]}, {"name":"Paediatric intensive care medicine","children":["Medical administration","Nurse/Mid-wife"]}, {"name":"Obstetrics and gynaecology","children":["Gynaecological oncology","Maternal–fetal medicine","Obstetrics and gynaecological ultrasound","Reproductive endocrinology and infertility","Urogynaecology"]}, {"name":"Occupational and environmental medicine","children":[]}, {"name":"Ophthalmology","children":[]},{"name":"Paediatrics and child health","children":[]},{"name":"Paediatrics and child health","children":["Clinical genetics","Community child health","General paediatrics","Neonatal and perinatal medicine","Paediatric cardiology","Paediatric clinical pharmacology","Paediatric emergency medicine","Paediatric endocrinology","Paediatric gastroenterology and hepatology","Paediatric haematology","Paediatric immunology and allergy","Paediatric infectious diseases","Paediatric intensive care medicine","Paediatric medical oncology","Paediatric nephrology","Paediatric neurology","Paediatric nuclear medicine","Paediatric palliative medicine","Paediatric rehabilitation medicine","Paediatric respiratory and sleep medicine","Paediatric rheumatology"]},{"name":"Pain medicine","children":[]},{"name":"Palliative medicine","children":[]},{"name":"Pathology","children":["General pathology","Anatomical pathology (including cytopathology)","Chemical pathology","Forensic pathology","Haematology","Immunology","Microbiology"]},{"name":"Physician","children":["Cardiology","Clinical genetics","Clinical pharmacology","Endocrinology","Gastroenterology and hepatology","General medicine","Geriatric medicine","Haematology","Immunology and allergy","Infectious diseases","Medical oncology","Nephrology","Neurology","Nuclear medicine","Respiratory and sleep medicine","Rheumatology"]},{"name":"Psychiatry","children":[]},{"name":"Public health medicine","children":[]}, {"name":"Radiation oncology","children":[]},{"name":"Nutritionist","children":[]},{"name":"Dietitian","children":[]},{"name":"Community Development Worker","children":[]},{"name":"Water engineer","children":[]},{"name":"Community Health Extension Worker","children":[]},{"name":", Community Health Officer","children":[]},{"name":"Farmer","children":[]},{"name":"Agric economist","children":[]},{"name":"Agriculturist","children":[]},{"name":"Researcher","children":[]},{"name":"Data analyst","children":[]},{"name":"Radiology","children":["Diagnostic radiology","Diagnostic ultrasound","Nuclear medicine"]}, {"name":"Rehabilitation medicine","children":[]},{"name":"Sexual health medicine","children":[]}, {"name":"Sport and exercise medicine","children":[]},{"name":"Medical Officer","children":[]},{"name":"House Officer","children":[]},{"name":"Surgery","children":["Cardio-thoracic surgery","General surgery","Neurosurgery","Orthopaedic surgery","Otolaryngology – head and neck surgery","Oral and maxillofacial surgery","Paediatric surgery","Plastic surgery","Urology","Vascular surgery"]}];

    var profession =[{"name":"Community Development Worker","children":[]},{"name":"Water engineer","children":[]},{"name":"Community Health Extension Worker","children":[]},{"name":"Community Health Officer","children":[]},{"name":"Farmer","children":[]},{"name":"Agric economist","children":[]},{"name":"Agriculturist","children":[]},{"name":"Researcher","children":[]},{"name":"Data analyst","children":[]}];

var upform = $("#updateProForm");
if(upform.length>0){


}

        var proff = $("#prof");
        var subprof = $("#subprof");


if(proff.length>0) {

    for (var v = 0; v < profession.length; v++) {
        var p = document.createElement("option");
        p.setAttribute("value", profession[v].name);
        p.innerHTML = profession[v].name;
        proff.append(p);

    }

    $('body').on('change','#prof', function() {
        subprof.children().each(function (ing, el) {
            if (ing > 0) {
                $(this).remove();
            }
        });
        var e =document.getElementById('prof');
        var ind = e.selectedIndex;
        var pp=profession[ind-1].children;

        if(pp.length>0){
            for (var q = 0; q < pp.length; q++) {
                var p = document.createElement("option");
                p.setAttribute("value", pp[q]);
                p.innerHTML = pp[q];
                subprof.append(p);
            }
        }else{
            var p = document.createElement("option");
            p.setAttribute("value",  e.options[ind].value);
            p.innerHTML =   e.options[ind].value;
            subprof.append(p);
        }

    });
}



    
$("#total_work_force").on( "click",function(){
    if($(this).is(':checked')){
        $(".total_work_force_hidden").css({"display":"block"});
    }else{
        $(".total_work_force_hidden").css({"display":"none"});
    }

});

$("#quantity_produced").on( "click",function(){
    if($(this).is(':checked')){
        $(".quantity_produced_hidden").css({"display":"block"});
    }else{
        $(".quantity_produced_hidden").css({"display":"none"});
    }

});

$("#quantity_sold").on( "click",function(){
    if($(this).is(':checked')){
        $(".quantity_sold_hidden").css({"display":"block"});
    }else{
        $(".quantity_sold_hidden").css({"display":"none"});
    }

});

$("#turn_over").on( "click",function(){
    if($(this).is(':checked')){
        $(".turn_over_hidden").css({"display":"block"});
    }else{
        $(".turn_over_hidden").css({"display":"none"});
    }

});

$("#processing_equipment").on( "change",function(){
    if($(this).val() == 'Yes'){
        $(".processing_equipment_hidden").css({"display":"block"});
    }else{
        $(".processing_equipment_hidden").css({"display":"none"});
    }

});

$("#other").on( "change",function(){
    if($(this).val() == 'Yes'){
        $(".other_hidden").css({"display":"block"});
    }else{
        $(".other_hidden").css({"display":"none"});
    }

});

$("#other1").on( "change",function(){
    if($(this).is(':checked')){
        $(".other1_hidden").css({"display":"block"});
    }else{
        $(".other1_hidden").css({"display":"none"});
    }

});

$("#other4").on( "change",function(){
    if($(this).is(':checked')){
        $(".other4_hidden").css({"display":"block"});
    }else{
        $(".other4_hidden").css({"display":"none"});
    }

});

$("#others").on( "change",function(){
    if($(this).is(':checked')){
        $(".others_hidden").css({"display":"block"});
    }else{
        $(".others_hidden").css({"display":"none"});
    }

});

$("#beneficiaries").on( "change",function(){
    if($(this).is(':checked')){
        $(".beneficiaries_hidden").css({"display":"block"});
    }else{
        $(".beneficiaries_hidden").css({"display":"none"});
    }

});

$("#beneficiaries").on( "change",function(){
    if($(this).is(':checked')){
        $(".beneficiaries_hidden").css({"display":"block"});
    }else{
        $(".beneficiaries_hidden").css({"display":"none"});
    }

});

$("#family_members").on( "change",function(){
    if($(this).is(':checked')){
        $(".family_members_hidden").css({"display":"block"});
    }else{
        $(".family_members_hidden").css({"display":"none"});
    }

});

$("#membership1").on( "change",function(){
    if($(this).is(':checked')){
        $(".membership1_hidden").css({"display":"block"});
    }else{
        $(".membership1_hidden").css({"display":"none"});
    }

});

$("#membership").on( "change",function(){
    if($(this).is(':checked')){
        $(".membership_hidden").css({"display":"block"});
    }else{
        $(".membership_hidden").css({"display":"none"});
    }

});

$("#training_capacity1").on( "change",function(){
    if($(this).is(':checked')){
        $(".training_capacity1_hidden").css({"display":"block"});
    }else{
        $(".training_capacity1_hidden").css({"display":"none"});
    }

});

$("#training_capacity").on( "change",function(){
    if($(this).is(':checked')){
        $(".training_capacity_hidden").css({"display":"block"});
    }else{
        $(".training_capacity_hidden").css({"display":"none"});
    }

});

$("#people_per_location").on( "change",function(){
    if($(this).is(':checked')){
        $(".people_per_location_hidden").css({"display":"block"});
    }else{
        $(".people_per_location_hidden").css({"display":"none"});
    }

});

$("#project_activity").on( "change",function(){
    if($(this).val() === 'water_access_and_sanitation'){
        $(".water_access_and_sanitation_hidden").css({"display":"block"});
    }else{
        $(".water_access_and_sanitation_hidden").css({"display":"none"});
    }

    if($(this).val() === 'education_and_awareness'){
        $(".education_and_awareness_hidden").css({"display":"block"});
    }else{
        $(".education_and_awareness_hidden").css({"display":"none"});
    }

    if($(this).val() === 'water_for_productive_use'){
        $(".water_for_productive_use_hidden").css({"display":"block"});
    }else{
        $(".water_for_productive_use_hidden").css({"display":"none"});
    }
    
    if($(this).val() === 'watershed_protection'){
        $(".watershed_protection_hidden").css({"display":"block"});
    }else{
        $(".watershed_protection_hidden").css({"display":"none"});
        document.getElementById('watershed').selectedIndex = 0;
        $(".Agricultural_land_practice_changes_hidden").css({"display":"none"});
        document.getElementById('agricultural_land').selectedIndex = 0;
        $(".Storm_water_management_hidden").css({"display":"none"});
        document.getElementById('Storm_water').selectedIndex = 0;
        $(".Land_use_or_land_cover_alterations_hidden").css({"display":"none"});
        document.getElementById('Land_use_or_land_cover').selectedIndex = 0;
        $(".Hydraulic_or_hydrologic_water_body_alterations_hidden").css({"display":"none"});
        document.getElementById('Hydraulic_or_hydrologic_water').selectedIndex = 0;
        $(".Wastewater_treatment_hidden").css({"display":"none"});
        document.getElementById('Wastewater_treatment').selectedIndex = 0;
        $(".Biologic_management_hidden").css({"display":"none"});
        document.getElementById('Biologic_management').selectedIndex = 0;
    }
});

$("#watershed").on( "change",function(){
    if($(this).val() === 'Agricultural_land_practice_changes'){
        $(".Agricultural_land_practice_changes_hidden").css({"display":"block"});
    }else{
        $(".Agricultural_land_practice_changes_hidden").css({"display":"none"});
        document.getElementById('agricultural_land').selectedIndex = 0;
    }

    if($(this).val() === 'Storm_water_management'){
        $(".Storm_water_management_hidden").css({"display":"block"});
    }else{
        $(".Storm_water_management_hidden").css({"display":"none"});
        document.getElementById('Storm_water').selectedIndex = 0;
    }
    
    if($(this).val() === 'Land_use_or_land_cover_alterations'){
        $(".Land_use_or_land_cover_alterations_hidden").css({"display":"block"});
    }else{
        $(".Land_use_or_land_cover_alterations_hidden").css({"display":"none"});
        document.getElementById('Land_use_or_land_cover').selectedIndex = 0;
    }
    
    if($(this).val() === 'Hydraulic_or_hydrologic_water_body_alterations'){
        $(".Hydraulic_or_hydrologic_water_body_alterations_hidden").css({"display":"block"});
    }else{
        $(".Hydraulic_or_hydrologic_water_body_alterations_hidden").css({"display":"none"});
        document.getElementById('Hydraulic_or_hydrologic_water').selectedIndex = 0;
    }
    
    if($(this).val() === 'Wastewater_treatment'){
        $(".Wastewater_treatment_hidden").css({"display":"block"});
    }else{
        $(".Wastewater_treatment_hidden").css({"display":"none"});
        document.getElementById('Wastewater_treatment').selectedIndex = 0;
    }
    
    if($(this).val() === 'Biologic_management'){
        $(".Biologic_management_hidden").css({"display":"block"});
    }else{
        $(".Biologic_management_hidden").css({"display":"none"});
        document.getElementById('Biologic_management').selectedIndex = 0;
    }
});
//    Facts.isUser();

    $("#logme").click(Facts.login);
//    $("#diagro").click(Facts.submitAgro);
    $("#diagro_zero").click(Facts.submitZero);
    $("#diagro_cp").click(Facts.submitCp);
    $("#diahydro").click(Facts.submitHydro);

    $("#regme").click(Facts.register);
    $("#diagnosenow").click(Facts.diagnose);
    $("#diagnosewater").click(Facts.diagnoseWater);
    $("#uprofile").click(Facts.updateProfile);
    $("#byDate").click(Facts.factsByDate);
    $("#logout").click(Facts.logout);
    $("#chpword").click(Facts.change_password);
    if( $(".profile").length > 0){ Facts.renderProfile();}
    $('select[name=age]').change(function(){
        var self = $(this);

        $('select[name=age]').each(function( i , e) {
            if($(e).val()!=self.val()){
                $( e ).attr("value","");
                $( e ).prop('selectedIndex',0);
            }
        });

    });

    var upform = $("#updateProForm");

    if(upform.length>0){

        var user = Facts.storage.getItem("user");

        user = JSON.parse(user);
        $('input[name=user_id]').val(user.user_id);
        $('input[name=username]').val(user.username);
        $('input[name=first_name]').val(user.first_name);
        $('input[name=last_name]').val(user.last_name);
        $('input[name=city]').val(user.city);

        User.pro_image = user.pro_image;
        var countrySelect = document.getElementById("country");
        var stateSelect = document.getElementById("state");

        var countryCount = countrySelect.options;

        for(var i=0;i<countryCount.length; i++){
            if($.trim(countryCount[i].getAttribute('value').toLowerCase())===$.trim(user.country.toLowerCase())) {
                countrySelect.selectedIndex =i;
            }
        }
        var stateCount = stateSelect.options;
        for(var i=0;i<stateCount.length; i++){
            if($.trim(stateCount[i].getAttribute('value').toLowerCase())===$.trim(user.state.toLowerCase())) {
                stateSelect.selectedIndex =i;
            }
        }


    }


});




var SDG ={};

$("#pests").on( "change",function(){
    if(this.checked) {
        $("#pests_count").css({"display": "block"});
    }else{

        $("#pests_count").css({"display": "none"});
    }

});

$("#wtbds").on( "change",function(){
    if(this.checked) {
        $("#wtbd_s").css({"display": "block"});
    }else{

        $("#wtbd_s").css({"display": "none"});
    }

});


$("#fertilizer").on( "change",function(){

    if(this.checked){
        $("#fertilizer_type_row").css({"display":"block"});
        $("#fertilizer_size").css({"display":"block"});

    }else{
        $("#fertilizer_type_row").css({"display":"none"});
        $("#fertilizer_size").css({"display":"none"});
    }

});

$("#lpd").on( "change",function(){
if($(this).val()==='others'){
$("#lpd-others").css({"display":"block"});

}else{
    $("#lpd-others").css({"display":"none"});

}

});

$("#wts").on( "change",function(){
    if($(this).val()==='others'){
        $("#wts_others").css({"display":"block"});

    }else{
        $("#wts_others").css({"display":"none"});

    }

    if($(this).val()==='well' || $(this).val()==='borehole'){

        $(".wts_dep").css({"display":"block"});
    }else{

        $(".wts_dep").css({"display":"none"});
    }

});

