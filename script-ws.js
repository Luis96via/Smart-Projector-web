document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById("modal-WS");
    var btns = document.querySelectorAll(".comprarBtn"); // Selecciona todos los botones con la clase comprarBtn
    var span = document.getElementsByClassName("close-ws")[0];

    btns.forEach(function(btn) {
        btn.onclick = function() {
            modal.style.display = "block";
        }
    });

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});