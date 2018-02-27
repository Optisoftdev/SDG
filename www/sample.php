<?php
include 'include/config.php';
?>

    <!DOCTYPE html>
    <html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Reports| 5facts</title>
    <meta name="description" content="5facts | Medical Reports and Analysis">
    <meta name="Optisoft" content="5facts">

    <!-- Devices Meta -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <!-- Put favicon.ico and apple-touch-icon(s).png in the images folder -->
    <link rel="shortcut icon" href="assets/images/favicon.ico">
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>

    <link href='https://fonts.googleapis.com/css?family=Oswald:400,100,300,500,700%7CLato:400,300,700,900&subset=latin,latin-ext' rel='stylesheet' type='text/css'>

    <!-- Plugins CSS files -->
    <link rel="stylesheet" href="assets/css/assets.css">

    <!-- REVOLUTION SLIDER STYLES -->
    <link rel="stylesheet" href="assets/revolution/fonts/pe-icon-7-stroke/css/pe-icon-7-stroke.css" type="text/css">
    <link rel="stylesheet" href="assets/revolution/css/settings.css" type="text/css">
    <link rel="stylesheet" href="assets/revolution/css/navigation.css" type="text/css">

    <!-- Template CSS files -->
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/shortcodes.css">
    <link id="theme_css" rel="stylesheet" href="assets/css/light.css">
    <link id="skin_css" rel="stylesheet" href="assets/css/skins/default.css">
<?php
if (isset($_POST['creteria_form'])) {


            $stat_date = $_POST['stat_date'];

            $end_date = $_POST['end_date'];
            ?>
            <script type = "text/javascript" src = "https://www.google.com/jsapi"></script>
            <script type="text/javascript">
                //Frequency Table
                google.load("visualization", "1", {packages: ["table"]});
                google.setOnLoadCallback(drawTable);
           function drawTable() {

var data = new google.visualization.DataTable();
data.addColumn('string', 'Name of Survey');
data.addColumn('string', 'Location of water ');
data.addColumn('string','source name');
data.addColumn('string', 'Water source');
data.addColumn('string','water flowing');
data.addColumn('string', 'rehabilitation done');
data.addColumn('string', 'yield');
data.addColumn('string', 'direct beneficairies');
data.addColumn('string', 'source access');
data.addColumn('string', 'watershed');
data.addColumn('string', 'lga');
data.addColumn('string', 'urinals');
data.addColumn('string', 'water bore diseases');

data.addRows([
<?php
// $caseFreqTab = "select count(*) freq, diagnosis  from fact_view where dtime between '$stat_date' and '$end_date' group by diagnosis";

$caseFreqTab = "SELECT * FROM water WHERE entry_date between '$stat_date' and '$end_date'  group by entry_date";


$exec = mysqli_query($connect, $caseFreqTab);
while ($row = mysqli_fetch_array($exec)) {

    echo "['" . $row['name_of_survey'] . "',"
        . $row['location_of_water'] . ","
        . $row['source_name']
        . "," . $row['water_sources']
        . "," . $row['water_flowing']
        . "," . $row['rehabilitation_done']
        . "," . $row['yield']
        . "," . $row['direct_beneficiaries']
        . "," . $row['source_access']
        . "," . $row['watershed']
        . "," . $row['lga']
        . "," . $row['urinals']
        . "," . $row['water_bore_diseases'].",";
                        }
                        ?>

                    ]);




                    var table = new google.visualization.Table(document.getElementById('table_div'));
                    table.draw(data, {showRowNumber: true, width: '100%', pageSize: '10', pagingButtons: 'both', height: '100%', headerRow: 'bigAndBoldClass', hoverTableRow: 'highlightClass' });

                    //table.draw(data, table_options);

                    //                // var table = new google.visualization.Table(document.getElementById('table_div'));
                    //
                    //                table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});

                }





            </script>
            <?php
        }
        ?>
    </head>
<body>

    <!-- site preloader start -->
    <div class="page-loader"></div>
    <!-- site preloader end -->

