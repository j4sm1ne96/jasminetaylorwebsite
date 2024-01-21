//global variables

var border;
var currencyCode;
var countryName;
let capitalCityWeather;
let capitalCityLat;
let capitalCityLon;
let iso2CountryCode;
let capitalCity;
let visitedCountries = [];
let popup;
let issTracker = false;
let quakeMapper = false;

var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer.provider('Stamen.Terrain').addTo(map);

var Stamen_Terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 0,
	ext: 'png'
});

// Select button
$(document).ready(function() {
    $.ajax({
        url: "libs/php/getAllCountries.php",
        type: 'GET',
        dataType: 'json',
        success: function(result) {
          if(result.status.name === "ok") {
            result.data.forEach(e => {
              $('#selectCountry').append($(`<option value = "${e.code}">${e.name}</option>`))
            });
          }
        }
      })
  });

//borders


$('#selectCountry').on('change', function() {
     let countryCode = $('#selectCountry').val();
     let countryOptionText = $('#selectCountry').find('option:selected').text();

     //check if new visited country is not already in the array and push it 
     if(!visitedCountries.includes(countryOptionText)) {
       visitedCountries.push(countryOptionText)
       console.log('Array visited countries', visitedCountries)
     }

    $.ajax({
        url: "libs/php/getCountryBorder.php",
        type: 'POST',
        dataType: 'json',
        success: function(result) {
          console.log('all borders result', result);

          if (map.hasLayer(border)) {
            map.removeLayer(border);
          }

          let countryArray = [];
          let countryOptionTextArray = [];

          for (let i = 0; i < result.data.border.features.length; i++) {
            if (result.data.border.features[i].properties.iso_a2 === countryCode) {
                countryArray.push(result.data.border.features[i]);
            }
        };
        for (let i = 0; i < result.data.border.features.length; i++) {
            if (result.data.border.features[i].properties.name === countryOptionText) {
                countryOptionTextArray.push(result.data.border.features[i]);
            }
        };

     
        border = L.geoJSON(countryOptionTextArray[0], {
                                                        color: 'lime',
                                                        weight: 3,
                                                        opacity: 0.75
                                                        }).addTo(map);
        let bounds = border.getBounds();
            map.flyToBounds(bounds, {
            padding: [35, 35], 
            duration: 2,
            });        
        },
        error: function(jqXHR, textStatus, errorThrown) {
          // your error code
          console.log(textStatus, errorThrown);
        }

        
    });

  });



      

//Country Modal

 var countrybtn = L.easyButton('<div class="backButton"><i class="fa fa-info"></i></div>', function(btn, map){
    if ($('#selectCountry').val() === null){
      $('#alert').modal('show');
    }else{
        $("#modalCountry").modal('show');
    }
  }).addTo(map);
  
  $.ajax({ 
    url: "./libs/php/getCountryInfo.php",
    type: "POST",
    dataType: "JSON",
    data: {
      country: countryCode
    },
    success: function(result){  
      
      const capital = result.data.capital;
      const country = result.data.country;
      let countryWiki = country.split(" ").join("_")
      const wiki = 'https://en.m.wikipedia.org/wiki/';
      
      const wikis =  wiki + countryWiki;
      const population = result.data.population
      const pop = population.replace(/,/g, '');
      
      let popForCities = Math.floor(pop / 400);


      $('.countryName').html(result['data']['country'])
      $('.countryCapital').html(result['data']['capital'])
      $('.countryPopulation').html(result['data']['population'])
      $('.countryArea').html(result["data"]["area"]);
      $('.countryContinent').html(result['data']['continent'])
      $('#link2').attr('src',wikis)


      let alpha3 = result.data.iso_a3
  
      let alpha3lower = alpha3.toLowerCase()

    }
  })


//Get Close Country Modal
var closeBtn = document.getElementById("closeBtnCountry");
//Open Modal
countryBtn.onclick = function() {
    modalCountry.style.display = "block";
}
//Close Modal
closeBtn.onclick = function() {
    modalCountry.style.display = "none";
}
//Close Modal When User Clicks Outside
window.onclick = function(event) {
    if (event.target == modalCountry) {
      modalCountry.style.display = "none";
    }
  }

  

//Weather Modal
var weatherbtn = L.easyButton('<i class="fas fa-cloud-sun"></i>', function(btn, map){
  if ($('#countryselect').val() === null){
    $('#alert').modal('show');
  }else{
  $("#modalWeather").modal('show');
  }
}).addTo(map);


//Get Close Weather Modal
var closeBtn = document.getElementById("closeBtnWeather");
//Open Modal
weatherBtn.onclick = function() {
    modalWeather.style.display = "block";
}
//Close Modal
closeBtn.onclick = function() {
    modalWeather.style.display = "none";
}
//Close Modal When User Clicks Outside
window.onclick = function(event) {
    if (event.target == modalWeather) {
      modalWeather.style.display = "none";
    }
}

// function for using the nav bar select
$('#countrySelect').change(function(){
 
  $('#countryBtn').click(function(){
    $('#modalCountry').modal('show');
  })
  $('#weatherBtn').click(function(){
    $('#modalWeather').modal('show');
  })
  
  if (marker){
    map.removeLayer(marker)
  }
  let val = $('#countrySelect').val()
  
})



