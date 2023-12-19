var array = [
  {
    id: "1",
    name: "mani",
    country: "indian",
    city: "chennai"
  },
  {
    id: "2",
    name: "vijay",
    country: "india",
    city: "mumbai"
  },
  {
    id: "3",
    name: "subhan",
    country: "indian",
    city: "kerala"
  },
  {
    id: "4",
    name: "john",
    country: "europe",
    city: "england"
  },
  {
    id: "5",
    name: "smith",
    country: "indian",
    city: "Andhara"
  }
]

let table = document.getElementById("mytable");
let error = document.getElementById("error");
let data_search = document.getElementById("search");

function showtable(data) {
 
  table.innerHTML = `
  <tr class="bg-primary text-white fw-bold">
              <td>ID</td>
              <td>Name</td>
             <td>Country</td>
              <td>City</td>
          </tr> ` ;

  if (data == "") {
    error.innerHTML = `<span class='text-danger '>Not Found!</span>`;
  }
  else {
    error.innerHTML = "";

    for (var i = 0; i < data.length; i++) {
     table.innerHTML += ` 
            <tr > 
              <td>${data[i].id}</td> 
              <td>${data[i].name}</td> 
              <td>${data[i].country}</td>
              <td>${data[i].city}</td>
             </tr>`;
      
    }
  }
}
showtable(array);


var newarray = [];

data_search.addEventListener("keyup", function () {
    var search = this.value.toLowerCase();

    newarray = array.filter(function (val) {
    
        

        // if (val.id.includes(search) || val.name.includes(search) || val.country.includes(search)
        //     || val.city.includes(search)) {
        //     var newobj = { id: val.id, name: val.name, country: val.country, city: val.city }
        //     return newobj;
        // }
        //  return Object.values(val).some(prop =>prop.toLowerCase().includes(search));
         return Object.entries(val).some(
          ([key,prop]) =>prop.toLowerCase().includes(search)
        
          );
         
    });

    showtable(newarray);

});



var data = {
  states:[
      {
     "state":"Tamilnadu",
     "District":["Kallakuichi","villipuram"],
     Taluk:["chinnsalem","kallakurichi"]
      },
       {
     state:"kerala",
     District:["payyanur","kannur"],
     Taluk:["karathand","payyanur"]
      },
    
    ]
}

//window load
window.onload =function(){
  const selectState = document.getElementById("state")
  const selectCity = document.getElementById("city")
  const selectTaluk = document.getElementById("Taluk")

  selectCity.disabled =true;
  selectTaluk.disabled =true;
  
  data.states.forEach((value)=>{
   selectState.appendChild(createOption (value.state,value.state))
  })

  selectState.addEventListener("change",function(e){
    selectCity.disabled =false;
    data.states.forEach((details,index)=>{
  
       if(details.state ===e.target.value){
        selectCity.innerHTML = "";
     
        selectCity.append(createOption("select city",""));
        // selectTaluk.append(createOption("select talik",""));
        data.states[index].District.forEach((district)=>{
          selectCity.append(createOption(district,district))
           
        })
       }
    })
  })

  selectCity.addEventListener("change",function(e){
    selectTaluk.disabled =false;
    data.states.forEach((detail,index)=>{
      // console.log(detail.District,"mnai---")
         if(detail.District[index] == e.target.value){
     
          selectTaluk.innerHTML = "";
          selectTaluk.append(createOption("select Taluk",""));
          // console.log(  data.states[index].Taluk)
          data.states[index].Taluk.forEach((taluk)=>{
           
            selectTaluk.append(createOption(taluk,taluk))
          })
         }
    })
  })

  
  
  function createOption (displayMember,valueMember){
     const newOption =  document.createElement("option");
     newOption .value = valueMember;
     newOption.text  =  displayMember;
     return newOption;
  }
  
}



  const SERVICE_URL = "https://raw.githubusercontent.com/marceaudavid/agotapi/master/data/quotes.json";
  
  const quote_button = document.getElementById("quote-btn")


  quote_button .addEventListener("click", (event) => {
    loadData();
  });
   function random_quote(quoteList) {
    return quoteList[Math.floor((Math.random()*quoteList.length))];
  }

  function loadData (){
         fetch( SERVICE_URL)
         .then((res)=>(res.json()))
         .then ((json)=>{
          const quotes =random_quote(json);
          console.log(quotes)
          let quoteElement =document.getElementById("quote")
          quoteElement.textContent = `"${quotes.quote}"`
          let cElement = document.getElementById("character");
           cElement.textContent = `- ${quotes.from} -`;
         } )       
  }

  loadData()
