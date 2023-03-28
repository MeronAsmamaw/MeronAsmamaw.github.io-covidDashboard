



function search() {


    var input = document.querySelector("#input");

    var totalConfirmed = 0;
    var totalDeath = 0;
    var totalRecoverd = 0;

    let obj;
    //   var url=`https://api.covid19api.com/summary`
    fetch(`https://api.covid19api.com/summary`)
        .then(response => response.json())
        .then(res => {
            obj = JSON.stringify(res);
            localStorage.setItem("obj", obj);
        }).catch(error => console.error(error))


    let myObj = localStorage.getItem("obj");
    let object = JSON.parse(myObj);


    for (i = 0; i < object.Countries.length; i++) {
        if (object.Countries[i].Country == input.value) {


            crd = `
        <div class="col-md-4">
        <div class="card text-center">
          <div class="card-body bg-primary-subtle">
            <h5 class="card-title">Total Confirmed</h5>
            <p id="Confirmed_Cases">${object.Countries[i].TotalConfirmed}</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-center">
          <div class="card-body bg-danger-subtle">
            <h5 class="card-title">Total Death</h5>
            <p id="Deaths">${object.Countries[i].TotalDeaths}</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-center">
          <div class="card-body bg-dark-subtle">
            <h5 class="card-title">Total Recovery</h5>
            <p id="Recovered">${object.Countries[i].TotalRecovered}</p>
          </div>
        </div>
      </div>`

            document.querySelector("#cards").innerHTML = crd;


            // Data retrieved from https://www.ssb.no/energi-og-industri/olje-og-gass/statistikk/sal-av-petroleumsprodukt/artikler/auka-sal-av-petroleumsprodukt-til-vegtrafikk
            Highcharts.chart('t1', {
                title: {
                    text: 'Countries covid status',
                    align: 'left'
                },
                xAxis: {
                    categories: ['Total Confirmed', 'Total Death', 'Total Recovery']
                },
                yAxis: {
                    title: {
                        text: 'Total amount'
                    }
                },
                tooltip: {
                    valueSuffix: '2023-3'
                },
                series: [{
                    type: 'column',
                    name: 'Date',
                    data: [object.Countries[i].TotalConfirmed,object.Countries[i].TotalDeaths,object.Countries[i].TotalRecovered],
                }]
            });

// chart 2

// Data retrieved from https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/
Highcharts.chart('container', {
  chart: {
      type: 'area'
  },
  accessibility: {
      description: 'Image description: An area chart compares the covid status of  Kenya and USA  2023-3 based on total confirmed,death and recovery.'
  },
  title: {
      text: 'Kenya  and USA covid status'
  },
  // subtitle: {
  //     text: 'Source: <a href="https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/" ' +
  //         'target="_blank">FAS</a>'
  // },
  xAxis: {
      allowDecimals: false,
      labels: {
          formatter: function () {
              return this.value; // clean, unformatted number for year
          }
      },
      accessibility: {
          rangeDescription: ''
      }
  },
  yAxis: {
      title: {
          text: 'total number'
      },
      labels: {
          formatter: function () {
              return this.value / 1000 + 'k';
          }
      }
  },
  tooltip: {
      pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
  },
  plotOptions: {
      area: {
          pointStart: 2023,
          marker: {
              enabled: false,
              symbol: 'circle',
              radius: 2,
              states: {
                  hover: {
                      enabled: true
                  }
              }
          }
      }
  },
  series: [{
      name: 'kenya',
      data: [
          342937, 5688, 0
      ]
  }, {
      name: 'USA',
      data: [103802702, 1123836, 0
      ]
  }]
});
//chart 3
            

        }
    }

}
