const enlances = [
    {
        link: "home",
        nombre:"inicio"
    },
    {
        link: "productos",
        nombre:"productos"
    },
    {
        link: "contacto",
        nombre:"contacto"
    },
 ];


function fnNavigation(_page) {
    console.log(`${_page}`+".html");
    window.location.href = `${_page}`+".html";
    

                 
}

function otrafn(){
    console.log("otra fn");
}