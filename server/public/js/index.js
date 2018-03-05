
$(document).ready(function(){
    $('#button').click(function () {
        let newobj = []
        const time = $('#time').val();
        const date = $("#date").val();
        const buyerId = $("#userId").val();
        const name = $("#username").val();
        const email = $("#email").val();
        const phone = $("#phone").val();
        const price = $("#price").val();
        const cart = $("#products").val();
        const address = $("#address").val(); 
        newobj.push(address, date, email, cart, price, time, buyerId, phone, name);
        payWithPaystack(newobj)
        // console.log(address, cart)
    })

});




function payWithPaystack(data){
    console.log(data)
    
    var handler = PaystackPop.setup({
      key: 'pk_test_e8e6e0d623bebae74c4c0512eb9d70ab0136c8ec',
      email: data[2],
      amount: data[4] * 100,
      phone: data[7],
      firstname: data[8],
      ref: '', 
      metadata: {
         custom_fields: [
            {
               purchace: data[3]
            }
         ]
      },
      callback: function(response){
          alert('success. transaction ref is ' + response.reference);
            const ref = response.reference;
            axios.post('/user/product/pay', {
                    buyerId: data[6],
                    cart: data[3],
                    address: data[0],
                    time: data[5],
                    date: data[1],
                    ref: ref
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
            });
        },
        onClose: function(){
            alert('window closed');
        }
        });
        handler.openIframe();
        
    console.log(handler)
}   











 



