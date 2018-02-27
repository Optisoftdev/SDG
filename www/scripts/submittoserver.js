var data = array();

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
        
        
data: {assessment_code: assessment_code, assessment_key: assessment_key, assessee_input: assessee_input, peer_input: peer_input, "_token": "{{ csrf_token() }}", employees: JSON.stringify(assessee_array)},
        
        
        
var new_entry_date = $("#date").val();
var fullname = $("#fullname").val();
var phone_number = $("#phone_number");
var user_email = $("#email").val();
var gender = $("#gender").val();
var age_range = $("#age_range").val();
var educational_qualification = $("#educational_qualification").val();

var address = $("#address").val();

var ward = $("#ward").val();

var state = $("#state").val();

var lga = $("#lga").val();
var type_of_business = $("#type_of_business").val();
var position = $("#position").val();
var business_category = $("#business_category").val();
var business_address = $("#business_address").val();
var state_2 = $("#state_2").val();
var lga_2 = $("#lga_2").val();
var ownership = $("#ownership").val();
var partners = $("#partners").val();
var share_capital = $("#share_capital").val();
var share_holding = $("#share_holding").val();
var state_capital = $("#state_capital").val();
foreign_technical_partner (select option)
total_work_force
senior_management
junior_management
casual_management
origin_of_business (select option)
bankers
cp1 (select option)
cp2 (select option)
cp3 (select option)
customers
quantity_produced (checkbox)
daily
weekly
monthly
yearly
quality_control
market_outlets
market_share
quantity_sold (checkbox)
daily_sale
weekly_sale
monthly_sale
yearly_sale
turn_over (checkbox)
daily_turn
weekly_turn
monthly_turn
yearly_turn
extension_services (select option)
s_extension_services
machines_in_use
s_machine_in_use
business_space (select option)
space
access_to_finance (select option)
access_to_market (select option)
percentage_of_wastage (select option)
processing_equipment (select option)
d_processing_equipment (select option)
business_expansion (select option)
source_of_capital (select option)
finance (checkbox)
markets (checkbox)
location_office (checkbox)
warehouse (checkbox)
electricity (checkbox)
water (checkbox)
road (checkbox)
others (checkbox)

others_specify