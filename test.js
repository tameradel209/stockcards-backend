//post package
var formdata = new FormData();
formdata.append("backImage", fileInput.files[0], "/C:/Users/tamer/Downloads/backvip.png");
formdata.append("image", fileInput.files[0], "/C:/Users/tamer/Downloads/vip.png");
formdata.append("color", "#BE8E08");
formdata.append("advantages", "60649ddeb0cccf27648306a2 60649e51b0cccf27648306a3");
formdata.append("offers", "6064974ab0cccf276483069d 60649768b0cccf276483069e 60649775b0cccf276483069f");
formdata.append("enName", "VIP For Individuals");
formdata.append("enType", "Individuals");
formdata.append("enDescription", "This package is customized to suit individual requirements, to ensure the best possible experience");
formdata.append("enPrice", "95");
formdata.append("enCurrency", "SR");
formdata.append("arName", "VIP للافراد");
formdata.append("arType", "الافراد");
formdata.append("arDescription", "تم تخصيص هذه الباقة لكي تلائم متطلبات الأفراد، حرصا منّا للحصول على أفضل تجربة ممكنة");
formdata.append("arPrice", "95");
formdata.append("arCurrency", "ريال");

var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
};

fetch("https://stockcardsbackend.herokuapp.com/api/v1/packages", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));