function ingresar(){
 var usuario ="admin";
 var contraseña ="@sistenci@$";

 if(document.form.pass.value == contraseña && document.form.user.value ==usuario){
    console.log("contraseña correcta");
    localStorage.setItem("usuario",usuario);
    window.location="Pages/principal.html";
 }else{
   alert("contraseña incorrecta")
}

}
