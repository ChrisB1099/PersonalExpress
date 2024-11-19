// var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");
var editIcons = document.getElementsByClassName("fa-edit");
// var crossOutIcons = document.getElementsByClassName("fa-check");

// Array.from(thumbUp).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const firstname = this.parentNode.parentNode.childNodes[1].innerText
//         const lastname = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         fetch('athletes', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'firstname': firstname,
//             'lastname': lastname,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });
Array.from(editIcons).forEach(function(element) {
  element.addEventListener('click', function() {
    const amount = this.parentNode.parentNode.childNodes[1].innerText;
    const category = this.parentNode.parentNode.childNodes[3].innerText;
    const date = this.parentNode.parentNode.childNodes[5].innerText;
    
    
    const newAmount = prompt("Edit amount:", amount);
    const newCategory = prompt("Edit category:", category);
    const newDate = prompt("Edit date:", date);
    
    
    if (newAmount && newCategory && newDate) {    // If user entered new values this is sending it to the server, send them to the server
      fetch('athletes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          oldAmount: amount,
          oldCategory: category,
          oldDate: date,
          newAmount: newAmount,
          newCategory: newCategory,
          newDate: newDate
        })
      }).then(response => {
        if (response.ok) return response.json();
      }).then(data => {
        console.log(data);
        window.location.reload(true);
      });
    }
  });
});



Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const amount = this.parentNode.parentNode.childNodes[1].innerText
        const category = this.parentNode.parentNode.childNodes[3].innerText
        const date = this.parentNode.parentNode.childNodes[5].innerText

        fetch('athletes', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'amount': amount,                 //senind the firstname and lastname to the body 
            'category': category,
            'date': date
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