<div class="pageWrapper">

    <!-- Header start -->
    <header class="top-head header-left" style="background-image:url('assets/images/patterns/wall.jpg');">
        <div class="container">


            <div id="logo">
                <a href="index" class="standard-logo" data-animate="rollIn" data-delay="1000" data-dark-logo="assets/images/logo.png"><img src="assets/images/logo.png"></a>
            </div>
            <!-- Logo end -->

            <div class="responsive-nav">
                <!-- top navigation menu start -->
                <nav class="side-nav">
                    <ul>
                        <li><a href="index"><span>Home</span></a>
                        <li><a href=""><span>Cases</span></a>
                            <ul>
                                <li><a href="cases"><span>Total Number of Cases</span></a></li>
                                <li><a href="cases-location"><span>Cases by Location</span></a></li>
                                <li><a href="cases-age"><span>Cases by Age Group</span></a></li>
                                <li><a href="cases-gender"><span>Cases by Gender</span></a></li>
                                <li><a href="cases-time"><span>Cases by Time</span></a></li>
                                <li><a href="cases-age-location"><span>Cases by Age Group & Location</span></a></li>
                                <li><a href="cases-gender-location"><span>Cases by Gender & Location</span></a></li>
                                <li><a href="cases-location-time"><span>Cases by Location & Time</span></a></li>
                                <li><a href="cases-age-gender"><span>Cases by Age Group & Gender</span></a></li>
                                <li><a href="cases-age-time"><span>Cases by Age Group & Time</span></a></li>
                                <li><a href="cases-gender-time"><span>Cases by Gender & Time</span></a></li>
                                <li><a href="cases-location-age-gender"><span>Cases by Location, Age Group & Gender</span></a></li>
                                <li><a href="cases-location-age-time"><span>Cases by Location, Age Group $ Time</span></a></li>
                                <li><a href="cases-age-gender-time"><span>Cases by Age Group, Gender & Time</span></a></li>
                                <li><a href="cases-location-age-gender-time"><span>Cases by Location, Age Group, Gender & Time</span></a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <!-- top navigation menu end -->


                <div class="side-header-bottom">
                    <!-- top search start -->
                    <div class="top-search vis-search">
                        <input type="text" name="t" placeholder="Type And Hit Enter..."><button name="b" class="main-color no-bg-btn"><i class="fa fa-search"></i></button>
                    </div>
                    <!-- top search end -->
                    <div class="social-list">
                        <a href="#" data-toggle="tooltip" data-placement="bottom" data-original-title="Facebook"><i class="fa fa-facebook ic-facebook no-border sm-icon"></i></a>
                        <a href="#" data-toggle="tooltip" data-placement="bottom" data-original-title="Twitter"><i class="fa fa-twitter ic-twitter no-border sm-icon"></i></a>
                        <a href="#" data-toggle="tooltip" data-placement="bottom" data-original-title="Linkedin"><i class="fa fa-linkedin ic-linkedin no-border sm-icon"></i></a>
                        <a href="#" data-toggle="tooltip" data-placement="bottom" data-original-title="Dribbble"><i class="fa fa-dribbble ic-dribbble no-border sm-icon"></i></a>
                        <a href="#" data-toggle="tooltip" data-placement="bottom" data-original-title="Google Plus"><i class="fa fa-google-plus ic-gplus no-border sm-icon"></i></a>
                    </div>
                    <div class="copyrights">© Copyrights <b class="main-color">5facts</b> 2016. All rights reserved.</div>
                </div>
            </div>
        </div>
    </header>
    <!-- Header start -->


    <!-- Content start -->
    <div class="pageContent">

        <div class="page-title">
            <div class="container">
                <h1>Reports</h1>
                <h3>Detailed Report on Total Number of Cases</h3>


            </div>
        </div>
        <div class="breadcrumbs">
            <div class="container">
                <a href="#">Home</a><i class="fa fa-long-arrow-right main-color"></i><a href="#">Reports</a><i class="fa fa-long-arrow-right main-color"></i><span>Charts</span>
            </div>
        </div>

        <div class="row">
            <div class="col-md-5 hidden-md"></div>
            <div class="col-md-6 mn-cell md-pd-40">
                <div class="row">
                    <div class="heading style3">
                        <h4 class="uppercase">Report Criteria</h4>
                    </div>
                    <p>
                        Select Report generation criteria
                    </p>
                    <div class="m-t-3">

                        <form action="agro_report.php" method="post" name="criteria_form" id="criteria_form">



                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label>Start Date:</label>
                                    <span class="abs-icons">
                                                <input type="date" id="stat_date" name="stat_date" placeholder="Date" class="form-control date_timepicker" value="">

                                            </span>
                                </div>
                                <div class="form-group col-md-6">
                                    <label>End Date:</label>
                                    <span class="abs-icons">
                                                <input type="date" id="end_date" name="end_date" placeholder="Date" class="form-control date_timepicker" value="">

                                            </span>
                                </div>

                            </div>


                            <div class="button-group col_one_third col_last">
                                <input id="creteria_form" name="creteria_form" type="submit" class="btn btn-block  main-bg" value="Submit">
                            </div>

                        </form>
                    </div>

                </div>
            </div>
            <div class="col-md-1"></div>
        </div>

        <?php
        if (isset($_POST['creteria_form'])) {
            ?>
            <div class="md-padding">
                <div class="container">
                    <div class="row">
                        <div id="table_div" class="col-md-6 fx fadeIn" style="width: 800px; height: 800px;">
                            <h3>Frequency Table</h3>
                            <canvas id="table_div" width="800" height="625"></canvas>
                        </div>

                    </div>
                </div>
            </div>
            <?php
        }
        ?>


    </div>
    <!-- Content start -->

<?php
include 'include/footer.php';
?>